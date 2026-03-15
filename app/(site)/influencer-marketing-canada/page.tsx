import { Metadata } from 'next'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { LocationPageContent } from '@/lib/site-content/location-pages'
import LocationLandingPage from '@/components/site/LocationLandingPage'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Canada | CA Agency',
  description:
    'Reach Canadian audiences through bilingual, creator-led campaigns across major markets.',
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-canada',
  },
}

export default async function CanadaPage() {
  const [content, talents] = await Promise.all([
    getSiteContent<LocationPageContent>('location-canada'),
    getFeaturedTalents(6),
  ])

  return <LocationLandingPage content={content} talents={talents} />
}
