import './src/drizzle/envConfig'
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema/index.ts',
  out: './src/drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config
