import Heading from '@/components/ui/Heading'
import HeadingAccent from '@/components/ui/HeadingAccent'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import VideoPlayer from '@/components/ui/VideoPlayer'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { brandLogos } from '@/lib/data/brands'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'about CA Agency',
      'influencer agency Dubai',
      'talent management UAE',
      'social media agency',
      'content creator management',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/images/site/og-cover.webp',
          width: 1200,
          height: 630,
          alt: t('heading'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/site/og-cover.webp'],
    },
    alternates: {
      canonical: `https://caagency.com${locale === 'en' ? '' : `/${locale}`}/about`,
      languages: {
        en: 'https://caagency.com/about',
        ar: 'https://caagency.com/ar/about',
        ko: 'https://caagency.com/ko/about',
      },
    },
  }
}

// Video schema for about page videos
const videoSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'VideoObject',
        name: 'CA Agency Story',
        description: 'Learn about CA Agency, our mission, and how we connect brands with top influencers',
        contentUrl: 'https://caagency.com/videos/about-video-01.mp4',
        thumbnailUrl: 'https://caagency.com/images/site/og-cover.webp',
        uploadDate: '2024-01-01',
        publisher: {
          '@type': 'Organization',
          name: 'CA Agency',
          url: 'https://caagency.com',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'VideoObject',
        name: 'CA Agency Team',
        description: 'Meet the team behind CA Agency and our approach to influencer marketing',
        contentUrl: 'https://caagency.com/videos/about-video-02.mp4',
        thumbnailUrl: 'https://caagency.com/images/site/og-cover.webp',
        uploadDate: '2024-01-01',
        publisher: {
          '@type': 'Organization',
          name: 'CA Agency',
          url: 'https://caagency.com',
        },
      },
    },
  ],
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(videoSchema)}</script>

      {/* Hero Section — CSS load-in (LCP-safe) */}
      <section className="relative overflow-hidden bg-background-base py-[50px] px-section-x mobile:px-[10px]">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative z-[1] max-w-container mx-auto text-center">
          <Heading as="h1" color="dark" className="hero-rise hero-rise-1 text-[68px] tablet:text-[50px] mobile:text-[30px] leading-[80px] mobile:leading-[40px] font-light">
            {t('heading')}<br />
            {t('mission')} • {t('vision')}
          </Heading>
          <Text color="dark" size="lg" className="hero-rise hero-rise-2 mt-6 text-center tablet:text-[16px] mobile:text-[18px]">
            {t('intro')}
          </Text>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-background-base py-section-y-desktop mobile:py-[20px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col md:flex-row gap-[50px] tablet:gap-[20px] tablet:flex-wrap">
            {/* Left Column - Text */}
            <ScrollReveal yOffset={24} className="w-full md:w-1/2 tablet:w-full flex flex-col justify-center">
              <Heading as="h2" color="dark" className="mb-5 tracking-[0.1px]">
                CA Agency
              </Heading>
              <HeadingAccent align="start" className="mb-7" />
              <Text color="dark" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">{t('missionText')}</strong>
              </Text>
              <Text color="dark" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                {t('intro')}
              </Text>
              <Text color="dark" size="sm" className="mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">{t('visionText')}</strong>
              </Text>
            </ScrollReveal>

            {/* Right Column - Video */}
            <ScrollReveal delay={0.12} yOffset={24} className="w-full md:w-1/2 tablet:w-full">
              <div className="w-[90%] tablet:w-[70%] mobile:w-full rounded-[15px] overflow-hidden ring-1 ring-black/5 shadow-[0_22px_55px_rgba(0,0,0,0.15)]">
                <VideoPlayer
                  src="/videos/about-video-01.mp4"
                  aspectRatio="9:16"
                  autoplay
                  muted
                  loop
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Second Section - Reversed */}
      <section className="bg-background-base pb-section-y-desktop mobile:pb-0 px-section-x">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-[50px] tablet:gap-[20px] tablet:flex-wrap-reverse">
            {/* Left Column - Video */}
            <ScrollReveal delay={0.12} yOffset={24} className="w-full md:w-1/2 tablet:w-full">
              <div className="w-[90%] tablet:w-[70%] mobile:w-full rounded-[15px] overflow-hidden ring-1 ring-black/5 shadow-[0_22px_55px_rgba(0,0,0,0.15)]">
                <VideoPlayer
                  src="/videos/about-video-02.mp4"
                  aspectRatio="9:16"
                  autoplay
                  muted
                  loop
                />
              </div>
            </ScrollReveal>

            {/* Right Column - Text */}
            <ScrollReveal yOffset={24} className="w-full md:w-1/2 tablet:w-full flex flex-col justify-center">
              <Heading as="h2" color="dark" className="mb-5 tracking-[0.1px]">
                {t('subheading')}
              </Heading>
              <HeadingAccent align="start" className="mb-7" />
              <Text color="dark" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">{t('missionText')}</strong>
              </Text>
              <Text color="dark" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                {t('visionText')}
              </Text>
              <div>
                <Button href="/contact" variant="primary">
                  {tCommon('contactUs')}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Brand Carousel */}
      <section className="bg-background-base py-[50px] px-0">
        <BrandCarousel images={brandLogos} />
      </section>
    </>
  )
}
