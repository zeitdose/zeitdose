'use server'

import { verify } from '@node-rs/argon2'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { db } from '~/db/drizzle'
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
      success: false,
    }
  }

  if (typeof username !== 'string' || username.length < 2 || !username) {
    return {
      message: 'Invalid username',
      success: false,
    }
  }

  const existingUser = await db.select().from(userTable).where(eq(userTable.username, username))

  if (!existingUser || !existingUser[0]) {
    return {
      message: 'User not found',
      success: false,
    }
  }

  const user = existingUser[0]
  const validPassword = await verify(user.hashedPassword, password)

  if (!validPassword) {
    return {
      message: 'Incorrect password',
      success: false,
    }
  }

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return redirect('/')
}
