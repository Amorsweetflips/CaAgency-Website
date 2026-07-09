import dynamic from 'next/dynamic'
import HeroSection from '@/components/blocks/HeroSection'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import { brandLogos } from '@/lib/data/brands'
import { featuredVideos } from '@/lib/data/home'
import TalentGrid from '@/components/blocks/TalentGrid'
import { getSiteContent } from '@/lib/site-content/service'
import type { HomePageContent } from '@/lib/site-content/site-types'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'

import { faqJsonLd } from '@/lib/data/faq-schema'
import { alternatesFor } from '@/lib/seo/alternates'
import SectionHeading from '@/components/ui/SectionHeading'
import Magnetic from '@/components/ui/Magnetic'
import { posterFor } from '@/lib/data/videos'

const VideoShowcase = dynamic(() => import('@/components/blocks/VideoShowcase'))
const MediaCarousel = dynamic(() => import('@/components/blocks/MediaCarousel'))
const FAQ = dynamic(() => import('@/components/blocks/FAQ').then(mod => ({ default: mod.default })))
const Testimonials = dynamic(() => import('@/components/blocks/Testimonials').then(mod => ({ default: mod.default })))

export const revalidate = 3600

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })

  return {
    title: { absolute: t('title') },
    description: t('description'),
    keywords: [
      'influencer marketing Dubai',
      'influencer agency UAE',
      'TikTok marketing',
      'Instagram influencers',
      'brand partnerships',
      'content creators Dubai',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: 'https://caagency.com',
      images: [
        {
          url: '/images/site/og-cover.webp',
          width: 1200,
          height: 630,
          alt: 'CA Agency - Influence • Digital • Marketing',
        },
      ],
    },
    alternates: alternatesFor(locale, ''),
  }
}

// Talent cards - 6 talents for homepage (using Blob storage URLs)
const talents = [
  {
    name: 'Albina Mavriqi',
    imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/albina-mavriqi.jpeg',
    instagramUrl: 'https://www.instagram.com/albina/',
    tiktokUrl: 'https://www.tiktok.com/@albinasglam/',
  },
  {
    name: 'Rebecca Ghaderi',
    imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/rebecca-ghaderi.jpeg',
    instagramUrl: 'https://www.instagram.com/rebeccaghaderi',
    tiktokUrl: 'https://www.tiktok.com/@rebeccaghaderii',
  },
  {
    name: 'Albulena Mavriqi',
    imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/lena-mavriqi.jpeg',
    instagramUrl: 'https://www.instagram.com/albulena.mavriqi/',
    tiktokUrl: 'https://www.tiktok.com/@lenamavriqii',
  },
  {
    name: 'Jay Sadiq',
    imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/jay-sadiq.jpeg',
    instagramUrl: 'https://www.instagram.com/jaysadiq_/',
    youtubeUrl: 'https://www.youtube.com/@Jaystyle_',
    tiktokUrl: 'https://www.tiktok.com/@jaysstyle_/',
  },
  {
    name: 'Anisa Hukmova',
    imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/anisa-hukmova.jpeg',
    instagramUrl: 'https://www.instagram.com/anisavisage/',
    tiktokUrl: 'https://www.tiktok.com/@anisavisage',
  },
  {
    name: 'Dariia Bordun',
    imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/dariia-bordun.jpeg',
    instagramUrl: 'https://www.instagram.com/_idareen_/',
    tiktokUrl: 'https://www.tiktok.com/@idareen_',
  },
]

// Media carousel items for "This is CA Agency" section — July 2026 round 3:
// client sequence Sydney → Dariia → Albina → Melly → Huda → Douglas, clean
// cuts (no watermarks), TOCOBO reel retired. `-clean` filenames because the
// original URLs served round-2 brand-marked bytes and are immutable-cached
// by visitors. Keep in sync with the `home` defaults in
// lib/site-content/definitions.ts.
const mediaCarouselItems = [
  { type: 'video' as const, src: '/videos/work/reel-DX2BnbDMhd9-clean.mp4', alt: 'TIRTIR matcha skincare campaign reel', poster: posterFor('/videos/work/reel-DX2BnbDMhd9-clean.mp4') },
  { type: 'video' as const, src: '/videos/work/reel-DT3Pv52jCqc-clean.mp4', alt: 'Rhode blush campaign reel', poster: posterFor('/videos/work/reel-DT3Pv52jCqc-clean.mp4') },
  { type: 'video' as const, src: '/videos/work/reel-DYKuGHLNs6F-clean.mp4', alt: 'Frozen gua sha skincare campaign reel', poster: posterFor('/videos/work/reel-DYKuGHLNs6F-clean.mp4') },
  { type: 'video' as const, src: '/videos/work/reel-DX2Bva6sJk6-clean.mp4', alt: 'Fenty Beauty campaign reel', poster: posterFor('/videos/work/reel-DX2Bva6sJk6-clean.mp4') },
  { type: 'video' as const, src: '/videos/work/reel-DK7rKHjOr6a-clean.mp4', alt: 'Bali Body campaign reel', poster: posterFor('/videos/work/reel-DK7rKHjOr6a-clean.mp4') },
  { type: 'video' as const, src: '/videos/work/reel-DT3Qg4sjHPm-clean.mp4', alt: 'Haruharu Wonder serum mist campaign reel', poster: posterFor('/videos/work/reel-DT3Qg4sjHPm-clean.mp4') },
]

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'home' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })
  const content = await getSiteContent<HomePageContent>('home')

  const carouselImages =
    content.hero?.carouselImages?.filter((img) => img?.src?.trim())?.map((image) => ({
      url: image.src,
      alt: image.alt,
    })) ?? []

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={content.hero?.title ?? 'CA Agency'}
        titleSecondLine={content.hero?.titleSecondLine ?? 'Influence • Digital • Marketing'}
        subtitle={t('heroSubtitle')}
        primaryCta={{ label: tCommon('enquirePartnerships'), href: '/contact' }}
        secondaryCta={{ label: tCommon('viewOurWork'), href: '/work' }}
        carouselImages={carouselImages.length > 0 ? carouselImages : undefined}
      />

      {/* Stats Section */}
      <section className="bg-background-base py-sec mobile:py-sec-sm px-section-x">
        <div className="max-w-container mx-auto">
          {/* Tagline */}
          <ScrollReveal delay={0.3} yOffset={20}>
            <p className="font-anegra text-[32px] tablet:text-[26px] mobile:text-[22px] font-light leading-[1.4] text-black/85 text-center max-w-[800px] mx-auto">
              {t('statsTagline')}
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* About CA Agency Section */}
      <section className="bg-background-base py-sec-lg mobile:py-[72px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-[80px] mobile:gap-[50px]">
            {/* Left Column - Media Carousel */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <ScrollReveal delay={0} yOffset={20}>
                <MediaCarousel items={mediaCarouselItems} />
              </ScrollReveal>
            </div>
            {/* Right Column - Text Content */}
            <div className="w-full lg:w-1/2">
              <ScrollReveal delay={0.1} yOffset={20}>
                <SectionHeading align="start" eyebrow={t('eyebrowIntro')} title={t('thisIsCA')} className="mb-7" />
              </ScrollReveal>
              <ScrollReveal delay={0.15} yOffset={20}>
                <Text color="dark" size="sm" className="mb-6 opacity-80">
                  {t('aboutDescription')}
                </Text>
              </ScrollReveal>
              <ScrollReveal delay={0.2} yOffset={20}>
                <Text color="dark" size="sm" className="mb-8 opacity-80">
                  {t('crossPlatform')}
                </Text>
              </ScrollReveal>
              <ScrollReveal delay={0.25} yOffset={20}>
                <Button href="/about">{tCommon('moreAboutUs')}</Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Talents Section */}
      <section className="bg-background-base py-sec mobile:py-sec-sm px-section-x">
        <div className="max-w-container mx-auto">
          <ScrollReveal delay={0} yOffset={20}>
            <SectionHeading eyebrow={t('eyebrowTalents')} title={t('meetTheTalents')} className="mb-12" />
          </ScrollReveal>
          <TalentGrid talents={talents} columns={6} />
          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="text-center mt-12">
              <Text color="dark" size="base" className="max-w-[800px] mx-auto mb-8 text-[16px] leading-[28px]">
                {t('talentsDescription')}
              </Text>
              <Button href="/talents">{tCommon('seeAllTalents')}</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="bg-background-base py-sec mobile:py-sec-sm px-section-x border-t border-black/5">
        <div className="max-w-container mx-auto">
          <ScrollReveal delay={0} yOffset={20}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <SectionHeading align="start" eyebrow={t('eyebrowWork')} title={t('featuredWork')} />
              <div className="mt-6 md:mt-0">
                <Button href="/work">{tCommon('viewAllWork')}</Button>
              </div>
            </div>
          </ScrollReveal>
          <VideoShowcase videos={featuredVideos} columns={4} />
          <ScrollReveal delay={0.2} yOffset={20}>
            <Text color="dark" size="base" className="mt-10 max-w-[700px] text-[16px] leading-[28px]">
              {t('workDescription')}
            </Text>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <FAQ />

      {/* Closing conversion CTA */}
      <section className="bg-accent-red py-sec mobile:py-sec-sm px-section-x">
        <ScrollReveal yOffset={24} className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            {t('closingCtaTitle')}
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            {t('closingCtaText')}
          </Text>
          <Magnetic>
            <Button href="/contact" variant="light">
              {t('closingCtaButton')}
            </Button>
          </Magnetic>
        </ScrollReveal>
      </section>

      {/* Brand Carousel */}
      <BrandCarousel images={brandLogos} />
    </>
  )
}
