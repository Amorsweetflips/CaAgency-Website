import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prisma 7 "client" engine requires accelerateUrl for Prisma Postgres
// Fall back to DATABASE_URL for direct connections
const accelerateUrl = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    accelerateUrl,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
