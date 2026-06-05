'use client'

import { m } from 'motion/react'
import { EASE_OUT } from './motion/easing'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
  once?: boolean
}

/**
 * Scroll-triggered fade + slide-up.
 *
 * Re-implemented on Framer Motion's `m` component (loaded via the app-wide
 * LazyMotion provider) so every existing call-site across the site inherits the
 * upgraded easing/feel. The public API is unchanged from the original
 * IntersectionObserver implementation. prefers-reduced-motion is honoured
 * globally via MotionConfig reducedMotion="user".
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 16,
  className = '',
  once = true,
}: ScrollRevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-100px' }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  )
}
