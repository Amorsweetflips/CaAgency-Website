import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Korea | Korea Influencer Agency | CA Agency',
  description:
    'CA Agency helps brands reach Korean audiences through localized influencer marketing campaigns in beauty, fashion, lifestyle, and tech.',
  keywords: [
    'influencer marketing agency korea',
    'korea influencer agency',
    'korean influencer marketing agency',
    'influencer marketing korea',
    'south korea influencer agency',
  ],
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-korea',
  },
}

export default async function KoreaPage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-korea'),
    getFeaturedTalents(6),
  ])

  return <LocationLandingPage content={content} talents={talents} />
}
