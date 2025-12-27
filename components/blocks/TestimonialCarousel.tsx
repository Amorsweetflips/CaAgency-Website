'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface TestimonialCarouselProps {
  slides: Array<{
    content: React.ReactNode
    id: string
  }>
}

export default function TestimonialCarousel({ slides }: TestimonialCarouselProps) {
  return (
    <Swiper
      slidesPerView={1}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Autoplay]}
      className="testimonial-carousel"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>{slide.content}</SwiperSlide>
      ))}
    </Swiper>
  )
}
