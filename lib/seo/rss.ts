import { SITE_URL, blogPostUrl } from '@/lib/seo/schema'
import { effectivePostDate } from '@/lib/blog-posts'

export const BLOG_FEED_PATH = '/blog/feed.xml'
const FEED_TITLE = 'CA Agency Influencer Marketing Blog'
const FEED_DESCRIPTION =
  'Influencer marketing insights, guides and strategy from CA Agency, a global beauty and skincare influencer marketing agency.'

// Spread into a page's `alternates` so feed readers can autodiscover the feed.
export const blogFeedAlternate = {
  'application/rss+xml': [{ url: BLOG_FEED_PATH, title: FEED_TITLE }],
}

export type RssPost = {
  slug: string
  title: string
  description: string
  publishedAt: Date | null
  createdAt: Date
  author: string
  categories: string[]
}

// Control characters are illegal in XML 1.0; one pasted into a CMS title
// would make the whole feed unparseable.
const XML_ILLEGAL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g

function escapeXml(value: string): string {
  return value
    .replace(XML_ILLEGAL_CHARS, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function renderItem(post: RssPost): string {
  const url = blogPostUrl(post.slug)
  const categories = post.categories
    .map((category) => `      <category>${escapeXml(category)}</category>`)
    .join('\n')
  return [
    '    <item>',
    `      <title>${escapeXml(post.title)}</title>`,
    `      <link>${url}</link>`,
    `      <guid isPermaLink="true">${url}</guid>`,
    `      <description>${escapeXml(post.description)}</description>`,
    `      <pubDate>${effectivePostDate(post).toUTCString()}</pubDate>`,
    `      <dc:creator>${escapeXml(post.author)}</dc:creator>`,
    ...(categories ? [categories] : []),
    '    </item>',
  ].join('\n')
}

// Expects posts newest first (see newestFirst).
export function buildRssFeed(posts: RssPost[]): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${FEED_TITLE}</title>`,
    `    <link>${SITE_URL}/blog</link>`,
    `    <description>${escapeXml(FEED_DESCRIPTION)}</description>`,
    '    <language>en-us</language>',
    ...(posts[0] ? [`    <lastBuildDate>${effectivePostDate(posts[0]).toUTCString()}</lastBuildDate>`] : []),
    `    <atom:link href="${SITE_URL}${BLOG_FEED_PATH}" rel="self" type="application/rss+xml"/>`,
    ...posts.map(renderItem),
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}
