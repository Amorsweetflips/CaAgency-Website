import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

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
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-dubai',
  },
}

export default async function DubaiPage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-dubai'),
    getFeaturedTalents(6),
  ])

  return <LocationLandingPage content={content} talents={talents} />
}
