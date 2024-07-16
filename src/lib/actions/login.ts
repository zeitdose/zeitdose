'use server'

import { db } from '~/db/drizzle'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { verify } from '@node-rs/argon2'
import { userTable } from '~/db/schema'
import { lucia } from '~/lib/auth'

export const login = async (preState: any, formData: FormData) => {
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

  if (!existingUser) {
    return {
      message: 'User not found',
    }
  }

  const validPassword = await verify(existingUser[0].hashedPassword, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  if (!validPassword) {
    return {
      message: 'Incorrect username or password',
    }
  }

  const session = await lucia.createSession(existingUser[0].id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  revalidatePath('/')
  redirect('/')
}
