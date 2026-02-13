import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import VideoPlayer from '@/components/ui/VideoPlayer'

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
      thumbnailUrl: 'https://caagency.com/images/site/og-image.webp',
      uploadDate: '2024-01-01',
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
          url: '/images/site/og-image.webp',
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
      images: ['/images/site/og-image.webp'],
    },
    alternates: {
      canonical: `https://caagency.com/${locale}/work`,
    },
  }
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'work' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchemaList) }}
      />

      {/* Hero Section */}
      <section className="bg-background-dark py-section-y-desktop mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col md:flex-row gap-[50px]">
            <div className="w-full md:w-1/2">
              <Heading as="h1" color="white" className="mb-6 tracking-[0.1px]">
                {t('heading')}
              </Heading>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">Step into the world of CA Agency where creativity meets strategy to deliver branded content that captivates, engages, and drives real results.</strong>
              </Text>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                As a content creation and influencer marketing agency, we specialize in producing high-impact short-form video content for platforms like <strong className="opacity-100">Instagram Reels, Youtube shorts</strong> and <strong className="opacity-100">TikTok</strong>. Our campaigns go beyond trends they craft immersive brand experiences that connect with audiences and inspire action.
              </Text>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                Through strategic collaborations with global brands and top-tier creators, we bring stories to life using visual storytelling, creative direction, and data-driven planning.
              </Text>
              <Text color="white" size="sm" className="mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">Messages that matter. In today's fast-paced digital landscape, we focus on purposeful content that leaves a lasting impression. CA Agency works with influencers who align with your brand values creating authentic Reels and TikToks that not only follow trends, but lead them.</strong>
              </Text>
            </div>
            <div className="w-full md:w-1/2 hidden mobile:hidden"></div>
          </div>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="bg-background-dark px-section-x">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mobile:gap-[15px]">
            {workVideos.map((video, index) => (
              <div key={index} className="relative w-full aspect-9/16 rounded-[20px] mobile:rounded-[15px] overflow-hidden">
                <VideoPlayer
                  src={video.src}
                  aspectRatio="9:16"
                  autoplay
                  muted
                  loop
                  className="rounded-[20px] mobile:rounded-[15px]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] tablet:text-[32px] mobile:text-[26px]">
            Ready to Create Your Campaign?
          </Heading>
          <Text color="white" size="base" className="max-w-[600px] mx-auto mb-8 opacity-80">
            Let&apos;s bring your brand story to life with authentic influencer partnerships that drive real results.
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">{tCommon('getStarted')}</Button>
            <Button href="/services" variant="dark">{tCommon('ourServices')}</Button>
            <Button href="/talents" variant="dark">{tCommon('meetOurTalents')}</Button>
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
