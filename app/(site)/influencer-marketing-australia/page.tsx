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
  title: 'Influencer Marketing Agency Australia | CA Agency',
  description:
    'Partner with Australia\'s top influencers on Instagram, TikTok & YouTube. 20.9M social users, 46% purchase after seeing influencer content. Sydney & Melbourne creators.',
  keywords: [
    'influencer marketing Australia',
    'Australian influencer agency',
    'Australia content creators',
    'Instagram influencers Australia',
    'TikTok marketing Australia',
    'YouTube influencer agency Sydney',
    'influencer marketing Sydney',
    'influencer marketing Melbourne',
    'micro-influencer marketing Australia',
    'social media marketing Australia',
  ],
  openGraph: {
    title: 'Influencer Marketing Agency Australia | CA Agency',
    description: 'Partner with Australia\'s top influencers. 20.9M social users, 46% purchase conversion.',
    images: [{ url: '/images/site/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Influencer Marketing Agency Australia',
    description: 'Partner with Australia\'s top influencers for Instagram, TikTok & YouTube campaigns.',
  },
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-australia',
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
  name: 'CA Agency - Influencer Marketing Australia',
  description: 'Influencer marketing services for brands targeting the Australian market, specializing in lifestyle, fitness, beauty, and fashion verticals across Instagram, TikTok, and YouTube.',
  provider: {
    '@type': 'Organization',
    name: 'CA Agency',
    url: 'https://caagency.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  serviceType: 'Influencer Marketing',
  url: 'https://caagency.com/influencer-marketing-australia',
}

export default async function AustraliaPage() {
  const talents = await getFeaturedTalents()

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Hero */}
      <section className="bg-background-dark py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="mb-6 text-[56px] tablet:text-[44px] mobile:text-[32px] leading-tight">
            Influencer Marketing<br />Agency in Australia
          </Heading>
          <Text color="white" size="lg" className="max-w-[700px] mx-auto mb-8 opacity-80">
            Connect your brand with Australia's most influential content creators. Access 20.9M social media users across Sydney, Melbourne, and beyond—with 46% purchasing after influencer recommendations.
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
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">$589M</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Market Size 2025</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">20.9M</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Social Media Users</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">46%</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Purchase After Seeing</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">70%</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Brands Increasing Budget</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Australia */}
      <section className="bg-background-dark py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
            Why Choose Influencer Marketing in Australia?
          </Heading>
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8">
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Highly Engaged Audience</h3>
              <Text color="white" size="sm" className="opacity-70">
                78% of Australians are on social media, spending an average of 1 hour 51 minutes daily. TikTok usage exceeds global averages at 38+ hours per month.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Strong Purchase Influence</h3>
              <Text color="white" size="sm" className="opacity-70">
                70% of 18-29 year-olds have purchased products after seeing influencer content. 58% use social media for brand research, rivaling search engines.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Authenticity-First Culture</h3>
              <Text color="white" size="sm" className="opacity-70">
                Australians value relatable, trustworthy creators. Micro-influencers achieve 5-10% engagement rates vs 1-2% for macro-influencers. 74% of marketers prioritize authenticity.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Growing Investment</h3>
              <Text color="white" size="sm" className="opacity-70">
                Market projected to reach $874M by 2029 with 13% YoY growth. 70% of Australian brands plan to increase influencer marketing budgets.
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
              Our Australian Market Creators
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
              <div className="text-accent-red text-3xl mb-3">🏃</div>
              <h3 className="text-white font-semibold text-lg mb-2">Lifestyle & Fitness</h3>
              <Text color="white" size="sm" className="opacity-70">
                16.4% of Australian Instagram influencers focus on lifestyle. Top fitness creators like Tammy Hembrow and Kayla Itsines have 15M+ followers.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-accent-red text-3xl mb-3">👗</div>
              <h3 className="text-white font-semibold text-lg mb-2">Fashion</h3>
              <Text color="white" size="sm" className="opacity-70">
                40% of Australians have purchased fashion online after seeing on social. 70% among younger audiences with influencer content.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-accent-red text-3xl mb-3">💄</div>
              <h3 className="text-white font-semibold text-lg mb-2">Beauty</h3>
              <Text color="white" size="sm" className="opacity-70">
                5.9% of Instagram influencers with strong performance. Authentic creators drive product trial and conversion.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent-red py-[80px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            Ready to Launch Your Australia Campaign?
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            Let's connect your brand with Australia's most influential creators. Get in touch for a free consultation.
          </Text>
          <Button href="/contact" variant="light">Contact Us Today</Button>
        </div>
      </section>

      {/* Brands */}
      <BrandCarousel images={brandLogos} />
    </>
  )
}
