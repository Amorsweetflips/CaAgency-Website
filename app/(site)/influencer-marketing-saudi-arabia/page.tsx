import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Saudi Arabia | CA Agency',
  description:
    'Reach Saudi audiences through creator partnerships tailored for Riyadh, Jeddah, and the wider Saudi market.',
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-saudi-arabia',
  },
}

export default async function SaudiArabiaPage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-saudi-arabia'),
    getFeaturedTalents(6),
  ])

  return <LocationLandingPage content={content} talents={talents} />
}
