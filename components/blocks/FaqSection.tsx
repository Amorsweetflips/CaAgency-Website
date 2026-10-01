import SectionHeading from '@/components/ui/SectionHeading'
import Text from '@/components/ui/Text'
import Stagger from '@/components/ui/motion/Stagger'
import StaggerItem from '@/components/ui/motion/StaggerItem'
import { jsonLdSafe } from '@/lib/sanitize'
import { faqPageJsonLd, type FaqItem } from '@/lib/seo/schema'

// Always-open FAQ list with matching FAQPage markup, so the structured data
// can never drift from the visible answers.
export default function FaqSection({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string
  title: string
  items: readonly FaqItem[]
}) {
  if (items.length === 0) return null

  return (
    <section className="bg-background-base py-sec px-section-x border-t border-black/5">
      <div className="max-w-[820px] mx-auto">
        <SectionHeading align="start" size="md" eyebrow={eyebrow} title={title} className="mb-8" />
        <Stagger className="flex flex-col gap-6" stagger={0.08}>
          {items.map((item) => (
            <StaggerItem key={item.question} className="rounded-card border border-black/10 bg-background-soft p-6 transition-colors duration-300 hover:border-black/15 hover:bg-white">
              <h3 className="text-foreground-primary font-semibold text-lg mb-2">{item.question}</h3>
              <Text color="dark" size="sm" className="opacity-70 leading-relaxed">
                {item.answer}
              </Text>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSafe(faqPageJsonLd(items)) }} />
    </section>
  )
}
