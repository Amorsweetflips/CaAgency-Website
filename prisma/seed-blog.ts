import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'

import { seedPosts, selectPostsToSeed } from './blog-seed'

// Load env from .env.local first (mirrors prisma/seed.ts)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config()

const accelerateUrl = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL
if (!accelerateUrl) {
  throw new Error('Missing PRISMA_DATABASE_URL or DATABASE_URL for blog seed.')
}

const prisma = new PrismaClient({ accelerateUrl })

// Pass slugs to seed only those posts, e.g. `npm run db:seed-blog -- tiktok-shop-beauty-brands`,
// so re-running the seed does not overwrite posts edited in the admin.
const postsToSeed = selectPostsToSeed(seedPosts, process.argv.slice(2))

async function main() {
  for (const p of postsToSeed) {
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
        featuredImage: (p as { featuredImage?: string | null }).featuredImage ?? null,
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
        featuredImage: (p as { featuredImage?: string | null }).featuredImage ?? null,
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
