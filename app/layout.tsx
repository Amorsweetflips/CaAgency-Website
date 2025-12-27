import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Anegra, Brasika, WorkSans, Jost } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'CA Agency - Influence • Digital • Marketing',
  description: 'Full-service influencer marketing agency connecting brands with creators',
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
        <Analytics />
      </body>
    </html>
  )
}
