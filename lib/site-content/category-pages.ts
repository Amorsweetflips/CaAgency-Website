import type { LocationPageContent } from '@/lib/site-content/location-pages'

// Default CMS content for the category landing pages (beauty and skincare).
// Kept out of definitions.ts, which is already far past the file-size ceiling.
// Every brand and figure here is taken from the site's own case studies and
// published stats; do not add claims that are not backed by real campaigns.

const sharedStats: LocationPageContent['stats'] = [
  { value: '3000+', label: 'Campaigns Delivered' },
  { value: '150+', label: 'Global Brands' },
  { value: '18M+', label: 'Combined Followers' },
  { value: 'IG · TikTok · YT', label: 'Platforms' },
]

export const beautyPageDefaults: LocationPageContent = {
  hero: {
    title: 'Beauty Influencer\nMarketing Agency',
    subtitle:
      'CA Agency is a beauty influencer marketing agency connecting makeup, skincare, haircare and beauty retail brands with creators who show products performing on real skin, in real light, across the USA and global markets.',
    primaryButtonLabel: 'Start Your Campaign',
    primaryButtonHref: '/contact',
    secondaryButtonLabel: 'See Case Studies',
    secondaryButtonHref: '/case-studies',
  },
  stats: sharedStats,
  marquee: {
    items: ['Fenty Beauty', 'YSL Beauty', 'NARS', 'Kylie Cosmetics', 'Sephora', 'Kiko Milano', "Juvia's Place", 'Revolve Beauty', 'Gisou', 'Laneige'],
  },
  caseStudies: {
    title: 'Beauty Campaigns We Have Run',
    subtitle: 'Prestige, colour, haircare and beauty retail: a snapshot of brands we have matched with the right creators.',
    items: [
      { src: '/videos/work/melly-fenty-web-v1.mp4', brand: 'Fenty Beauty', name: 'Base makeup on real skin', href: '/case-studies/fenty-beauty-campaign' },
      { src: '/videos/work/dariia-ysl-web-v1.mp4', brand: 'YSL Beauty', name: 'Luxury beauty, creator-native', href: '/case-studies/ysl-beauty-campaign' },
      { src: '/videos/work/fashionfreakk-nars.mp4', brand: 'NARS', name: 'Prestige beauty', href: '/case-studies/nars-campaign' },
      { src: '/videos/work/kylie-cosmetics-web-v1.mp4', brand: 'Kylie Cosmetics', name: 'Colour cosmetics', href: '/case-studies/kylie-cosmetics-campaign' },
      { src: '/videos/work/albina-sephora-web-v1.mp4', brand: 'Sephora', name: 'Beauty retail hauls & favourites', href: '/case-studies/sephora-campaign' },
      { src: '/videos/work/beatrix-gisou-web-v1.mp4', brand: 'Gisou', name: 'Haircare texture & finish', href: '/case-studies/gisou-campaign' },
    ],
  },
  process: {
    title: 'How We Run a Beauty Influencer Campaign',
    subtitle: 'One accountable team from first brief to final report.',
    steps: [
      { title: 'Brief & Strategy', description: 'We pin down the hero product, the claims you can make, the shades or skin types to show, your markets, and the result that matters: awareness, trial, or sales.' },
      { title: 'Creator Match', description: 'We shortlist beauty creators by audience fit, skin type and tone range, engagement quality, and content craft, not follower count alone.' },
      { title: 'Content & Approvals', description: 'Application, wear tests, swatches, and get-ready-with-me formats, managed through briefing, approvals, usage rights, and disclosure.' },
      { title: 'Amplify & Report', description: 'The best-performing content is extended with partnership and Spark ads, and every campaign is reported on reach, engagement, clicks, and conversions.' },
    ],
  },
  intro: {
    heading: 'The Beauty Influencer Marketing Agency Built on Real Campaigns',
    paragraphs: [
      { text: 'Beauty is the category where creators matter most. Shoppers want to see a foundation match a real skin tone, a lipstick survive a full day, and a serum sink in before they buy. CA Agency is a beauty influencer marketing agency that builds exactly that proof, pairing makeup, skincare, haircare and beauty retail brands with creators who can demonstrate a product on camera and make it convert across Instagram, TikTok, and YouTube.' },
      { text: 'Our work spans prestige and luxury names such as YSL Beauty and NARS, colour cosmetics brands including Fenty Beauty, Kylie Cosmetics, Kiko Milano and Juvia’s Place, beauty retailers such as Sephora and Revolve Beauty, and haircare from Gisou. Each brief is different: a luxury house needs polish that still feels native to a creator’s feed, while a colour brand needs pigment, swatches, and shade range shown honestly.' },
      { text: 'For brands targeting the USA, the largest beauty market in the world, we combine nationwide reach with FTC-compliant disclosure and claims discipline. For global launches we coordinate creators across North America, Europe, the Middle East and Asia so one product story travels consistently. Skincare-led brands can go deeper with our skincare influencer marketing programs, and Korean brands with our dedicated K-beauty team.' },
    ],
  },
  highlights: {
    title: 'Why Beauty Brands Choose CA Agency',
    items: [
      { title: 'Beauty Is Our Core', description: 'Beauty and skincare are our core focus, so creators are briefed by people who know finish, wear time, shade range, and the claims that matter.' },
      { title: 'Proof Over Polish', description: 'We brief for honest demonstration (swatches, wear tests, before-and-after on real skin) because that is what earns trust and drives trial.' },
      { title: 'Talent-First Network', description: 'We manage our own roster of beauty creators and work across a wider network, so you get creators who genuinely use and love the category.' },
      { title: 'Measured Like Media', description: 'Every campaign reports reach, engagement, clicks, and conversions, and the content can be amplified with paid partnership ads.' },
    ],
  },
  talents: { title: 'Beauty Creators on Our Roster', buttonLabel: 'View All Talents', buttonHref: '/talents' },
  industries: {
    title: 'Beauty Categories We Specialise In',
    items: [
      { icon: '💄', title: 'Makeup & Colour Cosmetics', description: 'Base, lip, eye and complexion launches shown through swatches, application, and real wear.' },
      { icon: '💧', title: 'Skincare', description: 'Routines, actives, and texture shots that explain what a product does and who it is for.' },
      { icon: '✨', title: 'Haircare & Beauty Retail', description: 'Finish-led haircare content and haul-style retail campaigns that drive store and site traffic.' },
    ],
  },
  faq: {
    title: 'Beauty Influencer Marketing FAQs',
    items: [
      { question: 'What does a beauty influencer marketing agency do?', answer: 'We plan and run creator campaigns for beauty brands end to end: strategy, creator selection, briefing, contracts, content approvals, usage rights, disclosure, paid amplification, and reporting. You get one accountable team instead of managing dozens of creators yourself.' },
      { question: 'How much does beauty influencer marketing cost?', answer: 'Cost depends on the platforms, creator tiers, number of creators, deliverables, and usage rights. Rather than quote a flat rate, we scope each campaign to your goals and budget and show you which creator mix gives the best return. Share your budget and objectives and we will build the plan around them.' },
      { question: 'Which platforms work best for beauty brands?', answer: 'TikTok drives discovery and trends, Instagram Reels and Stories carry polished routines and launches, and YouTube is strongest for in-depth tutorials and reviews. Most beauty campaigns use a mix, weighted by your audience and goal.' },
      { question: 'Do you work with beauty brands in the USA?', answer: 'Yes. The USA is our primary market and we run nationwide campaigns with American creators, including FTC-compliant disclosure, alongside campaigns across Europe, the Middle East, and Asia.' },
      { question: 'Can you work with emerging beauty brands as well as global names?', answer: 'Yes. We work with everything from new indie labels building their first creator program to global houses launching new products, and we scale the creator mix (micro, mid-tier, and macro) to the stage of the brand.' },
    ],
  },
  cta: { title: 'Launch Your Beauty Campaign', description: 'Tell us about your product, market, and goals, and we will match you with beauty creators who can sell it.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
}

export const skincarePageDefaults: LocationPageContent = {
  hero: {
    title: 'Skincare Influencer\nMarketing Agency',
    subtitle:
      'CA Agency is a skincare influencer marketing agency helping skincare brands turn ingredients, textures, and routines into creator content that builds trust and drives trial in the USA and worldwide.',
    primaryButtonLabel: 'Start Your Campaign',
    primaryButtonHref: '/contact',
    secondaryButtonLabel: 'See Case Studies',
    secondaryButtonHref: '/case-studies',
  },
  stats: sharedStats,
  marquee: {
    items: ['DELERE', 'Purito', 'Anua', 'Mixsoon', 'Haruharu Wonder', 'Medicube', 'Laneige', 'YesStyle'],
  },
  caseStudies: {
    title: 'Skincare Campaigns We Have Run',
    subtitle: 'Routine-led, ingredient-first creator content for skincare brands.',
    items: [
      { src: '/videos/work/saranda-delere-web-v1.mp4', brand: 'DELERE', name: 'Routine-led skincare', href: '/case-studies/delere-campaign' },
      { src: '/videos/work/aiym-purito-web-v1.mp4', brand: 'Purito', name: 'Clean, sensitive-skin care', href: '/case-studies/purito-campaign' },
      { src: '/videos/work/anton-anua-web-v1.mp4', brand: 'Anua', name: 'Men’s skincare routine', href: '/case-studies/anua-campaign' },
      { src: '/videos/work/albina-mixsoon-web-v1.mp4', brand: 'Mixsoon', name: 'Ingredient-led skincare', href: '/case-studies/mixsoon-skincare' },
      { src: '/videos/work/rebecca-haruharu-web-v1.mp4', brand: 'Haruharu Wonder', name: 'Fermented, gentle skincare', href: '/case-studies/haruharu-wonder-campaign' },
      { src: '/videos/work/medicube.mp4', brand: 'Medicube', name: 'Clinical skincare & devices' },
    ],
  },
  process: {
    title: 'How We Run a Skincare Influencer Campaign',
    subtitle: 'Built around education, honest results, and compliant claims.',
    steps: [
      { title: 'Claims & Brief', description: 'We start from your hero ingredients, approved claims, and target skin concerns, so every creator brief is accurate and compliant from day one.' },
      { title: 'Creator Match', description: 'We select skincare-literate creators by skin type, concern, audience fit, and credibility, so the person explaining the product actually matches the customer.' },
      { title: 'Routine Content', description: 'Routine demos, texture close-ups, ingredient explainers, and honest progress content, with approvals, usage rights, and disclosure handled.' },
      { title: 'Measure & Scale', description: 'We report on reach, engagement, clicks, and conversions, then scale the creators and formats that drive trial.' },
    ],
  },
  intro: {
    heading: 'A Skincare Influencer Marketing Agency That Speaks Ingredients',
    paragraphs: [
      { text: 'Skincare is bought on trust. Before someone adds a serum or SPF to their routine, they want to understand what is in it, see the texture, and hear from someone with skin like theirs. CA Agency is a skincare influencer marketing agency that builds that trust, matching skincare brands with creators who can explain actives clearly, demonstrate a routine on camera, and show honest results over time on Instagram, TikTok, and YouTube.' },
      { text: 'We have run skincare campaigns for brands including DELERE, Purito, Anua, Mixsoon, Haruharu Wonder and Medicube, covering routine-led launches, sensitive-skin and clean positioning, ingredient-first education, and men’s skincare. That experience shapes how we brief: what to demonstrate, which claims creators can and cannot make, and how to show progress without overpromising.' },
      { text: 'Claims discipline matters most in the USA, where cosmetic claims must stay clear of drug-style promises and every sponsored post needs clear FTC disclosure. We build both into every brief and approval. Korean and K-beauty brands can work with our dedicated K-beauty team, and brands with a wider beauty range can combine skincare with makeup and haircare through our beauty influencer marketing programs.' },
    ],
  },
  highlights: {
    title: 'Why Skincare Brands Work With Us',
    items: [
      { title: 'Ingredient-Literate Briefs', description: 'Creators are briefed on actives, concentrations, and routines by a team that knows skincare, so the education lands correctly.' },
      { title: 'Claims You Can Stand Behind', description: 'Approvals check every claim and disclosure, keeping content persuasive without drifting into medical or exaggerated promises.' },
      { title: 'Matched by Skin Concern', description: 'We pair products with creators whose skin type and concerns match your customer: acne-prone, sensitive, mature, or oily skin.' },
      { title: 'Results Over Hype', description: 'Texture shots, routine demos, and honest progress content convert better than one-off unboxings, and we measure them to prove it.' },
    ],
  },
  talents: { title: 'Creators Who Speak Skincare', buttonLabel: 'View All Talents', buttonHref: '/talents' },
  industries: {
    title: 'Skincare Campaigns We Run',
    items: [
      { icon: '🧴', title: 'Routines & Ingredient Education', description: 'Ingredient-first and routine-led content that explains what a product does and who it is for, not jargon.' },
      { icon: '🌿', title: 'Sensitive-Skin & Men’s Skincare', description: 'Gentle, clean and men’s routines matched to creators whose skin and audience fit the product.' },
      { icon: '🔬', title: 'Clinical Skincare & Devices', description: 'At-home devices and clinical lines demonstrated with credible, results-led content.' },
    ],
  },
  faq: {
    title: 'Skincare Influencer Marketing FAQs',
    items: [
      { question: 'How do you find the right skincare influencers?', answer: 'We vet creators on skin type and concerns, audience demographics, engagement quality, content style, and brand safety. The goal is a creator whose audience looks like your customer and who can explain the product credibly.' },
      { question: 'How do you handle skincare claims and FTC disclosure?', answer: 'We brief creators on your approved claims, review content before it goes live, and make sure every sponsored post carries clear disclosure such as #ad. In the USA that also means keeping cosmetic claims away from drug-style promises like treating or curing conditions.' },
      { question: 'Which platforms work best for skincare brands?', answer: 'TikTok is strongest for discovery and routine trends, Instagram for polished routines and Reels, and YouTube for in-depth reviews and long-term results. We weight the mix by your audience and goal.' },
      { question: 'Do you only work with Korean skincare brands?', answer: 'No. We work with skincare brands from every market. Korean and K-beauty brands have a dedicated team, and the education-led approach K-beauty made popular works for any skincare brand.' },
      { question: 'How much does a skincare influencer campaign cost?', answer: 'It depends on platforms, creator tiers, the number of creators, deliverables, and usage rights. We scope each campaign to your goals and budget rather than quoting a flat rate, and show which creator mix gives the best return.' },
    ],
  },
  cta: { title: 'Launch Your Skincare Campaign', description: 'Share your hero product and goals, and we will match you with skincare creators who can explain it, demonstrate it, and sell it.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
}
