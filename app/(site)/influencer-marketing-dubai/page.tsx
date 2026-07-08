import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Dubai | Influencer Agency UAE | CA Agency',
  description:
    'CA Agency is an influencer marketing agency in Dubai helping brands run Instagram, TikTok, and YouTube campaigns with vetted creators across Dubai and the UAE.',
  keywords: [
    'influencer marketing agency dubai',
    'influencer agency dubai',
    'influencer marketing dubai',
    'influencer agency uae',
    'dubai influencer marketing agency',
  ],
  openGraph: {
    title: 'Influencer Marketing Agency Dubai | Influencer Agency UAE',
    description:
      'CA Agency is an influencer marketing agency in Dubai helping brands run Instagram, TikTok, and YouTube campaigns with vetted creators across Dubai and the UAE.',
    url: 'https://caagency.com/influencer-marketing-dubai',
    images: [
      {
        url: '/images/site/og/influencer-marketing-dubai.webp',
        width: 1200,
        height: 630,
        alt: 'CA Agency, Influencer Marketing Agency Dubai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Influencer Marketing Agency Dubai | Influencer Agency UAE',
    description:
      'CA Agency is an influencer marketing agency in Dubai helping brands run Instagram, TikTok, and YouTube campaigns with vetted creators across Dubai and the UAE.',
    images: ['/images/site/og/influencer-marketing-dubai.webp'],
  },
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-dubai',
  },
}


const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Influencer Marketing Agency Dubai',
  serviceType: 'Influencer Marketing',
  description:
    'CA Agency is an influencer marketing agency in Dubai helping brands run Instagram, TikTok, and YouTube campaigns with vetted creators across Dubai and the UAE.',
  provider: {
    '@type': 'Organization',
    name: 'CA Agency',
    url: 'https://caagency.com',
  },
  areaServed: {
  '@type': 'City',
  'name': 'Dubai'
},
  url: 'https://caagency.com/influencer-marketing-dubai',
}

export default async function DubaiPage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-dubai'),
    getFeaturedTalents(6),
  ])

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <LocationLandingPage content={content} talents={talents} />
    </>
  )
}
