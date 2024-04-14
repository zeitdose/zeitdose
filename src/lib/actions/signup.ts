'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { Argon2id } from 'oslo/password'

import { redirect } from 'next/navigation'
import { db } from '~/db/drizzle'
import { userTable } from '~/db/schema'
import { lucia } from '~/lib/auth'
import { PostgreSQLError } from '~/types/error'

export const signUp = async (username: string, password: string) => {
  if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
    return {
      error: 'Invalid password',
    }
  }

  if (username.length < 2) {
    return {
      error: 'Username must be at least 2 characters',
    }
  }

  const hashedPassword = await new Argon2id().hash(password)

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
          error: 'Username is already in use',
        }
      }
    }
  }
  revalidatePath('/')
  return redirect('/')
}
