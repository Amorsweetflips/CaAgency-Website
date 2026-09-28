import { getTranslations } from 'next-intl/server'

export const faqKeys = [
  'whatDoesCaAgencyDo',
  'whoDoYouWorkWith',
  'whereDoYouOperate',
  'whatIsKBeauty',
  'howDoYouSelect',
  'whatPlatforms',
  'howMeasureSuccess',
  'howMuchCost',
  'howGetStarted',
] as const

// Built from the same translated strings the FAQ section renders, so the
// FAQPage markup always matches the visible answers in every locale.
export async function getFaqJsonLd(locale: string) {
  const t = await getTranslations({ locale, namespace: 'faq' })
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqKeys.map((key) => ({
      '@type': 'Question',
      name: t(`questions.${key}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`questions.${key}.answer`),
      },
    })),
  }
}
