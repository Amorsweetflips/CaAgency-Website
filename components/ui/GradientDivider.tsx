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
    dark: 'bg-linear-to-r from-foreground-white via-divider-darkMid to-foreground-white',
    light: 'bg-linear-to-r from-divider-lightMid via-foreground-white to-divider-lightMid',
  }

  return (
    <div
      className={cn('h-[0.5px] w-full', gradientClasses[variant], className)}
      aria-hidden="true"
    />
  )
}
