'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SocialLink {
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitch' | 'kick'
  url: string
}

interface TalentCardProps {
  name: string
  imageUrl: string
  instagramUrl?: string
  tiktokUrl?: string
  youtubeUrl?: string
  twitchUrl?: string
  kickUrl?: string
  socialLinks?: SocialLink[]
  className?: string
}

// Social media icons as SVG components
const SocialIcon = ({ platform }: { platform: SocialLink['platform'] }) => {
  const icons = {
    instagram: (
      <svg viewBox="0 0 448 512" fill="currentColor" className="w-5 h-5">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 448 512" fill="currentColor" className="w-5 h-5">
        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 576 512" fill="currentColor" className="w-5 h-5">
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
      </svg>
    ),
    twitch: (
      <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5">
        <path d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z"/>
      </svg>
    ),
    kick: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" className="w-5 h-5">
        <path d="M2.86957 1.5h6.84782v4.56522H12V3.78261h2.2826V1.5h6.8478v6.84783h-2.2826v2.28257h-2.2826v2.7392h2.2826v2.2826h2.2826V22.5h-6.8478v-2.2826H12v-2.2826H9.71739V22.5H2.86957v-21Z"/>
      </svg>
    ),
  }
  return icons[platform] || null
}

export default function TalentCard({
  name,
  imageUrl,
  instagramUrl,
  tiktokUrl,
  youtubeUrl,
  twitchUrl,
  kickUrl,
  socialLinks,
  className,
}: TalentCardProps) {
  // Build social links array from individual props or use provided array
  const links: SocialLink[] = socialLinks || [
    ...(instagramUrl ? [{ platform: 'instagram' as const, url: instagramUrl }] : []),
    ...(youtubeUrl ? [{ platform: 'youtube' as const, url: youtubeUrl }] : []),
    ...(tiktokUrl ? [{ platform: 'tiktok' as const, url: tiktokUrl }] : []),
    ...(twitchUrl ? [{ platform: 'twitch' as const, url: twitchUrl }] : []),
    ...(kickUrl ? [{ platform: 'kick' as const, url: kickUrl }] : []),
  ]

  // Get primary link for the name (Instagram or first available)
  const primaryLink = instagramUrl || links[0]?.url

  return (
    <div
      className={cn(
        'talent-card relative w-full aspect-3/4 rounded-[15px] overflow-hidden flex flex-col justify-end',
        'group',
        className
      )}
    >
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 20vw"
      />

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center pb-6 px-3">
        {/* Name - Linked to Instagram */}
        {primaryLink ? (
          <Link
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <h3 className="font-anegra text-[22px] mobile:text-[18px] font-semibold tracking-[1.2px] text-white text-center">
              {name}
            </h3>
          </Link>
        ) : (
          <h3 className="font-anegra text-[22px] mobile:text-[18px] font-semibold tracking-[1.2px] text-white text-center">
            {name}
          </h3>
        )}

        {/* Social Icons */}
        {links.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-2">
            {links.map((link, index) => (
              <a
                key={`${link.platform}-${index}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/70 transition-colors p-1"
                aria-label={`${name} on ${link.platform}`}
              >
                <SocialIcon platform={link.platform} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
