import NextLink from 'next/link'
import type { ComponentProps, FocusEventHandler, MouseEventHandler, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { localizeHref } from '@/lib/i18n/client-paths'
import type { Locale } from '@/i18n/config'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'dark' | 'light' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
  unlocalized?: boolean
  locale?: Locale
  prefetch?: ComponentProps<typeof NextLink>['prefetch']
  target?: ComponentProps<typeof NextLink>['target']
  rel?: string
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>
  onFocus?: FocusEventHandler<HTMLAnchorElement>
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
  locale = 'en',
  prefetch,
  target,
  rel,
  onMouseEnter,
  onFocus,
}: ButtonProps) {
  const baseStyles =
    'font-jost font-medium rounded-[30px] inline-block text-center transition-[background-color,color,transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-colors'

  const sizeStyles = {
    sm: 'text-[14px] px-[20px] py-[10px]',
    default: 'text-[16px] px-[28px] py-[14px]',
    lg: 'text-[18px] px-[32px] py-[16px]',
  }

  const variants = {
    primary:
      'bg-button-bg text-button-text hover:bg-button-hoverDark hover:text-button-text',
    dark: 'bg-background-dark text-foreground-white hover:bg-button-hoverDark',
    light: 'bg-background-light text-foreground-dark ring-1 ring-black/10 hover:bg-button-hoverLight',
    // Secondary action on light surfaces: outline pill next to a solid primary
    ghost:
      'bg-transparent text-foreground-primary ring-1 ring-black/20 hover:ring-black/40 hover:bg-black/[0.03]',
  }

  const classes = cn(baseStyles, sizeStyles[size], variants[variant], className)

  if (href) {
    const resolvedHref = unlocalized || href.startsWith('/admin') ? href : localizeHref(href, locale)
    return (
      <NextLink href={resolvedHref} className={classes} prefetch={prefetch} target={target} rel={rel} onMouseEnter={onMouseEnter} onFocus={onFocus}>
        {children}
      </NextLink>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}
