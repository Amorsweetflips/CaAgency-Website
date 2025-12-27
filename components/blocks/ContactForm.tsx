'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ContactFormProps {
  formId?: number // 1 = homepage dark form, 2 = contact page light form, 3 = talent submission form
  className?: string
  variant?: 'light' | 'dark'
}

export default function ContactForm({ formId = 1, className, variant }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    message: '',
    socialLink: '',
    subject: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log('Form submitted:', formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const isDarkBackground = variant === 'dark' || formId === 1
  const isTalentForm = formId === 3

  const inputBaseStyles = cn(
    'w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors',
    isDarkBackground
      ? 'text-white border-white/60 focus:border-accent-red placeholder:text-white/50'
      : 'text-foreground-dark border-foreground-dark/40 focus:border-accent-red placeholder:text-foreground-dark/50'
  )

  const labelStyles = cn(
    'block font-jost text-[14px] font-normal mb-1',
    isDarkBackground ? 'text-white/80' : 'text-foreground-mutedOnDark'
  )

  // Talent Submission Form
  if (isTalentForm) {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn('w-full max-w-[600px] mobile:max-w-full', className)}
      >
        {/* Row 1: Full Name and Social Link */}
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6 mb-5">
          <div>
            <label htmlFor="fullName" className="block font-jost text-[14px] font-normal mb-1 text-foreground-mutedOnDark">
              Full name <span className="text-accent-red">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors text-foreground-dark border-foreground-dark/40 focus:border-accent-red placeholder:text-foreground-dark/50"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="socialLink" className="block font-jost text-[14px] font-normal mb-1 text-foreground-mutedOnDark">
              Instagram/TikTok/Youtube link <span className="text-accent-red">*</span>
            </label>
            <input
              type="url"
              id="socialLink"
              name="socialLink"
              value={formData.socialLink}
              onChange={handleChange}
              className="w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors text-foreground-dark border-foreground-dark/40 focus:border-accent-red placeholder:text-foreground-dark/50"
              placeholder=""
              required
            />
          </div>
        </div>

        {/* Row 2: Email and Phone */}
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6 mb-5">
          <div>
            <label htmlFor="email" className="block font-jost text-[14px] font-normal mb-1 text-foreground-mutedOnDark">
              Email <span className="text-accent-red">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors text-foreground-dark border-foreground-dark/40 focus:border-accent-red placeholder:text-foreground-dark/50"
              placeholder="Email Address"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-jost text-[14px] font-normal mb-1 text-foreground-mutedOnDark">
              Phone/Mobile <span className="text-accent-red">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors text-foreground-dark border-foreground-dark/40 focus:border-accent-red placeholder:text-foreground-dark/50"
              placeholder=""
              required
            />
          </div>
        </div>

        {/* Row 3: Subject and Message */}
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6 mb-6">
          <div>
            <label htmlFor="subject" className="block font-jost text-[14px] font-normal mb-1 text-foreground-mutedOnDark">
              Subject <span className="text-accent-red">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors text-foreground-dark border-foreground-dark/40 focus:border-accent-red placeholder:text-foreground-dark/50"
              placeholder=""
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-jost text-[14px] font-normal mb-1 text-foreground-mutedOnDark">
              Leave us a message <span className="text-accent-red">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={1}
              className="w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors text-foreground-dark border-foreground-dark/40 focus:border-accent-red placeholder:text-foreground-dark/50"
              placeholder="Your message goes here..."
              required
            />
          </div>
        </div>

        <div className="flex justify-end mobile:justify-start">
          <Button type="submit" variant="dark">
            Get in touch!
          </Button>
        </div>
      </form>
    )
  }

  // Contact Page Form (formId === 2)
  if (formId === 2) {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn('w-full max-w-[600px] mobile:max-w-full', className)}
      >
        {/* Row 1: Full Name and Email */}
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6 mb-5">
          <div>
            <label htmlFor="fullName" className="block font-jost text-[14px] font-normal mb-1 text-foreground-mutedOnDark">
              Full name <span className="text-accent-red">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors text-foreground-dark border-foreground-dark/40 focus:border-accent-red placeholder:text-foreground-dark/50"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-jost text-[14px] font-normal mb-1 text-foreground-mutedOnDark">
              Email <span className="text-accent-red">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors text-foreground-dark border-foreground-dark/40 focus:border-accent-red placeholder:text-foreground-dark/50"
              placeholder="Email Address"
              required
            />
          </div>
        </div>

        {/* Row 2: Phone and Company */}
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6 mb-5">
          <div>
            <label htmlFor="phone" className="block font-jost text-[14px] font-normal mb-1 text-foreground-mutedOnDark">
              Phone/Mobile <span className="text-accent-red">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors text-foreground-dark border-foreground-dark/40 focus:border-accent-red placeholder:text-foreground-dark/50"
              placeholder=""
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block font-jost text-[14px] font-normal mb-1 text-foreground-mutedOnDark">
              Company <span className="text-accent-red">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors text-foreground-dark border-foreground-dark/40 focus:border-accent-red placeholder:text-foreground-dark/50"
              placeholder="Company name"
              required
            />
          </div>
        </div>

        {/* Row 3: Budget and Message */}
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6 mb-6">
          <div>
            <label htmlFor="budget" className="block font-jost text-[14px] font-normal mb-1 text-foreground-mutedOnDark">
              Estimated budget <span className="text-accent-red">*</span>
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors text-foreground-dark border-foreground-dark/40 focus:border-accent-red"
              required
            >
              <option value="">Estimated budget...</option>
              <option value="na">N/A</option>
              <option value="startup">Start-up budget</option>
              <option value="20-40k">20 - 40k</option>
              <option value="40-80k">40 - 80k</option>
              <option value="80-150k">80 - 150k</option>
              <option value="150-250k">150 - 250k</option>
              <option value="250k+">250k+</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block font-jost text-[14px] font-normal mb-1 text-foreground-mutedOnDark">
              How can we help? <span className="text-accent-red">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={1}
              className="w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-none resize-none border-b transition-colors text-foreground-dark border-foreground-dark/40 focus:border-accent-red placeholder:text-foreground-dark/50"
              placeholder="Your message goes here..."
              required
            />
          </div>
        </div>

        <div className="flex justify-end mobile:justify-start">
          <Button type="submit" variant="dark">
            Get in touch!
          </Button>
        </div>
      </form>
    )
  }

  // Homepage Contact Form (formId === 1, default) - matches live site layout
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'w-full max-w-[400px] mobile:max-w-full contact-form-dark',
        className
      )}
    >
      {/* Row 1: Full Name and Email */}
      <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6 mb-5">
        <div>
          <label htmlFor="fullName" className={labelStyles}>
            Full name <span className="text-accent-red">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={inputBaseStyles}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className={labelStyles}>
            Email <span className="text-accent-red">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputBaseStyles}
            placeholder="Email Address"
            required
          />
        </div>
      </div>

      {/* Row 2: Phone and Company */}
      <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6 mb-5">
        <div>
          <label htmlFor="phone" className={labelStyles}>
            Phone/Mobile <span className="text-accent-red">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputBaseStyles}
            placeholder=""
            required
          />
        </div>
        <div>
          <label htmlFor="company" className={labelStyles}>
            Company <span className="text-accent-red">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={inputBaseStyles}
            placeholder="Company name"
            required
          />
        </div>
      </div>

      {/* Row 3: Budget and Message */}
      <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6 mb-6">
        <div>
          <label htmlFor="budget" className={labelStyles}>
            Estimated budget <span className="text-accent-red">*</span>
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={inputBaseStyles}
            required
          >
            <option value="">Estimated budget...</option>
            <option value="na">N/A</option>
            <option value="startup">Start-up budget</option>
            <option value="20-40k">20 - 40k</option>
            <option value="40-80k">40 - 80k</option>
            <option value="80-150k">80 - 150k</option>
            <option value="150-250k">150 - 250k</option>
            <option value="250k+">250k+</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className={labelStyles}>
            How can we help? <span className="text-accent-red">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={1}
            className={inputBaseStyles}
            placeholder="Your message goes here..."
            required
          />
        </div>
      </div>

      <div className="flex justify-center mobile:justify-start">
        <Button
          type="submit"
          variant="light"
        >
          Get in touch!
        </Button>
      </div>
    </form>
  )
}
