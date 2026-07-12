import { test, expect } from '@playwright/test'

test('Arabic homepage owns the RTL document root', async ({ page }) => {
  await page.goto('/ar')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.locator('h1').first()).toBeVisible()
})

test('Korean homepage owns the Korean document root', async ({ page }) => {
  await page.goto('/ko')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko')
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  await expect(page.locator('h1').first()).toBeVisible()
})

test('language switching preserves campaign query parameters', async ({ page }) => {
  await page.goto('/ar/about?utm_source=review&ref=creator#team')
  await page.locator('header.hidden select').selectOption('ko')
  await expect(page).toHaveURL(/\/ko\/about\?utm_source=review&ref=creator#team$/)
})

test('Arabic shared public links remain localized without a global provider', async ({ page }) => {
  await page.goto('/ar')

  const carousel = page.getByRole('region', { name: 'Featured creators' })
  await expect(carousel.locator('a').first()).toHaveAttribute('href', '/ar/talents')

  const footer = page.locator('footer')
  await expect(footer.locator('a[href="/ar/about"]')).toHaveCount(1)
  await expect(footer.locator('a[href="/ar/privacy-policy"]')).toHaveCount(1)
  await expect(footer.locator('a[href="/ar/contact"]')).toHaveCount(2)
})
