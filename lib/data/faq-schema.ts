// Static English FAQs for JSON-LD (SEO structured data). This lives in a
// server-safe module on purpose: it used to be exported from the 'use client'
// FAQ component, where server pages received a client-reference proxy instead
// of the object and JSON.stringify produced an EMPTY ld+json script tag in
// production — no FAQPage rich results.
const faqsForSchema = [
  {
    question: 'What is influencer marketing?',
    answer: 'Influencer marketing is a form of social media marketing that uses endorsements and product mentions from influencers – individuals who have a dedicated social following and are viewed as experts within their niche. At CA Agency, we connect brands with the right influencers to create authentic, engaging campaigns that drive results.',
  },
  {
    question: 'How do you select influencers for brand campaigns?',
    answer: 'We use a data-driven approach to match brands with influencers. We analyze audience demographics, engagement rates, content quality, brand alignment, and past campaign performance. Our network includes over 18 million followers across Instagram, TikTok, and YouTube, allowing us to find the perfect fit for any campaign.',
  },
  {
    question: 'What platforms do you work with?',
    answer: 'We specialize in Instagram, TikTok, and YouTube – the three most impactful platforms for influencer marketing. Our creators excel at Instagram Reels, TikTok videos, YouTube content, and Stories across all platforms.',
  },
  {
    question: 'How do you measure campaign success?',
    answer: 'We track key metrics including reach, impressions, engagement rate, click-through rate, conversions, and ROI. We provide detailed analytics reports throughout and after each campaign, so you can see exactly how your investment is performing.',
  },
  {
    question: 'What industries do you work with?',
    answer: 'We work with brands across various industries including beauty, fashion, lifestyle, technology, food & beverage, travel, and more. Our diverse network of creators allows us to find the perfect match for any brand.',
  },
  {
    question: 'How do I get started with CA Agency?',
    answer: 'Getting started is easy! Simply reach out through our contact form or email us directly. We\'ll schedule a consultation to understand your goals, budget, and target audience, then create a customized influencer marketing strategy for your brand.',
  },
]

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqsForSchema.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}
