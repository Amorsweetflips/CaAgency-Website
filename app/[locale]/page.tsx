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
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import Stagger from '@/components/ui/motion/Stagger'
import StaggerItem from '@/components/ui/motion/StaggerItem'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import { faqJsonLd } from '@/components/blocks/FAQ'
import { reviewSchema } from '@/components/blocks/Testimonials'

const VideoShowcase = dynamic(() => import('@/components/blocks/VideoShowcase'))
const MediaCarousel = dynamic(() => import('@/components/blocks/MediaCarousel'))
const FAQ = dynamic(() => import('@/components/blocks/FAQ').then(mod => ({ default: mod.default })))
const Testimonials = dynamic(() => import('@/components/blocks/Testimonials').then(mod => ({ default: mod.default })))
const ServicesOverview = dynamic(() => import('@/components/blocks/ServicesOverview'))

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
    alternates: {
      canonical: `https://caagency.com${locale === 'en' ? '' : `/${locale}`}`,
      languages: {
        'x-default': 'https://caagency.com',
        'en-US': 'https://caagency.com',
        en: 'https://caagency.com',
        ar: 'https://caagency.com/ar',
        ko: 'https://caagency.com/ko',
      },
    },
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

// Media carousel items for "This is CA Agency" section
const mediaCarouselItems = [
  { type: 'video' as const, src: '/videos/work/medicube.mp4' },
  { type: 'video' as const, src: '/videos/work/yesstyle.mp4' },
  { type: 'video' as const, src: '/videos/work/mixsoon.mp4' },
  { type: 'video' as const, src: '/videos/work/insta360x.mp4' },
  { type: 'video' as const, src: '/videos/work/idareen-kikomilano.mp4' },
]

export default async function HomePage({ params }: Props) {
  const { locale } = await params
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
        subtitle={
          content.hero?.subtitle ?? (
            <>
              We connect brands with their target audience through <strong>engaging content</strong>, strategic partnerships, and <strong>high-impact campaigns</strong> across platforms like <strong>Instagram</strong>, <strong>TikTok</strong>, and <strong>YouTube</strong>.
            </>
          )
        }
        carouselImages={carouselImages.length > 0 ? carouselImages : undefined}
      />

      {/* Stats Section */}
      <section className="bg-background-dark py-[100px] mobile:py-[70px] px-section-x">
        <div className="max-w-container mx-auto">
          {/* Stats Grid */}
          <Stagger className="grid grid-cols-3 mobile:grid-cols-1 gap-8 mobile:gap-10 mb-16 mobile:mb-12 rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] py-12 mobile:py-10 px-6" stagger={0.12}>
            <StaggerItem className="text-center border-e border-white/10 mobile:border-e-0 mobile:border-b mobile:pb-10">
              <div className="font-anegra text-[80px] tablet:text-[60px] mobile:text-[56px] text-white leading-none mb-3">
                <AnimatedCounter end={18} suffix="M+" useGrouping={false} />
              </div>
              <div className="font-work-sans text-[13px] tracking-[3px] text-white/50 uppercase">
                {t('stats.followers')}
              </div>
            </StaggerItem>
            <StaggerItem className="text-center border-e border-white/10 mobile:border-e-0 mobile:border-b mobile:pb-10">
              <div className="font-anegra text-[80px] tablet:text-[60px] mobile:text-[56px] text-white leading-none mb-3">
                <AnimatedCounter end={3000} suffix="+" useGrouping={false} />
              </div>
              <div className="font-work-sans text-[13px] tracking-[3px] text-white/50 uppercase">
                {t('stats.campaigns')}
              </div>
            </StaggerItem>
            <StaggerItem className="text-center">
              <div className="font-anegra text-[80px] tablet:text-[60px] mobile:text-[56px] text-white leading-none mb-3">
                <AnimatedCounter end={150} suffix="+" useGrouping={false} />
              </div>
              <div className="font-work-sans text-[13px] tracking-[3px] text-white/50 uppercase">
                {t('stats.brands')}
              </div>
            </StaggerItem>
          </Stagger>

          {/* Tagline */}
          <ScrollReveal delay={0.3} yOffset={20}>
            <p className="font-anegra text-[32px] tablet:text-[26px] mobile:text-[22px] font-light leading-[1.4] text-white/90 text-center max-w-[800px] mx-auto">
              We create scroll-stopping content for global brands like JBL, Sony, SHEIN, Amazon, and L'Oréal Paris.
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* About CA Agency Section */}
      <section className="bg-background-dark py-[120px] mobile:py-[80px] px-section-x">
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
                <Heading as="h2" color="white" className="mb-6 text-[48px] tablet:text-[38px] mobile:text-[32px]">
                  {t('thisIsCA')}
                </Heading>
              </ScrollReveal>
              <ScrollReveal delay={0.15} yOffset={20}>
                <Text color="white" size="sm" className="mb-6 opacity-80">
                  {t('aboutDescription')}
                </Text>
              </ScrollReveal>
              <ScrollReveal delay={0.2} yOffset={20}>
                <Text color="white" size="sm" className="mb-8 opacity-80">
                  We provide cross-platform influencer promotion on Instagram, Youtube and TikTok, partnering with brands to create memorable, high-impact campaigns.
                </Text>
              </ScrollReveal>
              <ScrollReveal delay={0.25} yOffset={20}>
                <Button href="/about">{tCommon('moreAboutUs')}</Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview (parity with the English homepage) */}
      <ServicesOverview content={content.servicesOverview} />

      {/* Talents Section */}
      <section className="bg-background-dark py-[100px] mobile:py-[70px] px-section-x">
        <div className="max-w-container mx-auto">
          <ScrollReveal delay={0} yOffset={20}>
            <div className="text-center mb-12">
              <Heading as="h2" color="white" className="text-[48px] tablet:text-[38px] mobile:text-[32px]">
                {t('meetTheTalents')}
              </Heading>
            </div>
          </ScrollReveal>
          <TalentGrid talents={talents} columns={6} />
          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="text-center mt-12">
              <Text color="white" size="sm" className="max-w-[800px] mx-auto mb-8 opacity-70">
                {t('talentsDescription')}
              </Text>
              <Button href="/talents">{tCommon('seeAllTalents')}</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="bg-background-dark py-[100px] mobile:py-[70px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto">
          <ScrollReveal delay={0} yOffset={20}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <Heading as="h2" color="white" className="text-[48px] tablet:text-[38px] mobile:text-[32px]">
                  {t('featuredWork')}
                </Heading>
              </div>
              <div className="mt-6 md:mt-0">
                <Button href="/work">{tCommon('viewAllWork')}</Button>
              </div>
            </div>
          </ScrollReveal>
          <VideoShowcase videos={featuredVideos} columns={4} />
          <ScrollReveal delay={0.2} yOffset={20}>
            <Text color="white" size="sm" className="mt-10 max-w-[700px] opacity-70">
              {t('workDescription')}
            </Text>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      <Testimonials />

      {/* FAQ Section */}
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <FAQ />

      {/* Brand Carousel */}
      <BrandCarousel images={brandLogos} />
    </>
  )
}
