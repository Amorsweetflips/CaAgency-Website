'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { m } from 'motion/react'
import SectionHeading from '@/components/ui/SectionHeading'

// FAQ keys for iteration
const faqKeys = [
  'whatIsInfluencer',
  'howDoYouSelect',
  'whatPlatforms',
  'howMeasureSuccess',
  'whatIndustries',
  'howGetStarted',
] as const

// JSON-LD FAQ schema lives in lib/data/faq-schema.ts — exporting it from this
// 'use client' module handed server pages a client-reference proxy, which
// stringified to an empty ld+json tag.

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const t = useTranslations('faq')

  return (
    <section className="bg-background-base py-[100px] mobile:py-[70px] px-section-x border-t border-black/5">
      <div className="max-w-container mx-auto">
        <div className="max-w-[800px] mx-auto">
          <SectionHeading eyebrow={t('eyebrow')} title={t('heading')} className="mb-12" />

          <div className="space-y-4">
            {faqKeys.map((key, index) => {
              const isOpen = openIndex === index
              return (
              <div
                key={key}
                className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'border-black/15 bg-background-soft' : 'border-black/10'
                }`}
              >
              <button
                id={`faq-question-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-6 py-5 mobile:py-4 min-h-[60px] flex items-center justify-between text-left hover:bg-black/5 transition-colors"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-work-sans text-[16px] mobile:text-[14px] text-foreground-primary font-medium pr-4">
                  {t(`questions.${key}.question`)}
                </span>
                {/* Animated plus → minus icon */}
                <span className="relative w-4 h-4 shrink-0" aria-hidden="true">
                  <span className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 rounded-full bg-accent-red" />
                  <m.span
                    className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 rounded-full bg-accent-red"
                    initial={false}
                    animate={{ rotate: isOpen ? 0 : 90 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`faq-answer${isOpen ? ' faq-answer-open' : ''}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  aria-hidden={!isOpen}
                >
                  <div>
                    <p className="px-6 pb-5 text-foreground-body text-[14px] leading-relaxed">
                      {t(`questions.${key}.answer`)}
                    </p>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
