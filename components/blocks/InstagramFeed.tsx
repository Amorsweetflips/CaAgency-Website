'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface InstagramPost {
  id: string
  imageUrl: string
  permalink: string
  caption?: string
}

interface InstagramFeedProps {
  // Option 1: Use Elfsight embed
  elfsightAppId?: string
  // Option 2: Use static posts
  posts?: InstagramPost[]
  className?: string
}

export default function InstagramFeed({
  elfsightAppId,
  posts,
  className = ''
}: InstagramFeedProps) {
  // Load Elfsight script if using widget
  useEffect(() => {
    if (elfsightAppId && typeof window !== 'undefined') {
      // Check if script already loaded
      if (!document.querySelector('script[src*="elfsight"]')) {
        const script = document.createElement('script')
        script.src = 'https://static.elfsight.com/platform/platform.js'
        script.async = true
        document.body.appendChild(script)
      }
    }
  }, [elfsightAppId])

  // Elfsight embed mode
  if (elfsightAppId) {
    return (
      <div className={`instagram-feed ${className}`}>
        <div
          className="elfsight-app-lazy"
          data-elfsight-app-lazy
          data-app-id={elfsightAppId}
        />
      </div>
    )
  }

  // Static posts mode (fallback)
  if (posts && posts.length > 0) {
    return (
      <div className={`instagram-feed ${className}`}>
        <div className="flex gap-4 mobile:gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[280px] mobile:w-[180px] aspect-square relative rounded-[12px] overflow-hidden group"
            >
              <Image
                src={post.imageUrl}
                alt={post.caption || 'Instagram post'}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="280px"
              />
              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center p-3">
                {/* Instagram icon */}
                <svg
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity mb-2"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
                {/* Caption text */}
                {post.caption && (
                  <p className="text-white text-[11px] leading-[1.4] text-center opacity-0 group-hover:opacity-100 transition-opacity line-clamp-3 font-work-sans">
                    {post.caption}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    )
  }

  // Placeholder when no posts
  return (
    <div className={`instagram-feed ${className}`}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[280px] mobile:w-[180px] aspect-square bg-white/10 rounded-[12px] animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}
