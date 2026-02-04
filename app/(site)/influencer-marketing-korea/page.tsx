import { Metadata } from 'next'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import TalentGrid from '@/components/blocks/TalentGrid'
import { prisma } from '@/lib/prisma'

// Render dynamically - no database needed at build time
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Korea | CA Agency',
  description:
    'Connect with Korea\'s top influencers for K-beauty, K-pop, and tech campaigns. CA Agency specializes in Korean content creators on Instagram, TikTok & YouTube. Get results.',
  keywords: [
    'influencer marketing Korea',
    'K-beauty influencers',
    'Korean content creators',
    'Seoul influencer agency',
    'K-pop influencer marketing',
    'Korean beauty brand campaigns',
    'Instagram influencers Korea',
    'TikTok marketing Korea',
    'Korean influencer agency',
    'South Korea influencer marketing',
  ],
  openGraph: {
    title: 'Influencer Marketing Agency Korea | CA Agency',
    description: 'Connect with Korea\'s top influencers for K-beauty, K-pop, and tech campaigns. 3000+ campaigns, 18M+ followers.',
    images: [{ url: '/images/site/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Influencer Marketing Agency Korea',
    description: 'Connect with Korea\'s top influencers for K-beauty, K-pop, and tech campaigns.',
  },
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-korea',
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

// JSON-LD for Service (country-level)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'CA Agency - Influencer Marketing Korea',
  description: 'Influencer marketing services for brands targeting the Korean market, specializing in K-beauty, K-pop, and tech verticals.',
  provider: {
    '@type': 'Organization',
    name: 'CA Agency',
    url: 'https://caagency.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'South Korea',
  },
  serviceType: 'Influencer Marketing',
  url: 'https://caagency.com/influencer-marketing-korea',
}

export default async function KoreaPage() {
  const talents = await getFeaturedTalents()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-background-dark py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="mb-6 text-[56px] tablet:text-[44px] mobile:text-[32px] leading-tight">
            Influencer Marketing<br />Agency in Korea
          </Heading>
          <Text color="white" size="lg" className="max-w-[700px] mx-auto mb-8 opacity-80">
            Connect your brand with Korea's top content creators. We specialize in K-beauty, K-pop, and tech influencer campaigns across Instagram, TikTok, and YouTube that resonate with Korean and global audiences.
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

      {/* Why Korea */}
      <section className="bg-background-dark py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
            Why Choose Influencer Marketing in Korea?
          </Heading>
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8">
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">K-Beauty & K-Pop Culture</h3>
              <Text color="white" size="sm" className="opacity-70">
                Tap into Korea's global cultural influence. K-beauty trends and K-pop content creators have massive reach across Asia and worldwide.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Tech-Savvy Audience</h3>
              <Text color="white" size="sm" className="opacity-70">
                Korea's highly connected, tech-forward consumers are early adopters. Perfect for tech, gaming, and innovation brands.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Premium Creator Network</h3>
              <Text color="white" size="sm" className="opacity-70">
                Access Seoul's top influencers across beauty, fashion, lifestyle, tech, and entertainment verticals with authentic Korean content.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Cross-Cultural Expertise</h3>
              <Text color="white" size="sm" className="opacity-70">
                We understand Korean culture and how to bridge it with global markets, creating campaigns that resonate both locally and internationally.
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
              Our Korean Market Creators
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
            Ready to Launch Your Korea Campaign?
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            Let's connect your brand with Korea's most influential creators. Get in touch for a free consultation.
          </Text>
          <Button href="/contact" variant="light">Contact Us Today</Button>
        </div>
      </section>

      {/* Brands */}
      <BrandCarousel images={brandLogos} />
    </>
  )
}
