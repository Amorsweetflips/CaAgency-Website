import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency UK | CA Agency',
  description:
    'Run UK influencer campaigns with British creators and a performance-led strategy.',
  openGraph: {
    siteName: 'CA Agency',
    locale: 'en_US',
    title: 'Influencer Marketing Agency UK',
    description:
      'Run UK influencer campaigns with British creators and a performance-led strategy.',
    url: 'https://caagency.com/influencer-marketing-uk',
    images: [
      {
        url: '/images/site/og/influencer-marketing-uk.webp',
        width: 1200,
        height: 630,
        alt: 'CA Agency, Influencer Marketing Agency UK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Influencer Marketing Agency UK',
    description:
      'Run UK influencer campaigns with British creators and a performance-led strategy.',
    images: ['/images/site/og/influencer-marketing-uk.webp'],
  },
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-uk',
  },
}


const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Influencer Marketing Agency UK',
  serviceType: 'Influencer Marketing',
  description:
    'Run UK influencer campaigns with British creators and a performance-led strategy.',
  provider: {
    '@type': 'Organization',
    name: 'CA Agency',
    url: 'https://caagency.com',
  },
  areaServed: {
  '@type': 'Country',
  'name': 'United Kingdom'
},
  url: 'https://caagency.com/influencer-marketing-uk',
}

export default async function UKPage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-uk'),
    getFeaturedTalents(6),
  ])

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <LocationLandingPage content={content} talents={talents} />
    </>
  )
}
