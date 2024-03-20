'use server'

import { db } from '~/db/drizzle'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Argon2id } from 'oslo/password'
import { userTable } from '~/db/schema'
import { lucia } from '~/lib/auth'

export const login = async (username: string, password: string) => {
  if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
    return {
      error: 'Invalid password',
    }
  }

  const existingUser = await db.select().from(userTable).where(eq(userTable.username, username))

  if (!existingUser) {
    return {
      error: 'User not found',
    }
  }

  const validPassword = await new Argon2id().verify(existingUser[0].hashedPassword, password)
  if (!validPassword) {
    return {
      error: 'Incorrect username or password',
    }
  }

  const session = await lucia.createSession(existingUser[0].id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  revalidatePath('/')
  return redirect('/')
}
