import { PrismaClient } from '@prisma/client'

// Run with: npx tsx --env-file=.env.local scripts/remove-milla-muladze.ts
const accelerateUrl = process.env.PRISMA_DATABASE_URL
if (!accelerateUrl) {
  console.error('Missing PRISMA_DATABASE_URL')
  process.exit(1)
}

const prisma = new PrismaClient({ accelerateUrl } as any)

async function main() {
  const removed = await prisma.talent.deleteMany({
    where: { name: 'Milla Muladze', slug: 'milla-muladze' },
  })
  const remaining = await prisma.talent.count({
    where: { name: 'Milla Muladze', slug: 'milla-muladze' },
  })

  if (remaining !== 0) {
    throw new Error(`Milla Muladze is still present (${remaining} row(s))`)
  }

  console.log(`Removed Milla Muladze: ${removed.count} row(s); remaining: 0`)
}

main()
  .catch((error) => {
    console.error('Failed to remove Milla Muladze:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
