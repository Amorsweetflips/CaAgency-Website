// Server component on purpose: no hooks or handlers here, so the five cards'
// copy, SVGs, and lib/data/services stay out of the client bundle. The nested
// ScrollReveal/Stagger animations are client components on their own.
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Stagger from '@/components/ui/motion/Stagger'
import StaggerItem from '@/components/ui/motion/StaggerItem'
import { services as serviceDetails } from '@/lib/data/services'
import { cn } from '@/lib/utils'

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

// CMS content has no slug field, so cards map to their service subpage by
// position in the canonical five-service catalog. Extra CMS cards (if the
// array is ever overridden) fall back to the services listing page.
function serviceHref(index: number) {
  return serviceDetails[index] ? `/services/${serviceDetails[index].slug}` : '/services'
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
    case 'compass':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M26 14L22.5 22.5L14 26L17.5 17.5L26 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="20" cy="20" r="1.5" fill="currentColor" />
        </svg>
      )
    case 'chart':
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

        <Stagger
          className={cn(
            'grid tablet:grid-cols-2 mobile:grid-cols-1 gap-6 mobile:gap-5',
            // 5 cards: 6-col grid → centered 3 + 2 on desktop. Other counts
            // (e.g. a 4-card CMS override) keep the original 4-across layout.
            content.items.length === 5 ? 'grid-cols-6' : 'grid-cols-4'
          )}
          stagger={0.1}
        >
          {content.items.map((service, index) => (
            <StaggerItem
              key={service.title}
              className={cn(
                'h-full tablet:col-span-1 mobile:col-span-1',
                content.items.length === 5 && 'col-span-2',
                content.items.length === 5 && index === 3 && 'col-start-2 tablet:col-start-auto mobile:col-start-auto',
                content.items.length === 5 && index === 4 && 'tablet:col-span-2 mobile:col-span-1'
              )}
            >
              {/* July 2026 round 3: each square links to its service subpage
                  (same clickable pattern as the Work-page case studies) and
                  the cards are trimmed down a size. */}
              <Link
                href={serviceHref(index)}
                className="hover-lift group relative block h-full overflow-hidden p-6 mobile:p-5 rounded-[20px] border border-black/10 bg-background-soft hover:border-black/15 hover:bg-white hover:shadow-e3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red"
              >
                {/* Hover wash — decorative brand tint, compositor-only */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-red/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black/[0.04] ring-1 ring-black/10 text-foreground-primary/70 transition-all duration-500 group-hover:bg-accent-red/10 group-hover:ring-accent-red/40 group-hover:text-accent-red [&_svg]:h-[34px] [&_svg]:w-[34px]">
                  {renderIcon(service.icon)}
                </div>
                <h3 className="font-anegra text-[20px] mobile:text-[19px] text-foreground-primary tracking-[1px] mb-2">
                  {service.title}
                </h3>
                <Text color="dark" size="base" className="text-[15px] leading-[26px]">
                  {service.description}
                </Text>
                <span className="mt-4 inline-flex items-center gap-1.5 font-work-sans text-[13px] font-medium text-accent-red">
                  Explore service
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
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
