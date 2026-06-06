import { test, expect } from '@playwright/test'

test('Arabic homepage renders inside an RTL wrapper', async ({ page }) => {
  await page.goto('/ar')
  await expect(page.locator('div[dir="rtl"][lang="ar"]').first()).toBeAttached()
  await expect(page.locator('h1').first()).toBeVisible()
})

test('Korean homepage renders inside a ko wrapper', async ({ page }) => {
  await page.goto('/ko')
  await expect(page.locator('div[lang="ko"]').first()).toBeAttached()
  await expect(page.locator('h1').first()).toBeVisible()
})
