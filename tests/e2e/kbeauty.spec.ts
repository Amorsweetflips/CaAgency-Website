import { test, expect } from '@playwright/test'

test('K-beauty page renders hero, marquee and real case-study videos', async ({ page }) => {
  await page.goto('/korean-skincare-influencer-marketing')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Korean Skincare/i)
  await expect(page.getByRole('heading', { name: /Recent K-Beauty Campaigns/i })).toBeVisible()

  // Brand marquee ribbon (real beauty brands)
  await expect(page.getByText('Medicube').first()).toBeVisible()

  // Case-study videos mount only when their poster/control enters the viewport.
  await page.getByRole('button', { name: /play video/i }).first().scrollIntoViewIfNeeded()
  await expect(page.locator('video').first()).toBeAttached({ timeout: 15_000 })
})
