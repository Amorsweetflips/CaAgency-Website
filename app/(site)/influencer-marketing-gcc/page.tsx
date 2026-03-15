import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Influencer Marketing GCC | CA Agency',
  description:
    'Scale creator campaigns across the GCC with one coordinated influencer marketing strategy.',
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-gcc',
  },
}

export default async function GCCPage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-gcc'),
    getFeaturedTalents(6),
  ])

  return <LocationLandingPage content={content} talents={talents} />
}
