import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { routing } from '@/i18n/routing'

export const dynamic = 'force-dynamic'

const baseUrl = 'https://caagency.com'
const locales = routing.locales
const defaultLocale = routing.defaultLocale

// Helper to generate URL for a specific locale
function getLocalizedUrl(path: string, locale: string): string {
  if (locale === defaultLocale) {
    return path ? `${baseUrl}/${path}` : baseUrl
  }
  return path ? `${baseUrl}/${locale}/${path}` : `${baseUrl}/${locale}`
}

// Helper to generate alternates for all locales
function generateAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = getLocalizedUrl(path, locale)
  }
  return languages
}

// Entries for routes under app/[locale]/ (localized)
function createLocalizedEntries(
  path: string,
  options: {
    lastModified: Date
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    priority: number
  }
): MetadataRoute.Sitemap {
  const alternates = { languages: generateAlternates(path) }
  return locales.map((locale) => ({
    url: getLocalizedUrl(path, locale),
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates,
  }))
}

// Single entry for English-only routes (app/(site)/, excluded from proxy)
function createDefaultOnlyEntry(
  path: string,
  options: {
    lastModified: Date
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    priority: number
  }
): MetadataRoute.Sitemap[0] {
  return {
    url: path ? `${baseUrl}/${path}` : baseUrl,
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  }
}

async function getTalentSlugs() {
  try {
    const talents = await prisma.talent.findMany({
      select: { slug: true, updatedAt: true },
    })
    return talents
  } catch {
    return []
  }
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
      select: { slug: true, updatedAt: true },
    })
    return posts
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [talents, posts] = await Promise.all([getTalentSlugs(), getPublishedPosts()])
  const now = new Date()

  // Localized pages (exist under app/[locale]/)
  const localizedPages = [
    { path: '', changeFrequency: 'monthly' as const, priority: 1 },
    { path: 'about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: 'talents', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: 'work', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: 'services', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: 'contact', changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  // English-only pages (app/(site)/, excluded from i18n proxy)
  const defaultOnlyPages = [
    { path: 'privacy-policy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: 'terms-of-service', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: 'business-license', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: 'blog', changeFrequency: 'weekly' as const, priority: 0.7 },
  ]

  const locationPages = [
    'influencer-marketing-australia',
    'influencer-marketing-canada',
    'influencer-marketing-dubai',
    'influencer-marketing-gcc',
    'influencer-marketing-korea',
    'influencer-marketing-saudi-arabia',
    'influencer-marketing-uae',
    'influencer-marketing-uk',
    'influencer-marketing-usa',
  ]

  const localizedEntries = localizedPages.flatMap((page) =>
    createLocalizedEntries(page.path, {
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  )

  const defaultOnlyEntries = [
    ...defaultOnlyPages.map((page) =>
      createDefaultOnlyEntry(page.path, {
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })
    ),
    ...locationPages.map((path) =>
      createDefaultOnlyEntry(path, {
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    ),
    ...talents.map((talent) =>
      createDefaultOnlyEntry(`talents/${talent.slug}`, {
        lastModified: talent.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    ),
    ...posts.map((post: { slug: string; updatedAt: Date }) =>
      createDefaultOnlyEntry(`blog/${post.slug}`, {
        lastModified: post.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    ),
  ]

  return [...localizedEntries, ...defaultOnlyEntries]
}
