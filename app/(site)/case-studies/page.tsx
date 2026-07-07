import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Stagger from '@/components/ui/motion/Stagger'
import StaggerItem from '@/components/ui/motion/StaggerItem'
import { caseStudies } from '@/lib/data/case-studies'
import { posterFor } from '@/lib/data/videos'

export const metadata: Metadata = {
  title: 'Influencer Marketing Case Studies',
  description:
    'How CA Agency runs influencer campaigns for brands like YSL Beauty, NARS, HONOR, and Medicube — the brief, the approach, and the work itself.',
  keywords: [
    'influencer marketing case studies',
    'influencer campaign examples',
    'beauty influencer campaigns',
    'creator marketing results',
  ],
  openGraph: {
    title: 'Influencer Marketing Case Studies',
    description:
      'How CA Agency runs influencer campaigns for brands like YSL Beauty, NARS, HONOR, and Medicube.',
    images: [{ url: '/images/site/og-cover.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Influencer Marketing Case Studies',
    description:
      'How CA Agency runs influencer campaigns for brands like YSL Beauty, NARS, HONOR, and Medicube.',
  },
  alternates: {
    canonical: 'https://caagency.com/case-studies',
  },
}

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: caseStudies.map((cs, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: `${cs.brand} Influencer Marketing Case Study`,
    url: `https://caagency.com/case-studies/${cs.slug}`,
  })),
}

export default function CaseStudiesPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(listSchema)}</script>

      {/* Hero — CSS load-in (LCP-safe) */}
      <section className="relative overflow-hidden bg-background-base py-[80px] tablet:py-[60px] mobile:py-[50px] px-section-x">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative z-[1] max-w-container mx-auto">
          <div className="hero-rise-media max-w-[800px]">
            <span className="mb-3 block font-jost text-[13px] font-medium uppercase tracking-[0.2em] text-accent-red">
              Case Studies
            </span>
            <Heading as="h1" color="dark" className="mb-6 text-[48px] tablet:text-[40px] mobile:text-[32px]">
              The Work, and How It Happened
            </Heading>
            <Text color="dark" size="lg" className="opacity-80">
              Behind every campaign video is a brief, a creator match, and a production process.
              These case studies show how we run influencer campaigns for beauty, skincare, and
              tech brands — from first call to final delivery.
            </Text>
          </div>
        </div>
      </section>

      {/* Case study grid */}
      <section className="bg-background-base px-section-x pb-sec-sm">
        <div className="max-w-container mx-auto">
          <Stagger className="grid grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-[20px]" stagger={0.06}>
            {caseStudies.map((cs) => (
              <StaggerItem key={cs.slug}>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="hover-lift group flex h-full flex-col overflow-hidden rounded-card border border-black/10 bg-background-base shadow-e1 hover:shadow-e3 transition-shadow"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={posterFor(cs.videoSrc)}
                      alt={`${cs.brand} campaign video still`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 420px"
                    />
                  </div>
                  <div className="flex grow flex-col p-6">
                    <span className="mb-2 block font-jost text-[12px] font-medium uppercase tracking-[0.15em] text-accent-red">
                      {cs.vertical}
                    </span>
                    <p className="mb-2 font-anegra text-[22px] font-semibold leading-tight text-foreground-primary group-hover:text-accent-red transition-colors">
                      {cs.title}
                    </p>
                    <p className="mb-4 grow font-work-sans text-[14px] leading-[1.7] text-foreground-body">
                      {cs.summary}
                    </p>
                    <span className="font-work-sans text-[14px] font-medium text-accent-red">
                      Read the case study →
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background-base py-[80px] px-section-x border-t border-black/5">
        <ScrollReveal yOffset={24} className="max-w-container mx-auto text-center">
          <Heading as="h2" color="dark" className="mb-6 text-[40px] mobile:text-[28px]">
            Your Brand Could Be Next
          </Heading>
          <Text color="dark" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-80">
            Tell us what you&apos;re launching and we&apos;ll match you with the right creators.
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">Start Your Campaign</Button>
            <Button href="/work" variant="dark">Watch the Work</Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
