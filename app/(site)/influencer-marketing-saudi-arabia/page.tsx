import { Metadata } from 'next'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import BrandCarousel from '@/components/blocks/BrandCarousel'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Saudi Arabia | CA Agency',
  description:
    'Influencer marketing agency serving Saudi Arabia. Connect your brand with top KSA creators on Instagram, TikTok & YouTube. Riyadh, Jeddah, and nationwide campaigns.',
  keywords: [
    'influencer marketing Saudi Arabia',
    'influencer agency KSA',
    'Saudi Arabia influencer marketing',
    'Riyadh influencer agency',
    'Jeddah influencers',
    'KSA social media marketing',
    'Saudi content creators',
  ],
  openGraph: {
    title: 'Influencer Marketing Agency Saudi Arabia | CA Agency',
    description: 'Connect your brand with top Saudi Arabian influencers and content creators.',
    images: [{ url: '/images/site/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-saudi-arabia',
  },
}

const brandLogos = [
  { url: '/images/logos/brand-01.webp', alt: 'Brand partner' },
  { url: '/images/logos/brand-02.webp', alt: 'Brand partner' },
  { url: '/images/logos/brand-03.webp', alt: 'Brand partner' },
  { url: '/images/logos/brand-04.webp', alt: 'Brand partner' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Influencer Marketing Saudi Arabia',
  provider: {
    '@type': 'Organization',
    name: 'CA Agency',
    url: 'https://caagency.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Saudi Arabia',
  },
  description: 'Influencer marketing services for brands targeting Saudi Arabian audiences.',
}

export default function SaudiPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Hero */}
      <section className="bg-background-dark py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="mb-6 text-[56px] tablet:text-[44px] mobile:text-[32px] leading-tight">
            Influencer Marketing<br />in Saudi Arabia
          </Heading>
          <Text color="white" size="lg" className="max-w-[700px] mx-auto mb-8 opacity-80">
            Reach Saudi Arabia's digitally-savvy audience through authentic influencer partnerships. From Riyadh to Jeddah, we connect brands with the Kingdom's most engaging creators.
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">Start Your KSA Campaign</Button>
            <Button href="/work" variant="dark">See Our Work</Button>
          </div>
        </div>
      </section>

      {/* Why Saudi */}
      <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
            Why Saudi Arabia?
          </Heading>
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8">
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Largest GCC Market</h3>
              <Text color="white" size="sm" className="opacity-70">
                35+ million population with high social media penetration and purchasing power.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Vision 2030 Growth</h3>
              <Text color="white" size="sm" className="opacity-70">
                Rapidly evolving entertainment and lifestyle sectors create new opportunities for brands.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Young Demographics</h3>
              <Text color="white" size="sm" className="opacity-70">
                Over 60% of the population is under 35, highly active on Instagram, TikTok, and Snapchat.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Cross-Border Reach</h3>
              <Text color="white" size="sm" className="opacity-70">
                Saudi creators often have followers across the GCC, amplifying your campaign reach.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent-red py-[80px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            Ready for the Saudi Market?
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            Let's build your influencer strategy for Saudi Arabia.
          </Text>
          <Button href="/contact" variant="light">Contact Us</Button>
        </div>
      </section>

      <BrandCarousel images={brandLogos} />
    </>
  )
}
