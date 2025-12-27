import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Anegra, Brasika, WorkSans, Jost } from '@/lib/fonts'
import BotIdProvider from '@/components/BotIdProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'CA Agency - Influence • Digital • Marketing',
  description: 'Full-service influencer marketing agency connecting brands with creators',
  icons: {
    icon: [
      { url: '/images/site/logo.svg', type: 'image/svg+xml' },
      { url: '/images/site/logo-color.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/images/site/logo.svg',
    apple: '/images/site/logo-color.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${Anegra.variable} ${Brasika.variable} ${WorkSans.variable} ${Jost.variable}`}>
      <body className="font-work-sans antialiased">
        <BotIdProvider>
          {children}
        </BotIdProvider>
        <Analytics />
      </body>
    </html>
  )
}
