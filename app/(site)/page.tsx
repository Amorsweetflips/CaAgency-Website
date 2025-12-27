import HeroSection from '@/components/blocks/HeroSection'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import TalentGrid from '@/components/blocks/TalentGrid'
import VideoShowcase from '@/components/blocks/VideoShowcase'
import MediaCarousel from '@/components/blocks/MediaCarousel'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CA Agency | Full-service influencer marketing agency',
  description: 'We connect brands with their target audience through engaging content, strategic partnerships, and high-impact campaigns across platforms like Instagram, TikTok, and YouTube.',
  openGraph: {
    title: 'CA Agency | Full-service influencer marketing agency',
    description: 'Full-service influencer marketing agency connecting brands with creators',
    type: 'website',
    url: 'https://caagency.com',
  },
}

// Brand logos for carousel (26 images)
const brandLogos = [
  { url: '/images/logos/brand-01.png', alt: 'Brand 1' },
  { url: '/images/logos/brand-02.png', alt: 'Brand 2' },
  { url: '/images/logos/brand-03.png', alt: 'Brand 3' },
  { url: '/images/logos/brand-04.png', alt: 'Brand 4' },
  { url: '/images/logos/brand-05.png', alt: 'Brand 5' },
  { url: '/images/logos/brand-06.png', alt: 'Brand 6' },
  { url: '/images/logos/brand-07.png', alt: 'Brand 7' },
  { url: '/images/logos/brand-08.png', alt: 'Brand 8' },
  { url: '/images/logos/brand-09.png', alt: 'Brand 9' },
  { url: '/images/logos/brand-10.png', alt: 'Brand 10' },
  { url: '/images/logos/brand-11.png', alt: 'Brand 11' },
  { url: '/images/logos/brand-12.png', alt: 'Brand 12' },
  { url: '/images/logos/brand-13.png', alt: 'Brand 13' },
  { url: '/images/logos/brand-14.png', alt: 'Brand 14' },
  { url: '/images/logos/brand-15.png', alt: 'Brand 15' },
  { url: '/images/logos/brand-16.png', alt: 'Brand 16' },
  { url: '/images/logos/brand-17.png', alt: 'Brand 17' },
  { url: '/images/logos/brand-18.png', alt: 'Brand 18' },
  { url: '/images/logos/brand-19.png', alt: 'Brand 19' },
  { url: '/images/logos/brand-20.png', alt: 'Brand 20' },
  { url: '/images/logos/brand-21.png', alt: 'Brand 21' },
  { url: '/images/logos/brand-22.png', alt: 'Brand 22' },
  { url: '/images/logos/brand-23.png', alt: 'Brand 23' },
  { url: '/images/logos/brand-24.png', alt: 'Brand 24' },
  { url: '/images/logos/brand-25.png', alt: 'Brand 25' },
  { url: '/images/logos/brand-26.png', alt: 'Brand 26' },
]

// Hero carousel images - using existing talent images
const heroImages = [
  {
    url: '/images/talents/rebecca-ghaderi.png',
    alt: 'Rebecca Ghaderi',
    buttonText: 'Talents',
    buttonLink: '/talents',
  },
  {
    url: '/images/talents/melly-sanchez.jpg',
    alt: 'Melly Sanchez',
  },
  {
    url: '/images/talents/lidia-jora.jpg',
    alt: 'Lidia Jora',
  },
  {
    url: '/images/talents/asel-akmatova.png',
    alt: 'Asel Akmatova',
  },
]

// Talent cards - 6 talents
const talents = [
  {
    name: 'Albina Mavriqi',
    imageUrl: '/images/talents/albina-mavriqi.jpg',
    instagramUrl: 'https://www.instagram.com/albina/',
    tiktokUrl: 'https://www.tiktok.com/@albinamavriqii/',
  },
  {
    name: 'Asel Akmatova',
    imageUrl: '/images/talents/asel-akmatova.png',
    instagramUrl: 'https://www.instagram.com/aselbbh/',
    youtubeUrl: 'https://www.youtube.com/@aselbbh',
    tiktokUrl: 'https://tiktok.com/@aselbbh/',
  },
  {
    name: 'Rebecca Ghaderi',
    imageUrl: '/images/talents/rebecca-ghaderi.png',
    instagramUrl: 'https://www.instagram.com/rebeccaghaderi/',
    tiktokUrl: 'https://www.tiktok.com/@rebeccaghaderii',
  },
  {
    name: 'Huda Belhaddad',
    imageUrl: '/images/talents/huda-belhaddad.jpeg',
    instagramUrl: 'https://www.instagram.com/huda_gash/',
    tiktokUrl: 'https://www.tiktok.com/@huda_gash/',
  },
  {
    name: 'Khutjo Matsoma',
    imageUrl: '/images/talents/khutjo-matsoma.png',
    instagramUrl: 'https://www.instagram.com/khutjomatsoma/',
    tiktokUrl: 'https://www.tiktok.com/@khutjo.matsoma/',
  },
  {
    name: 'Melly Sanchez',
    imageUrl: '/images/talents/melly-sanchez.jpg',
    instagramUrl: 'https://www.instagram.com/mellysanchez/',
    tiktokUrl: 'https://www.tiktok.com/@mellysanchez/',
  },
]

// Featured work videos
const featuredVideos = [
  { src: '/videos/work/honor.mp4', alt: 'HONOR collaboration' },
  { src: '/videos/work/ysl-beauty.mp4', alt: 'YSL Beauty campaign' },
  { src: '/videos/work/morphe.mp4', alt: 'Morphe collaboration' },
  { src: '/videos/work/kylie-cosmetics.mp4', alt: 'Kylie Cosmetics campaign' },
]

// Media carousel items for "This is CA Agency" section
const mediaCarouselItems = [
  { type: 'video' as const, src: '/videos/work/medicube.mp4' },
  { type: 'video' as const, src: '/videos/work/yesstyle.mp4' },
  { type: 'video' as const, src: '/videos/work/mixsoon.mp4' },
  { type: 'video' as const, src: '/videos/work/insta360x.mp4' },
  { type: 'video' as const, src: '/videos/work/idareen-kikomilano.mp4' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="CA Agency"
        titleSecondLine="Influence • Digital • Marketing"
        subtitle={
          <>
            We connect brands with their target audience through <strong>engaging content</strong>, strategic partnerships, and <strong>high-impact campaigns</strong> across platforms like <strong>Instagram</strong>, <strong>TikTok</strong>, and <strong>YouTube</strong>.
          </>
        }
        carouselImages={heroImages}
      />

      {/* Stats Section */}
      <section className="bg-background-dark py-[100px] mobile:py-[70px] px-section-x">
        <div className="max-w-container mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 mobile:grid-cols-1 gap-8 mobile:gap-10 mb-16 mobile:mb-12">
            <ScrollReveal delay={0} yOffset={20}>
              <div className="text-center border-r border-white/10 mobile:border-r-0 mobile:border-b mobile:pb-10">
                <div className="font-anegra text-[80px] tablet:text-[60px] mobile:text-[56px] text-white leading-none mb-3">
                  18M+
                </div>
                <div className="font-work-sans text-[13px] tracking-[3px] text-white/50 uppercase">
                  Total Followers
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1} yOffset={20}>
              <div className="text-center border-r border-white/10 mobile:border-r-0 mobile:border-b mobile:pb-10">
                <div className="font-anegra text-[80px] tablet:text-[60px] mobile:text-[56px] text-white leading-none mb-3">
                  500+
                </div>
                <div className="font-work-sans text-[13px] tracking-[3px] text-white/50 uppercase">
                  Campaigns
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} yOffset={20}>
              <div className="text-center">
                <div className="font-anegra text-[80px] tablet:text-[60px] mobile:text-[56px] text-white leading-none mb-3">
                  50+
                </div>
                <div className="font-work-sans text-[13px] tracking-[3px] text-white/50 uppercase">
                  Global Brands
                </div>
              </div>
            </ScrollReveal>
          </div>

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
                  This is CA Agency
                </Heading>
              </ScrollReveal>
              <ScrollReveal delay={0.15} yOffset={20}>
                <Text color="white" size="sm" className="mb-6 opacity-80">
                  Our influencer marketing agency bridges the gap between leading global brands and the social media influencer landscape by crafting data-driven, timeless campaigns that boost sales and brand visibility.
                </Text>
              </ScrollReveal>
              <ScrollReveal delay={0.2} yOffset={20}>
                <Text color="white" size="sm" className="mb-8 opacity-80">
                  We provide cross-platform influencer promotion on Instagram, Youtube and TikTok, partnering with brands to create memorable, high-impact campaigns.
                </Text>
              </ScrollReveal>
              <ScrollReveal delay={0.25} yOffset={20}>
                <Button href="/about">More about us</Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Talents Section */}
      <section className="bg-background-dark py-[100px] mobile:py-[70px] px-section-x">
        <div className="max-w-container mx-auto">
          <ScrollReveal delay={0} yOffset={20}>
            <div className="text-center mb-12">
              <Heading as="h2" color="white" className="text-[48px] tablet:text-[38px] mobile:text-[32px]">
                Meet the Talents
              </Heading>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1} yOffset={20}>
            <TalentGrid talents={talents} columns={6} />
          </ScrollReveal>
          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="text-center mt-12">
              <Text color="white" size="sm" className="max-w-[800px] mx-auto mb-8 opacity-70">
                Our content creators turn everyday moments into engaging stories that connect with audiences across Instagram, Youtube and TikTok.
              </Text>
              <Button href="/talents">See all talents</Button>
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
                  Featured Work
                </Heading>
              </div>
              <div className="mt-6 md:mt-0">
                <Button href="/work">View all work</Button>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1} yOffset={20}>
            <VideoShowcase videos={featuredVideos} columns={4} />
          </ScrollReveal>
          <ScrollReveal delay={0.2} yOffset={20}>
            <Text color="white" size="sm" className="mt-10 max-w-[700px] opacity-70">
              Through Instagram Reels, Youtube and TikTok, we've forged a path that merges creativity with purpose. Our collaborations with global partners create branded content that invites you to be a part of the story.
            </Text>
          </ScrollReveal>
        </div>
      </section>

      {/* Brand Carousel */}
      <BrandCarousel images={brandLogos} />
    </>
  )
}
