import { Metadata } from 'next'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import TalentGrid from '@/components/blocks/TalentGrid'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600
export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Dubai | CA Agency',
  description:
    'Looking for the best influencer marketing agency in Dubai? CA Agency connects brands with top Instagram, TikTok & YouTube creators. 3000+ campaigns, 18M+ followers. Get results.',
  keywords: [
    'influencer marketing Dubai',
    'influencer agency Dubai',
    'Dubai influencer marketing',
    'social media marketing Dubai',
    'Instagram influencers Dubai',
    'TikTok marketing Dubai',
    'content creators Dubai',
    'brand partnerships Dubai',
  ],
  openGraph: {
    title: 'Influencer Marketing Agency Dubai | CA Agency',
    description: 'Dubai\'s leading influencer marketing agency. 3000+ campaigns, 18M+ followers, 150+ global brands.',
    images: [{ url: '/images/site/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Influencer Marketing Agency Dubai',
    description: 'Dubai\'s leading influencer marketing agency connecting brands with top creators.',
  },
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-dubai',
  },
}

const brandLogos = [
  { url: '/images/logos/brand-01.webp', alt: 'Brand partner' },
  { url: '/images/logos/brand-02.webp', alt: 'Brand partner' },
  { url: '/images/logos/brand-03.webp', alt: 'Brand partner' },
  { url: '/images/logos/brand-04.webp', alt: 'Brand partner' },
  { url: '/images/logos/brand-05.webp', alt: 'Brand partner' },
  { url: '/images/logos/brand-06.webp', alt: 'Brand partner' },
]

async function getFeaturedTalents() {
  try {
    const talents = await prisma.talent.findMany({
      where: { category: 'instagram' },
      take: 6,
      orderBy: { order: 'asc' },
    })
    return talents.map(t => ({
      name: t.name,
      imageUrl: t.imageUrl,
      instagramUrl: t.instagramUrl || undefined,
      tiktokUrl: t.tiktokUrl || undefined,
    }))
  } catch {
    return []
  }
}

// JSON-LD for local business
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'CA Agency - Influencer Marketing Dubai',
  description: 'Leading influencer marketing agency in Dubai connecting brands with top social media creators.',
  url: 'https://caagency.com/influencer-marketing-dubai',
  telephone: '+971-58-510-7546',
  email: 'info@caagency.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Meydan Grandstand, 6th floor, Meydan Road',
    addressLocality: 'Dubai',
    addressRegion: 'Dubai',
    addressCountry: 'AE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.0657,
    longitude: 55.2255,
  },
  areaServed: {
    '@type': 'City',
    name: 'Dubai',
  },
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
}

export default async function DubaiPage() {
  const talents = await getFeaturedTalents()

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Hero */}
      <section className="bg-background-dark py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="mb-6 text-[56px] tablet:text-[44px] mobile:text-[32px] leading-tight">
            Influencer Marketing<br />Agency in Dubai
          </Heading>
          <Text color="white" size="lg" className="max-w-[700px] mx-auto mb-8 opacity-80">
            Connect your brand with Dubai's top content creators. We deliver data-driven influencer campaigns across Instagram, TikTok, and YouTube that captivate audiences and drive real results.
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">Get Started</Button>
            <Button href="/work" variant="dark">View Our Work</Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-background-dark py-[60px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-3 mobile:grid-cols-1 gap-8 text-center">
            <div>
              <div className="font-anegra text-[60px] mobile:text-[48px] text-accent-red">3000+</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Campaigns Delivered</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[48px] text-accent-red">18M+</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Total Followers</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[48px] text-accent-red">150+</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Global Brands</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dubai */}
      <section className="bg-background-dark py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
            Why Choose a Dubai Influencer Agency?
          </Heading>
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8">
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Local Market Expertise</h3>
              <Text color="white" size="sm" className="opacity-70">
                We understand Dubai's unique multicultural audience and what resonates with consumers in the UAE and GCC region.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Premium Creator Network</h3>
              <Text color="white" size="sm" className="opacity-70">
                Access Dubai's top influencers across beauty, fashion, lifestyle, tech, and entertainment verticals.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Data-Driven Results</h3>
              <Text color="white" size="sm" className="opacity-70">
                Every campaign is backed by analytics. We track reach, engagement, conversions, and ROI to ensure measurable success.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">End-to-End Service</h3>
              <Text color="white" size="sm" className="opacity-70">
                From strategy and creator selection to content production and performance reporting – we handle everything.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Talents */}
      {talents.length > 0 && (
        <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
          <div className="max-w-container mx-auto">
            <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
              Dubai-Based Creators
            </Heading>
            <TalentGrid talents={talents} columns={6} />
            <div className="text-center mt-10">
              <Button href="/talents">View All Talents</Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-accent-red py-[80px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            Ready to Launch Your Dubai Campaign?
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            Let's connect your brand with Dubai's most influential creators. Get in touch for a free consultation.
          </Text>
          <Button href="/contact" variant="light">Contact Us Today</Button>
        </div>
      </section>

      {/* Brands */}
      <BrandCarousel images={brandLogos} />
    </>
  )
}
