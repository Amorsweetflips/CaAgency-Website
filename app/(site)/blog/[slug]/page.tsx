import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    })
    return post
  } catch {
    return null
  }
}

async function getRelatedPosts(currentSlug: string, categories: string[]) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        slug: { not: currentSlug },
        status: 'published',
        publishedAt: { lte: new Date() },
        categories: { hasSome: categories },
      },
      take: 3,
      orderBy: { publishedAt: 'desc' },
    })
    return posts
  } catch {
    return []
  }
}

// Render dynamically - no database needed at build time
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post || post.status !== 'published') {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | CA Agency Blog`,
    description: post.excerpt || post.content.substring(0, 160),
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      images: post.featuredImage
        ? [{ url: post.featuredImage, width: 1200, height: 630 }]
        : [{ url: '/images/site/og-image.webp', width: 1200, height: 630 }],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
    },
    alternates: {
      canonical: `https://caagency.com/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post || post.status !== 'published') {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(slug, post.categories)

  // Article JSON-LD schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    image: post.featuredImage || 'https://caagency.com/images/site/og-image.webp',
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CA Agency',
      url: 'https://caagency.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://caagency.com/images/site/logo-white.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://caagency.com/blog/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="bg-background-dark py-[80px] tablet:py-[60px] mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="max-w-[800px] mx-auto">
            {post.publishedAt && (
              <time
                dateTime={post.publishedAt.toISOString()}
                className="text-white/60 text-sm mb-4 block"
              >
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            <Heading as="h1" color="white" className="mb-6 text-[48px] tablet:text-[40px] mobile:text-[32px]">
              {post.title}
            </Heading>
            {post.excerpt && (
              <Text color="white" size="lg" className="opacity-80 mb-4">
                {post.excerpt}
              </Text>
            )}
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span>By {post.author}</span>
              {post.categories.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex gap-2">
                    {post.categories.map((cat: string) => (
                      <span key={cat} className="px-2 py-1 bg-white/10 rounded">
                        {cat}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="bg-background-dark px-section-x pb-[40px]">
          <div className="max-w-container mx-auto">
            <div className="max-w-[1000px] mx-auto">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1000px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="bg-background-dark py-[60px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="max-w-[800px] mx-auto">
            <div
              className="prose prose-invert prose-lg max-w-none text-white/90"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
          <div className="max-w-container mx-auto">
            <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
              Related Posts
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: { id: string; slug: string; title: string; excerpt?: string | null; featuredImage?: string | null }) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
                >
                  {relatedPost.featuredImage && (
                    <div className="relative aspect-video w-full">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <Heading
                      as="h3"
                      color="white"
                      className="text-[20px] mb-2 hover:text-accent-red transition-colors"
                    >
                      {relatedPost.title}
                    </Heading>
                    {relatedPost.excerpt && (
                      <Text color="white" size="sm" className="opacity-70 line-clamp-2">
                        {relatedPost.excerpt}
                      </Text>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            Ready to Work With Us?
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-80">
            Let's create an influencer campaign that drives real results for your brand.
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">Get Started</Button>
            <Button href="/blog" variant="dark">View All Posts</Button>
          </div>
        </div>
      </section>
    </>
  )
}
