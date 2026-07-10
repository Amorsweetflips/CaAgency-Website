// Add Saranda Mavriqi to the talent roster (July 2026).
// Run with: npx tsx --env-file=.env.local scripts/apply-saranda-mavriqi.ts
import { PrismaClient } from '@prisma/client'

const accelerateUrl = process.env.PRISMA_DATABASE_URL
if (!accelerateUrl) {
  console.error('Missing PRISMA_DATABASE_URL')
  process.exit(1)
}

const prisma = new PrismaClient({ accelerateUrl } as any)

const TALENT = {
  name: 'Saranda Mavriqi',
  slug: 'saranda-mavriqi',
  imageUrl: '/images/talents/saranda-mavriqi.webp',
  category: 'instagram',
  instagramUrl: 'https://www.instagram.com/sarandamavriqi',
  tiktokUrl: 'https://www.tiktok.com/@saranda/',
}

async function main() {
  const maxOrder = await prisma.talent.aggregate({
    where: { category: 'instagram' },
    _max: { order: true },
  })
  const order = (maxOrder._max.order ?? 0) + 1

  const row = await prisma.talent.upsert({
    where: { name: TALENT.name },
    update: { ...TALENT },
    create: { ...TALENT, order },
  })

  console.log(`Upserted ${row.name} (slug=${row.slug}, order=${row.order})`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
