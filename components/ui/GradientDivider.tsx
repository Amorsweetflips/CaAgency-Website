import { cn } from '@/lib/utils'

interface GradientDividerProps {
  className?: string
  variant?: 'dark' | 'light'
}

export default function GradientDivider({
  className,
  variant = 'dark',
}: GradientDividerProps) {
  const gradientClasses = {
    dark: 'bg-linear-to-r from-transparent via-divider-darkMid to-transparent',
    light: 'bg-linear-to-r from-transparent via-divider-lightMid to-transparent',
  }

  return (
    <div
      className={cn('h-[0.5px] w-full', gradientClasses[variant], className)}
      aria-hidden="true"
    />
  )
}
