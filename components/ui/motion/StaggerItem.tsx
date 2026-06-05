'use client'

import { m } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT } from './easing'

interface StaggerItemProps {
  children: ReactNode
  /** px the item travels up into place */
  y?: number
  duration?: number
  className?: string
}

/**
 * A single child of <Stagger>. Inherits the parent's orchestration so it only
 * animates once the container scrolls into view, sequenced by staggerChildren.
 */
export default function StaggerItem({
  children,
  y = 28,
  duration = 0.6,
  className,
}: StaggerItemProps) {
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT } },
      }}
    >
      {children}
    </m.div>
  )
}
