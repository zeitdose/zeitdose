import type { Session, User } from 'lucia'

import { sha256 } from '@oslojs/crypto/sha2'
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import process from 'node:process'
import { cache } from 'react'

import type { DatabaseUser } from '~/types/user'

import { db } from '~/db/drizzle'
import { sessionTable, userTable } from '~/db/schema'

const SESSION_COOKIE_NAME = 'auth_session'

interface SessionConfig {
  cookie: {
    httpOnly: boolean
    name: string
    path: string
    sameSite: 'lax' | 'none' | 'strict'
    secure: boolean
  }
  expiresIn: number
  refreshThreshold: number
}

const SESSION_CONFIG: SessionConfig = {
  cookie: {
    httpOnly: true,
    name: SESSION_COOKIE_NAME,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
  expiresIn: 30 * 24 * 60 * 60 * 1000, // 30 days
  refreshThreshold: 15 * 24 * 60 * 60 * 1000, // 15 days
}

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  return encodeBase32LowerCaseNoPadding(bytes)
}

function hashToken(token: string): string {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
}

export async function createSession(userId: number): Promise<Session> {
  const token = generateSessionToken()
  const sessionId = hashToken(token)
  const expiresAt = new Date(Date.now() + SESSION_CONFIG.expiresIn)

  await db.insert(sessionTable).values({
    expiresAt,
    id: sessionId,
    userId,
  })

  return {
    expiresAt,
    fresh: true,
    id: token, // 返回未哈希的 token
    userId,
  }
}

export async function validateSessionToken(token: null | string): Promise<{ session: null | Session, user: null | User }> {
  if (!token) {
    return {
      session: null,
      user: null,
    }
  }

  const sessionId = hashToken(token)
  const result = await db
    .select({
      session: sessionTable,
      user: userTable,
    })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId))

  if (result.length < 1) {
    return {
      session: null,
      user: null,
    }
  }

  const { session, user } = result[0]

  // 检查会话是否过期
  if (Date.now() >= session.expiresAt.getTime()) {
    await invalidateSession(token)
    return {
      session: null,
      user: null,
    }
  }

  // If the session is close to expiration, refresh it
  if (Date.now() >= session.expiresAt.getTime() - SESSION_CONFIG.refreshThreshold) {
    const newExpiresAt = new Date(Date.now() + SESSION_CONFIG.expiresIn)
    await db
      .update(sessionTable)
      .set({
        expiresAt: newExpiresAt,
      })
      .where(eq(sessionTable.id, sessionId))

    return {
      session: {
        expiresAt: newExpiresAt,
        fresh: false,
        id: token,
        userId: user.id,
      },
      user,
    }
  }

  return {
    session: {
      expiresAt: session.expiresAt,
      fresh: false,
      id: token,
      userId: user.id,
    },
    user,
  }
}

export async function invalidateSession(token: string): Promise<void> {
  const sessionId = hashToken(token)
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId))
}

export async function setSessionTokenCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_CONFIG.cookie.name, token, SESSION_CONFIG.cookie)
}

export async function deleteSessionTokenCookie() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_CONFIG.cookie.name, '', {
    ...SESSION_CONFIG.cookie,
    maxAge: 0,
  })
}

export const validateRequest = cache(
  async (): Promise<{ session: null | Session, user: null | User }> => {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_CONFIG.cookie.name)?.value ?? null
    return validateSessionToken(token)
  },
)
declare module 'lucia' {
  interface Register {
    DatabaseUserAttributes: Omit<DatabaseUser, 'id'>
    UserId: number
  }
}
