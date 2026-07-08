// Read-only: dump the DB state relevant to the July 2026 renovation
// (talents to swap, home/work SiteContent overrides, medicube blog link).
import { PrismaClient } from '@prisma/client'

const accelerateUrl = process.env.PRISMA_DATABASE_URL
if (!accelerateUrl) {
  console.error('Missing PRISMA_DATABASE_URL')
  process.exit(1)
}

const prisma = new PrismaClient({ accelerateUrl } as any)

async function main() {
  const talents = await prisma.talent.findMany({
    where: { category: 'instagram' },
    orderBy: { order: 'asc' },
    select: { id: true, name: true, slug: true, order: true },
  })
  console.log('--- instagram talents (order asc) ---')
  for (const t of talents) console.log(`${String(t.order).padStart(3)}  ${t.name}  (${t.slug})  ${t.id}`)

  const home = await prisma.siteContent.findUnique({ where: { key: 'home' } })
  const homeData = (home?.data ?? {}) as Record<string, any>
  console.log('\n--- home override ---')
  console.log('hero.subtitle:', JSON.stringify(homeData.hero?.subtitle))
  console.log('stats.tagline:', JSON.stringify(homeData.stats?.tagline))
  console.log('servicesOverview.subtitle:', JSON.stringify(homeData.servicesOverview?.subtitle))
  console.log('servicesOverview.items:', JSON.stringify(homeData.servicesOverview?.items?.map((i: any) => i.title)))
  console.log('intro.paragraph count:', homeData.intro?.paragraphs?.length)
  console.log('hero.carouselImages:', JSON.stringify(homeData.hero?.carouselImages?.map((i: any) => i.src)))

  const work = await prisma.siteContent.findUnique({ where: { key: 'work' } })
  const workData = (work?.data ?? {}) as Record<string, any>
  console.log('\n--- work override ---')
  console.log('videos:', JSON.stringify(workData.videos?.map((v: any) => v.src)))

  const posts = await prisma.post.findMany({
    where: { content: { contains: 'medicube-skincare' } },
    select: { id: true, slug: true, status: true },
  })
  console.log('\n--- posts containing medicube-skincare link ---')
  console.log(JSON.stringify(posts, null, 2))

  const emDashKeys = await prisma.siteContent.findMany({ select: { key: true, data: true } })
  console.log('\n--- SiteContent keys with em-dashes in data ---')
  for (const row of emDashKeys) {
    if (JSON.stringify(row.data).includes('—')) console.log(row.key)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
