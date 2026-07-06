import { cache } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import RelatedPosts from '@/components/blocks/RelatedPosts'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

const getPost = cache(async (slug: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    })
    return post
  } catch {
    return null
  }
})

export const revalidate = 3600


// Meta descriptions must be plain text — post.content is stored as HTML.
function plainTextExcerpt(html: string, length = 160) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, length)
}

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
    description: post.excerpt || plainTextExcerpt(post.content),
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt || plainTextExcerpt(post.content),
      images: post.featuredImage
        ? [{ url: post.featuredImage, width: 1200, height: 630 }]
        : [{ url: '/images/site/og-cover.webp', width: 1200, height: 630 }],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || plainTextExcerpt(post.content),
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

  // Article JSON-LD schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || plainTextExcerpt(post.content),
    image: post.featuredImage || 'https://caagency.com/images/site/og-cover.webp',
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
        url: 'https://caagency.com/images/site/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://caagency.com/blog/${slug}`,
    },
  }

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>

      {/* Hero — CSS load-in (LCP-safe) */}
      <section className="relative overflow-hidden bg-background-base py-[80px] tablet:py-[60px] mobile:py-[50px] px-section-x">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative z-[1] max-w-container mx-auto">
          <div className="hero-rise hero-rise-1 max-w-[800px] mx-auto">
            {post.publishedAt && (
              <time
                dateTime={post.publishedAt.toISOString()}
                className="text-black/60 text-sm mb-4 block"
              >
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            <Heading as="h1" color="dark" className="mb-6 text-[48px] tablet:text-[40px] mobile:text-[32px]">
              {post.title}
            </Heading>
            {post.excerpt && (
              <Text color="dark" size="lg" className="opacity-80 mb-4">
                {post.excerpt}
              </Text>
            )}
            <div className="flex items-center gap-4 text-black/60 text-sm">
              <span>By {post.author}</span>
              {post.categories.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex gap-2">
                    {post.categories.map((cat: string) => (
                      <span key={cat} className="px-2 py-1 bg-black/10 rounded-sm">
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
        <section className="bg-background-base px-section-x pb-[40px]">
          <div className="max-w-container mx-auto">
            <ScrollReveal yOffset={24} className="max-w-[1000px] mx-auto">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden ring-1 ring-black/5 shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1000px"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="bg-background-base py-[60px] px-section-x">
        <div className="max-w-container mx-auto">
          <ScrollReveal yOffset={24} className="max-w-[800px] mx-auto">
            <div
              className="article-body max-w-none text-[16px] leading-[1.8] text-black/85 [text-wrap:pretty] [&_h2]:font-anegra [&_h2]:text-[28px] [&_h2]:mobile:text-[24px] [&_h2]:font-semibold [&_h2]:text-foreground-primary [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-anegra [&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:text-foreground-primary [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:ms-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:ms-6 [&_ol]:mb-5 [&_li]:mb-2 [&_a]:font-medium [&_a]:text-accent-red [&_a:hover]:underline [&_blockquote]:border-s-2 [&_blockquote]:border-accent-red [&_blockquote]:ps-4 [&_blockquote]:italic [&_blockquote]:text-foreground-subtle [&_blockquote]:my-6 [&_img]:rounded-card [&_img]:my-8 [&_strong]:text-foreground-primary [&_strong]:font-semibold [&_table]:w-full [&_table]:my-6 [&_th]:text-start [&_th]:border-b [&_th]:border-black/15 [&_th]:py-2 [&_td]:border-b [&_td]:border-black/5 [&_td]:py-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Related Posts */}
      <RelatedPosts currentSlug={slug} categories={post.categories} tags={post.tags} />

      {/* CTA */}
      <section className="bg-background-base py-[80px] px-section-x border-t border-black/5">
        <ScrollReveal yOffset={24} className="max-w-container mx-auto text-center">
          <Heading as="h2" color="dark" className="mb-6 text-[40px] mobile:text-[28px]">
            Ready to Work With Us?
          </Heading>
          <Text color="dark" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-80">
            Let's create an influencer campaign that drives real results for your brand.
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">Get Started</Button>
            <Button href="/blog" variant="dark">View All Posts</Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
