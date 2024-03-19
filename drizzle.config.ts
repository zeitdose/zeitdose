import 'dotenv/config'
import type { Config } from 'drizzle-kit'

export default {
  schema: '~/src/db/schema/index.ts',
  out: '~/src/drizzle',
  driver: 'pg',
} satisfies Config