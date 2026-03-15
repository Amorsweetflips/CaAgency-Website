import { Link } from '@/i18n/routing'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'dark' | 'light'
  className?: string
  type?: 'button' | 'submit'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
  unlocalized?: boolean
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  type = 'button',
  size = 'default',
  disabled = false,
  unlocalized = false,
}: ButtonProps) {
  const baseStyles =
    'font-jost font-medium rounded-[30px] transition-colors inline-block text-center'

  const sizeStyles = {
    sm: 'text-[14px] px-[20px] py-[10px]',
    default: 'text-[16px] px-[28px] py-[14px]',
    lg: 'text-[18px] px-[32px] py-[16px]',
  }

  const variants = {
    primary:
      'bg-button-bg text-button-text hover:bg-button-hover hover:text-button-text',
    dark: 'bg-background-dark text-foreground-white hover:bg-button-hoverDark',
    light: 'bg-background-light text-foreground-dark hover:bg-button-hoverLight',
  }

  const classes = cn(baseStyles, sizeStyles[size], variants[variant], className)

  if (href) {
    if (unlocalized || href.startsWith('/admin')) {
      return (
        <NextLink href={href} className={classes}>
          {children}
        </NextLink>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}
