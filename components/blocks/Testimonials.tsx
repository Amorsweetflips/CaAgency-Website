'use client'

import { useState } from 'react'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'

interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'CA Agency transformed our influencer marketing strategy. Their data-driven approach and network of creators helped us reach millions of engaged users. The ROI exceeded our expectations.',
    author: 'Sarah M.',
    role: 'Marketing Director',
    company: 'Global Beauty Brand',
  },
  {
    id: '2',
    quote: 'Working with CA Agency was seamless. They matched us with perfect influencers who genuinely connected with our audience. Our engagement increased by 300% during the campaign.',
    author: 'Ahmed K.',
    role: 'Brand Manager',
    company: 'Fashion E-commerce',
  },
  {
    id: '3',
    quote: "CA Agency's understanding of the Middle Eastern market is unmatched. They created authentic content that resonated with our target demographic across Instagram and TikTok.",
    author: 'Emma C.',
    role: 'Regional Marketing Lead',
    company: 'International Cosmetics',
  },
  {
    id: '4',
    quote: 'As a creator, CA Agency has been instrumental in growing my career. They connect me with amazing brands and handle everything professionally so I can focus on content.',
    author: 'Albina M.',
    role: 'Content Creator',
    company: '500K+ Followers',
  },
]

// Review schema for SEO
export const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CA Agency',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: testimonials.length.toString(),
    bestRating: '5',
    worstRating: '1',
  },
  review: testimonials.map((t) => ({
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
    author: {
      '@type': 'Person',
      name: t.author,
    },
    reviewBody: t.quote,
  })),
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-background-dark py-[100px] mobile:py-[70px] px-section-x border-t border-white/5">
      <div className="max-w-container mx-auto">
        <Heading as="h2" color="white" className="text-center mb-12 text-[48px] tablet:text-[38px] mobile:text-[32px]">
          What Our Clients Say
        </Heading>

        <div className="max-w-[800px] mx-auto">
          {/* Quote */}
          <div className="min-h-[200px] mobile:min-h-[250px] mb-8">
            <blockquote className="text-center">
              <Text color="white" size="lg" className="italic opacity-90 leading-relaxed text-[20px] mobile:text-[16px]">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </Text>
            </blockquote>
            <div className="text-center mt-6">
              <p className="text-white font-semibold text-[16px]">
                {testimonials[activeIndex].author}
              </p>
              <p className="text-white/60 text-[14px]">
                {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-accent-red' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
