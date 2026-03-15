import { Metadata } from 'next'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import VideoPlayer from '@/components/ui/VideoPlayer'
import { brandLogos } from '@/lib/data/brands'
import { getSiteContent } from '@/lib/site-content/service'
import { AboutPageContent } from '@/lib/site-content/site-types'

export const metadata: Metadata = {
  title: 'About CA Agency | Influencer Marketing Experts Dubai',
  description:
    'Founded in 2020, CA Agency is a leading influencer marketing agency in Dubai. We represent top creators in beauty, fashion & lifestyle. Learn our story!',
  keywords: [
    'about CA Agency',
    'influencer agency Dubai',
    'talent management UAE',
    'social media agency',
    'content creator management',
  ],
  openGraph: {
    title: 'About CA Agency - Our Mission & Expertise',
    description:
      'Leading talent and influencer marketing agency in Dubai. We represent top-tier social media creators and build strategic brand partnerships.',
    images: [
      {
        url: '/images/site/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'About CA Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CA Agency - Our Mission & Expertise',
    description: 'Leading talent and influencer marketing agency in Dubai.',
    images: ['/images/site/og-image.webp'],
  },
  alternates: {
    canonical: 'https://caagency.com/about',
  },
}

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

export default async function AboutPage() {
  const content = await getSiteContent<AboutPageContent>('about')

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(videoSchema)}</script>

      <section className="bg-background-dark py-[50px] px-section-x mobile:px-[10px]">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="text-[68px] tablet:text-[50px] mobile:text-[30px] leading-[80px] mobile:leading-[40px] font-light whitespace-pre-line">
            {content.hero.title}
          </Heading>
          <Text color="white" size="lg" className="mt-6 text-center tablet:text-[16px] mobile:text-[18px]">
            {content.hero.subtitle}
          </Text>
        </div>
      </section>

      {content.sections.map((section, index) => (
        <section
          key={section.title}
          className={`bg-background-dark ${index === 0 ? 'py-section-y-desktop mobile:py-[20px]' : 'pb-section-y-desktop mobile:pb-0'} px-section-x`}
        >
          <div className="max-w-container mx-auto">
            <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse tablet:flex-wrap-reverse' : 'md:flex-row tablet:flex-wrap'} gap-[50px] tablet:gap-[20px]`}>
              <div className="w-full md:w-1/2 tablet:w-full flex flex-col justify-center">
                <Heading as="h2" color="white" className="mb-6 tracking-[0.1px]">
                  {section.title}
                </Heading>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <Text
                    key={paragraphIndex}
                    color="white"
                    size="sm"
                    className={`${paragraphIndex === section.paragraphs.length - 1 ? '' : 'mb-6'} mobile:text-[18px] mobile-extra:text-[15px] opacity-80`}
                  >
                    {paragraph.text}
                  </Text>
                ))}
                {section.buttonLabel && section.buttonHref && (
                  <div className="mt-6">
                    <Button href={section.buttonHref}>{section.buttonLabel}</Button>
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 tablet:w-full">
                <div className="w-[90%] tablet:w-[70%] mobile:w-full">
                  <VideoPlayer
                    src={section.videoUrl}
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
      ))}

      <section className="bg-background-dark py-[50px] px-0">
        <BrandCarousel images={brandLogos} />
      </section>
    </>
  )
}
