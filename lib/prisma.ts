import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prisma 7 Accelerate-only: PRISMA_DATABASE_URL required at runtime.
// DATABASE_URL is used by Prisma CLI (migrate, db push) in prisma.config.ts.
const accelerateUrl = process.env.PRISMA_DATABASE_URL
const fallbackUrl = 'postgresql://dummy:dummy@localhost:5432/dummy'

if (!accelerateUrl) {
  console.warn(
    'Missing PRISMA_DATABASE_URL. Using dummy URL for build. PrismaClient will fail at runtime if not set.'
  )
}

const prismaClientOptions: any = {
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
}

if (accelerateUrl) {
  prismaClientOptions.accelerateUrl = accelerateUrl
} else {
  prismaClientOptions.datasourceUrl = fallbackUrl
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
