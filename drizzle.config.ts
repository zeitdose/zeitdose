import './src/drizzle/envConfig'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql',
  out: './src/drizzle',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
})
