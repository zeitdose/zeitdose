'use server'

import { hash } from '@node-rs/argon2'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { PostgreSQLError } from '~/types/error'

import { db } from '~/db/drizzle'
import { userTable } from '~/db/schema'
import { lucia } from '~/lib/auth'

export const signUp = async (preState: any, formData: FormData) => {
  const { password, username } = {
    password: formData.get('password'),
    username: formData.get('username'),
  }

  if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
    return {
      message: 'Invalid password',
      success: false,
    }
  }

  if (typeof username !== 'string' || username.length < 2 || !username) {
    return {
      message: 'Username must be at least 2 characters',
      success: false,
    }
  }

  const existingUser = await db.select().from(userTable).where(eq(userTable.username, username))

  if (existingUser) {
    return {
      message: 'User already exists',
      success: false,
    }
  }

  const hashedPassword = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    outputLen: 32,
    parallelism: 1,
    timeCost: 2,
  })

  try {
    const result = await db.insert(userTable).values({
      hashedPassword,
      username,
    }).returning({ id: userTable.id })

    const session = await lucia.createSession(result[0].id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    const cookieStore = await cookies()
    cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  }
  catch (e) {
    if (e instanceof Error) {
      const pgError = e as PostgreSQLError
      if (pgError.code === '23505') {
        return {
          message: 'Username is already in use',
          success: false,
        }
      }
    }
    return {
      message: 'An error occurred when creating your account',
      success: false,
    }
  }
  revalidatePath('/')
  return redirect('/')
}
