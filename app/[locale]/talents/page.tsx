import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import TalentGrid from '@/components/blocks/TalentGrid'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

// Render dynamically - no database needed at build time
export const dynamic = 'force-dynamic'

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

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'talents' })

  return {
    title: t('title'),
    description: t('description'),
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
      title: t('title'),
      description: t('description'),
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
      title: t('title'),
      description: t('description'),
      images: ['/images/site/og-image.webp'],
    },
    alternates: {
      canonical: 'https://caagency.com/talents',
      languages: {
        en: 'https://caagency.com/talents',
        ar: 'https://caagency.com/ar/talents',
        ko: 'https://caagency.com/ko/talents',
      },
    },
  }
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

export default async function TalentsPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'talents' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  const allTalents = await getTalents()

  const instagramTalents = allTalents
    .filter((talent) => talent.category === 'instagram')
    .map((talent) => ({
      name: talent.name,
      imageUrl: talent.imageUrl,
      instagramUrl: talent.instagramUrl || undefined,
      tiktokUrl: talent.tiktokUrl || undefined,
      youtubeUrl: talent.youtubeUrl || undefined,
      twitchUrl: talent.twitchUrl || undefined,
      kickUrl: talent.kickUrl || undefined,
    }))

  const youtubeTalents = allTalents
    .filter((talent) => talent.category === 'youtube')
    .map((talent) => ({
      name: talent.name,
      imageUrl: talent.imageUrl,
      instagramUrl: talent.instagramUrl || undefined,
      tiktokUrl: talent.tiktokUrl || undefined,
      youtubeUrl: talent.youtubeUrl || undefined,
      twitchUrl: talent.twitchUrl || undefined,
      kickUrl: talent.kickUrl || undefined,
    }))

  return (
    <>
      {/* Hero Section */}
      <section className="bg-background-dark py-[80px] tablet:py-[60px] mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="max-w-[900px]">
            <Heading as="h1" color="white" className="mb-8 text-[48px] tablet:text-[40px] mobile:text-[30px] leading-[1.2]">
              {t('heading')}
            </Heading>
            <div className="space-y-6">
              <Text color="white" size="sm" className="text-[14px] leading-[26px] tracking-[1.5px] opacity-80">
                {t('subheading')}
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Section Title with underline */}
      <section className="bg-background-dark pb-[40px] px-section-x">
        <div className="max-w-container mx-auto">
          <h3 className="font-anegra text-[30px] tablet:text-[26px] mobile:text-[22px] font-semibold tracking-[1.2px] text-center">
            <span className="text-foreground-white/70">{t('shortStylish')}</span>{' '}
            <span className="text-foreground-white relative inline-block">
              {t('instagramTikTok')}
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
              {t('youtubeVoices')}
              <Image
                src="/images/site/[CITYPNG.COM]Red Youtube Logo Symbol - 800x800.png"
                alt="YouTube"
                width={40}
                height={40}
                className="inline-block"
              />
            </span>{' '}
            <span className="text-foreground-white/70">{t('moreTalents')}</span>
          </h3>
          <TalentGrid talents={youtubeTalents} columns={4} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background-dark py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Text color="white" size="lg" className="mb-6 opacity-80">
            {t('interestedCollaborating')}
          </Text>
          <Button href="/contact">{tCommon('getInTouch')}</Button>
        </div>
      </section>

      {/* Brand Carousel */}
      <section className="bg-background-dark py-[50px] px-0">
        <BrandCarousel images={brandLogos} />
      </section>
    </>
  )
}
