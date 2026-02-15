import { Metadata } from 'next'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import BrandCarousel from '@/components/blocks/BrandCarousel'

export const revalidate = 3600
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Influencer Marketing Agency UAE | CA Agency',
  description:
    'Top influencer marketing agency in the UAE. CA Agency connects brands with leading Instagram, TikTok & YouTube creators across Dubai, Abu Dhabi, and the Emirates.',
  keywords: [
    'influencer marketing UAE',
    'influencer agency UAE',
    'UAE influencer marketing',
    'social media marketing UAE',
    'Emirates influencer agency',
    'Instagram influencers UAE',
    'TikTok creators UAE',
  ],
  openGraph: {
    title: 'Influencer Marketing Agency UAE | CA Agency',
    description: 'UAE\'s premier influencer marketing agency. Connecting brands with top creators across the Emirates.',
    images: [{ url: '/images/site/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-uae',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'CA Agency - Influencer Marketing UAE',
  description: 'Premier influencer marketing agency serving the United Arab Emirates.',
  url: 'https://caagency.com/influencer-marketing-uae',
  telephone: '+971-58-510-7546',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Arab Emirates',
  },
}

export default function UAEPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Hero */}
      <section className="bg-background-dark py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="mb-6 text-[56px] tablet:text-[44px] mobile:text-[32px] leading-tight">
            Influencer Marketing<br />Agency in the UAE
          </Heading>
          <Text color="white" size="lg" className="max-w-[700px] mx-auto mb-8 opacity-80">
            The UAE's leading influencer marketing agency. We connect global brands with the region's most influential content creators across Dubai, Abu Dhabi, Sharjah, and beyond.
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">Start Your Campaign</Button>
            <Button href="/talents" variant="dark">Meet Our Creators</Button>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-center text-[40px] mobile:text-[28px]">
            UAE-Wide Coverage
          </Heading>
          <div className="grid grid-cols-4 mobile:grid-cols-2 gap-6 text-center">
            {['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'].map((city) => (
              <div key={city} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-white font-semibold text-lg">{city}</h3>
                <Text color="white" size="sm" className="opacity-60 mt-2">
                  Local creators & campaigns
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-background-dark py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
            Our UAE Influencer Services
          </Heading>
          <div className="grid grid-cols-3 mobile:grid-cols-1 gap-6">
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Campaign Management</h3>
              <Text color="white" size="sm" className="opacity-70">
                End-to-end influencer campaign execution across Instagram, TikTok, and YouTube.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Talent Sourcing</h3>
              <Text color="white" size="sm" className="opacity-70">
                Access to UAE's top creators in beauty, fashion, lifestyle, food, and tech.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Content Production</h3>
              <Text color="white" size="sm" className="opacity-70">
                High-quality branded content that resonates with UAE audiences.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent-red py-[80px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            Launch Your UAE Campaign
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            Ready to reach UAE audiences through authentic influencer partnerships?
          </Text>
          <Button href="/contact" variant="light">Get in Touch</Button>
        </div>
      </section>

      <BrandCarousel images={brandLogos} />
    </>
  )
}
