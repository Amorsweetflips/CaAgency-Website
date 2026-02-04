import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import TalentGrid from '@/components/blocks/TalentGrid'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

// Brand logos
const brandLogos = [
  { url: '/images/logos/brand-01.webp', alt: 'Brand 1' },
  { url: '/images/logos/brand-02.webp', alt: 'Brand 2' },
  { url: '/images/logos/brand-03.webp', alt: 'Brand 3' },
  { url: '/images/logos/brand-04.webp', alt: 'Brand 4' },
  { url: '/images/logos/brand-05.webp', alt: 'Brand 5' },
  { url: '/images/logos/brand-06.webp', alt: 'Brand 6' },
  { url: '/images/logos/brand-07.webp', alt: 'Brand 7' },
  { url: '/images/logos/brand-08.webp', alt: 'Brand 8' },
  { url: '/images/logos/brand-09.webp', alt: 'Brand 9' },
  { url: '/images/logos/brand-10.webp', alt: 'Brand 10' },
  { url: '/images/logos/brand-11.webp', alt: 'Brand 11' },
  { url: '/images/logos/brand-12.webp', alt: 'Brand 12' },
  { url: '/images/logos/brand-13.webp', alt: 'Brand 13' },
  { url: '/images/logos/brand-14.webp', alt: 'Brand 14' },
  { url: '/images/logos/brand-15.webp', alt: 'Brand 15' },
  { url: '/images/logos/brand-16.webp', alt: 'Brand 16' },
  { url: '/images/logos/brand-17.webp', alt: 'Brand 17' },
  { url: '/images/logos/brand-18.webp', alt: 'Brand 18' },
  { url: '/images/logos/brand-19.webp', alt: 'Brand 19' },
  { url: '/images/logos/brand-20.webp', alt: 'Brand 20' },
  { url: '/images/logos/brand-21.webp', alt: 'Brand 21' },
  { url: '/images/logos/brand-22.webp', alt: 'Brand 22' },
  { url: '/images/logos/brand-23.webp', alt: 'Brand 23' },
  { url: '/images/logos/brand-24.webp', alt: 'Brand 24' },
  { url: '/images/logos/brand-25.webp', alt: 'Brand 25' },
  { url: '/images/logos/brand-26.webp', alt: 'Brand 26' },
]

// Render dynamically - no database needed at build time
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Our Talents - Instagram, TikTok & YouTube Creators',
  description:
    'Discover CA Agency\'s roster of top influencers and content creators. Masters of visual storytelling across Instagram, TikTok, and YouTube with millions of engaged followers.',
  keywords: [
    'influencers Dubai',
    'content creators',
    'Instagram influencers',
    'TikTok creators',
    'YouTube influencers',
    'beauty influencers',
    'fashion influencers',
    'lifestyle creators',
  ],
  openGraph: {
    title: 'Our Talents | CA Agency',
    description:
      'Discover our roster of top influencers and content creators across Instagram, TikTok, and YouTube.',
    images: [
      {
        url: '/images/site/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'CA Agency Talents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Talents | CA Agency',
    description: 'Discover our roster of top influencers and content creators.',
    images: ['/images/site/og-image.webp'],
  },
  alternates: {
    canonical: 'https://caagency.com/talents',
  },
}

async function getTalents() {
  try {
    const talents = await prisma.talent.findMany({
      orderBy: [
        { category: 'asc' },
        { order: 'asc' },
      ],
    })
    return talents
  } catch (error) {
    console.error('Error fetching talents:', error)
    return []
  }
}

export default async function TalentsPage() {
  const allTalents = await getTalents()

  const instagramTalents = allTalents
    .filter((t) => t.category === 'instagram')
    .map((t) => ({
      name: t.name,
      imageUrl: t.imageUrl,
      instagramUrl: t.instagramUrl || undefined,
      tiktokUrl: t.tiktokUrl || undefined,
      youtubeUrl: t.youtubeUrl || undefined,
      twitchUrl: t.twitchUrl || undefined,
      kickUrl: t.kickUrl || undefined,
    }))

  const youtubeTalents = allTalents
    .filter((t) => t.category === 'youtube')
    .map((t) => ({
      name: t.name,
      imageUrl: t.imageUrl,
      instagramUrl: t.instagramUrl || undefined,
      tiktokUrl: t.tiktokUrl || undefined,
      youtubeUrl: t.youtubeUrl || undefined,
      twitchUrl: t.twitchUrl || undefined,
      kickUrl: t.kickUrl || undefined,
    }))

  return (
    <>
      {/* Hero Section */}
      <section className="bg-background-dark py-[80px] tablet:py-[60px] mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="max-w-[900px]">
            <Heading as="h1" color="white" className="mb-8 text-[48px] tablet:text-[40px] mobile:text-[30px] leading-[1.2]">
              Our talents
            </Heading>
            <div className="space-y-6">
              <Text color="white" size="sm" className="text-[14px] leading-[26px] tracking-[1.5px] opacity-80">
                At CA Agency, we believe that every influencer has the power to drive real impact, and every brand has the potential to build authentic connections with their audience.
              </Text>
              <Text color="white" size="sm" className="text-[14px] leading-[26px] tracking-[1.5px] opacity-80">
                As a full-service influencer marketing agency, we bridge the gap between brands and creators  delivering powerful storytelling content that engages, converts, and fuels long-term growth across platforms like Instagram and TikTok.
              </Text>
              <Text color="white" size="sm" className="text-[14px] leading-[26px] tracking-[1.5px] opacity-80">
                Our creators are masters of visual storytelling. They transform everyday moments into captivating narratives that resonate with their followers. With an eye for aesthetics and a passion for sharing their unique perspectives, they are the go-to source for inspiration, fashion, travel, and lifestyle content.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Section Title with underline */}
      <section className="bg-background-dark pb-[40px] px-section-x">
        <div className="max-w-container mx-auto">
          <h3 className="font-anegra text-[30px] tablet:text-[26px] mobile:text-[22px] font-semibold tracking-[1.2px] text-center">
            <span className="text-foreground-white/70">Short. Stylish. Share-Worthy</span>{' '}
            <span className="text-foreground-white relative inline-block">
              Instagram & TikTok Voices
              {/* Red underline squiggle */}
              <span className="absolute -bottom-2 left-0 w-full text-accent-red">
                <svg
                  className="w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 4C20 1 40 7 60 4C80 1 100 7 120 4C140 1 160 7 180 4C190 2.5 200 4 200 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span>
            </span>
          </h3>
          {/* Horizontal divider line */}
          <div className="mt-8 border-t border-foreground-white/20" />
        </div>
      </section>

      {/* Instagram & TikTok Voices Grid */}
      <section className="bg-background-dark py-[60px] tablet:py-[50px] mobile:py-[40px] px-section-x">
        <div className="max-w-container mx-auto">
          <TalentGrid talents={instagramTalents} columns={4} />
        </div>
      </section>

      {/* YouTube Voices Section */}
      <section className="bg-background-dark py-section-y-desktop mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <h3 className="font-anegra text-[30px] tablet:text-[26px] mobile:text-[22px] font-semibold tracking-[1.2px] mb-8">
            <span className="text-foreground-white inline-flex items-center gap-3">
              YouTube Voices
              <Image
                src="/images/site/[CITYPNG.COM]Red Youtube Logo Symbol - 800x800.png"
                alt="YouTube"
                width={40}
                height={40}
                className="inline-block"
              />
            </span>{' '}
            <span className="text-foreground-white/70">That Influence Millions</span>
          </h3>
          <TalentGrid talents={youtubeTalents} columns={4} />
        </div>
      </section>

      {/* Brand Carousel */}
      <section className="bg-background-dark py-[50px] px-0">
        <BrandCarousel images={brandLogos} />
      </section>
    </>
  )
}
