'use client'

import { useRef } from 'react'
import CoverflowCarousel from './CoverflowCarousel'
import ScrollReveal from '@/components/ui/ScrollReveal'

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
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="bg-background-dark py-[80px] mobile:py-[50px] px-section-x"
    >
      <div className="max-w-container mx-auto">
        {/* Title */}
        <ScrollReveal delay={0} yOffset={24} duration={0.6}>
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
        </ScrollReveal>

        {/* Subtitle */}
        {subtitle && (
          <ScrollReveal delay={0.15} yOffset={20} duration={0.6}>
            <div className="text-center mb-10 mobile:mb-6 max-w-[900px] mx-auto">
              <p className="font-work-sans text-[14px] leading-[24px] tracking-[1.5px] text-white text-center">
                {subtitle}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Coverflow Carousel */}
        {carouselImages && carouselImages.length > 0 && (
          <div className="mt-6">
            <CoverflowCarousel images={carouselImages} />
          </div>
        )}
      </div>
    </section>
  )
}
