import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

import * as schema from '~/db/schema'

export const db = drizzle(sql, { schema })
export type Database = typeof db
export type DatabaseSchema = typeof schema
