import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Australia | CA Agency',
  description:
    'Launch creator-led campaigns in Australia across Sydney, Melbourne, and beyond.',
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-australia',
  },
}

export default async function AustraliaPage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-australia'),
    getFeaturedTalents(6),
  ])

  return <LocationLandingPage content={content} talents={talents} />
}
