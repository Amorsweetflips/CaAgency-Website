import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import { getStaggerAttributes } from '@/lib/performance/reveal'

interface StaggerProps {
  children: ReactNode
  stagger?: number
  delayChildren?: number
  className?: string
  once?: boolean
}

type IndexedChildProps = {
  revealIndex?: number
  revealStagger?: number
  revealDelayChildren?: number
}

export default function Stagger({
  children,
  stagger = 0.08,
  delayChildren = 0,
  className,
  once = true,
}: StaggerProps) {
  const attributes = getStaggerAttributes({ stagger, delayChildren, once })
  const indexedChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child
    return cloneElement(child as ReactElement<IndexedChildProps>, {
      revealIndex: index,
      revealStagger: stagger,
      revealDelayChildren: delayChildren,
    })
  })

  return (
    <div {...attributes} className={className} style={attributes.style as CSSProperties}>
      {indexedChildren}
    </div>
  )
}
