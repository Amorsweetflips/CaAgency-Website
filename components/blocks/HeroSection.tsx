import CoverflowCarousel from './CoverflowCarousel'

interface HeroSectionProps {
  title: string
  titleSecondLine?: string
  subtitle?: React.ReactNode
  carouselImages?: Array<{ url: string; alt?: string; buttonText?: string; buttonLink?: string }>
}

export default function HeroSection({
  title,
  titleSecondLine,
  subtitle,
  carouselImages,
}: HeroSectionProps) {
  return (
    <section
      className="bg-background-dark py-[80px] mobile:py-[50px] px-section-x"
    >
      <div className="max-w-container mx-auto">
        {/* Keep above-the-fold content immediately visible for better FCP/LCP */}
        <div className="text-center mb-4 mobile:mb-3">
          <h1 className="font-anegra text-[68px] tablet:text-[50px] mobile:text-[36px] leading-[1.2] text-white text-center">
            {title}
            {titleSecondLine && (
              <>
                <br />
                <span className="text-[50px] tablet:text-[38px] mobile:text-[24px]">{titleSecondLine}</span>
              </>
            )}
          </h1>
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div className="text-center mb-10 mobile:mb-6 max-w-[900px] mx-auto">
            <p className="font-work-sans text-[14px] leading-[24px] tracking-[1.5px] text-white text-center">
              {subtitle}
            </p>
          </div>
        )}

        {/* Coverflow Carousel */}
        {carouselImages && carouselImages.length > 0 && (
          <div className="mt-6">
            <CoverflowCarousel images={carouselImages} autoplay={false} />
          </div>
        )}
      </div>
    </section>
  )
}
