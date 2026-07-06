'use client'

import SectionHeading from '@/components/ui/SectionHeading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Stagger from '@/components/ui/motion/Stagger'
import StaggerItem from '@/components/ui/motion/StaggerItem'

type ServicesOverviewContent = {
  title: string
  subtitle: string
  items: Array<{
    title: string
    description: string
    icon: string
  }>
  buttonLabel: string
  buttonHref: string
}

function renderIcon(icon: string) {
  switch (icon) {
    case 'spark':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4L24.5 13.2L34.7 14.7L27.35 21.8L29 32L20 27.2L11 32L12.65 21.8L5.3 14.7L15.5 13.2L20 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'person':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 34C8 27.4 13.4 22 20 22C26.6 22 32 27.4 32 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'video':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="8" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M17 15L25 18L17 21V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 32H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 28V32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 32L14 22L22 26L34 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28 10H34V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}

export default function ServicesOverview({
  content,
  eyebrow,
}: {
  content: ServicesOverviewContent
  eyebrow?: string
}) {
  return (
    <section className="bg-background-base py-[100px] mobile:py-[70px] px-section-x border-t border-black/5">
      <div className="max-w-container mx-auto">
        <ScrollReveal delay={0} yOffset={20}>
          <SectionHeading
            eyebrow={eyebrow}
            title={content.title}
            description={content.subtitle}
            className="mb-16 mobile:mb-12"
          />
        </ScrollReveal>

        <Stagger className="grid grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 gap-8 mobile:gap-6" stagger={0.1}>
          {content.items.map((service) => (
            <StaggerItem key={service.title} className="h-full">
              <div className="hover-lift group relative h-full overflow-hidden p-8 mobile:p-6 rounded-[20px] border border-black/10 bg-background-soft hover:border-black/15 hover:bg-white hover:shadow-e3">
                {/* Hover wash — decorative brand tint, compositor-only */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-red/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black/[0.04] ring-1 ring-black/10 text-foreground-primary/70 transition-all duration-500 group-hover:bg-accent-red/10 group-hover:ring-accent-red/40 group-hover:text-accent-red">
                  {renderIcon(service.icon)}
                </div>
                <h3 className="font-anegra text-[22px] mobile:text-[20px] text-foreground-primary tracking-[1px] mb-3">
                  {service.title}
                </h3>
                <Text color="dark" size="sm" className="opacity-70 group-hover:opacity-90 transition-opacity duration-500">
                  {service.description}
                </Text>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <ScrollReveal delay={0.4} yOffset={20}>
          <div className="text-center mt-14">
            <Button href={content.buttonHref}>{content.buttonLabel}</Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
