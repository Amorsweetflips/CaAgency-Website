import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import ContactForm from '@/components/blocks/ContactForm'
import GradientDivider from '@/components/ui/GradientDivider'

export const metadata = {
  title: "Contact | CA Agency | Let's collaborate!",
  description: "Whether you're a brand looking to launch an influencer campaign or a creator ready to grow, we'd love to hear from you.",
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-background-dark py-[150px] mobile:py-[80px] px-section-x relative">
        <div className="max-w-container mx-auto relative z-10">
          <div className="max-w-[800px] mx-auto">
            {/* Contact Form Card */}
            <div className="bg-background-light rounded-[10px] shadow-[0_0_10px_-5px_rgba(0,0,0,0.5)] py-[80px] mobile:py-[50px] px-[80px] tablet:px-[60px] mobile:px-[30px]">
              <Heading as="h2" color="dark" className="mb-6 tracking-[0.1px]">
                Let's collaborate!
              </Heading>
              <Text color="muted" size="sm" className="mb-4">
                <strong>At CA Agency, we believe in the power of collaboration and the impact of meaningful partnerships.</strong>
              </Text>
              <Text color="muted" size="sm" className="mb-4">
                Whether you're a brand looking to launch an influencer campaign or a creator ready to grow, we'd love to hear from you.
              </Text>
              <Text color="muted" size="sm" className="mb-8">
                Reach out to us via email or fill in the contact form below — let's start building something impactful together.
              </Text>

              {/* Email */}
              <div className="mb-8">
                <a
                  href="mailto:info@caagency.com"
                  className="font-jost text-sm font-medium leading-[24px] tracking-[1.5px] text-foreground-muted hover:underline"
                >
                  info@caagency.com
                </a>
              </div>

              {/* Contact Form */}
              <ContactForm formId={2} />

              <GradientDivider variant="dark" className="my-12" />

              {/* Talent Submission */}
              <Heading as="h2" color="dark" className="mb-8 tracking-[0.1px]">
                Talent submission
              </Heading>
              <ContactForm formId={3} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
