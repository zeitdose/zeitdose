import { defineConfig } from 'drizzle-kit'
import process from 'node:process'

import './src/drizzle/envConfig'

export default defineConfig({
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  dialect: 'postgresql',
  out: './src/drizzle',
  schema: './src/db/schema/index.ts',
})
