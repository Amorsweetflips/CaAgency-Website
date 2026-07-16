export type Testimonial = {
  quote: string
  personName: string
  jobTitle: string
  company: string
  logo?: string
  approved: boolean
}

export const testimonials: Testimonial[] = []

export function approvedTestimonials(records: Testimonial[]): Testimonial[] {
  return records.filter(
    ({ approved, quote, personName, jobTitle, company }) =>
      approved &&
      Boolean(quote.trim() && personName.trim() && jobTitle.trim() && company.trim())
  )
}
