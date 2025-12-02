import { defineConfig } from 'drizzle-kit'
import env from './app/lib/env'

const config = defineConfig({
  schema: './app/lib/db/schema',
  out: './app/lib/db/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken:
      env.NODE_ENV === 'development' ? undefined : env.TURSO_AUTH_TOKEN,
  },
  casing: 'snake_case',
})

export default config
