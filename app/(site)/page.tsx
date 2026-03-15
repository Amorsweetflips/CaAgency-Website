import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import HeroSection from '@/components/blocks/HeroSection'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import TalentGrid from '@/components/blocks/TalentGrid'
import { faqJsonLd } from '@/components/blocks/FAQ'
import { reviewSchema } from '@/components/blocks/Testimonials'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { brandLogos } from '@/lib/data/brands'
import { featuredVideos } from '@/lib/data/home'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { HomePageContent } from '@/lib/site-content/site-types'

const VideoShowcase = dynamic(() => import('@/components/blocks/VideoShowcase'))
const MediaCarousel = dynamic(() => import('@/components/blocks/MediaCarousel'))
const FAQ = dynamic(() => import('@/components/blocks/FAQ'))
const Testimonials = dynamic(() => import('@/components/blocks/Testimonials'))
const ServicesOverview = dynamic(() => import('@/components/blocks/ServicesOverview'))

export const metadata: Metadata = {
  title: 'CA Agency | Top Influencer Marketing Agency Dubai',
  description:
    'Dubai influencer marketing agency connecting brands with top creators. Instagram, TikTok & YouTube campaigns. 18M+ followers. Get a free quote today!',
  keywords: [
    'influencer marketing Dubai',
    'influencer agency UAE',
    'TikTok marketing',
    'Instagram influencers',
    'brand partnerships',
    'content creators Dubai',
  ],
  openGraph: {
    title: 'CA Agency | Full-Service Influencer Marketing Agency Dubai',
    description:
      'Leading influencer marketing agency connecting global brands with top creators. Data-driven campaigns across Instagram, TikTok & YouTube.',
    type: 'website',
    url: 'https://caagency.com',
    images: [
      {
        url: '/images/site/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'CA Agency - Influence • Digital • Marketing',
      },
    ],
  },
  alternates: {
    canonical: 'https://caagency.com',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CA Agency',
  alternateName: 'CA Agency - Influence • Digital • Marketing',
  url: 'https://caagency.com',
  logo: 'https://caagency.com/logo.png',
  sameAs: [
    'https://www.instagram.com/caagency',
    'https://www.linkedin.com/company/ca-agency',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+971-58-510-7546',
    contactType: 'customer service',
    areaServed: ['US', 'GB', 'CA', 'AU', 'AE', 'SA', 'KR'],
    availableLanguage: ['English', 'Arabic'],
  },
}

export default async function HomePage() {
  const content = await getSiteContent<HomePageContent>('home')
  const talents = await getFeaturedTalents(content.talents.limit)

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <HeroSection
        title={content.hero.title}
        titleSecondLine={content.hero.titleSecondLine}
        subtitle={content.hero.subtitle}
        carouselImages={content.hero.carouselImages.map((image) => ({
          url: image.src,
          alt: image.alt,
        }))}
      />

      <section className="bg-background-dark py-[100px] mobile:py-[70px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-3 mobile:grid-cols-1 gap-8 mobile:gap-10 mb-16 mobile:mb-12">
            {content.stats.items.map((item, index) => (
              <ScrollReveal key={item.label} delay={index * 0.1} yOffset={20}>
                <div
                  className={`text-center ${
                    index < content.stats.items.length - 1
                      ? 'border-r border-white/10 mobile:border-r-0 mobile:border-b mobile:pb-10'
                      : ''
                  }`}
                >
                  <div className="font-anegra text-[80px] tablet:text-[60px] mobile:text-[56px] text-white leading-none mb-3">
                    <AnimatedCounter end={item.value} suffix={item.suffix} />
                  </div>
                  <div className="font-work-sans text-[13px] tracking-[3px] text-white/50 uppercase">
                    {item.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} yOffset={20}>
            <p className="font-anegra text-[32px] tablet:text-[26px] mobile:text-[22px] font-light leading-[1.4] text-white/90 text-center max-w-[800px] mx-auto">
              {content.stats.tagline}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-background-dark py-[120px] mobile:py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-[80px] mobile:gap-[50px]">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <ScrollReveal delay={0} yOffset={20}>
                <MediaCarousel items={content.intro.mediaItems.map((item) => ({
                  type: item.type === 'image' ? 'image' : 'video',
                  src: item.src,
                }))} />
              </ScrollReveal>
            </div>
            <div className="w-full lg:w-1/2">
              <ScrollReveal delay={0.1} yOffset={20}>
                <Heading as="h2" color="white" className="mb-6 text-[48px] tablet:text-[38px] mobile:text-[32px]">
                  {content.intro.title}
                </Heading>
              </ScrollReveal>
              {content.intro.paragraphs.map((paragraph, index) => (
                <ScrollReveal key={index} delay={0.15 + index * 0.05} yOffset={20}>
                  <Text color="white" size="sm" className="mb-6 opacity-80">
                    {paragraph.text}
                  </Text>
                </ScrollReveal>
              ))}
              <ScrollReveal delay={0.25} yOffset={20}>
                <Button href={content.intro.buttonHref}>{content.intro.buttonLabel}</Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <ServicesOverview content={content.servicesOverview} />

      <section className="bg-background-dark py-[100px] mobile:py-[70px] px-section-x">
        <div className="max-w-container mx-auto">
          <ScrollReveal delay={0} yOffset={20}>
            <div className="text-center mb-12">
              <Heading as="h2" color="white" className="text-[48px] tablet:text-[38px] mobile:text-[32px]">
                {content.talents.title}
              </Heading>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1} yOffset={20}>
            <TalentGrid talents={talents} columns={6} />
          </ScrollReveal>
          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="text-center mt-12">
              <Text color="white" size="sm" className="max-w-[800px] mx-auto mb-8 opacity-70">
                {content.talents.description}
              </Text>
              <Button href={content.talents.buttonHref}>{content.talents.buttonLabel}</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-background-dark py-[100px] mobile:py-[70px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto">
          <ScrollReveal delay={0} yOffset={20}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <Heading as="h2" color="white" className="text-[48px] tablet:text-[38px] mobile:text-[32px]">
                  {content.featuredWork.title}
                </Heading>
              </div>
              <div className="mt-6 md:mt-0">
                <Button href={content.featuredWork.buttonHref}>{content.featuredWork.buttonLabel}</Button>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1} yOffset={20}>
            <VideoShowcase videos={featuredVideos} columns={4} />
          </ScrollReveal>
          <ScrollReveal delay={0.2} yOffset={20}>
            <Text color="white" size="sm" className="mt-10 max-w-[700px] opacity-70">
              {content.featuredWork.description}
            </Text>
          </ScrollReveal>
        </div>
      </section>

      <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      <Testimonials />
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <FAQ />
      <BrandCarousel images={brandLogos} />
    </>
  )
}
