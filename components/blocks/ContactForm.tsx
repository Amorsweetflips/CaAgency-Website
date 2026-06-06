'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ContactFormProps {
  formId?: number // 1 = homepage dark form, 2 = contact page light form, 3 = talent submission form
  className?: string
  variant?: 'light' | 'dark'
}

export default function ContactForm({ formId = 1, className, variant }: ContactFormProps) {
  const t = useTranslations('contactForm')
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
  const [honeypot, setHoneypot] = useState('') // Spam protection
  const [formStartTime] = useState(Date.now()) // Time-based spam protection
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      setSubmitStatus('success') // Fake success to confuse bots
      return
    }

    // Time-based check - form filled too fast (< 3 seconds) is likely a bot
    const timeElapsed = Date.now() - formStartTime
    if (timeElapsed < 3000) {
      setSubmitStatus('success') // Fake success to confuse bots
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: formId === 3 ? 'talent' : 'brand',
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          budget: formData.budget,
          message: formData.message,
          socialLink: formData.socialLink,
          subject: formData.subject,
          _formTime: timeElapsed, // Send for server-side validation too
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          budget: '',
          message: '',
          socialLink: '',
          subject: '',
        })
        setSubmitStatus('idle')
      }, 3000)
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
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
    'w-full font-jost text-[16px] font-normal bg-transparent px-0 py-3 focus:outline-hidden resize-none border-b-2 transition-all duration-300',
    isDarkBackground
      ? 'text-white border-white/30 focus:border-accent-red placeholder:text-white/40 hover:border-white/50'
      : 'text-foreground-dark border-foreground-dark/20 focus:border-accent-red placeholder:text-foreground-dark/40 hover:border-foreground-dark/40'
  )

  const labelStyles = cn(
    'block font-jost text-[13px] font-medium mb-2 uppercase tracking-[1px]',
    isDarkBackground ? 'text-white/70' : 'text-foreground-gray'
  )

  // Success message component
  if (submitStatus === 'success') {
    return (
      <m.div
        className={cn('w-full text-center py-12', className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <m.div
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-red/10 flex items-center justify-center"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg className="w-8 h-8 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </m.div>
        <h3 className={cn(
          'font-anegra text-[24px] font-semibold mb-2',
          isDarkBackground ? 'text-white' : 'text-foreground-dark'
        )}>
          {t('thankYou')}
        </h3>
        <p className={cn(
          'font-work-sans text-[14px]',
          isDarkBackground ? 'text-white/70' : 'text-foreground-gray'
        )}>
          {t('successMessage')}
        </p>
      </m.div>
    )
  }

  // Error message component
  if (submitStatus === 'error') {
    return (
      <m.div
        className={cn('w-full text-center py-12', className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className={cn(
          'font-anegra text-[24px] font-semibold mb-2',
          isDarkBackground ? 'text-white' : 'text-foreground-dark'
        )}>
          {t('errorTitle')}
        </h3>
        <p className={cn(
          'font-work-sans text-[14px] mb-4',
          isDarkBackground ? 'text-white/70' : 'text-foreground-gray'
        )}>
          {t('errorMessage')}{' '}
          <a href="mailto:info@caagency.com" className="text-accent-red hover:underline">
            info@caagency.com
          </a>
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="text-accent-red hover:underline font-medium"
        >
          {t('tryAgain')}
        </button>
      </m.div>
    )
  }

  // Talent Submission Form
  if (isTalentForm) {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn('w-full', className)}
      >
        {/* Honeypot field - hidden from users, visible to bots */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website_url">Website</label>
          <input
            type="text"
            id="website_url"
            name="website_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Row 1: Full Name and Social Link */}
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8 mb-6">
          <div className="group">
            <label htmlFor="talentFullName" className={labelStyles}>
              {t('fullName')} <span className="text-accent-red">*</span>
            </label>
            <input
              type="text"
              id="talentFullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={inputBaseStyles}
              placeholder={t('namePlaceholder')}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="talentSocialLink" className={labelStyles}>
              {t('socialLink')} <span className="text-accent-red">*</span>
            </label>
            <input
              type="url"
              id="talentSocialLink"
              name="socialLink"
              value={formData.socialLink}
              onChange={handleChange}
              className={inputBaseStyles}
              placeholder={t('socialPlaceholder')}
              required
            />
          </div>
        </div>

        {/* Row 2: Email and Phone */}
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8 mb-6">
          <div className="group">
            <label htmlFor="talentEmail" className={labelStyles}>
              {t('email')} <span className="text-accent-red">*</span>
            </label>
            <input
              type="email"
              id="talentEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputBaseStyles}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="group">
            <label htmlFor="talentPhone" className={labelStyles}>
              {t('phone')} <span className="text-accent-red">*</span>
            </label>
            <input
              type="tel"
              id="talentPhone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputBaseStyles}
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
        </div>

        {/* Row 3: Subject */}
        <div className="mb-6">
          <label htmlFor="talentSubject" className={labelStyles}>
            {t('subject')} <span className="text-accent-red">*</span>
          </label>
          <input
            type="text"
            id="talentSubject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputBaseStyles}
            placeholder={t('subjectPlaceholder')}
            required
          />
        </div>

        {/* Message */}
        <div className="mb-8">
          <label htmlFor="talentMessage" className={labelStyles}>
            {t('message')} <span className="text-accent-red">*</span>
          </label>
          <textarea
            id="talentMessage"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={cn(inputBaseStyles, 'resize-y min-h-[100px]')}
            placeholder={t('messagePlaceholderTalent')}
            required
          />
        </div>

        <div className="flex justify-start">
          <Button type="submit" variant="dark" className="min-w-[180px]">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('sending')}
              </span>
            ) : (
              t('submitApplication')
            )}
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
        className={cn('w-full', className)}
      >
        {/* Honeypot field - hidden from users, visible to bots */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website_url_2">Website</label>
          <input
            type="text"
            id="website_url_2"
            name="website_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Row 1: Full Name and Email */}
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8 mb-6">
          <div className="group">
            <label htmlFor="contactFullName" className={labelStyles}>
              {t('fullName')} <span className="text-accent-red">*</span>
            </label>
            <input
              type="text"
              id="contactFullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={inputBaseStyles}
              placeholder={t('namePlaceholder')}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="contactEmail" className={labelStyles}>
              {t('email')} <span className="text-accent-red">*</span>
            </label>
            <input
              type="email"
              id="contactEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputBaseStyles}
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        {/* Row 2: Phone and Company */}
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8 mb-6">
          <div className="group">
            <label htmlFor="contactPhone" className={labelStyles}>
              {t('phone')} <span className="text-accent-red">*</span>
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputBaseStyles}
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
          <div className="group">
            <label htmlFor="contactCompany" className={labelStyles}>
              {t('company')} <span className="text-accent-red">*</span>
            </label>
            <input
              type="text"
              id="contactCompany"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputBaseStyles}
              placeholder={t('companyPlaceholder')}
              required
            />
          </div>
        </div>

        {/* Budget */}
        <div className="mb-6">
          <label htmlFor="contactBudget" className={labelStyles}>
            {t('estimatedBudget')} <span className="text-accent-red">*</span>
          </label>
          <select
            id="contactBudget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={inputBaseStyles}
            required
          >
            <option value="">{t('selectBudgetRange')}</option>
            <option value="na">{t('budgetNotSureYet')}</option>
            <option value="startup">{t('budgetStartupFull')}</option>
            <option value="20-40k">$20k - $40k</option>
            <option value="40-80k">$40k - $80k</option>
            <option value="80-150k">$80k - $150k</option>
            <option value="150-250k">$150k - $250k</option>
            <option value="250k+">$250k+</option>
          </select>
        </div>

        {/* Message */}
        <div className="mb-8">
          <label htmlFor="contactMessage" className={labelStyles}>
            {t('howCanWeHelp')} <span className="text-accent-red">*</span>
          </label>
          <textarea
            id="contactMessage"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={cn(inputBaseStyles, 'resize-y min-h-[100px]')}
            placeholder={t('messagePlaceholderProject')}
            required
          />
        </div>

        <div className="flex justify-start">
          <Button type="submit" variant="dark" className="min-w-[180px]">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('sending')}
              </span>
            ) : (
              t('getInTouch')
            )}
          </Button>
        </div>
      </form>
    )
  }

  // Homepage Contact Form (formId === 1, default)
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'w-full max-w-[500px] mobile:max-w-full contact-form-dark',
        className
      )}
    >
      {/* Honeypot field - hidden from users, visible to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website_url_1">Website</label>
        <input
          type="text"
          id="website_url_1"
          name="website_url"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Row 1: Full Name and Email */}
      <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6 mb-5">
        <div>
          <label htmlFor="homeFullName" className={labelStyles}>
            {t('fullName')} <span className="text-accent-red">*</span>
          </label>
          <input
            type="text"
            id="homeFullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={inputBaseStyles}
            placeholder={t('namePlaceholder')}
            required
          />
        </div>
        <div>
          <label htmlFor="homeEmail" className={labelStyles}>
            {t('email')} <span className="text-accent-red">*</span>
          </label>
          <input
            type="email"
            id="homeEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputBaseStyles}
            placeholder="your@email.com"
            required
          />
        </div>
      </div>

      {/* Row 2: Phone and Company */}
      <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6 mb-5">
        <div>
          <label htmlFor="homePhone" className={labelStyles}>
            {t('phone')} <span className="text-accent-red">*</span>
          </label>
          <input
            type="tel"
            id="homePhone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputBaseStyles}
            placeholder="+1 (555) 000-0000"
            required
          />
        </div>
        <div>
          <label htmlFor="homeCompany" className={labelStyles}>
            {t('company')} <span className="text-accent-red">*</span>
          </label>
          <input
            type="text"
            id="homeCompany"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={inputBaseStyles}
            placeholder={t('companyPlaceholderShort')}
            required
          />
        </div>
      </div>

      {/* Row 3: Budget and Message */}
      <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6 mb-6">
        <div>
          <label htmlFor="homeBudget" className={labelStyles}>
            {t('budget')} <span className="text-accent-red">*</span>
          </label>
          <select
            id="homeBudget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={inputBaseStyles}
            required
          >
            <option value="">{t('selectBudget')}</option>
            <option value="na">{t('budgetNotSure')}</option>
            <option value="startup">{t('budgetStartup')}</option>
            <option value="20-40k">$20k - $40k</option>
            <option value="40-80k">$40k - $80k</option>
            <option value="80-150k">$80k - $150k</option>
            <option value="150-250k">$150k - $250k</option>
            <option value="250k+">$250k+</option>
          </select>
        </div>
        <div>
          <label htmlFor="homeMessage" className={labelStyles}>
            {t('message')} <span className="text-accent-red">*</span>
          </label>
          <textarea
            id="homeMessage"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={1}
            className={inputBaseStyles}
            placeholder={t('messagePlaceholderShort')}
            required
          />
        </div>
      </div>

      <div className="flex justify-center mobile:justify-start">
        <Button type="submit" variant="light" className="min-w-[160px]">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          ) : (
            'Get in Touch'
          )}
        </Button>
      </div>
    </form>
  )
}
