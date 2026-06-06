export const locationContentKeys = [
  'location-dubai',
  'location-uae',
  'location-asia',
  'location-saudi-arabia',
  'location-gcc',
  'location-korea',
  'location-usa',
  'location-uk',
  'location-canada',
  'location-australia',
  'location-korean-skincare',
] as const

export type LocationContentKey = (typeof locationContentKeys)[number]

export type LocationPageContent = {
  hero: {
    title: string
    subtitle: string
    primaryButtonLabel: string
    primaryButtonHref: string
    secondaryButtonLabel: string
    secondaryButtonHref: string
  }
  stats: Array<{
    value: string
    label: string
  }>
  // Optional scrolling brand ribbon. Pages that omit it render exactly as before.
  marquee?: {
    items: string[]
  }
  // Optional real-campaign video strip. Pages that omit it render exactly as before.
  caseStudies?: {
    title: string
    subtitle?: string
    items: Array<{
      src: string
      brand: string
      name: string
    }>
  }
  // Optional long-form intro for content depth / keyword coverage.
  // Pages that omit it render exactly as before.
  intro?: {
    heading: string
    paragraphs: Array<{ text: string }>
  }
  highlights: {
    title: string
    items: Array<{
      title: string
      description: string
    }>
  }
  talents: {
    title: string
    buttonLabel: string
    buttonHref: string
  }
  industries: {
    title: string
    items: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  // Optional FAQ — when present, the renderer also emits FAQPage JSON-LD.
  faq?: {
    title: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  cta: {
    title: string
    description: string
    buttonLabel: string
    buttonHref: string
  }
}
