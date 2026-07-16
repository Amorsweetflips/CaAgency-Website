import CoverflowCarousel from './CoverflowCarousel'
import Button from '@/components/ui/Button'
import Magnetic from '@/components/ui/Magnetic'
import type { Locale } from '@/i18n/config'

interface HeroCta {
  label: string
  href: string
}

interface HeroSectionProps {
  title: string
  titleSecondLine?: string
  subtitle?: React.ReactNode
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  carouselImages?: Array<{ url: string; alt?: string; buttonText?: string; buttonLink?: string }>
  locale?: Locale
}

export default function HeroSection({
  title,
  titleSecondLine,
  subtitle,
  primaryCta,
  secondaryCta,
  carouselImages,
  locale = 'en',
}: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-background-base py-[80px] mobile:py-[50px] px-section-x"
    >
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
          <div className="hero-rise hero-rise-2 text-center mb-8 mobile:mb-6 max-w-[640px] mx-auto">
            <p className="font-work-sans text-[17px] mobile:text-[16px] leading-[1.6] text-foreground-body text-center">
              {subtitle}
            </p>
          </div>
        )}

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <div className="hero-rise hero-rise-2 flex flex-wrap items-center justify-center gap-4 mb-10 mobile:mb-8">
            {primaryCta && (
              <Magnetic>
                <Button href={primaryCta.href} locale={locale} prefetch={false}>{primaryCta.label}</Button>
              </Magnetic>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href} locale={locale} variant="ghost" prefetch={false}>
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}

        {/* Coverflow Carousel — transform-only entrance so the LCP image is
            paintable immediately (no opacity fade) */}
        {carouselImages && carouselImages.length > 0 && (
          <div className="hero-rise-media mt-6">
            <CoverflowCarousel images={carouselImages} autoplay={false} locale={locale} />
          </div>
        )}
      </div>
    </section>
  )
}
