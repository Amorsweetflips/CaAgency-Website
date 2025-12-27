import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TextProps {
  children: ReactNode
  className?: string
  color?: 'white' | 'dark' | 'muted'
  size?: 'sm' | 'base' | 'lg'
  as?: 'p' | 'span' | 'div'
}

export default function Text({
  children,
  className,
  color = 'dark',
  size = 'base',
  as: Component = 'p',
}: TextProps) {
  const colorClasses = {
    white: 'text-foreground-white',
    dark: 'text-foreground-dark',
    muted: 'text-foreground-muted',
  }

  const sizeClasses = {
    sm: 'text-sm md:text-[14px]',
    base: 'text-base md:text-[14px]',
    lg: 'text-lg md:text-[20px]',
  }

  return (
    <Component
      className={cn(
        'font-work-sans font-light leading-[24px] tracking-[1.5px]',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  )
}
