'use client'

import { m } from 'motion/react'
import type { ReactNode } from 'react'

interface StaggerProps {
  children: ReactNode
  /** delay between each child, seconds */
  stagger?: number
  /** delay before the first child, seconds */
  delayChildren?: number
  className?: string
  once?: boolean
}

/**
 * Container that orchestrates a staggered reveal of its <StaggerItem> children
 * as the group scrolls into view. Pair with StaggerItem for grids.
 */
export default function Stagger({
  children,
  stagger = 0.08,
  delayChildren = 0,
  className,
  once = true,
}: StaggerProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-60px' }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </m.div>
  )
}
