import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import VideoShowcase from '@/components/blocks/VideoShowcase'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import VideoPlayer from '@/components/ui/VideoPlayer'
import { Metadata } from 'next'

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

const workVideos = [
  { src: '/videos/work/honor.mp4', alt: 'HONOR collaboration' },
  { src: '/videos/work/ysl-beauty.mp4', alt: 'YSL Beauty campaign' },
  { src: '/videos/work/morphe.mp4', alt: 'Morphe collaboration' },
  { src: '/videos/work/kylie-cosmetics.mp4', alt: 'Kylie Cosmetics campaign' },
  { src: '/videos/work/medicube.mp4', alt: 'Medicube skincare' },
  { src: '/videos/work/yesstyle.mp4', alt: 'YesStyle collaboration' },
  { src: '/videos/work/insta360x.mp4', alt: 'Insta360 X campaign' },
  { src: '/videos/work/mixsoon.mp4', alt: 'Mixsoon skincare' },
  { src: '/videos/work/idareen-kikomilano.mp4', alt: '@_idareen_ for Kiko Milano' },
  { src: '/videos/work/beatrix-juviasplace.mp4', alt: '@beatrixramosaj for Juvias Place' },
  { src: '/videos/work/fashionfreakk-nars.mp4', alt: '@thefashionfreakk for NARS' },
  { src: '/videos/work/huda-elemis.mp4', alt: '@huda_gash for Elemis' },
]

export const metadata: Metadata = {
  title: 'Our Work - Influencer Campaign Portfolio',
  description:
    'Explore CA Agency\'s influencer campaign portfolio. High-impact branded content for global brands like JBL, Sony, SHEIN, L\'Oréal Paris across Instagram Reels, TikTok & YouTube.',
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
  },
  alternates: {
    canonical: 'https://caagency.com/work',
  },
}

export default function WorkPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-background-dark py-section-y-desktop mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col md:flex-row gap-[50px]">
            <div className="w-full md:w-1/2">
              <Heading as="h1" color="white" className="mb-6 tracking-[0.1px]">
                Our work
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
              <div key={index} className="relative w-full aspect-[9/16] rounded-[20px] mobile:rounded-[15px] overflow-hidden">
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

      {/* Brand Carousel */}
      <section className="bg-background-dark py-[50px] px-0">
        <BrandCarousel images={brandLogos} />
      </section>
    </>
  )
}
