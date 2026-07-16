import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import Stagger from '@/components/ui/motion/Stagger'
import StaggerItem from '@/components/ui/motion/StaggerItem'
import Image from 'next/image'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600


export const metadata: Metadata = buildPageMetadata({
  title: 'Blog | Influencer Marketing Insights & Tips',
  description:
    'Expert insights on influencer marketing, content creation, and social media strategy. Learn from CA Agency\'s experience with 3000+ campaigns.',
  path: '/blog',
  localized: false,
  keywords: [
    'influencer marketing blog',
    'social media marketing tips',
    'content creator insights',
    'influencer marketing strategy',
    'brand partnerships guide',
  ],
})

async function getPublishedPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: 'published',
        publishedAt: {
          lte: new Date(),
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true,
        author: true,
        categories: true,
        tags: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 20,
    })
    return posts
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <>
      {/* Hero */}
      <section className="bg-background-base py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="dark" className="mb-6 text-[56px] tablet:text-[44px] mobile:text-[32px]">
            Influencer Marketing Blog
          </Heading>
          <Text color="dark" size="lg" className="max-w-[700px] mx-auto opacity-80">
            Expert insights, strategies, and tips from CA Agency's experience with 3000+ influencer campaigns.
          </Text>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-background-base py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <Text color="dark" size="lg" className="opacity-60">
                No blog posts yet. Check back soon!
              </Text>
            </div>
          ) : (
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.08}>
              {posts.map((post: { id: string; title: string; slug: string; excerpt?: string | null; featuredImage?: string | null; publishedAt?: Date | null }) => (
                <StaggerItem key={post.id} className="h-full">
                <article
                  className="hover-lift group h-full bg-background-soft rounded-card overflow-hidden ring-1 ring-black/10 hover:bg-white hover:ring-black/15 hover:shadow-e3"
                >
                  {post.featuredImage && (
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt.toISOString()}
                        className="text-black/60 text-sm"
                      >
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    )}
                    <Link href={`/blog/${post.slug}`}>
                      <Heading
                        as="h2"
                        color="dark"
                        className="mt-2 mb-3 text-[24px] hover:text-accent-red transition-colors"
                      >
                        {post.title}
                      </Heading>
                    </Link>
                    {post.excerpt && (
                      <Text color="dark" size="sm" className="opacity-70 mb-4 line-clamp-3">
                        {post.excerpt}
                      </Text>
                    )}
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="dark" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </article>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>
    </>
  )
}
