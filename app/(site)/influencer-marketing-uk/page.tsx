import { Metadata } from 'next'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import TalentGrid from '@/components/blocks/TalentGrid'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency UK | CA Agency',
  description:
    'Partner with Britain\'s top influencers on Instagram, TikTok & YouTube. Europe\'s largest influencer market. 69% of UK consumers purchase after influencer recommendations.',
  keywords: [
    'influencer marketing UK',
    'UK influencer agency',
    'British content creators',
    'Instagram influencers UK',
    'TikTok marketing United Kingdom',
    'YouTube influencer agency London',
    'influencer marketing London',
    'micro-influencer marketing UK',
    'social media marketing Britain',
    'UK creator partnerships',
  ],
  openGraph: {
    title: 'Influencer Marketing Agency UK | CA Agency',
    description: 'Partner with Britain\'s top influencers. Europe\'s largest market, 69% conversion rate.',
    images: [{ url: '/images/site/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Influencer Marketing Agency UK',
    description: 'Partner with Britain\'s top influencers for Instagram, TikTok & YouTube campaigns.',
  },
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-uk',
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
  name: 'CA Agency - Influencer Marketing UK',
  description: 'Influencer marketing services for brands targeting the British market, specializing in fashion, beauty, food & drink, and lifestyle verticals across Instagram, TikTok, and YouTube.',
  provider: {
    '@type': 'Organization',
    name: 'CA Agency',
    url: 'https://caagency.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  serviceType: 'Influencer Marketing',
  url: 'https://caagency.com/influencer-marketing-uk',
}

export default async function UKPage() {
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
            Influencer Marketing<br />Agency in UK
          </Heading>
          <Text color="white" size="lg" className="max-w-[700px] mx-auto mb-8 opacity-80">
            Connect your brand with Britain's most influential content creators. Access Europe's largest influencer marketing market—£930M in 2024—with 69% of UK consumers purchasing after influencer recommendations.
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
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">£930M</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">UK Market 2024</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">55.5M</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Social Media Users</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">69%</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Purchase After Seeing</div>
            </div>
            <div>
              <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">89%</div>
              <div className="text-white/60 uppercase tracking-widest text-sm">Brands Use Instagram</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why UK */}
      <section className="bg-background-dark py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
            Why Choose Influencer Marketing in the UK?
          </Heading>
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8">
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Europe's Largest Market</h3>
              <Text color="white" size="sm" className="opacity-70">
                The UK leads Europe in influencer marketing maturity and spend, more than doubling comparable markets like France and Germany. 50% of brands increasing budgets in 2025.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">High Conversion Rates</h3>
              <Text color="white" size="sm" className="opacity-70">
                69% of UK consumers have purchased products after seeing influencer promotion. Over 50% of Gen Z are directly influenced by influencer content.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Sophisticated Creator Ecosystem</h3>
              <Text color="white" size="sm" className="opacity-70">
                84% of UK marketers plan to work with more creators. The market favors authentic, long-term partnerships with micro-influencers over celebrity endorsements.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-xl mb-3">Data-Driven Results</h3>
              <Text color="white" size="sm" className="opacity-70">
                UK brands prioritize performance measurement and brand safety, focusing on measurable ROI beyond vanity metrics. 83% report influencer marketing effectiveness.
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
              Our UK Market Creators
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
                34% of branded posts by UK influencers. Zara leads with £55.2M earned media value on Instagram.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-accent-red text-3xl mb-3">💄</div>
              <h3 className="text-white font-semibold text-lg mb-2">Beauty</h3>
              <Text color="white" size="sm" className="opacity-70">
                23% of branded posts. L'Oréal Paris leads TikTok with £16.2M earned media value.
              </Text>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-accent-red text-3xl mb-3">🍽️</div>
              <h3 className="text-white font-semibold text-lg mb-2">Food & Drink</h3>
              <Text color="white" size="sm" className="opacity-70">
                Most trusted category—69% of UK adults trust influencer food recommendations.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent-red py-[80px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            Ready to Launch Your UK Campaign?
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            Let's connect your brand with Britain's most influential creators. Get in touch for a free consultation.
          </Text>
          <Button href="/contact" variant="light">Contact Us Today</Button>
        </div>
      </section>

      {/* Brands */}
      <BrandCarousel images={brandLogos} />
    </>
  )
}
