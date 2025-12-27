import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'

export const metadata = {
  title: 'Privacy Policy - CA Agency',
  description: 'Privacy statement of CA Agency explaining which personal data we collect, for which purposes, and how we handle your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-background-light py-[100px] mobile:py-[50px] px-section-x">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col md:flex-row gap-[50px]">
          <div className="w-full md:w-1/2">
            <Heading as="h1" color="dark" className="mb-6 font-brasika">
              Privacy policy
            </Heading>
            <Text color="muted" size="sm" className="space-y-4">
              <p>
                This is the privacy statement of CA Agency (hereinafter: 'CA Agency'), located at Meydan Grandstand, 6th floor, Meydan Road, Nad Al, Sheba, Dubai, U.A.E. (License nr. 2417532.1). In this privacy statement we explain which personal data we collect from you, for which purposes we do so, how we handle your personal data and to whom we provide your personal data. Finally, this privacy statement contains information about your rights with regard to the processing of your personal data.
              </p>
              <p>
                If you use our website and/or services, we will (temporarily) process all personal data that you have provided to us. We also process the personal data of (potential) clients and/or persons employed by our clients, applicants and employees and other third parties.
              </p>
              <p>
                CA Agency will always handle your personal data with care. All personal data you provide to us will be treated strictly confidentially and in accordance with applicable laws and regulations. This means that we will never pass on your personal data to third parties, unless this is necessary for our services or when we are legally obliged to do so. With third parties who process your personal data (on behalf of and) on the instructions of CA Agency, CA Agency will conclude a processing agreement on the basis of which they are obliged to comply with the privacy legislation and to take security measures. CA Agency will never keep your personal data longer than strictly necessary.
              </p>
              <p>
                What are your rights in relation to the processing of your personal data? Under certain circumstances you have the right to ask us to view, correct or delete your personal data. Your questions regarding the processing of personal data and/or request for inspection, correction or deletion of your personal data can be addressed in writing to: info@caagency.com Please note that we will only process requests that relate to your own personal data. CA Agency aims to provide you with feedback within four weeks. CA Agency does not intend to collect your personal data if you are under 16 years of age, unless your parents or legal representatives have given permission. Do you suspect that we have collected personal data from a minor without permission? Please contact us at: info@caagency.com so we can delete the personal data. This privacy statement was last modified on July 19, 2025. CA Agency has the right to change the content of this privacy statement at any time without prior notice.
              </p>
            </Text>
          </div>
          <div className="w-full md:w-1/2"></div>
        </div>
      </div>
    </section>
  )
}
