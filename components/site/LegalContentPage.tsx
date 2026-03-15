import Heading from '@/components/ui/Heading'
import { LegalPageContent } from '@/lib/site-content/site-types'

export default function LegalContentPage({ content }: { content: LegalPageContent }) {
  return (
    <section className="bg-background-light py-[100px] mobile:py-[50px] px-section-x">
      <div className="max-w-container mx-auto">
        <div className="max-w-[900px]">
          <Heading as="h1" color="dark" className="mb-6">
            {content.title}
          </Heading>

          <p className="font-work-sans text-[15px] text-gray-600 mb-10">
            <strong>Last updated: {content.lastUpdated}</strong>
          </p>

          <div
            className="legal-content space-y-10 font-work-sans text-[16px] leading-[30px] text-foreground-dark [&_h2]:mb-4 [&_h2]:font-anegra [&_h2]:text-[28px] [&_h2]:font-semibold [&_h2]:tracking-[1.2px] [&_h3]:mb-3 [&_h3]:font-anegra [&_h3]:text-[20px] [&_h3]:font-semibold [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_li]:mb-2 [&_a]:font-medium [&_a]:text-accent-red [&_a]:hover:underline"
            dangerouslySetInnerHTML={{ __html: content.html }}
          />
        </div>
      </div>
    </section>
  )
}
