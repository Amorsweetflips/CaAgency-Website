import { Metadata } from 'next'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import VideoPlayer from '@/components/ui/VideoPlayer'
import { brandLogos } from '@/lib/data/brands'
import { getSiteContent } from '@/lib/site-content/service'
import { WorkPageContent } from '@/lib/site-content/site-types'

export const metadata: Metadata = {
  title: 'Our Work - Influencer Campaign Portfolio',
  description:
    "Explore CA Agency's influencer campaign portfolio. High-impact branded content for global brands like JBL, Sony, SHEIN, L'Oréal Paris across Instagram Reels, TikTok & YouTube.",
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
    title: 'Our Work | CA Agency Campaign Portfolio',
    description:
      'Explore our influencer campaign portfolio. High-impact branded content for global brands across Instagram, TikTok & YouTube.',
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
    title: 'Our Work | CA Agency Campaign Portfolio',
    description: 'Explore our influencer campaign portfolio for global brands.',
    images: ['/images/site/og-image.webp'],
  },
  alternates: {
    canonical: 'https://caagency.com/work',
  },
}

export default async function WorkPage() {
  const content = await getSiteContent<WorkPageContent>('work')

  const videoSchemaList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: content.videos.map((video, index) => ({
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

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(videoSchemaList)}</script>

      <section className="bg-background-dark py-section-y-desktop mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col md:flex-row gap-[50px]">
            <div className="w-full md:w-1/2">
              <Heading as="h1" color="white" className="mb-6 tracking-[0.1px]">
                {content.intro.title}
              </Heading>
              {content.intro.paragraphs.map((paragraph, index) => (
                <Text
                  key={index}
                  color="white"
                  size="sm"
                  className={`${index === content.intro.paragraphs.length - 1 ? '' : 'mb-6'} mobile:text-[18px] mobile-extra:text-[15px] opacity-80`}
                >
                  {paragraph.text}
                </Text>
              ))}
            </div>
            <div className="w-full md:w-1/2 hidden mobile:hidden" />
          </div>
        </div>
      </section>

      <section className="bg-background-dark px-section-x">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mobile:gap-[15px]">
            {content.videos.map((video) => (
              <div key={video.src} className="relative w-full aspect-9/16 rounded-[20px] mobile:rounded-[15px] overflow-hidden">
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

      <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] tablet:text-[32px] mobile:text-[26px]">
            {content.cta.title}
          </Heading>
          <Text color="white" size="base" className="max-w-[600px] mx-auto mb-8 opacity-80">
            {content.cta.description}
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            {content.cta.buttons.map((button) => (
              <Button
                key={`${button.href}-${button.label}`}
                href={button.href}
                variant={button.variant === 'dark' || button.variant === 'light' ? button.variant : 'primary'}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-dark py-[50px] px-0">
        <BrandCarousel images={brandLogos} />
      </section>
    </>
  )
}
