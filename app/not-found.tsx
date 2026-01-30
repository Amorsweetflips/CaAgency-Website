import { Link } from '@/i18n/routing'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist. Return to CA Agency homepage.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-section-x">
      <div className="text-center max-w-[600px]">
        <h1 className="font-anegra text-[120px] tablet:text-[80px] mobile:text-[60px] text-accent-red leading-none mb-4">
          404
        </h1>
        <h2 className="font-anegra text-[32px] tablet:text-[26px] mobile:text-[22px] text-foreground-white mb-6">
          Page Not Found
        </h2>
        <p className="text-foreground-white/70 text-[16px] leading-[26px] mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent-red text-white font-medium rounded-full hover:bg-accent-red/90 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border border-foreground-white/30 text-foreground-white font-medium rounded-full hover:bg-foreground-white/10 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
