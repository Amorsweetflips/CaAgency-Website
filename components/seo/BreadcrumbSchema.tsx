'use client'

import { usePathname } from 'next/navigation'
import { routing } from '@/i18n/routing'

const siteUrl = 'https://caagency.com'
// Locales that appear as a URL prefix (the default locale has none).
const prefixedLocales = routing.locales.filter((l) => l !== routing.defaultLocale)

export default function BreadcrumbSchema() {
  const pathname = usePathname()

  // No breadcrumb needed on the homepage
  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)

  // A leading locale segment (e.g. /ar, /ko) is not a real breadcrumb step:
  // strip it so it isn't rendered as an "Ar"/"Ko" crumb, and point Home at the
  // localized homepage instead.
  const hasLocalePrefix = prefixedLocales.includes(
    segments[0] as (typeof routing.locales)[number],
  )
  const localePath = hasLocalePrefix ? `/${segments[0]}` : ''
  const displaySegments = hasLocalePrefix ? segments.slice(1) : segments

  // Localized homepage (e.g. /ar) has no further trail.
  if (displaySegments.length === 0) return null

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}${localePath}`,
    },
    ...displaySegments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      item: `${siteUrl}${localePath}/${displaySegments.slice(0, index + 1).join('/')}`,
    })),
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
