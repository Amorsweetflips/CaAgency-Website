export const locationContentKeys = [
  'location-dubai',
  'location-uae',
  'location-saudi-arabia',
  'location-gcc',
  'location-korea',
  'location-usa',
  'location-uk',
  'location-canada',
  'location-australia',
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
  cta: {
    title: string
    description: string
    buttonLabel: string
    buttonHref: string
  }
}
