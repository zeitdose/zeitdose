'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { hash } from '@node-rs/argon2'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { db } from '~/db/drizzle'
import { userTable } from '~/db/schema'
import { lucia } from '~/lib/auth'
import { PostgreSQLError } from '~/types/error'

export const signUp = async (preState: any, formData: FormData) => {
  const { password, username } = {
    password: formData.get('password'),
    username: formData.get('username'),
  }

  if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
    return {
      message: 'Invalid password',
    }
  }

  if (typeof username !== 'string' || username.length < 2 || !username) {
    return {
      message: 'Username must be at least 2 characters',
    }
  }

  const existingUser = await db.select().from(userTable).where(eq(userTable.username, username))

  if (existingUser) {
    return {
      message: 'User already exists',
    }
  }

  const hashedPassword = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  try {
    const result = await db.insert(userTable).values({
      username,
      hashedPassword,
    }).returning({ id: userTable.id })

    const session = await lucia.createSession(result[0].id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  } catch (e) {
    if (e instanceof Error) {
      const pgError = e as PostgreSQLError
      if (pgError.code === '23505') {
        return {
          message: 'Username is already in use',
        }
      }
    } else {
      return {
        message: 'An error occurred when creating your account',
      }
    }
  }
  revalidatePath('/')
  redirect('/')
}
