import 'dotenv/config'
import { defineConfig } from 'prisma/config'

// Used by: prisma migrate, prisma generate, prisma db push.
// Runtime client uses lib/prisma.ts (PRISMA_DATABASE_URL for Accelerate).
const url = process.env.DATABASE_URL
if (!url) {
  throw new Error(
    'Missing DATABASE_URL. Required for Prisma CLI (migrate, generate, db push).'
  )
}

export default defineConfig({
  schema: './schema.prisma',
  datasource: { url },
})
