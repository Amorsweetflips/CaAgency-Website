import type { Metadata } from 'next'
import { Anegra, Brasika, WorkSans, Jost } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'CA Agency - Influence • Digital • Marketing',
  description: 'Full-service influencer marketing agency connecting brands with creators',
  icons: {
    icon: [
      { url: '/images/site/logo-white.svg', type: 'image/svg+xml' },
      { url: '/images/site/logo-white.png', type: 'image/png' },
    ],
    shortcut: '/images/site/logo-white.png',
    apple: '/images/site/logo-white.png',
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
        {children}
      </body>
    </html>
  )
}
