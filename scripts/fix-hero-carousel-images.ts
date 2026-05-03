import { PrismaClient } from '@prisma/client'
import { siteContentDefinitionsByKey } from '../lib/site-content/definitions'

const accelerateUrl = process.env.PRISMA_DATABASE_URL
if (!accelerateUrl) {
  console.error('Missing PRISMA_DATABASE_URL')
  process.exit(1)
}

const prisma = new PrismaClient({ accelerateUrl } as any)

const NEW_CAROUSEL = [
  { src: '/images/work/work-content-01.webp', alt: 'CA Agency talent campaign — Dubai editorial' },
  { src: '/images/work/work-content-15.webp', alt: 'CA Agency talent campaign — beauty portrait' },
  { src: '/images/work/work-content-08.webp', alt: 'CA Agency talent campaign — resort lifestyle' },
  { src: '/images/work/work-content-21.webp', alt: 'CA Agency talent campaign — fashion editorial' },
  { src: '/images/work/work-content-05.webp', alt: 'CA Agency talent campaign — beauty close-up' },
]

async function main() {
  const definition = siteContentDefinitionsByKey['home']
  if (!definition) throw new Error('home_page definition not found')

  const existing = await prisma.siteContent.findUnique({ where: { key: 'home' } })

  const baseData =
    existing?.data && typeof existing.data === 'object'
      ? (existing.data as Record<string, unknown>)
      : (definition.defaultData as Record<string, unknown>)

  const heroRaw = baseData.hero
  const hero =
    heroRaw && typeof heroRaw === 'object' && !Array.isArray(heroRaw)
      ? (heroRaw as Record<string, unknown>)
      : {}

  const nextData = {
    ...baseData,
    hero: {
      ...hero,
      carouselImages: NEW_CAROUSEL,
    },
  }

  await prisma.siteContent.upsert({
    where: { key: 'home' },
    create: { key: 'home', data: nextData },
    update: { data: nextData },
  })

  console.log('home_page hero.carouselImages updated')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
