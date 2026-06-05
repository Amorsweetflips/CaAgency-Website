'use client'

import { m, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface ParallaxProps {
  children: ReactNode
  /** total vertical travel in px across the scroll range (negative = moves up) */
  amount?: number
  className?: string
}

/**
 * Subtle scroll-linked vertical parallax. Disabled entirely under
 * prefers-reduced-motion. Only drives `transform`, so it stays compositor-only.
 */
export default function Parallax({ children, amount = 40, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount])

  return (
    <div ref={ref} className={className}>
      <m.div style={reduce ? undefined : { y }}>{children}</m.div>
    </div>
  )
}
