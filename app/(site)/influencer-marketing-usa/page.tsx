import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency USA | CA Agency',
  description:
    'Partner with American creators across Instagram, TikTok, and YouTube with CA Agency.',
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-usa',
  },
}

export default async function USAPage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-usa'),
    getFeaturedTalents(6),
  ])

  return <LocationLandingPage content={content} talents={talents} />
}
