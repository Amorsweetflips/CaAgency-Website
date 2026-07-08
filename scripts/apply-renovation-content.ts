// One-off (July 2026 renovation): apply the CMS-side changes to production.
// - delete Marzi Turganalieva + Kablan Aiym (rows printed first for recovery)
// - promote Melani Seiffert + Melly Sanchez into the vacated featured slots
// - home override: new hero subtitle, 5-card services overview, em-dash sweep
// - blog: remove the dead /case-studies/medicube-skincare link
import { PrismaClient } from '@prisma/client'

const accelerateUrl = process.env.PRISMA_DATABASE_URL
if (!accelerateUrl) {
  console.error('Missing PRISMA_DATABASE_URL')
  process.exit(1)
}

const prisma = new PrismaClient({ accelerateUrl } as any)

const NEW_HERO_SUBTITLE =
  "We connect brands with their target audience through engaging content, strategic partnerships, and high-impact campaigns across Instagram, TikTok, and YouTube, as one of the world's leading agencies in beauty, skincare, and lifestyle."

const NEW_HERO_CAROUSEL = [
  { src: '/images/hero/albina-medicube.webp', alt: 'Albina for Medicube, CA Agency campaign' },
  { src: '/images/hero/rebecca-rhode.webp', alt: 'Rebecca for Rhode, CA Agency campaign' },
  { src: '/images/hero/dariia-ysl.webp', alt: 'Dariia for YSL Beauty, CA Agency campaign' },
  { src: '/images/hero/aysa-beauty-of-joseon.webp', alt: 'Aysa for Beauty of Joseon, CA Agency campaign' },
  { src: '/images/hero/melani-skin1004.webp', alt: 'Melani for SKIN1004, CA Agency campaign' },
  { src: '/images/hero/lidia-morphe.webp', alt: 'Lidia for Morphe, CA Agency campaign' },
]

const NEW_STATS_TAGLINE =
  'Trusted by brands across beauty, skincare, and lifestyle, from emerging labels to global leaders. We turn creator partnerships into campaigns that stop the scroll and move the needle.'

const NEW_INTRO_PARAGRAPHS = [
  {
    text: 'Our influencer marketing agency connects leading global brands with the creators who shape culture, crafting data-driven campaigns that grow sales and brand awareness.',
  },
  {
    text: 'From first strategy to final report, we handle every part of a campaign in-house, giving brands one partner for creator matching, content, and performance across beauty, skincare, and lifestyle.',
  },
]

const NEW_TALENTS_DESCRIPTION =
  "From the way they create to the communities they've built, our talents bring something real to everything they do, turning everyday moments into stories that connect and content that lasts."

const NEW_FEATURED_WORK_DESCRIPTION =
  'From concept to final cut, this is the work we love making. Scroll through some of our favorite campaigns and see the ideas that made people stop, watch, and remember.'

const NEW_FOOTER_DESCRIPTION =
  'CA Agency is a leading, full-service talent management & marketing agency, connecting brands with creators through strategy, production and performance-led campaigns.'

const NEW_SERVICES_OVERVIEW = {
  title: 'What We Do',
  subtitle:
    "A full-service influencer and brand marketing agency, one of the world's leading agencies in beauty, skincare, and lifestyle, taking brands from strategy through execution.",
  items: [
    {
      title: 'Influencer Campaigns',
      description:
        'Strategic brand-creator partnerships across Instagram, TikTok & YouTube that drive real results.',
      icon: 'spark',
    },
    {
      title: 'Full-Service Talent Management',
      description:
        'End-to-end representation for creators, from paid collaborations and exclusive partnerships to long-term career growth.',
      icon: 'person',
    },
    {
      title: 'Content Creation & Production',
      description:
        'Scroll-stopping branded content, concepted, shot, and edited to engage audiences and elevate brand visibility.',
      icon: 'video',
    },
    {
      title: 'Performance Marketing',
      description:
        'Data-driven campaigns with measurable ROI from brand awareness to qualified traffic and conversions.',
      icon: 'chart',
    },
    {
      title: 'Brand Marketing Management & Consultancy',
      description:
        'Strategic guidance for beauty, skincare, and lifestyle brands, from positioning and launch planning to always-on brand management.',
      icon: 'compass',
    },
  ],
  buttonLabel: 'View all services',
  buttonHref: '/services',
}

// Replace em-dashes with commas in every string of a JSON tree.
function sweepEmDashes(value: unknown): unknown {
  if (typeof value === 'string') return value.replace(/\s+—\s+/g, ', ').replace(/—/g, ',')
  if (Array.isArray(value)) return value.map(sweepEmDashes)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, sweepEmDashes(v)]))
  }
  return value
}

async function main() {
  // 1. Talent swap
  const toDelete = await prisma.talent.findMany({
    where: { slug: { in: ['marzi-turganalieva', 'kablan-aiym'] } },
  })
  console.log('--- deleting talents (full rows for recovery) ---')
  console.log(JSON.stringify(toDelete, null, 2))
  const deleted = await prisma.talent.deleteMany({
    where: { slug: { in: ['marzi-turganalieva', 'kablan-aiym'] } },
  })
  console.log(`deleted ${deleted.count} talent rows`)

  const promoted = await prisma.talent.updateMany({
    where: { slug: { in: ['melani-seiffert', 'melly-sanchez'] } },
    data: { order: 0 },
  })
  console.log(`promoted ${promoted.count} talents to order 0`)

  const featured = await prisma.talent.findMany({
    where: { category: 'instagram' },
    take: 6,
    orderBy: { order: 'asc' },
    select: { name: true, order: true },
  })
  console.log('new featured six:', featured.map((t) => t.name).join(', '))

  // 2. Home SiteContent override
  const home = await prisma.siteContent.findUnique({ where: { key: 'home' } })
  if (home?.data && typeof home.data === 'object') {
    const data = home.data as Record<string, any>
    data.hero = { ...data.hero, subtitle: NEW_HERO_SUBTITLE, carouselImages: NEW_HERO_CAROUSEL }
    data.servicesOverview = NEW_SERVICES_OVERVIEW
    data.stats = { ...data.stats, tagline: NEW_STATS_TAGLINE }
    data.intro = { ...data.intro, paragraphs: NEW_INTRO_PARAGRAPHS }
    data.talents = { ...data.talents, description: NEW_TALENTS_DESCRIPTION }
    data.featuredWork = { ...data.featuredWork, description: NEW_FEATURED_WORK_DESCRIPTION }
    const swept = sweepEmDashes(data) as Record<string, any>
    await prisma.siteContent.update({ where: { key: 'home' }, data: { data: swept } })
    console.log('\nhome override updated:')
    console.log('  hero.subtitle:', JSON.stringify(swept.hero.subtitle))
    console.log('  stats.tagline:', JSON.stringify(swept.stats?.tagline))
    console.log('  intro paragraphs:', JSON.stringify(swept.intro?.paragraphs))
    console.log('  talents.description:', JSON.stringify(swept.talents?.description))
    console.log('  featuredWork.description:', JSON.stringify(swept.featuredWork?.description))
    console.log('  services items:', JSON.stringify(swept.servicesOverview.items.map((i: any) => i.title)))
    console.log('  remaining em-dashes:', JSON.stringify(swept).includes('—'))
  } else {
    console.log('\nno home override found — code defaults apply, nothing to do')
  }

  const footer = await prisma.siteContent.findUnique({ where: { key: 'footer' } })
  if (footer?.data && typeof footer.data === 'object') {
    const data = footer.data as Record<string, any>
    data.description = NEW_FOOTER_DESCRIPTION
    const swept = sweepEmDashes(data) as Record<string, any>
    await prisma.siteContent.update({ where: { key: 'footer' }, data: { data: swept } })
    console.log('\nfooter override updated:')
    console.log('  description:', JSON.stringify(swept.description))
  } else {
    console.log('\nno footer override found — code defaults apply, nothing to do')
  }

  // 3. Blog post: drop the dead Medicube case-study link
  const post = await prisma.post.findUnique({
    where: { slug: 'k-beauty-influencer-marketing-guide' },
    select: { id: true, content: true },
  })
  if (post) {
    const exact =
      'Our <a href="/case-studies/medicube-skincare">Medicube</a> and <a href="/case-studies/mixsoon-skincare">Mixsoon</a> case studies show'
    let content = post.content
    if (content.includes(exact)) {
      content = content.replace(
        exact,
        'Our <a href="/case-studies/mixsoon-skincare">Mixsoon</a> case study shows'
      )
      console.log('\nblog: exact sentence rewritten to Mixsoon-only')
    } else if (content.includes('/case-studies/medicube-skincare')) {
      content = content.replace(
        /<a href="\/case-studies\/medicube-skincare">([^<]*)<\/a>/g,
        '$1'
      )
      console.log('\nblog: fallback — medicube link unwrapped to plain text')
    } else {
      console.log('\nblog: no medicube link found, nothing to do')
    }
    if (content !== post.content) {
      await prisma.post.update({ where: { id: post.id }, data: { content } })
      console.log('blog post updated')
    }
  } else {
    console.log('\nblog post k-beauty-influencer-marketing-guide not found')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
