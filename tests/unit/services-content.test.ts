import { describe, expect, it } from 'vitest'
import { services } from '@/lib/data/services'
import { caseStudies } from '@/lib/data/case-studies'
import { normalizeBrandedTitle } from '@/lib/seo/metadata'
import { faqPageJsonLd } from '@/lib/seo/schema'

function allCopy(service: (typeof services)[number]): string {
  return [
    service.title,
    service.tagline,
    service.summary,
    service.seoTitle,
    service.seoDescription,
    ...service.breakdown,
    ...service.deliverables,
    ...service.idealFor,
    ...service.process.flatMap((step) => [step.title, step.description]),
    ...service.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join('\n')
}

describe('service page content', () => {
  it.each(services.map((s) => [s.slug, s] as const))('%s has full long-form content', (_, service) => {
    expect(service.idealFor.length).toBeGreaterThanOrEqual(3)
    expect(service.process).toHaveLength(4)
    expect(service.faqs.length).toBeGreaterThanOrEqual(4)
    expect(allCopy(service).split(/\s+/).length).toBeGreaterThan(500)
  })

  it.each(services.map((s) => [s.slug, s] as const))('%s has a search title and description that fit', (_, service) => {
    expect(normalizeBrandedTitle(service.seoTitle)).toMatch(/\| CA Agency$/)
    expect(service.seoDescription.length).toBeGreaterThanOrEqual(110)
    expect(service.seoDescription.length).toBeLessThanOrEqual(160)
  })

  // Client decision (July 2026 round 3): service copy stays general and never
  // names client brands. Case-study brands are the client list.
  it('never names a client brand', () => {
    const brands = caseStudies.map((cs) => cs.brand)
    for (const service of services) {
      const copy = allCopy(service).toLowerCase()
      for (const brand of brands) {
        expect(copy, `${service.slug} mentions ${brand}`).not.toContain(brand.toLowerCase())
      }
    }
  })
})

describe('faqPageJsonLd', () => {
  it('maps question/answer pairs to FAQPage markup', () => {
    expect(faqPageJsonLd([{ question: 'Q?', answer: 'A.' }])).toEqual({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [{ '@type': 'Question', name: 'Q?', acceptedAnswer: { '@type': 'Answer', text: 'A.' } }],
    })
  })
})
