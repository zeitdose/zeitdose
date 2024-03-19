import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { Lucia } from 'lucia'

declare module 'lucia' {
  interface Register {
    Lucia: typeof Lucia
    UserId: number
  }
}

import * as schema from '~/db/schema'
import { sessionTable, userTable } from '~/db/schema/user'

export const db = drizzle(sql, { schema })
export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable)
