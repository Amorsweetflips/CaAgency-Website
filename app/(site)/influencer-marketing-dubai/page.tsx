import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Dubai | CA Agency',
  description:
    'Looking for the best influencer marketing agency in Dubai? CA Agency connects brands with top Instagram, TikTok & YouTube creators.',
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
