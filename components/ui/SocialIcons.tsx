import Link from 'next/link'
import { cn } from '@/lib/utils'
import { FaInstagram, FaTiktok, FaLinkedinIn, FaFacebookF } from 'react-icons/fa'

interface SocialIcon {
  name: string
  href: string
  icon: string
}

interface SocialIconsProps {
  icons: SocialIcon[]
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function SocialIcons({
  icons,
  className,
  size = 'lg',
}: SocialIconsProps) {
  const sizeClasses = {
    sm: 'text-[18px]',
    md: 'text-[30px]',
    lg: 'text-[33px]',
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'fab fa-instagram':
        return <FaInstagram />
      case 'fab fa-tiktok':
        return <FaTiktok />
      case 'fab fa-linkedin-in':
        return <FaLinkedinIn />
      case 'fab fa-facebook-f':
        return <FaFacebookF />
      default:
        return null
    }
  }

  return (
    <div className={cn('flex items-center gap-[22px]', className)}>
      {icons.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'text-foreground-white hover:text-accent-red transition-colors',
            sizeClasses[size]
          )}
          aria-label={social.name}
        >
          {getIcon(social.icon)}
        </Link>
      ))}
    </div>
  )
}
