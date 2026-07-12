import { useTranslations } from 'next-intl'
import SectionHeading from '@/components/ui/SectionHeading'

const faqKeys = [
  'whatIsInfluencer',
  'howDoYouSelect',
  'whatPlatforms',
  'howMeasureSuccess',
  'whatIndustries',
  'howGetStarted',
] as const

export default function FAQ() {
  const t = useTranslations('faq')

  return (
    <section className="border-t border-black/5 bg-background-base px-section-x py-[100px] mobile:py-[70px]">
      <div className="mx-auto max-w-container">
        <div className="mx-auto max-w-[800px]">
          <SectionHeading eyebrow={t('eyebrow')} title={t('heading')} className="mb-12" />

          <div className="space-y-4">
            {faqKeys.map((key, index) => (
              <details
                key={key}
                name="home-faq"
                open={index === 0}
                className="group overflow-hidden rounded-xl border border-black/10 transition-colors duration-300 open:border-black/15 open:bg-background-soft"
              >
                <summary
                  id={`faq-question-${index}`}
                  className="flex min-h-[60px] w-full cursor-pointer list-none items-center justify-between px-6 py-5 text-left transition-colors marker:content-none hover:bg-black/5 mobile:py-4 [&::-webkit-details-marker]:hidden"
                >
                  <span className="pr-4 font-work-sans text-[16px] font-medium text-foreground-primary mobile:text-[14px]">
                    {t(`questions.${key}.question`)}
                  </span>
                  <span className="relative h-4 w-4 shrink-0" aria-hidden="true">
                    <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-accent-red" />
                    <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rotate-90 rounded-full bg-accent-red transition-transform duration-300 ease-out group-open:rotate-0" />
                  </span>
                </summary>
                <div id={`faq-answer-${index}`}>
                  <p className="px-6 pb-5 text-[14px] leading-relaxed text-foreground-body">
                    {t(`questions.${key}.answer`)}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
