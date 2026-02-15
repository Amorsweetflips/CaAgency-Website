'use client'

import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'

const services = [
  {
    title: 'Influencer Campaigns',
    description:
      'Strategic brand-creator partnerships across Instagram, TikTok & YouTube that drive real results.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4L24.5 13.2L34.7 14.7L27.35 21.8L29 32L20 27.2L11 32L12.65 21.8L5.3 14.7L15.5 13.2L20 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Talent Management',
    description:
      'Helping influencers build sustainable careers through paid collaborations and exclusive partnerships.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 34C8 27.4 13.4 22 20 22C26.6 22 32 27.4 32 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Content Creation',
    description:
      'Scroll-stopping branded content crafted to engage audiences and elevate brand visibility.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 15L25 18L17 21V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 32H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 28V32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Performance Marketing',
    description:
      'Data-driven campaigns with measurable ROI — from brand awareness to qualified traffic and conversions.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 32L14 22L22 26L34 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 10H34V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function ServicesOverview() {
  return (
    <section className="bg-background-dark py-[100px] mobile:py-[70px] px-section-x border-t border-white/5">
      <div className="max-w-container mx-auto">
        <ScrollReveal delay={0} yOffset={20}>
          <div className="text-center mb-16 mobile:mb-12">
            <Heading as="h2" color="white" className="text-[48px] tablet:text-[38px] mobile:text-[32px] mb-4">
              What We Do
            </Heading>
            <Text color="white" size="sm" className="max-w-[600px] mx-auto opacity-70">
              Full-service influencer marketing — from strategy to execution.
            </Text>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 gap-8 mobile:gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1} yOffset={20}>
              <div className="group p-8 mobile:p-6 rounded-[20px] border border-white/5 hover:border-white/15 transition-colors duration-500">
                <div className="text-white/60 group-hover:text-white/90 transition-colors duration-500 mb-6">
                  {service.icon}
                </div>
                <h3 className="font-anegra text-[22px] mobile:text-[20px] text-white tracking-[1px] mb-3">
                  {service.title}
                </h3>
                <Text color="white" size="sm" className="opacity-60 group-hover:opacity-80 transition-opacity duration-500">
                  {service.description}
                </Text>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} yOffset={20}>
          <div className="text-center mt-14">
            <Button href="/services">View all services</Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
