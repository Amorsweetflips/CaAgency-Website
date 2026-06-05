'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { m } from 'motion/react'
import Heading from '@/components/ui/Heading'

// FAQ keys for iteration
const faqKeys = [
  'whatIsInfluencer',
  'howDoYouSelect',
  'whatPlatforms',
  'howMeasureSuccess',
  'whatIndustries',
  'howGetStarted',
] as const

// Static English FAQs for JSON-LD (SEO structured data)
const faqsForSchema = [
  {
    question: 'What is influencer marketing?',
    answer: 'Influencer marketing is a form of social media marketing that uses endorsements and product mentions from influencers – individuals who have a dedicated social following and are viewed as experts within their niche. At CA Agency, we connect brands with the right influencers to create authentic, engaging campaigns that drive results.',
  },
  {
    question: 'How do you select influencers for brand campaigns?',
    answer: 'We use a data-driven approach to match brands with influencers. We analyze audience demographics, engagement rates, content quality, brand alignment, and past campaign performance. Our network includes over 18 million followers across Instagram, TikTok, and YouTube, allowing us to find the perfect fit for any campaign.',
  },
  {
    question: 'What platforms do you work with?',
    answer: 'We specialize in Instagram, TikTok, and YouTube – the three most impactful platforms for influencer marketing. Our creators excel at Instagram Reels, TikTok videos, YouTube content, and Stories across all platforms.',
  },
  {
    question: 'How do you measure campaign success?',
    answer: 'We track key metrics including reach, impressions, engagement rate, click-through rate, conversions, and ROI. We provide detailed analytics reports throughout and after each campaign, so you can see exactly how your investment is performing.',
  },
  {
    question: 'What industries do you work with?',
    answer: 'We work with brands across various industries including beauty, fashion, lifestyle, technology, food & beverage, travel, and more. Our diverse network of creators allows us to find the perfect match for any brand.',
  },
  {
    question: 'How do I get started with CA Agency?',
    answer: 'Getting started is easy! Simply reach out through our contact form or email us directly. We\'ll schedule a consultation to understand your goals, budget, and target audience, then create a customized influencer marketing strategy for your brand.',
  },
]

// JSON-LD schema for FAQ (static English for SEO)
export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqsForSchema.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const t = useTranslations('faq')

  return (
    <section className="bg-background-dark py-[100px] mobile:py-[70px] px-section-x border-t border-white/5">
      <div className="max-w-container mx-auto">
        <div className="max-w-[800px] mx-auto">
          <Heading as="h2" color="white" className="text-center mb-12 text-[48px] tablet:text-[38px] mobile:text-[32px]">
            {t('heading')}
          </Heading>

          <div className="space-y-4">
            {faqKeys.map((key, index) => {
              const isOpen = openIndex === index
              return (
              <div
                key={key}
                className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'border-white/20 bg-white/[0.03]' : 'border-white/10'
                }`}
              >
              <button
                id={`faq-question-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-6 py-5 mobile:py-4 min-h-[60px] flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-work-sans text-[16px] mobile:text-[14px] text-white font-medium pr-4">
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
                <m.div
                  id={`faq-answer-${index}`}
                  className="overflow-hidden"
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  aria-hidden={!isOpen}
                >
                  <p className="px-6 pb-5 text-white/70 text-[14px] leading-relaxed">
                    {t(`questions.${key}.answer`)}
                  </p>
                </m.div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
