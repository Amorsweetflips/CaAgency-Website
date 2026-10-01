import { describe, expect, it } from 'vitest'
import { ORGANIZATION_ID, blogPostingJsonLd, organizationRef } from '@/lib/seo/schema'
import { buildRssFeed } from '@/lib/seo/rss'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/root-metadata'
import { livePostsWhere, newestFirst } from '@/lib/blog-posts'

const post = {
  slug: 'find-skincare-influencers-usa',
  title: 'How to Find Skincare Influencers in the USA',
  description: 'A practical guide.',
  image: '/images/blog/cover.webp',
  publishedAt: new Date('2026-08-01T00:00:00Z'),
  createdAt: new Date('2026-07-20T00:00:00Z'),
  updatedAt: new Date('2026-09-01T00:00:00Z'),
  author: 'CA Agency',
  tags: ['skincare', 'USA'],
  categories: ['Guides'],
}

describe('organization identity', () => {
  it('gives the root Organization and WebSite stable @ids that refs point at', () => {
    expect(organizationJsonLd['@id']).toBe(ORGANIZATION_ID)
    expect(organizationRef['@id']).toBe(ORGANIZATION_ID)
    expect(websiteJsonLd.publisher).toEqual(organizationRef)
  })

  it('uses a raster logo, since Google does not accept SVG publisher logos', () => {
    expect(organizationJsonLd.logo.url).toMatch(/\.png$/)
  })
})

describe('blogPostingJsonLd', () => {
  it('emits BlogPosting with absolute URLs, dates and the organization as publisher', () => {
    const schema = blogPostingJsonLd(post)
    expect(schema['@type']).toBe('BlogPosting')
    expect(schema.url).toBe('https://caagency.com/blog/find-skincare-influencers-usa')
    expect(schema.image).toBe('https://caagency.com/images/blog/cover.webp')
    expect(schema.datePublished).toBe('2026-08-01T00:00:00.000Z')
    expect(schema.dateModified).toBe('2026-09-01T00:00:00.000Z')
    expect(schema.publisher).toEqual(organizationRef)
    expect(schema.author).toEqual(organizationRef)
    expect(schema.keywords).toBe('skincare, USA')
  })

  it('falls back to createdAt when a live post has no publishedAt', () => {
    expect(blogPostingJsonLd({ ...post, publishedAt: null }).datePublished).toBe(
      '2026-07-20T00:00:00.000Z'
    )
  })

  it('types a named non-brand author as a Person', () => {
    expect(blogPostingJsonLd({ ...post, author: 'Jane Doe' }).author).toEqual({
      '@type': 'Person',
      name: 'Jane Doe',
    })
  })
})

describe('buildRssFeed', () => {
  it('produces a valid RSS 2.0 channel with escaped item content', () => {
    const xml = buildRssFeed([{ ...post, title: 'Tips & <Tricks>' }])
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
    expect(xml).toContain('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">')
    expect(xml).toContain('<atom:link href="https://caagency.com/blog/feed.xml" rel="self" type="application/rss+xml"/>')
    expect(xml).toContain('<title>Tips &amp; &lt;Tricks&gt;</title>')
    expect(xml).toContain('<link>https://caagency.com/blog/find-skincare-influencers-usa</link>')
    expect(xml).toContain('<guid isPermaLink="true">https://caagency.com/blog/find-skincare-influencers-usa</guid>')
    expect(xml).toContain('<pubDate>Sat, 01 Aug 2026 00:00:00 GMT</pubDate>')
    expect(xml).toContain('<category>Guides</category>')
  })

  it('renders an empty channel when there are no posts', () => {
    const xml = buildRssFeed([])
    expect(xml).toContain('<channel>')
    expect(xml).not.toContain('<item>')
  })
})

describe('livePostsWhere', () => {
  it('treats published posts without a publish date as live, matching the post page', () => {
    const now = new Date('2026-10-01T00:00:00Z')
    expect(livePostsWhere(now)).toEqual({
      status: 'published',
      OR: [{ publishedAt: null }, { publishedAt: { lte: now } }],
    })
  })
})

describe('feed robustness', () => {
  it('strips XML-illegal control characters and omits lastBuildDate when empty', () => {
    expect(buildRssFeed([{ ...post, title: 'Bad\u0008Title' }])).toContain('<title>BadTitle</title>')
    expect(buildRssFeed([])).not.toContain('lastBuildDate')
  })

  it('orders posts by publish date, falling back to creation date', () => {
    const older = { ...post, slug: 'older', publishedAt: new Date('2026-01-01') }
    const undated = { ...post, slug: 'undated', publishedAt: null, createdAt: new Date('2026-05-01') }
    const newer = { ...post, slug: 'newer', publishedAt: new Date('2026-09-01') }
    expect(newestFirst([older, undated, newer]).map((p) => p.slug)).toEqual(['newer', 'undated', 'older'])
  })
})
