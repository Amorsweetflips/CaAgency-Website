import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import VideoPlayer from '@/components/ui/VideoPlayer'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: string }>
}

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
          url: '/images/site/og-image.webp',
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
      images: ['/images/site/og-image.webp'],
    },
    alternates: {
      canonical: 'https://caagency.com/about',
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
        thumbnailUrl: 'https://caagency.com/images/site/og-image.webp',
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
        thumbnailUrl: 'https://caagency.com/images/site/og-image.webp',
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

      {/* Hero Section */}
      <section className="bg-background-dark py-[50px] px-section-x mobile:px-[10px]">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="text-[68px] tablet:text-[50px] mobile:text-[30px] leading-[80px] mobile:leading-[40px] font-light">
            {t('heading')}<br />
            {t('mission')} • {t('vision')}
          </Heading>
          <Text color="white" size="lg" className="mt-6 text-center tablet:text-[16px] mobile:text-[18px]">
            {t('intro')}
          </Text>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-background-dark py-section-y-desktop mobile:py-[20px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col md:flex-row gap-[50px] tablet:gap-[20px] tablet:flex-wrap">
            {/* Left Column - Text */}
            <div className="w-full md:w-1/2 tablet:w-full flex flex-col justify-center">
              <Heading as="h2" color="white" className="mb-6 tracking-[0.1px]">
                CA Agency
              </Heading>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">{t('missionText')}</strong>
              </Text>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                {t('intro')}
              </Text>
              <Text color="white" size="sm" className="mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">{t('visionText')}</strong>
              </Text>
            </div>

            {/* Right Column - Video */}
            <div className="w-full md:w-1/2 tablet:w-full">
              <div className="w-[90%] tablet:w-[70%] mobile:w-full">
                <VideoPlayer
                  src="/videos/about-video-01.mp4"
                  aspectRatio="9:16"
                  autoplay
                  muted
                  loop
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - Reversed */}
      <section className="bg-background-dark pb-section-y-desktop mobile:pb-0 px-section-x">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-[50px] tablet:gap-[20px] tablet:flex-wrap-reverse">
            {/* Left Column - Video */}
            <div className="w-full md:w-1/2 tablet:w-full">
              <div className="w-[90%] tablet:w-[70%] mobile:w-full">
                <VideoPlayer
                  src="/videos/about-video-02.mp4"
                  aspectRatio="9:16"
                  autoplay
                  muted
                  loop
                />
              </div>
            </div>

            {/* Right Column - Text */}
            <div className="w-full md:w-1/2 tablet:w-full flex flex-col justify-center">
              <Heading as="h2" color="white" className="mb-6 tracking-[0.1px]">
                {t('subheading')}
              </Heading>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">{t('missionText')}</strong>
              </Text>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                {t('visionText')}
              </Text>
              <Button href="/contact" variant="primary">
                {tCommon('contactUs')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Carousel */}
      <section className="bg-background-dark py-[50px] px-0">
        <BrandCarousel images={brandLogos} />
      </section>
    </>
  )
}
