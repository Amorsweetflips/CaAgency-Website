import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/blocks/HeroSection'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import TalentGrid from '@/components/blocks/TalentGrid'
import { faqJsonLd } from '@/components/blocks/FAQ'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import Stagger from '@/components/ui/motion/Stagger'
import StaggerItem from '@/components/ui/motion/StaggerItem'
import { brandLogos } from '@/lib/data/brands'
import { featuredVideos } from '@/lib/data/home'
import { getSiteContent } from '@/lib/site-content/service'
import { getFeaturedTalents } from '@/lib/site-content/public'
import { HomePageContent } from '@/lib/site-content/site-types'
import SectionHeading from '@/components/ui/SectionHeading'
import Magnetic from '@/components/ui/Magnetic'
import { posterFor } from '@/lib/data/videos'

const VideoShowcase = dynamic(() => import('@/components/blocks/VideoShowcase'))
const MediaCarousel = dynamic(() => import('@/components/blocks/MediaCarousel'))
const FAQ = dynamic(() => import('@/components/blocks/FAQ'))
const Testimonials = dynamic(() => import('@/components/blocks/Testimonials'))
const ServicesOverview = dynamic(() => import('@/components/blocks/ServicesOverview'))

// ISR: prerender at build, refresh the DB-backed footer/content hourly.
export const revalidate = 3600

export const metadata: Metadata = {
  title: { absolute: 'CA Agency | Top Influencer Marketing Agency Dubai' },
  description:
    'Dubai influencer marketing agency & Korean skincare (K-beauty) specialists, connecting brands with top creators. Instagram, TikTok & YouTube campaigns. 18M+ followers. Get a free quote today!',
  keywords: [
    'influencer marketing Dubai',
    'Korean skincare influencer marketing',
    'K-beauty influencer agency',
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
        url: '/images/site/og-cover.webp',
        width: 1200,
        height: 630,
        alt: 'CA Agency - Influence • Digital • Marketing',
      },
    ],
  },
  alternates: {
    canonical: 'https://caagency.com',
    languages: {
      'x-default': 'https://caagency.com',
      'en-US': 'https://caagency.com',
      en: 'https://caagency.com',
      ar: 'https://caagency.com/ar',
      ko: 'https://caagency.com/ko',
    },
  },
}

export default async function HomePage() {
  const content = await getSiteContent<HomePageContent>('home')
  const talents = await getFeaturedTalents(content.talents.limit)

  return (
    <>
      <HeroSection
        title={content.hero.title}
        titleSecondLine={content.hero.titleSecondLine}
        subtitle={content.hero.subtitle}
        primaryCta={{ label: 'Get a Free Quote', href: '/contact' }}
        secondaryCta={{ label: 'See Our Work', href: '/work' }}
        carouselImages={content.hero.carouselImages.map((image) => ({
          url: image.src,
          alt: image.alt,
        }))}
      />

      <section className="bg-background-base py-sec mobile:py-sec-sm px-section-x">
        <div className="max-w-container mx-auto">
          <Stagger className="grid grid-cols-3 mobile:grid-cols-1 gap-8 mobile:gap-10 mb-16 mobile:mb-12 rounded-[24px] border border-black/10 bg-gradient-to-b from-black/[0.04] to-black/[0.01] py-12 mobile:py-10 px-6" stagger={0.12}>
            {content.stats.items.map((item, index) => (
              <StaggerItem
                key={item.label}
                className={`text-center ${
                  index < content.stats.items.length - 1
                    ? 'border-e border-black/10 mobile:border-e-0 mobile:border-b mobile:pb-10'
                    : ''
                }`}
              >
                <div className="font-anegra text-[80px] tablet:text-[60px] mobile:text-[56px] text-accent-red leading-none mb-3">
                  <AnimatedCounter end={item.value} suffix={item.suffix} useGrouping={false} />
                </div>
                <div className="font-work-sans text-[13px] tracking-[3px] text-black/65 uppercase">
                  {item.label}
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <ScrollReveal delay={0.3} yOffset={20}>
            <p className="font-anegra text-[32px] tablet:text-[26px] mobile:text-[22px] font-light leading-[1.4] text-black/85 text-center max-w-[800px] mx-auto">
              {content.stats.tagline}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.35} yOffset={20}>
            <p className="text-black/70 text-center max-w-[760px] mx-auto mt-8 text-[15px] leading-7">
              Explore our market-specific approach on the{' '}
              <Link href="/influencer-marketing-dubai" className="text-foreground-primary underline underline-offset-4">
                influencer marketing agency Dubai
              </Link>{' '}
              page and the{' '}
              <Link href="/influencer-marketing-uae" className="text-foreground-primary underline underline-offset-4">
                influencer marketing agency UAE
              </Link>{' '}
              page. For broader expansion, see our{' '}
              <Link href="/influencer-marketing-usa" className="text-foreground-primary underline underline-offset-4">
                influencer marketing agency USA
              </Link>{' '}
              and{' '}
              <Link href="/influencer-marketing-asia" className="text-foreground-primary underline underline-offset-4">
                influencer marketing agency Asia
              </Link>{' '}
              pages. We also run dedicated{' '}
              <Link href="/korean-skincare-influencer-marketing" className="text-foreground-primary underline underline-offset-4">
                Korean skincare influencer marketing
              </Link>{' '}
              campaigns for K-beauty brands.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-background-base py-sec-lg mobile:py-[72px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-[80px] mobile:gap-[50px]">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <ScrollReveal delay={0} yOffset={20}>
                <MediaCarousel items={content.intro.mediaItems.map((item) => ({
                  type: item.type === 'image' ? 'image' : 'video',
                  src: item.src,
                  alt: item.alt,
                  poster: item.poster ?? (item.type === 'video' ? posterFor(item.src) : undefined),
                }))} />
              </ScrollReveal>
            </div>
            <div className="w-full lg:w-1/2">
              <ScrollReveal delay={0.1} yOffset={20}>
                <SectionHeading align="start" eyebrow="Who We Are" title={content.intro.title} className="mb-7" />
              </ScrollReveal>
              {content.intro.paragraphs.map((paragraph, index) => (
                <ScrollReveal key={index} delay={0.15 + index * 0.05} yOffset={20}>
                  <Text color="dark" size="sm" className="mb-6 opacity-80">
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

      <ServicesOverview content={content.servicesOverview} eyebrow="Services" />

      <section className="bg-background-base py-sec mobile:py-sec-sm px-section-x">
        <div className="max-w-container mx-auto">
          <ScrollReveal delay={0} yOffset={20}>
            <SectionHeading eyebrow="Our Creators" title={content.talents.title} className="mb-12" />
          </ScrollReveal>
          <TalentGrid talents={talents} columns={6} />
          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="text-center mt-12">
              <Text color="dark" size="sm" className="max-w-[800px] mx-auto mb-8 opacity-70">
                {content.talents.description}
              </Text>
              <Button href={content.talents.buttonHref}>{content.talents.buttonLabel}</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-background-base py-sec mobile:py-sec-sm px-section-x border-t border-black/5">
        <div className="max-w-container mx-auto">
          <ScrollReveal delay={0} yOffset={20}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <SectionHeading align="start" eyebrow="Case Studies" title={content.featuredWork.title} />
              <div className="mt-6 md:mt-0">
                <Button href={content.featuredWork.buttonHref}>{content.featuredWork.buttonLabel}</Button>
              </div>
            </div>
          </ScrollReveal>
          <VideoShowcase videos={featuredVideos} columns={4} />
          <ScrollReveal delay={0.2} yOffset={20}>
            <Text color="dark" size="sm" className="mt-10 max-w-[700px] opacity-70">
              {content.featuredWork.description}
            </Text>
          </ScrollReveal>
        </div>
      </section>
      <Testimonials />
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <FAQ />
      <BrandCarousel images={brandLogos} />

      {/* Closing conversion CTA */}
      <section className="bg-accent-red py-sec mobile:py-sec-sm px-section-x">
        <ScrollReveal yOffset={24} className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            Ready to Grow Your Brand?
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            Tell us about your goals and we&apos;ll match you with the right creators &mdash; strategy, production, and reporting included.
          </Text>
          <Magnetic>
            <Button href="/contact" variant="light">
              Get a Free Quote
            </Button>
          </Magnetic>
        </ScrollReveal>
      </section>
    </>
  )
}
