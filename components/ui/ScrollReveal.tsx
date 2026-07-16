import type { CSSProperties } from 'react'
import { getRevealAttributes } from '@/lib/performance/reveal'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
  once?: boolean
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 16,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const attributes = getRevealAttributes({ delay, duration, yOffset, once })
  return (
    <div {...attributes} className={className} style={attributes.style as CSSProperties}>
      {children}
    </div>
  )
}
