import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Canada | CA Agency',
  description:
    'Reach Canadian audiences through bilingual, creator-led campaigns across major markets.',
  openGraph: {
    siteName: 'CA Agency',
    locale: 'en_US',
    title: 'Influencer Marketing Agency Canada',
    description:
      'Reach Canadian audiences through bilingual, creator-led campaigns across major markets.',
    url: 'https://caagency.com/influencer-marketing-canada',
    images: [
      {
        url: '/images/site/og/influencer-marketing-canada.webp',
        width: 1200,
        height: 630,
        alt: 'CA Agency, Influencer Marketing Agency Canada',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Influencer Marketing Agency Canada',
    description:
      'Reach Canadian audiences through bilingual, creator-led campaigns across major markets.',
    images: ['/images/site/og/influencer-marketing-canada.webp'],
  },
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-canada',
  },
}


const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Influencer Marketing Agency Canada',
  serviceType: 'Influencer Marketing',
  description:
    'Reach Canadian audiences through bilingual, creator-led campaigns across major markets.',
  provider: {
    '@type': 'Organization',
    name: 'CA Agency',
    url: 'https://caagency.com',
  },
  areaServed: {
  '@type': 'Country',
  'name': 'Canada'
},
  url: 'https://caagency.com/influencer-marketing-canada',
}

export default async function CanadaPage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-canada'),
    getFeaturedTalents(6),
  ])

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <LocationLandingPage content={content} talents={talents} />
    </>
  )
}
