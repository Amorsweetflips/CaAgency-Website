import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { services, getService } from '@/lib/data/services'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)

  if (!service) {
    return { title: 'Service Not Found' }
  }

  // Root layout template appends "| CA Agency"; OG/Twitter need it inline.
  const socialTitle = `${service.title} | CA Agency`

  return {
    title: service.title,
    description: service.summary,
    keywords: [
      service.title.toLowerCase(),
      'influencer marketing agency',
      'beauty marketing',
      'creator campaigns',
    ],
    openGraph: {
      title: socialTitle,
      description: service.summary,
      images: [{ url: '/images/site/og-cover.webp', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: service.summary,
    },
    alternates: {
      canonical: `https://caagency.com/services/${slug}`,
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getService(slug)

  if (!service) {
    notFound()
  }

  const otherServices = services.filter((s) => s.slug !== service.slug)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    provider: {
      '@type': 'Organization',
      name: 'CA Agency',
      url: 'https://caagency.com',
    },
    areaServed: 'Worldwide',
    url: `https://caagency.com/services/${slug}`,
  }

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>

      {/* Hero — CSS load-in (LCP-safe) */}
      <section className="relative overflow-hidden bg-background-base py-[80px] tablet:py-[60px] mobile:py-[50px] px-section-x">
        <div className="relative z-[1] max-w-container mx-auto">
          <div className="hero-rise-media max-w-[800px]">
            <nav aria-label="Breadcrumb" className="mb-4 font-work-sans text-sm text-black/60">
              <Link href="/services" className="hover:text-accent-red transition-colors">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground-primary">{service.title}</span>
            </nav>
            <span className="mb-3 block font-jost text-[13px] font-medium uppercase tracking-[0.2em] text-accent-red">
              What We Do
            </span>
            <Heading as="h1" color="dark" className="mb-6 text-[48px] tablet:text-[40px] mobile:text-[32px]">
              {service.title}
            </Heading>
            <Text color="dark" size="lg" className="opacity-80">
              {service.tagline}
            </Text>
          </div>
        </div>
      </section>

      {/* Visual + narrative */}
      <section className="bg-background-base px-section-x pb-sec-sm">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col md:flex-row gap-[50px] mobile:gap-[32px]">
            <ScrollReveal yOffset={24} className="w-full md:w-[38%] md:max-w-[420px] shrink-0">
              <div className="relative aspect-4/5 rounded-[20px] overflow-hidden ring-1 ring-black/5 shadow-e3">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, 420px"
                />
              </div>
            </ScrollReveal>

            <div className="w-full">
              <ScrollReveal yOffset={24} className="mb-8">
                <Heading as="h2" color="dark" className="mb-3 text-[28px] mobile:text-[24px]">
                  How we work
                </Heading>
                {service.breakdown.map((paragraph) => (
                  <Text key={paragraph.slice(0, 24)} color="dark" size="sm" className="mb-5 opacity-80 leading-[1.8]">
                    {paragraph}
                  </Text>
                ))}
              </ScrollReveal>

              <ScrollReveal yOffset={24}>
                <Heading as="h2" color="dark" className="mb-4 text-[28px] mobile:text-[24px]">
                  What&apos;s included
                </Heading>
                <ul className="grid grid-cols-2 mobile:grid-cols-1 gap-x-8 gap-y-3 rounded-card border border-black/10 bg-background-soft p-6">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-work-sans text-[15px] text-foreground-primary">
                      <span aria-hidden="true" className="mt-[2px] text-accent-red">
                        ✦
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-background-soft py-sec-sm px-section-x">
        <div className="max-w-container mx-auto">
          <ScrollReveal yOffset={24} className="mb-10 text-center">
            <Heading as="h2" color="dark" className="text-[40px] tablet:text-[32px] mobile:text-[28px]">
              Explore Our Other Services
            </Heading>
          </ScrollReveal>
          <div className="grid grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 gap-[20px]">
            {otherServices.map((other) => (
              <ScrollReveal key={other.slug} yOffset={24}>
                <Link
                  href={`/services/${other.slug}`}
                  className="hover-lift group block h-full rounded-card border border-black/10 bg-background-base p-6 shadow-e1 hover:shadow-e2 transition-shadow"
                >
                  <p className="font-anegra text-[19px] leading-snug text-foreground-primary group-hover:text-accent-red transition-colors">
                    {other.title}
                  </p>
                  <p className="mt-2 font-work-sans text-[13px] text-foreground-subtle">
                    {other.tagline}
                  </p>
                  <span className="mt-4 inline-block text-accent-red" aria-hidden="true">
                    →
                  </span>
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
            Let&apos;s Build Your Next Campaign
          </Heading>
          <Text color="dark" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-80">
            Tell us about your goals and we&apos;ll shape the right mix of creators, content, and strategy around them.
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">Enquire For Partnerships</Button>
            <Button href="/work" variant="dark">
              See Our Work
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
