import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import VideoPlayer from '@/components/ui/VideoPlayer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import HeadingAccent from '@/components/ui/HeadingAccent'
import { caseStudies, getCaseStudy } from '@/lib/data/case-studies'
import { posterFor, VIDEO_PUBLICATION_DATE } from '@/lib/data/videos'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    return { title: 'Case Study Not Found' }
  }

  const title = `${study.brand} Influencer Marketing Case Study`

  return {
    title,
    description: study.summary,
    keywords: [
      `${study.brand} influencer campaign`,
      'influencer marketing case study',
      study.vertical.toLowerCase(),
      ...study.platforms.map((p) => `${p} campaign`),
    ],
    openGraph: {
      title,
      description: study.summary,
      images: [{ url: '/images/site/og-cover.webp', width: 1200, height: 630 }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: study.summary,
    },
    alternates: {
      canonical: `https://caagency.com/case-studies/${slug}`,
    },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    notFound()
  }

  const related = caseStudies.filter((cs) => cs.slug !== study.slug).slice(0, 3)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${study.brand} Influencer Marketing Case Study`,
    description: study.summary,
    image: `https://caagency.com${posterFor(study.videoSrc)}`,
    author: {
      '@type': 'Organization',
      name: 'CA Agency',
      url: 'https://caagency.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CA Agency',
      url: 'https://caagency.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://caagency.com/images/site/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://caagency.com/case-studies/${slug}`,
    },
    video: {
      '@type': 'VideoObject',
      name: study.title,
      description: study.summary,
      contentUrl: `https://caagency.com${study.videoSrc}`,
      thumbnailUrl: `https://caagency.com${posterFor(study.videoSrc)}`,
      uploadDate: VIDEO_PUBLICATION_DATE,
    },
  }

  const narrative = [
    { heading: 'The Brief', body: study.brief },
    { heading: 'Our Approach', body: study.approach },
    { heading: 'The Outcome', body: study.outcome },
  ]

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>

      {/* Hero — CSS load-in (LCP-safe) */}
      <section className="relative overflow-hidden bg-background-base py-[80px] tablet:py-[60px] mobile:py-[50px] px-section-x">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative z-[1] max-w-container mx-auto">
          <div className="hero-rise hero-rise-1 max-w-[800px]">
            <nav aria-label="Breadcrumb" className="mb-4 font-work-sans text-sm text-black/60">
              <Link href="/work" className="hover:text-accent-red transition-colors">
                Our Work
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground-primary">{study.brand}</span>
            </nav>
            <span className="mb-3 block font-jost text-[13px] font-medium uppercase tracking-[0.2em] text-accent-red">
              {study.vertical} · Case Study
            </span>
            <Heading as="h1" color="dark" className="mb-6 text-[48px] tablet:text-[40px] mobile:text-[32px]">
              {study.title}
            </Heading>
            <Text color="dark" size="lg" className="opacity-80">
              {study.summary}
            </Text>
          </div>
        </div>
      </section>

      {/* Video + narrative */}
      <section className="bg-background-base px-section-x pb-sec-sm">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col md:flex-row gap-[50px] mobile:gap-[32px]">
            {/* Campaign video */}
            <ScrollReveal yOffset={24} className="w-full md:w-[38%] md:max-w-[420px] shrink-0">
              <div className="rounded-[20px] overflow-hidden ring-1 ring-black/5 shadow-e3">
                <VideoPlayer
                  src={study.videoSrc}
                  poster={posterFor(study.videoSrc)}
                  aspectRatio="9:16"
                  autoplay
                  muted
                  loop
                  className="rounded-[20px]"
                />
              </div>
            </ScrollReveal>

            {/* Narrative + facts */}
            <div className="w-full">
              {/* Facts card */}
              <ScrollReveal yOffset={24}>
                <dl className="mb-10 grid grid-cols-2 mobile:grid-cols-1 gap-x-8 gap-y-5 rounded-card border border-black/10 bg-background-soft p-6">
                  <div>
                    <dt className="font-jost text-[12px] font-medium uppercase tracking-[0.15em] text-foreground-subtle mb-1">
                      Brand
                    </dt>
                    <dd className="font-work-sans text-[15px] text-foreground-primary font-medium">{study.brand}</dd>
                  </div>
                  <div>
                    <dt className="font-jost text-[12px] font-medium uppercase tracking-[0.15em] text-foreground-subtle mb-1">
                      Platforms
                    </dt>
                    <dd className="font-work-sans text-[15px] text-foreground-primary font-medium">
                      {study.platforms.join(', ')}
                    </dd>
                  </div>
                  {study.creator && (
                    <div>
                      <dt className="font-jost text-[12px] font-medium uppercase tracking-[0.15em] text-foreground-subtle mb-1">
                        Creator
                      </dt>
                      <dd className="font-work-sans text-[15px] text-foreground-primary font-medium">{study.creator}</dd>
                    </div>
                  )}
                  <div className={study.creator ? undefined : 'col-span-2 mobile:col-span-1'}>
                    <dt className="font-jost text-[12px] font-medium uppercase tracking-[0.15em] text-foreground-subtle mb-1">
                      Services
                    </dt>
                    <dd className="font-work-sans text-[15px] text-foreground-primary font-medium">
                      {study.services.join(' · ')}
                    </dd>
                  </div>
                </dl>
              </ScrollReveal>

              {/* Real client-approved figures only; hidden while metrics is empty */}
              {study.metrics.length > 0 && (
                <ScrollReveal yOffset={24}>
                  <div className="mb-10 grid grid-cols-3 mobile:grid-cols-1 gap-4">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-card border border-black/10 p-6 text-center">
                        <p className="font-anegra text-[36px] font-semibold text-accent-red mb-1">{metric.value}</p>
                        <p className="font-work-sans text-[14px] text-foreground-subtle">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {narrative.map((section) => (
                <ScrollReveal key={section.heading} yOffset={24} className="mb-8">
                  <Heading as="h2" color="dark" className="mb-3 text-[28px] mobile:text-[24px]">
                    {section.heading}
                  </Heading>
                  <Text color="dark" size="sm" className="opacity-80 leading-[1.8]">
                    {section.body}
                  </Text>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related case studies */}
      <section className="bg-background-soft py-sec-sm px-section-x">
        <div className="max-w-container mx-auto">
          <ScrollReveal yOffset={24} className="mb-10 text-center">
            <Heading as="h2" color="dark" className="mb-5 text-[40px] tablet:text-[32px] mobile:text-[28px]">
              More Case Studies
            </Heading>
            <HeadingAccent className="mb-0" />
          </ScrollReveal>
          <div className="grid grid-cols-3 mobile:grid-cols-1 gap-[20px]">
            {related.map((cs) => (
              <ScrollReveal key={cs.slug} yOffset={24}>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="hover-lift group block overflow-hidden rounded-card border border-black/10 bg-background-base shadow-e1 hover:shadow-e2 transition-shadow"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={posterFor(cs.videoSrc)}
                      alt={`${cs.brand} campaign video still`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 767px) 100vw, 420px"
                    />
                  </div>
                  <div className="p-5">
                    <span className="mb-1 block font-jost text-[12px] font-medium uppercase tracking-[0.15em] text-accent-red">
                      {cs.vertical}
                    </span>
                    <p className="font-anegra text-[20px] font-semibold text-foreground-primary group-hover:text-accent-red transition-colors">
                      {cs.brand}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background-base py-[80px] px-section-x border-t border-black/5">
        <ScrollReveal yOffset={24} className="max-w-container mx-auto text-center">
          <Heading as="h2" color="dark" className="mb-6 text-[40px] mobile:text-[28px]">
            Want Results Like This?
          </Heading>
          <Text color="dark" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-80">
            Tell us about your brand and we&apos;ll match you with the right creators for your next campaign.
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">Start Your Campaign</Button>
            <Button href="/work" variant="dark">View All Work</Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
