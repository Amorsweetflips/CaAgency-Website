import { test, expect } from '@playwright/test'

test('homepage renders hero and key sections', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/CA Agency/)
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.getByRole('heading', { name: /Meet the Talents/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /What Our Clients Say/i })).toBeVisible()
})

test('homepage has no critical console errors', async ({ page }) => {
  // Neutralize Vercel analytics: under a local `next start` it falls back to an
  // external debug build that needs eval() (blocked by our CSP). On real Vercel
  // prod these load same-origin and are fine (verified 0 errors). Fulfilling
  // them empty lets this assert genuine app-level console health only.
  await page.route(/va\.vercel-scripts\.com|\/_vercel\//, (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
  )

  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  await page.goto('/', { waitUntil: 'load' })
  await page.waitForTimeout(1500)

  const benign = /ERR_CACHE|favicon/i
  const critical = errors.filter((e) => !benign.test(e))
  expect(critical, critical.join('\n')).toHaveLength(0)
})
