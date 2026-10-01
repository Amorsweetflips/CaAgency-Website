// Contact-form copy is resolved on the server and handed to the client form as
// plain strings: every message is static text, so shipping next-intl's ICU
// formatter to /contact (~15 KB gz) bought nothing.
export const CONTACT_FORM_LABEL_KEYS = [
  'budget',
  'budgetNotSure',
  'budgetNotSureYet',
  'budgetStartup',
  'budgetStartupFull',
  'company',
  'companyPlaceholder',
  'companyPlaceholderShort',
  'email',
  'errorMessage',
  'errorTitle',
  'estimatedBudget',
  'fullName',
  'getInTouch',
  'howCanWeHelp',
  'message',
  'messagePlaceholderProject',
  'messagePlaceholderShort',
  'messagePlaceholderTalent',
  'namePlaceholder',
  'phone',
  'selectBudget',
  'selectBudgetRange',
  'sendAnotherMessage',
  'sending',
  'socialLink',
  'socialPlaceholder',
  'subject',
  'subjectPlaceholder',
  'submitApplication',
  'successMessage',
  'thankYou',
  'tryAgain',
] as const

export type ContactFormLabelKey = (typeof CONTACT_FORM_LABEL_KEYS)[number]
export type ContactFormLabels = Readonly<Record<ContactFormLabelKey, string>>

type MessageTree = { readonly [key: string]: unknown }

function namespace(messages: MessageTree, name: string): MessageTree {
  const value = messages[name]
  return value && typeof value === 'object' ? (value as MessageTree) : {}
}

// Form-specific copy lives in `contactForm`; generic actions shared with the
// rest of the site (e.g. sendAnotherMessage) live in `common`.
export function buildContactFormLabels(messages: MessageTree): ContactFormLabels {
  const form = namespace(messages, 'contactForm')
  const common = namespace(messages, 'common')

  const entries = CONTACT_FORM_LABEL_KEYS.map((key) => {
    const value = form[key] ?? common[key]
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(`Missing contact form label "${key}" (looked in contactForm and common)`)
    }
    return [key, value] as const
  })

  return Object.fromEntries(entries) as ContactFormLabels
}
