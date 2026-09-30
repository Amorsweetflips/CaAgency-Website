import { PrismaClient } from '@prisma/client'

// Run with: npx tsx --env-file=.env.local scripts/remove-sydney-purl.ts
const accelerateUrl = process.env.PRISMA_DATABASE_URL
if (!accelerateUrl) {
  console.error('Missing PRISMA_DATABASE_URL')
  process.exit(1)
}

const prisma = new PrismaClient({ accelerateUrl } as any)

const where = { OR: [{ name: 'Sydney Purl' }, { slug: 'sydney-purl' }] }

async function main() {
  const removed = await prisma.talent.deleteMany({ where })
  const remaining = await prisma.talent.count({ where })

  if (remaining !== 0) {
    throw new Error(`Sydney Purl is still present (${remaining} row(s))`)
  }

  console.log(`Removed Sydney Purl: ${removed.count} row(s); remaining: 0`)
}

main()
  .catch((error) => {
    console.error('Failed to remove Sydney Purl:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
