/**
 * Speculation Rules API: lets Chromium browsers prerender the pages a visitor
 * is most likely to open next (triggered on link hover/mousedown with
 * "moderate" eagerness), making those navigations feel instant. Location and
 * blog index pages are prefetched (HTML only) rather than fully prerendered
 * to keep speculative work cheap. Unsupported browsers ignore the script.
 */
const rules = {
  prerender: [
    {
      urls: ['/about', '/services', '/work', '/talents', '/contact'],
      eagerness: 'moderate',
    },
  ],
  prefetch: [
    {
      where: {
        href_matches: '/influencer-marketing-*',
      },
      eagerness: 'moderate',
    },
    {
      urls: ['/blog', '/korean-skincare-influencer-marketing'],
      eagerness: 'moderate',
    },
  ],
}

export default function SpeculationRules() {
  return (
    <script
      type="speculationrules"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rules) }}
    />
  )
}
