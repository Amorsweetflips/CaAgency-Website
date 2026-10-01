import { prisma } from '@/lib/prisma'
import { livePostsWhere, newestFirst } from '@/lib/blog-posts'
import { plainTextExcerpt } from '@/lib/blog-html'
import { buildRssFeed } from '@/lib/seo/rss'

// Rendered per request and cached at the CDN instead of prerendered, so the
// build never needs the database. DB errors propagate as an uncached 500
// rather than publishing an empty feed.
export const dynamic = 'force-dynamic'

const FEED_SIZE = 50
const CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=86400'

export async function GET() {
  const posts = await prisma.post.findMany({
    where: livePostsWhere(),
    select: {
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      publishedAt: true,
      createdAt: true,
      author: true,
      categories: true,
    },
  })

  const xml = buildRssFeed(
    newestFirst(posts).slice(0, FEED_SIZE).map((post) => ({
      ...post,
      description: post.excerpt || plainTextExcerpt(post.content),
    }))
  )

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': CACHE_CONTROL,
    },
  })
}
