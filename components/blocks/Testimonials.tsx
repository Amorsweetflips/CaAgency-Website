'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { m, AnimatePresence, useReducedMotion } from 'motion/react'
import SectionHeading from '@/components/ui/SectionHeading'
import Text from '@/components/ui/Text'

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

// Static English testimonials for JSON-LD (SEO structured data)
const testimonialsForSchema = [
  {
    quote: 'CA Agency transformed our influencer marketing strategy. Their data-driven approach and network of creators helped us reach millions of engaged users. The ROI exceeded our expectations.',
    author: 'Sarah M.',
  },
  {
    quote: 'Working with CA Agency was seamless. They matched us with perfect influencers who genuinely connected with our audience. Our engagement increased by 300% during the campaign.',
    author: 'Ahmed K.',
  },
  {
    quote: "CA Agency's understanding of the Middle Eastern market is unmatched. They created authentic content that resonated with our target demographic across Instagram and TikTok.",
    author: 'Emma C.',
  },
  {
    quote: 'As a creator, CA Agency has been instrumental in growing my career. They connect me with amazing brands and handle everything professionally so I can focus on content.',
    author: 'Albina M.',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const t = useTranslations('testimonials')
  const reduce = useReducedMotion()

  // Get testimonials array from translations
  const testimonials = t.raw('items') as Testimonial[]

  // Gentle autoplay — paused on hover/focus and under reduced motion.
  const countRef = useRef(testimonials.length)
  countRef.current = testimonials.length
  useEffect(() => {
    if (reduce || isPaused || countRef.current <= 1) return
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % countRef.current)
    }, 6000)
    return () => clearInterval(id)
  }, [reduce, isPaused])

  return (
    <section className="bg-background-base py-[100px] mobile:py-[70px] px-section-x border-t border-black/5">
      <div className="max-w-container mx-auto">
        <SectionHeading eyebrow={t('eyebrow')} title={t('heading')} className="mb-12" />

        <div
          className="max-w-[820px] mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          {/* Quote card */}
          <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-gradient-to-b from-background-soft to-white px-12 py-14 tablet:px-8 mobile:px-6 mobile:py-10">
            {/* Decorative brand quote glyph */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-6 top-2 font-anegra leading-none text-accent-red/20 text-[140px] mobile:text-[90px] select-none"
            >
              &ldquo;
            </span>

            <div className="relative min-h-[180px] mobile:min-h-[230px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <m.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <blockquote className="text-center">
                    <Text color="dark" size="lg" className="italic opacity-90 leading-relaxed text-[20px] mobile:text-[16px]">
                      &ldquo;{testimonials[activeIndex].quote}&rdquo;
                    </Text>
                  </blockquote>
                  <div className="text-center mt-8">
                    <span className="mx-auto mb-4 block h-px w-10 bg-accent-red/50" aria-hidden="true" />
                    <p className="text-foreground-primary font-semibold text-[16px]">
                      {testimonials[activeIndex].author}
                    </p>
                    {[testimonials[activeIndex].role, testimonials[activeIndex].company]
                      .filter(Boolean).length > 0 && (
                      <p className="text-foreground-subtle text-[14px]">
                        {[testimonials[activeIndex].role, testimonials[activeIndex].company]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    )}
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="h-6 flex items-center justify-center"
                aria-label={`View testimonial ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              >
                <span
                  aria-hidden="true"
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-7 bg-accent-red' : 'w-2 bg-black/25 hover:bg-black/40'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
