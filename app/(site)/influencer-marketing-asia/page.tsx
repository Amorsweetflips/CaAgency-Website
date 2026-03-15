import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Asia | Asia Influencer Agency | CA Agency',
  description:
    'CA Agency helps brands run influencer marketing campaigns across Asia with localized creator strategy and cross-market execution.',
  keywords: [
    'influencer marketing agency asia',
    'influencer agency asia',
    'asia influencer marketing agency',
    'influencer marketing asia',
    'asian influencer agency',
  ],
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-asia',
  },
}

export default async function AsiaPage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-asia'),
    getFeaturedTalents(6),
  ])

  return <LocationLandingPage content={content} talents={talents} />
}
