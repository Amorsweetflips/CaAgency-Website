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
  title: 'Influencer Marketing Agency USA | CA Agency',
  description:
    'Partner with America\'s top influencers on Instagram, TikTok & YouTube. CA Agency delivers proven ROI with 3000+ campaigns. $6.2B market leader in creator marketing.',
  keywords: [
    'influencer marketing USA',
    'US influencer agency',
    'American content creators',
    'Instagram influencers USA',
    'TikTok marketing United States',
    'YouTube influencer agency',
    'influencer marketing New York',
    'Los Angeles influencer agency',
    'micro-influencer marketing USA',
    'social media marketing America',
  ],
  openGraph: {
    title: 'Influencer Marketing Agency USA | CA Agency',
    description: 'Partner with America\'s top influencers. 3000+ campaigns, 18M+ followers, proven ROI.',
    images: [{ url: '/images/site/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Influencer Marketing Agency USA',
    description: 'Partner with America\'s top influencers for Instagram, TikTok & YouTube campaigns.',
  },
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-usa',
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
  name: 'CA Agency - Influencer Marketing USA',
  description: 'Influencer marketing services for brands targeting the American market, specializing in beauty, fashion, tech, and lifestyle verticals across Instagram, TikTok, and YouTube.',
  provider: {
    '@type': 'Organization',
    name: 'CA Agency',
    url: 'https://caagency.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  serviceType: 'Influencer Marketing',
  url: 'https://caagency.com/influencer-marketing-usa',
}

export default async function USAPage() {
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
            Influencer Marketing<br />Agency in USA
          </Heading>
          <Text color="white" size="lg" className="max-w-[700px] mx-auto mb-8 opacity-80">
            Connect your brand with America's most influential content creators. Access the world's largest influencer marketing market—$6.2B in 2025—with proven ROI across Instagram, TikTok, and YouTube.
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
          <div className="grid grid-cols-4 mobile:grid-cols-2 gap-8 text-center">
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">$6.2B</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">US Market Size 2025</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">84%</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Adults on YouTube</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">75%</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Marketers Use Instagram</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">60%</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Use TikTok Marketing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why USA */}
      <section className="bg-background-dark py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
            Why Choose Influencer Marketing in the USA?
          </Heading>
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8">
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">World's Largest Market</h3>
              <Text color="white" size="sm" className="opacity-70">
                The US influencer marketing industry is the world's largest at $6.2B, with mature infrastructure, established agencies, and proven ROI across all verticals.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">High Consumer Trust</h3>
              <Text color="white" size="sm" className="opacity-70">
                American consumers trust influencers more than traditional brand advertising, driving purchase decisions and authentic engagement with your products.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Platform Diversity</h3>
              <Text color="white" size="sm" className="opacity-70">
                Access creators across YouTube (84% of adults), Instagram (50%), TikTok (37%), and emerging platforms. Multi-platform campaigns generate significantly higher ROI.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Micro-Influencer Advantage</h3>
              <Text color="white" size="sm" className="opacity-70">
                Nano and micro-influencers consistently outperform larger creators in engagement and cost-effectiveness, providing authentic connections with niche audiences.
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
              Our US Market Creators
            </Heading>
            <TalentGrid talents={talents} columns={6} />
            <div className="text-center mt-10">
              <Button href="/talents">View All Talents</Button>
            </div>
          </div>
        </section>
      )}

      {/* Industries */}
      <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
            Top Performing Industries
          </Heading>
          <div className="grid grid-cols-3 mobile:grid-cols-1 gap-6">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-accent-red text-3xl mb-3">💄</div>
              <h3 className="text-white font-semibold text-lg mb-2">Beauty & Personal Care</h3>
              <Text color="white" size="sm" className="opacity-70">
                Leading industry for influencer adoption. Micro-influencers drive product trial and conversion.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-accent-red text-3xl mb-3">👗</div>
              <h3 className="text-white font-semibold text-lg mb-2">Fashion & Retail</h3>
              <Text color="white" size="sm" className="opacity-70">
                2.26% engagement on TikTok. E-commerce projected to grow 45% through 2029.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-accent-red text-3xl mb-3">💪</div>
              <h3 className="text-white font-semibold text-lg mb-2">Health & Wellness</h3>
              <Text color="white" size="sm" className="opacity-70">
                Growing niche with Gen Z (29%) and Millennials (25%) following health influencers.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent-red py-[80px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            Ready to Launch Your US Campaign?
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            Let's connect your brand with America's most influential creators. Get in touch for a free consultation.
          </Text>
          <Button href="/contact" variant="light">Contact Us Today</Button>
        </div>
      </section>

      {/* Brands */}
      <BrandCarousel images={brandLogos} />
    </>
  )
}
