import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export const revalidate = 3600
export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Blog | Influencer Marketing Insights & Tips | CA Agency',
  description:
    'Expert insights on influencer marketing, content creation, and social media strategy. Learn from CA Agency\'s experience with 3000+ campaigns.',
  keywords: [
    'influencer marketing blog',
    'social media marketing tips',
    'content creator insights',
    'influencer marketing strategy',
    'brand partnerships guide',
  ],
  openGraph: {
    title: 'Blog | Influencer Marketing Insights | CA Agency',
    description: 'Expert insights on influencer marketing, content creation, and social media strategy.',
    images: [{ url: '/images/site/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Influencer Marketing Insights | CA Agency',
    description: 'Expert insights on influencer marketing and social media strategy.',
  },
  alternates: {
    canonical: 'https://caagency.com/blog',
  },
}

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
      <section className="bg-background-dark py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="mb-6 text-[56px] tablet:text-[44px] mobile:text-[32px]">
            Influencer Marketing Blog
          </Heading>
          <Text color="white" size="lg" className="max-w-[700px] mx-auto opacity-80">
            Expert insights, strategies, and tips from CA Agency's experience with 3000+ influencer campaigns.
          </Text>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-background-dark py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <Text color="white" size="lg" className="opacity-60">
                No blog posts yet. Check back soon!
              </Text>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: { id: string; title: string; slug: string; excerpt?: string | null; featuredImage?: string | null; publishedAt?: Date | null }) => (
                <article
                  key={post.id}
                  className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
                >
                  {post.featuredImage && (
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative aspect-video w-full">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt.toISOString()}
                        className="text-white/60 text-sm"
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
                        color="white"
                        className="mt-2 mb-3 text-[24px] hover:text-accent-red transition-colors"
                      >
                        {post.title}
                      </Heading>
                    </Link>
                    {post.excerpt && (
                      <Text color="white" size="sm" className="opacity-70 mb-4 line-clamp-3">
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
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
