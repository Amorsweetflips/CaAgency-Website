import type { CSSProperties, ReactNode } from 'react'
import { getStaggerItemStyle } from '@/lib/performance/reveal'

interface StaggerItemProps {
  children: ReactNode
  y?: number
  duration?: number
  className?: string
  revealIndex?: number
  revealStagger?: number
  revealDelayChildren?: number
}

export default function StaggerItem({
  children,
  y = 28,
  duration = 0.6,
  className,
  revealIndex = 0,
  revealStagger = 0.08,
  revealDelayChildren = 0,
}: StaggerItemProps) {
  return (
    <div
      data-stagger-item=""
      className={className}
      style={getStaggerItemStyle({
        index: revealIndex,
        y,
        duration,
        stagger: revealStagger,
        delayChildren: revealDelayChildren,
      }) as CSSProperties}
    >
      {children}
    </div>
  )
}
