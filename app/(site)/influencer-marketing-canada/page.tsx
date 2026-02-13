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
  title: 'Influencer Marketing Agency Canada | CA Agency',
  description:
    'Partner with Canada\'s top influencers on Instagram, TikTok & YouTube. 882K+ active creators, 70% product discovery via influencers. Bilingual English/French expertise.',
  keywords: [
    'influencer marketing Canada',
    'Canadian influencer agency',
    'Canada content creators',
    'Instagram influencers Canada',
    'TikTok marketing Canada',
    'YouTube influencer agency Toronto',
    'influencer marketing Toronto',
    'influencer marketing Vancouver',
    'Montreal influencer agency',
    'bilingual influencer marketing',
  ],
  openGraph: {
    title: 'Influencer Marketing Agency Canada | CA Agency',
    description: 'Partner with Canada\'s top influencers. 882K+ creators, 70% product discovery rate.',
    images: [{ url: '/images/site/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Influencer Marketing Agency Canada',
    description: 'Partner with Canada\'s top influencers for Instagram, TikTok & YouTube campaigns.',
  },
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-canada',
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
  name: 'CA Agency - Influencer Marketing Canada',
  description: 'Influencer marketing services for brands targeting the Canadian market, specializing in fashion, beauty, tech, and lifestyle verticals with bilingual English/French expertise.',
  provider: {
    '@type': 'Organization',
    name: 'CA Agency',
    url: 'https://caagency.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Canada',
  },
  serviceType: 'Influencer Marketing',
  url: 'https://caagency.com/influencer-marketing-canada',
}

export default async function CanadaPage() {
  const talents = await getFeaturedTalents()

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Hero */}
      <section className="bg-background-dark py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="mb-6 text-[56px] tablet:text-[44px] mobile:text-[32px] leading-tight">
            Influencer Marketing<br />Agency in Canada
          </Heading>
          <Text color="white" size="lg" className="max-w-[700px] mx-auto mb-8 opacity-80">
            Connect your brand with Canada's top content creators. Access 882,000+ active influencers across Toronto, Vancouver, and Montreal—with bilingual English/French expertise for maximum reach.
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
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">$660M</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Market Size 2025</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">882K+</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Active Influencers</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">70%</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Discover via Influencers</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">40%</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Buy Immediately</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Canada */}
      <section className="bg-background-dark py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
            Why Choose Influencer Marketing in Canada?
          </Heading>
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8">
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Massive Creator Network</h3>
              <Text color="white" size="sm" className="opacity-70">
                Access 882,000+ active influencers—480K on Instagram, 360K on TikTok, 42K on YouTube. Top cities include Toronto (114K creators), Vancouver, Montreal, and Calgary.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">High Purchase Intent</h3>
              <Text color="white" size="sm" className="opacity-70">
                70% of Canadians discover new products through influencers, with 40% purchasing immediately after seeing recommendations. 95% of online adults have social accounts.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Bilingual Expertise</h3>
              <Text color="white" size="sm" className="opacity-70">
                Navigate Canada's unique bilingual market with tailored English and French content strategies. Quebec campaigns require French prominence for maximum effectiveness.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Long-Term Value</h3>
              <Text color="white" size="sm" className="opacity-70">
                Ongoing creator collaborations drive up to 300% more engagement than one-off campaigns. 75% of Canadian companies have dedicated influencer budgets.
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
              Our Canadian Market Creators
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
              <div className="text-accent-red text-3xl mb-3">👗</div>
              <h3 className="text-white font-semibold text-lg mb-2">Fashion</h3>
              <Text color="white" size="sm" className="opacity-70">
                Largest investment category. Local flair with global trends, accessible personal style resonates with Canadian audiences.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-accent-red text-3xl mb-3">💄</div>
              <h3 className="text-white font-semibold text-lg mb-2">Beauty</h3>
              <Text color="white" size="sm" className="opacity-70">
                Clean beauty, indie brands, and inclusivity drive engagement. Skincare education and tutorials perform exceptionally well.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-accent-red text-3xl mb-3">💻</div>
              <h3 className="text-white font-semibold text-lg mb-2">Tech</h3>
              <Text color="white" size="sm" className="opacity-70">
                High investment category with strong performance in product launches and reviews across all major platforms.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent-red py-[80px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            Ready to Launch Your Canada Campaign?
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            Let's connect your brand with Canada's most influential creators. Get in touch for a free consultation.
          </Text>
          <Button href="/contact" variant="light">Contact Us Today</Button>
        </div>
      </section>

      {/* Brands */}
      <BrandCarousel images={brandLogos} />
    </>
  )
}
