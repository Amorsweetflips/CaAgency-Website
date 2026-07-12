import { describe, expect, it } from 'vitest'
import { approvedTestimonials, type Testimonial } from '@/lib/data/testimonials'

describe('approvedTestimonials', () => {
  it('returns only complete approved records', () => {
    const records: Testimonial[] = [
      {
        quote: 'Approved quote',
        personName: 'Jane Doe',
        jobTitle: 'CMO',
        company: 'Example',
        approved: true,
      },
      {
        quote: 'Unapproved quote',
        personName: 'John Doe',
        jobTitle: 'Founder',
        company: 'Example 2',
        approved: false,
      },
    ]

    expect(approvedTestimonials(records)).toHaveLength(1)
    expect(approvedTestimonials(records)[0].personName).toBe('Jane Doe')
  })
})
