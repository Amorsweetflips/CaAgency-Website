import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationLandingPage from '@/components/site/LocationLandingPage'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { arabicLocationLabels, arabicLocationPages } from '@/lib/site-content/location-pages-ar'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { jsonLdSafe } from '@/lib/sanitize'

const baseUrl = 'https://caagency.com'

type Market = keyof typeof arabicLocationPages

export function arabicLocationMetadata(market: Market): Metadata {
  const page = arabicLocationPages[market]
  const metadata = buildPageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    locale: 'ar',
    localized: false,
    image: page.ogImage,
    imageAlt: page.title,
  })
  return {
    ...metadata,
    alternates: {
      canonical: `${baseUrl}/ar${page.path}`,
      languages: {
        'x-default': `${baseUrl}${page.path}`,
        en: `${baseUrl}${page.path}`,
        ar: `${baseUrl}/ar${page.path}`,
      },
    },
  }
}

export default async function ArabicLocationPage({ market, locale }: { market: Market; locale: string }) {
  if (locale !== 'ar') notFound()

  const page = arabicLocationPages[market]
  const talents = await getFeaturedTalents(6)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title.replace(' | CA Agency', ''),
    serviceType: 'Influencer Marketing',
    description: page.description,
    inLanguage: 'ar',
    provider: { '@type': 'Organization', name: 'CA Agency', url: baseUrl },
    areaServed: page.areaServed,
    url: `${baseUrl}/ar${page.path}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSafe(serviceSchema) }} />
      <LocationLandingPage
        content={page.content}
        talents={talents}
        labels={arabicLocationLabels}
        showGuides={false}
        locale="ar"
      />
    </>
  )
}
