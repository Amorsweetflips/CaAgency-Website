import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeadingProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  color?: 'white' | 'dark' | 'muted'
}

export default function Heading({
  children,
  as = 'h1',
  className,
  color = 'dark',
}: HeadingProps) {
  const Component = as
  const colorClasses = {
    white: 'text-foreground-white',
    dark: 'text-foreground-dark',
    muted: 'text-foreground-muted',
  }

  const sizeClasses = {
    h1: 'text-[68px] tablet:text-[50px] mobile:text-[36px] leading-[1.2]',
    h2: 'text-[48px] tablet:text-[40px] mobile:text-[30px] leading-[1.3]',
    h3: 'text-[30px] tablet:text-[26px] mobile:text-[22px] leading-[1.4]',
    h4: 'text-[23px] mobile:text-[20px] leading-[1.4]',
    h5: 'text-[20px] mobile:text-[18px] leading-[1.4]',
    h6: 'text-[18px] mobile:text-[16px] leading-[1.4]',
  }

  return (
    <Component
      className={cn(
        'font-anegra font-semibold tracking-[1.2px]',
        sizeClasses[as],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  )
}
