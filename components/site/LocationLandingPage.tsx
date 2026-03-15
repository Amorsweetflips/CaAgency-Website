import BrandCarousel from '@/components/blocks/BrandCarousel'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import TalentGrid from '@/components/blocks/TalentGrid'
import { brandLogos } from '@/lib/data/brands'
import { LocationPageContent } from '@/lib/site-content/location-pages'

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
            className="mb-6 text-[56px] tablet:text-[44px] mobile:text-[32px] leading-tight whitespace-pre-line"
          >
            {content.hero.title}
          </Heading>
          <Text color="white" size="lg" className="max-w-[760px] mx-auto mb-8 opacity-80">
            {content.hero.subtitle}
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
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
          <div className="grid grid-cols-4 mobile:grid-cols-2 gap-8 text-center">
            {content.stats.map((stat) => (
              <div key={`${stat.label}-${stat.value}`}>
                <div className="font-anegra text-[60px] mobile:text-[40px] text-accent-red">
                  {stat.value}
                </div>
                <div className="text-white/60 uppercase tracking-widest text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-dark py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
            {content.highlights.title}
          </Heading>
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8">
            {content.highlights.items.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-8">
                <h3 className="text-white font-semibold text-xl mb-3">{item.title}</h3>
                <Text color="white" size="sm" className="opacity-70">
                  {item.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {talents.length > 0 && (
        <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
          <div className="max-w-container mx-auto">
            <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
              {content.talents.title}
            </Heading>
            <TalentGrid talents={talents} columns={6} />
            <div className="text-center mt-10">
              <Button href={content.talents.buttonHref}>{content.talents.buttonLabel}</Button>
            </div>
          </div>
        </section>
      )}

      <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
            {content.industries.title}
          </Heading>
          <div className="grid grid-cols-3 mobile:grid-cols-1 gap-6">
            {content.industries.items.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-6 text-center">
                <div className="text-accent-red text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <Text color="white" size="sm" className="opacity-70">
                  {item.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent-red py-[80px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            {content.cta.title}
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            {content.cta.description}
          </Text>
          <Button href={content.cta.buttonHref} variant="light">
            {content.cta.buttonLabel}
          </Button>
        </div>
      </section>

      <BrandCarousel images={brandLogos} />
    </>
  )
}
