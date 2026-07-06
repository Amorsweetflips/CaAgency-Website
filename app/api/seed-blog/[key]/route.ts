import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidateBlogPages } from '@/lib/revalidate'
import { pingIndexNow } from '@/lib/seo/indexnow'
import { post as dubaiUaeCost } from '@/prisma/blog-seed/influencer-marketing-dubai-uae-cost-guide'
import { post as kBeautyGuide } from '@/prisma/blog-seed/k-beauty-influencer-marketing-guide'

export const dynamic = 'force-dynamic'

// TEMPORARY one-shot publisher for the two July 2026 blog drafts — the seed
// script (npm run db:seed-blog) needs PRISMA_DATABASE_URL, which only exists
// on Vercel. Gated by a repo-only random key (not the public IndexNow key).
// DELETE THIS ROUTE after it has been triggered once; upserts are idempotent
// so an accidental re-run is a no-op.
const SEED_KEY = 'ae03c7041e3f15a70a56117579cd0d62e01948c7'

// Same publishedAt dates as the prisma/seed-blog.ts registry.
const postsToSeed = [
  { ...kBeautyGuide, publishedAt: new Date('2026-06-18T10:00:00Z') },
  { ...dubaiUaeCost, publishedAt: new Date('2026-07-02T10:00:00Z') },
]

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params
  if (key !== SEED_KEY) {
    return new NextResponse(
      '<html><head><title>Unauthorized</title></head><body><p>Invalid key</p></body></html>',
      { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    )
  }

  const seeded: string[] = []
  for (const p of postsToSeed) {
    // Field mapping mirrors prisma/seed-blog.ts exactly.
    const data = {
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      categories: p.categories,
      tags: p.tags,
      status: 'published',
      publishedAt: p.publishedAt,
      author: 'CA Agency',
      featuredImage: p.featuredImage ?? null,
    }
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: data,
      create: { slug: p.slug, ...data },
    })
    seeded.push(p.slug)
  }

  revalidateBlogPages()
  await pingIndexNow(['/blog', ...seeded.map((slug) => `/blog/${slug}`)])

  return new NextResponse(
    `<html><head><title>Seed Blog</title></head><body><p>Published ${seeded.length} posts: ${seeded.join(', ')}</p></body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}
