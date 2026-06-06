import { test, expect } from '@playwright/test'

test('localized 404 shows translated content for /ar', async ({ page }) => {
  const res = await page.goto('/ar/this-page-does-not-exist')
  expect(res?.status()).toBe(404)
  await expect(page.getByText('الصفحة غير موجودة')).toBeVisible()
})

test('unknown English path returns a 404', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist')
  expect(res?.status()).toBe(404)
})
