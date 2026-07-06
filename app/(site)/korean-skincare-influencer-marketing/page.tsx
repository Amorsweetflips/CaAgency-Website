import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Korean Skincare & K-Beauty Influencer Marketing Agency | CA Agency',
  description:
    'CA Agency is a K-beauty influencer marketing agency for Korean skincare and beauty brands. Creator campaigns that turn routines into results on Instagram, TikTok, and YouTube.',
  keywords: [
    'korean skincare influencer marketing',
    'k-beauty influencer agency',
    'k-beauty marketing agency',
    'korean skincare marketing',
    'beauty influencer agency',
    'skincare influencer marketing',
  ],
  openGraph: {
    title: 'Korean Skincare & K-Beauty Influencer Marketing Agency',
    description:
      'Creator campaigns for K-beauty and Korean skincare brands across Instagram, TikTok, and YouTube.',
    url: 'https://caagency.com/korean-skincare-influencer-marketing',
    images: [
      {
        url: '/images/site/og/korean-skincare-influencer-marketing.webp',
        width: 1200,
        height: 630,
        alt: 'CA Agency — K-Beauty Influencer Marketing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korean Skincare & K-Beauty Influencer Marketing Agency',
    description:
      'Creator campaigns for K-beauty and Korean skincare brands across Instagram, TikTok, and YouTube.',
    images: ['/images/site/og/korean-skincare-influencer-marketing.webp'],
  },
  alternates: {
    canonical: 'https://caagency.com/korean-skincare-influencer-marketing',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Korean Skincare (K-Beauty) Influencer Marketing',
  serviceType: 'Influencer Marketing',
  description:
    'Influencer marketing campaigns for Korean skincare and K-beauty brands across Instagram, TikTok, and YouTube — creator selection, content, and reporting.',
  provider: {
    '@type': 'Organization',
    name: 'CA Agency',
    url: 'https://caagency.com',
  },
  areaServed: 'Worldwide',
  url: 'https://caagency.com/korean-skincare-influencer-marketing',
}

export default async function KoreanSkincarePage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-korean-skincare'),
    getFeaturedTalents(6),
  ])

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <LocationLandingPage content={content} talents={talents} />
    </>
  )
}
