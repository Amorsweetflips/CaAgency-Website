import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import VideoPlayer from '@/components/ui/VideoPlayer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import HeadingAccent from '@/components/ui/HeadingAccent'
import Stagger from '@/components/ui/motion/Stagger'
import StaggerItem from '@/components/ui/motion/StaggerItem'
import { alternatesFor } from '@/lib/seo/alternates'
import { posterFor, VIDEO_PUBLICATION_DATE } from '@/lib/data/videos'
import { brandLogos } from '@/lib/data/brands'
import { caseStudyForVideo } from '@/lib/data/case-studies'


const workVideos = [
  { src: '/videos/work/honor.mp4', alt: 'HONOR collaboration', name: 'HONOR Collaboration', brand: 'HONOR' },
  { src: '/videos/work/ysl-beauty.mp4', alt: 'YSL Beauty campaign', name: 'YSL Beauty Campaign', brand: 'YSL Beauty' },
  { src: '/videos/work/morphe.mp4', alt: 'Morphe collaboration', name: 'Morphe Collaboration', brand: 'Morphe' },
  { src: '/videos/work/kylie-cosmetics.mp4', alt: 'Kylie Cosmetics campaign', name: 'Kylie Cosmetics Campaign', brand: 'Kylie Cosmetics' },
  { src: '/videos/work/medicube.mp4', alt: 'Medicube skincare', name: 'Medicube Skincare', brand: 'Medicube' },
  { src: '/videos/work/yesstyle.mp4', alt: 'YesStyle collaboration', name: 'YesStyle Collaboration', brand: 'YesStyle' },
  { src: '/videos/work/insta360x.mp4', alt: 'Insta360 X campaign', name: 'Insta360 X Campaign', brand: 'Insta360' },
  { src: '/videos/work/mixsoon.mp4', alt: 'Mixsoon skincare', name: 'Mixsoon Skincare', brand: 'Mixsoon' },
  { src: '/videos/work/idareen-kikomilano.mp4', alt: '@_idareen_ for Kiko Milano', name: 'Kiko Milano Campaign', brand: 'Kiko Milano' },
  { src: '/videos/work/beatrix-juviasplace.mp4', alt: '@beatrixramosaj for Juvias Place', name: 'Juvias Place Campaign', brand: 'Juvias Place' },
  { src: '/videos/work/fashionfreakk-nars.mp4', alt: '@thefashionfreakk for NARS', name: 'NARS Campaign', brand: 'NARS' },
  { src: '/videos/work/huda-elemis.mp4', alt: '@huda_gash for Elemis', name: 'Elemis Campaign', brand: 'Elemis' },
]

// VideoObject schema for SEO
const videoSchemaList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: workVideos.map((video, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'VideoObject',
      name: video.name,
      description: `Influencer marketing campaign for ${video.brand} by CA Agency`,
      contentUrl: `https://caagency.com${video.src}`,
      thumbnailUrl: `https://caagency.com${posterFor(video.src)}`,
      uploadDate: VIDEO_PUBLICATION_DATE,
      publisher: {
        '@type': 'Organization',
        name: 'CA Agency',
        url: 'https://caagency.com',
      },
    },
  })),
}

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'work' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'influencer campaigns',
      'branded content',
      'Instagram Reels',
      'TikTok content',
      'influencer portfolio',
      'brand collaborations',
      'campaign examples',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/images/site/og-cover.webp',
          width: 1200,
          height: 630,
          alt: 'CA Agency Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/site/og-cover.webp'],
    },
    alternates: alternatesFor(locale, '/work'),
  }
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'work' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(videoSchemaList)}</script>

      {/* Hero Section — CSS load-in (LCP-safe) */}
      <section className="relative overflow-hidden bg-background-base py-section-y-desktop mobile:py-[50px] px-section-x">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative z-[1] max-w-container mx-auto">
          <div className="flex flex-col md:flex-row gap-[50px]">
            <div className="hero-rise hero-rise-1 w-full md:w-1/2">
              <Heading as="h1" color="dark" className="mb-6 tracking-[0.1px]">
                {t('heading')}
              </Heading>
              <Text color="dark" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">{t('heroP1')}</strong>
              </Text>
              <Text color="dark" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                {t('heroP2')}
              </Text>
              <Text color="dark" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                {t('heroP3')}
              </Text>
              <Text color="dark" size="sm" className="mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">{t('heroP4')}</strong>
              </Text>
            </div>
            <div className="w-full md:w-1/2 hidden mobile:hidden"></div>
          </div>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="bg-background-base px-section-x">
        <div className="max-w-container mx-auto">
          <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mobile:gap-[15px]" stagger={0.07}>
            {workVideos.map((video, index) => {
              const study = caseStudyForVideo(video.src)
              return (
                <StaggerItem key={index} className="group hover-lift relative w-full aspect-9/16 rounded-[20px] mobile:rounded-[15px] overflow-hidden ring-1 ring-black/5 hover:ring-black/15 hover:shadow-e3">
                  <VideoPlayer
                    src={video.src}
                    poster={posterFor(video.src)}
                    aspectRatio="9:16"
                    autoplay
                    muted
                    loop
                    className="rounded-[20px] mobile:rounded-[15px]"
                  />
                  {study && (
                    // Case-study routes are English-only (site) pages, so use
                    // next/link directly — no locale prefix.
                    <Link
                      href={`/case-studies/${study.slug}`}
                      aria-label={`${video.brand} case study`}
                      className="absolute inset-0 z-[1] flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 focus-visible:opacity-100 group-hover:opacity-100 mobile:opacity-100"
                    >
                      <span className="w-full p-4 mobile:p-3">
                        <span className="block font-anegra text-[18px] mobile:text-[15px] font-semibold text-white leading-tight">
                          {video.brand}
                        </span>
                        <span className="block font-work-sans text-[13px] mobile:text-[12px] text-white/80">
                          View case study →
                        </span>
                      </span>
                    </Link>
                  )}
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background-base py-[80px] px-section-x border-t border-black/5">
        <ScrollReveal yOffset={24} className="max-w-container mx-auto text-center">
          <Heading as="h2" color="dark" className="mb-5 text-[40px] tablet:text-[32px] mobile:text-[26px]">
            {t('ctaTitle')}
          </Heading>
          <HeadingAccent className="mb-6" />
          <Text color="dark" size="base" className="max-w-[600px] mx-auto mb-8 opacity-80">
            {t('ctaText')}
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">{tCommon('getStarted')}</Button>
            <Button href="/services" variant="dark">{tCommon('ourServices')}</Button>
            <Button href="/talents" variant="dark">{tCommon('meetOurTalents')}</Button>
          </div>
        </ScrollReveal>
      </section>

      {/* Brand Carousel */}
      <section className="bg-background-base py-[50px] px-0">
        <BrandCarousel images={brandLogos} />
      </section>
    </>
  )
}
