import Link from 'next/link'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import HeadingAccent from '@/components/ui/HeadingAccent'
import Text from '@/components/ui/Text'
import TalentGrid from '@/components/blocks/TalentGrid'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Stagger from '@/components/ui/motion/Stagger'
import StaggerItem from '@/components/ui/motion/StaggerItem'
import { brandLogos } from '@/lib/data/brands'
import { LocationPageContent } from '@/lib/site-content/location-pages'

// Universal commercial-intent guides linked from every location page so link
// equity flows from these high-authority pages into the blog cluster.
const RESOURCE_POSTS = [
  {
    href: '/blog/influencer-marketing-cost-2026',
    title: 'How Much Does Influencer Marketing Cost?',
    desc: 'A clear pricing guide by creator tier, platform, and campaign type.',
  },
  {
    href: '/blog/how-to-run-influencer-marketing-campaign',
    title: 'How to Run an Influencer Campaign',
    desc: 'A practical, step-by-step guide from goal-setting to ROI reporting.',
  },
  {
    href: '/blog/how-to-choose-influencer-marketing-agency',
    title: 'How to Choose an Influencer Agency',
    desc: 'The checklist for vetting an agency partner before you sign.',
  },
]

type TalentCard = {
  name: string
  imageUrl: string
  instagramUrl?: string
  tiktokUrl?: string
}

export default function LocationLandingPage({
  content,
  talents,
}: {
  content: LocationPageContent
  talents: TalentCard[]
}) {
  return (
    <>
      <section className="bg-background-dark py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading
            as="h1"
            color="white"
            className="hero-rise hero-rise-1 mb-6 text-[56px] tablet:text-[44px] mobile:text-[32px] leading-tight whitespace-pre-line"
          >
            {content.hero.title}
          </Heading>
          <Text color="white" size="lg" className="hero-rise hero-rise-2 max-w-[760px] mx-auto mb-8 opacity-80">
            {content.hero.subtitle}
          </Text>
          <div className="hero-rise hero-rise-3 flex flex-wrap gap-4 justify-center">
            <Button href={content.hero.primaryButtonHref}>
              {content.hero.primaryButtonLabel}
            </Button>
            <Button href={content.hero.secondaryButtonHref} variant="dark">
              {content.hero.secondaryButtonLabel}
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background-dark py-[60px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto">
          <Stagger className="grid grid-cols-4 mobile:grid-cols-2 gap-8 text-center" stagger={0.1}>
            {content.stats.map((stat) => (
              <StaggerItem key={`${stat.label}-${stat.value}`}>
                <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">
                  {stat.value}
                </div>
                <div className="text-white/60 uppercase tracking-widest text-sm">
                  {stat.label}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {content.intro && (
        <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
          <ScrollReveal yOffset={24} className="max-w-[820px] mx-auto">
            <Heading as="h2" color="white" className="mb-5 text-[40px] mobile:text-[28px]">
              {content.intro.heading}
            </Heading>
            <HeadingAccent align="start" className="mb-8" />
            <div className="flex flex-col gap-5">
              {content.intro.paragraphs.map((paragraph, index) => (
                <Text key={index} color="white" size="base" className="opacity-75 leading-relaxed">
                  {paragraph.text}
                </Text>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      <section className="bg-background-dark py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-5 text-[40px] mobile:text-[28px]">
            {content.highlights.title}
          </Heading>
          <HeadingAccent align="start" className="mb-8" />
          <Stagger className="grid grid-cols-2 mobile:grid-cols-1 gap-8" stagger={0.1}>
            {content.highlights.items.map((item) => (
              <StaggerItem key={item.title} className="hover-lift h-full bg-white/5 rounded-xl p-8 ring-1 ring-white/5 hover:bg-white/[0.08] hover:ring-white/15">
                <h3 className="text-white font-semibold text-xl mb-3">{item.title}</h3>
                <Text color="white" size="sm" className="opacity-70">
                  {item.description}
                </Text>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {talents.length > 0 && (
        <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
          <div className="max-w-container mx-auto">
            <Heading as="h2" color="white" className="mb-5 text-[40px] mobile:text-[28px]">
              {content.talents.title}
            </Heading>
            <HeadingAccent align="start" className="mb-8" />
            <TalentGrid talents={talents} columns={6} />
            <div className="text-center mt-10">
              <Button href={content.talents.buttonHref}>{content.talents.buttonLabel}</Button>
            </div>
          </div>
        </section>
      )}

      <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-5 text-[40px] mobile:text-[28px]">
            {content.industries.title}
          </Heading>
          <HeadingAccent align="start" className="mb-8" />
          <Stagger className="grid grid-cols-3 mobile:grid-cols-1 gap-6" stagger={0.08}>
            {content.industries.items.map((item) => (
              <StaggerItem key={item.title} className="hover-lift h-full bg-white/5 rounded-xl p-6 text-center ring-1 ring-white/5 hover:bg-white/[0.08] hover:ring-white/15">
                <div className="text-accent-red text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <Text color="white" size="sm" className="opacity-70">
                  {item.description}
                </Text>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {content.faq && content.faq.items.length > 0 && (
        <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
          <div className="max-w-[820px] mx-auto">
            <Heading as="h2" color="white" className="mb-5 text-[40px] mobile:text-[28px]">
              {content.faq.title}
            </Heading>
            <HeadingAccent align="start" className="mb-8" />
            <Stagger className="flex flex-col gap-6" stagger={0.08}>
              {content.faq.items.map((item) => (
                <StaggerItem key={item.question} className="bg-white/5 rounded-xl p-6 ring-1 ring-white/5 transition-colors duration-300 hover:bg-white/[0.08] hover:ring-white/15">
                  <h3 className="text-white font-semibold text-lg mb-2">{item.question}</h3>
                  <Text color="white" size="sm" className="opacity-70 leading-relaxed">
                    {item.answer}
                  </Text>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: content.faq.items.map((item) => ({
                  '@type': 'Question',
                  name: item.question,
                  acceptedAnswer: { '@type': 'Answer', text: item.answer },
                })),
              }).replace(/</g, '\\u003c'),
            }}
          />
        </section>
      )}

      <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-5 text-[40px] mobile:text-[28px]">
            Influencer Marketing Resources
          </Heading>
          <HeadingAccent align="start" className="mb-8" />
          <div className="grid grid-cols-3 mobile:grid-cols-1 gap-6">
            {RESOURCE_POSTS.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="hover-lift block bg-white/5 rounded-xl p-6 ring-1 ring-white/5 hover:bg-white/10 hover:ring-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red"
              >
                <h3 className="text-white font-semibold text-lg mb-2">{post.title}</h3>
                <Text color="white" size="sm" className="opacity-70">
                  {post.desc}
                </Text>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/blog" className="text-white underline underline-offset-4">
              Explore the CA Agency blog →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-accent-red py-[80px] px-section-x">
        <ScrollReveal yOffset={24} className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            {content.cta.title}
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            {content.cta.description}
          </Text>
          <Button href={content.cta.buttonHref} variant="light">
            {content.cta.buttonLabel}
          </Button>
        </ScrollReveal>
      </section>

      <BrandCarousel images={brandLogos} />
    </>
  )
}
