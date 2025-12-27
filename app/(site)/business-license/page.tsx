import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Image from 'next/image'

export const metadata = {
  title: 'Business License - CA Agency',
  description: 'CA Agency business license information.',
}

export default function BusinessLicensePage() {
  return (
    <section className="bg-background-light py-[100px] mobile:py-[50px] px-section-x">
      <div className="max-w-container mx-auto">
        <Heading as="h1" color="dark" className="mb-8">
          Business License
        </Heading>
        <div className="max-w-[600px]">
          <Image
            src="/images/site/business-license.webp"
            alt="CA Agency Business License"
            width={600}
            height={800}
            className="rounded-[15px] shadow-lg mb-8"
          />
        </div>
        <div className="font-work-sans text-body text-muted">
          <p className="mb-2">CA Agency</p>
          <p className="mb-2">Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.</p>
          <p>Registration no.: 2417532.01</p>
        </div>
      </div>
    </section>
  )
}
