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
      className="relative overflow-hidden bg-background-base py-[80px] mobile:py-[50px] px-section-x"
    >
      {/* Soft brand glow — decorative, sits behind content */}
      <div className="hero-glow" aria-hidden="true" />

      <div className="relative z-[1] max-w-container mx-auto">
        {/* Keep above-the-fold content immediately visible for better FCP/LCP.
            Entrance uses CSS (hero-rise) so it animates on first paint without
            waiting for hydration — LCP-safe. */}
        <div className="text-center mb-4 mobile:mb-3">
          <h1 className="hero-rise hero-rise-1 font-anegra text-[68px] tablet:text-[50px] mobile:text-[36px] leading-[1.2] text-foreground-primary text-center">
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
          <div className="hero-rise hero-rise-2 text-center mb-10 mobile:mb-6 max-w-[900px] mx-auto">
            <p className="font-work-sans text-[14px] leading-[24px] tracking-[1.5px] text-foreground-body text-center">
              {subtitle}
            </p>
          </div>
        )}

        {/* Coverflow Carousel */}
        {carouselImages && carouselImages.length > 0 && (
          <div className="hero-rise hero-rise-3 mt-6">
            <CoverflowCarousel images={carouselImages} autoplay={false} />
          </div>
        )}
      </div>
    </section>
  )
}
