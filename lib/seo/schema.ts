export const SITE_URL = 'https://caagency.com'
export const BRAND = 'CA Agency'
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const BLOG_ID = `${SITE_URL}/blog#blog`
export const ORGANIZATION_LOGO_URL = `${SITE_URL}/icon-512.png`

// The full Organization node is emitted on every page by RootDocument; other
// schemas link to it by @id so search engines merge them into one entity
// instead of seeing dozens of anonymous "CA Agency" organizations.
export const organizationRef = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: BRAND,
  url: SITE_URL,
} as const

export function absoluteUrl(src: string): string {
  return src.startsWith('http') ? src : `${SITE_URL}${src}`
}

export type BlogPostSchemaInput = {
  slug: string
  title: string
  description: string
  image: string
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  author: string
  tags: string[]
  categories: string[]
}

export function blogPostUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`
}

export function blogPostingJsonLd(post: BlogPostSchemaInput) {
  const url = blogPostUrl(post.slug)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image),
    url,
    datePublished: (post.publishedAt ?? post.createdAt).toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: post.author === BRAND ? organizationRef : { '@type': 'Person', name: post.author },
    publisher: organizationRef,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@type': 'Blog', '@id': BLOG_ID },
    inLanguage: 'en',
    ...(post.tags.length > 0 ? { keywords: post.tags.join(', ') } : {}),
    ...(post.categories.length > 0 ? { articleSection: post.categories[0] } : {}),
  }
}
