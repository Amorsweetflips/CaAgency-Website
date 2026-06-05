'use client'

import { m } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT } from './easing'

interface RevealProps {
  children: ReactNode
  /** seconds */
  delay?: number
  /** seconds */
  duration?: number
  /** px the element travels up into place */
  y?: number
  className?: string
  once?: boolean
}

/**
 * Scroll-triggered fade + slide-up. The premium successor to ScrollReveal.
 * Only animates transform/opacity. prefers-reduced-motion is handled globally
 * via MotionConfig reducedMotion="user".
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  className,
  once = true,
}: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  )
}
