'use client'

import { BotIdClient } from 'botid/client/react'

export default function BotIdProvider({ children }: { children: React.ReactNode }) {
  // Protect high-value routes like contact form submissions
  const protectedRoutes = [
    {
      path: '/contact',
      method: 'POST',
    },
  ]

  return (
    <BotIdClient protect={protectedRoutes}>
      {children}
    </BotIdClient>
  )
}
