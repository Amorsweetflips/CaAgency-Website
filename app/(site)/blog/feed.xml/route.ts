import { prisma } from '@/lib/prisma'
import { livePostsWhere, newestFirst } from '@/lib/blog-posts'
import { plainTextExcerpt } from '@/lib/blog-html'
import { buildRssFeed } from '@/lib/seo/rss'

export const revalidate = 3600

const FEED_SIZE = 50

// DB errors propagate on purpose: under ISR a failed regeneration keeps the
// previous feed instead of publishing an empty one.
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
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
