import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import VideoPlayer from '@/components/ui/VideoPlayer'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import Image from 'next/image'

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

export const metadata = {
  title: 'About CA Agency - Our Mission • Our Expertise • Your Growth',
  description: 'Founded in 2020, CA Agency is a leading talent and influencer marketing agency representing top-tier social media creators across beauty, fashion, lifestyle, and entertainment industries.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-background-dark py-[50px] px-section-x mobile:px-[10px]">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="text-[68px] tablet:text-[50px] mobile:text-[30px] leading-[80px] mobile:leading-[40px] font-light">
            About CA Agency<br />
            Our Mission • Our Expertise • Your Growth
          </Heading>
          <Text color="white" size="lg" className="mt-6 text-center tablet:text-[16px] mobile:text-[18px]">
            At <strong>CA Agency</strong>, we bring brands to life by crafting authentic stories, building strategic influencer partnerships, and running data-driven digital campaigns that captivate audiences across <strong>Instagram, TikTok, and YouTube.</strong>
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
                <strong className="opacity-100">Founded in 2020, CA Agency is a leading talent and influencer marketing agency representing top-tier social media creators and public figures across the beauty, fashion, lifestyle, and entertainment industries.</strong>
              </Text>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                We're more than just a talent agency we're a strategic partner that bridges passion with opportunity and transforms creators into influential, recognizable brands.
              </Text>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                Built by digital industry veterans, CA Agency quickly became a game-changer in the influencer and digital media landscape. Our mission is to discover and develop talent, provide strategic brand partnerships, and drive long-term growth for both creators and the brands they work with.
              </Text>
              <Text color="white" size="sm" className="mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">What sets us apart is our ability to identify raw potential and elevate it with powerful personal branding, content strategy, and influencer campaign management. We're proud to be the agency behind some of today's most impactful social media personalities and public figures.</strong>
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
                Full-service influencer marketing agency
              </Heading>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">CA Agency is a full-service influencer marketing agency dedicated to helping brands grow through impactful creator partnerships, strategic content, and cross-platform campaigns.</strong>
              </Text>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                As your all-in-one digital marketing partner, we offer a 360° service experience that streamlines your influencer marketing efforts across platforms like Instagram, TikTok, and YouTube saving time, budget, and internal resources.
              </Text>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                What sets us apart? It's not just our proven track record of creating weekly high-performance campaigns for global brands. It's our commitment to your growth, flexibility, and long-term success in a fast-moving digital world.
              </Text>
              <Text color="white" size="sm" className="mb-6 mobile:text-[18px] mobile-extra:text-[15px] opacity-80">
                <strong className="opacity-100">At CA Agency, we go beyond services we build strategic partnerships that empower you to stay ahead of trends and competition. Let's transform your brand story into results through innovative influencer strategies that deliver measurable impact.</strong>
              </Text>
              <Button href="/contact" variant="primary">
                Contact us
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
