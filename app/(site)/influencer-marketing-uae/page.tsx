import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency UAE | UAE Influencer Agency | CA Agency',
  description:
    'CA Agency is a UAE influencer marketing agency helping brands run creator campaigns across Dubai, Abu Dhabi, Sharjah, and beyond.',
  keywords: [
    'influencer marketing agency uae',
    'influencer agency uae',
    'uae influencer marketing agency',
    'influencer marketing dubai',
    'influencer marketing abu dhabi',
  ],
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-uae',
  },
}

export default async function UAEPage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-uae'),
    getFeaturedTalents(6),
  ])

  return <LocationLandingPage content={content} talents={talents} />
}
