import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'

import { post as agencyVsInHouse } from './blog-seed/influencer-marketing-agency-vs-in-house'
import { post as costGuide } from './blog-seed/influencer-marketing-cost-2026'
import { post as howToRun } from './blog-seed/how-to-run-influencer-marketing-campaign'
import { post as measureRoi } from './blog-seed/how-to-measure-influencer-marketing-roi'
import { post as tiktokGuide } from './blog-seed/tiktok-influencer-marketing-guide'
import { post as chooseAgency } from './blog-seed/how-to-choose-influencer-marketing-agency'
import { post as trends2026 } from './blog-seed/influencer-marketing-trends-2026'
import { post as instagramGuide } from './blog-seed/instagram-influencer-marketing-2026'
import { post as microVsMacro } from './blog-seed/micro-vs-macro-influencers'
import { post as ugcVsInfluencer } from './blog-seed/ugc-vs-influencer-marketing'
import { post as beautyGuide } from './blog-seed/influencer-marketing-for-beauty-brands'
import { post as fashionGuide } from './blog-seed/influencer-marketing-for-fashion-brands'
import { post as wellnessGuide } from './blog-seed/influencer-marketing-for-health-wellness'
import { post as ftcGuide } from './blog-seed/ftc-disclosure-guidelines-influencer-marketing'
import { post as fakeInfluencers } from './blog-seed/how-to-spot-fake-influencers'

// Load env from .env.local first (mirrors prisma/seed.ts)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config()

const accelerateUrl = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL
if (!accelerateUrl) {
  throw new Error('Missing PRISMA_DATABASE_URL or DATABASE_URL for blog seed.')
}

const prisma = new PrismaClient({ accelerateUrl })

// Staggered publish dates give the blog a natural publishing history
// instead of every post sharing one timestamp.
const posts = [
  { ...trends2026, publishedAt: new Date('2026-01-09T10:00:00Z') },
  { ...instagramGuide, publishedAt: new Date('2026-01-22T10:00:00Z') },
  { ...microVsMacro, publishedAt: new Date('2026-02-05T10:00:00Z') },
  { ...ugcVsInfluencer, publishedAt: new Date('2026-02-19T10:00:00Z') },
  { ...beautyGuide, publishedAt: new Date('2026-03-04T10:00:00Z') },
  { ...fashionGuide, publishedAt: new Date('2026-03-12T10:00:00Z') },
  { ...wellnessGuide, publishedAt: new Date('2026-03-19T10:00:00Z') },
  { ...ftcGuide, publishedAt: new Date('2026-03-26T10:00:00Z') },
  { ...fakeInfluencers, publishedAt: new Date('2026-04-02T10:00:00Z') },
  { ...agencyVsInHouse, publishedAt: new Date('2026-04-09T10:00:00Z') },
  { ...costGuide, publishedAt: new Date('2026-04-23T10:00:00Z') },
  { ...howToRun, publishedAt: new Date('2026-05-07T10:00:00Z') },
  { ...measureRoi, publishedAt: new Date('2026-05-21T10:00:00Z') },
  { ...tiktokGuide, publishedAt: new Date('2026-05-29T10:00:00Z') },
  { ...chooseAgency, publishedAt: new Date('2026-06-03T10:00:00Z') },
]

async function main() {
  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        categories: p.categories,
        tags: p.tags,
        status: 'published',
        publishedAt: p.publishedAt,
        author: 'CA Agency',
      },
      create: {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        categories: p.categories,
        tags: p.tags,
        status: 'published',
        publishedAt: p.publishedAt,
        author: 'CA Agency',
      },
    })
    // eslint-disable-next-line no-console
    console.log(`Seeded blog post: ${p.slug}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error('Blog seed failed:', error)
    await prisma.$disconnect()
    process.exit(1)
  })
