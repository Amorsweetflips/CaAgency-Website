import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prisma 7 Accelerate-only: PRISMA_DATABASE_URL required at runtime.
// DATABASE_URL is used by Prisma CLI (migrate, db push) in prisma.config.ts.
const accelerateUrl = process.env.PRISMA_DATABASE_URL
const fallbackUrl = 'prisma://dummy:dummy@localhost:5432/dummy' // Must use prisma:// for accelerateUrl

if (!accelerateUrl) {
  console.warn(
    'Missing PRISMA_DATABASE_URL. Using dummy URL for build. PrismaClient will fail at runtime if not set.'
  )
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    accelerateUrl: accelerateUrl || fallbackUrl,
  } as any)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
