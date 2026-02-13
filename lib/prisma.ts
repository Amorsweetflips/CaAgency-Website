import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prisma 7 Accelerate-only: PRISMA_DATABASE_URL required at runtime.
// DATABASE_URL is used by Prisma CLI (migrate, db push) in prisma.config.ts.
const accelerateUrl = process.env.PRISMA_DATABASE_URL
if (!accelerateUrl) {
  throw new Error(
    'Missing PRISMA_DATABASE_URL. Required for PrismaClient at runtime. Set it to your Prisma Accelerate URL (prisma+postgres://...).'
  )
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    accelerateUrl,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
