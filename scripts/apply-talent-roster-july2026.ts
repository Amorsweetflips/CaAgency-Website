// One-off (July 2026 renovation, round 2): update the production talent
// roster — remove Douglas Abbes, add Milla Muladze and Aiym Kablan.
// Run with: npx tsx --env-file=.env.local scripts/apply-talent-roster-july2026.ts
import { PrismaClient } from '@prisma/client'

const accelerateUrl = process.env.PRISMA_DATABASE_URL
if (!accelerateUrl) {
  console.error('Missing PRISMA_DATABASE_URL')
  process.exit(1)
}

const prisma = new PrismaClient({ accelerateUrl } as any)

const NEW_TALENTS = [
  {
    name: 'Milla Muladze',
    slug: 'milla-muladze',
    imageUrl: '/images/talents/milla-muladze.webp',
    category: 'instagram',
    instagramUrl: 'https://www.instagram.com/mariammuladzee/',
    tiktokUrl: 'https://www.tiktok.com/@mariammuladzee',
  },
  {
    name: 'Aiym Kablan',
    slug: 'aiym-kablan',
    imageUrl: '/images/talents/aiym-kablan.webp',
    category: 'instagram',
    instagramUrl: 'https://www.instagram.com/imkablan/',
    tiktokUrl: 'https://www.tiktok.com/@im.kablan/',
    youtubeUrl: 'https://www.youtube.com/@iimkablan',
  },
]

async function main() {
  const removed = await prisma.talent.deleteMany({ where: { name: 'Douglas Abbes' } })
  console.log(`Removed Douglas Abbes: ${removed.count} row(s)`)

  const maxOrder = await prisma.talent.aggregate({
    where: { category: 'instagram' },
    _max: { order: true },
  })
  let nextOrder = (maxOrder._max.order ?? 0) + 1

  for (const talent of NEW_TALENTS) {
    const row = await prisma.talent.upsert({
      where: { name: talent.name },
      update: { ...talent },
      create: { ...talent, order: nextOrder },
    })
    console.log(`Upserted ${row.name} (slug=${row.slug}, order=${row.order})`)
    nextOrder += 1
  }

  const roster = await prisma.talent.findMany({
    orderBy: [{ category: 'asc' }, { order: 'asc' }],
    select: { name: true, category: true, order: true },
  })
  console.log(`\nRoster now (${roster.length}):`)
  for (const t of roster) console.log(`  [${t.category}] ${t.order} ${t.name}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
