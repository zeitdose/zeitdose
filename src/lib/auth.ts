import type { Session, User } from 'lucia'

import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia } from 'lucia'
import { cookies } from 'next/headers'
import process from 'node:process'
import { cache } from 'react'

import type { DatabaseUser } from '~/types/user'

import { db } from '~/db/drizzle'
import { sessionTable, userTable } from '~/db/schema'

// import { webcrypto } from "crypto";
// globalThis.crypto = webcrypto as Crypto;

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable)

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    }
  },
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
})

export const validateRequest = cache(
  async (): Promise<{ session: null, user: null } | { session: Session, user: User }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
    if (!sessionId) {
      return {
        session: null,
        user: null,
      }
    }

    const result = await lucia.validateSession(sessionId)
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie()
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      }
    }
    catch {}
    return result
  },
)

declare module 'lucia' {
  interface Register {
    DatabaseUserAttributes: Omit<DatabaseUser, 'id'>
    Lucia: typeof Lucia
    UserId: number
  }
}
