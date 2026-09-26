import { expect, test, type Page } from '@playwright/test'

async function requireClickGesture(page: Page) {
  await page.addInitScript(() => {
    const nativePlay = HTMLMediaElement.prototype.play
    let inClick = false
    window.addEventListener('click', () => { inClick = true }, true)
    window.addEventListener('click', () => { inClick = false })
    HTMLMediaElement.prototype.play = function () {
      return inClick
        ? nativePlay.call(this)
        : Promise.reject(new DOMException('Autoplay denied', 'NotAllowedError'))
    }
  })
}

async function holdFirstCarouselPlay(page: Page) {
  await page.addInitScript(() => {
    const nativePlay = HTMLMediaElement.prototype.play
    let held = false
    HTMLMediaElement.prototype.play = function () {
      if (!held && this.closest('.media-carousel')) {
        held = true
        return new Promise<void>((_resolve, reject) => {
          Reflect.set(window, '__rejectHeldPlay', () =>
            reject(new DOMException('Old slide denied', 'NotAllowedError')))
        })
      }
      return nativePlay.call(this)
    }
  })
}

for (const viewport of [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test.describe(`shared VideoPlayer on ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } })

    test('plays in view, pauses off-screen, resumes, and honors manual pause', async ({ page }) => {
      await page.goto('/about')
      await page.getByRole('button', { name: 'Play video' }).first().scrollIntoViewIfNeeded()
      const video = page.locator('video[src="/videos/about-video-05-web-v1.mp4"]')

      await expect(video).toBeAttached()
      const player = video.locator('xpath=..')
      const control = player.locator('button')
      await expect.poll(() => video.evaluate((media: HTMLVideoElement) =>
        !media.paused && media.currentTime > 0
      ), { timeout: 15_000 }).toBe(true)
      await expect(control).toHaveAttribute('aria-label', 'Pause video')
      await expect(control).toHaveCSS('opacity', '0')

      await page.locator('footer').scrollIntoViewIfNeeded()
      await expect.poll(() => video.evaluate((media: HTMLVideoElement) => media.paused)).toBe(true)

      await player.scrollIntoViewIfNeeded()
      await expect.poll(() => video.evaluate((media: HTMLVideoElement) => !media.paused)).toBe(true)

      // The transient control is keyboard reachable while visually hidden.
      await control.focus()
      await expect(control).toHaveCSS('opacity', '1')
      await control.press('Enter')
      await expect.poll(() => video.evaluate((media: HTMLVideoElement) => media.paused)).toBe(true)
      await expect(control).toHaveAttribute('aria-label', 'Play video')
      await expect(control).toHaveCSS('opacity', '1')
      await page.locator('footer').scrollIntoViewIfNeeded()
      await player.scrollIntoViewIfNeeded()
      await expect(video).toHaveJSProperty('paused', true)

      await control.click()
      await expect.poll(() => video.evaluate((media: HTMLVideoElement) => !media.paused)).toBe(true)
    })

    test('reduced motion holds the poster until the user requests playback', async ({ page }) => {
      await requireClickGesture(page)
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/about')
      const control = page.getByRole('button', { name: 'Play video' }).first()
      await control.scrollIntoViewIfNeeded()
      const video = page.locator('video[src="/videos/about-video-05-web-v1.mp4"]')
      await expect(video).toHaveCount(0)
      await expect(control).toBeVisible()

      await control.click()
      await expect(video).toBeAttached()
      await expect.poll(() => video.evaluate((media: HTMLVideoElement) =>
        !media.paused && media.currentTime > 0
      ), { timeout: 15_000 }).toBe(true)
    })
  })
}

test('hovering the homepage media carousel does not interrupt its video', async ({ page }) => {
  await page.goto('/')
  const deferred = page.locator('[data-deferred="media-carousel"]')
  await deferred.scrollIntoViewIfNeeded()
  await expect(deferred).toHaveAttribute('data-deferred-state', 'active')
  const carousel = deferred.locator('.media-carousel')
  const video = carousel.locator('video[src]')
  await expect(video).toBeAttached()
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) =>
    !media.paused && media.currentTime > 0
  ), { timeout: 15_000 }).toBe(true)

  const timeBeforeHover = await video.evaluate((media: HTMLVideoElement) => media.currentTime)
  await carousel.hover()
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) => media.currentTime), {
    timeout: 5_000,
  }).toBeGreaterThan(timeBeforeHover + 0.25)
  await expect(video).toHaveJSProperty('paused', false)
})

test('carousel offers gesture-bound recovery when autoplay is denied', async ({ page }) => {
  await requireClickGesture(page)
  await page.goto('/')
  const deferred = page.locator('[data-deferred="media-carousel"]')
  await deferred.scrollIntoViewIfNeeded()
  await expect(deferred).toHaveAttribute('data-deferred-state', 'active')
  const carousel = deferred.locator('.media-carousel')
  await carousel.locator('button[aria-label]').first().focus()
  const control = carousel.getByRole('button', { name: 'Play video' })
  await expect(control).toBeVisible()
  await control.click()
  const video = carousel.locator('video[src]')
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) =>
    !media.paused && media.currentTime > 0
  ), { timeout: 15_000 }).toBe(true)
})

test('carousel recovers when WebKit pauses the active visible reel', async ({ page }) => {
  await page.goto('/')
  const deferred = page.locator('[data-deferred="media-carousel"]')
  await deferred.scrollIntoViewIfNeeded()
  await expect(deferred).toHaveAttribute('data-deferred-state', 'active')
  const carousel = deferred.locator('.media-carousel')
  await carousel.locator('button[aria-label]').first().focus()
  const video = carousel.locator('video[src]')
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) =>
    !media.paused && media.currentTime > 0
  ), { timeout: 15_000 }).toBe(true)
  await video.evaluate((media: HTMLVideoElement) => media.pause())
  const control = carousel.getByRole('button', { name: 'Play video' })
  await expect(control).toBeVisible()
  await control.click()
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) => !media.paused)).toBe(true)
})

test('late play rejection from an old carousel slide cannot block the next reel', async ({ page }) => {
  await holdFirstCarouselPlay(page)
  await page.goto('/')
  const deferred = page.locator('[data-deferred="media-carousel"]')
  await deferred.scrollIntoViewIfNeeded()
  await expect(deferred).toHaveAttribute('data-deferred-state', 'active')
  const carousel = deferred.locator('.media-carousel')
  await expect.poll(() => page.evaluate(() => typeof Reflect.get(window, '__rejectHeldPlay'))).toBe('function')
  await carousel.getByRole('button', { name: 'Next' }).click()
  const video = carousel.locator('video[src]')
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) =>
    !media.paused && media.currentTime > 0
  ), { timeout: 15_000 }).toBe(true)
  await page.evaluate(() => Reflect.get(window, '__rejectHeldPlay')())
  await expect(carousel.getByRole('button', { name: 'Play video' })).toHaveCount(0)
  await expect(video).toHaveJSProperty('paused', false)
})

test('clicking the current carousel dot keeps its pending recovery active', async ({ page }) => {
  await holdFirstCarouselPlay(page)
  await page.goto('/')
  const deferred = page.locator('[data-deferred="media-carousel"]')
  await deferred.scrollIntoViewIfNeeded()
  await expect(deferred).toHaveAttribute('data-deferred-state', 'active')
  const carousel = deferred.locator('.media-carousel')
  await expect.poll(() => page.evaluate(() => typeof Reflect.get(window, '__rejectHeldPlay'))).toBe('function')
  await carousel.getByRole('button', { name: 'Go to slide 1' }).click()
  await page.evaluate(() => Reflect.get(window, '__rejectHeldPlay')())
  await expect(carousel.getByRole('button', { name: 'Play video' })).toBeVisible()
})

for (const path of [
  '/work',
  '/korean-skincare-influencer-marketing',
  '/case-studies/honor-smartphone-launch',
]) {
  test(`shared player advances on ${path}`, async ({ page }) => {
    await page.goto(path)
    const video = page.locator('video[src]').first()
    // The other routes may keep the shared player below their hero section.
    await page.locator('button[aria-label="Play video"], button[aria-label="Pause video"]').first().scrollIntoViewIfNeeded()
    await expect(video).toBeAttached()
    await expect.poll(() => video.evaluate((media: HTMLVideoElement) =>
      !media.paused && media.currentTime > 0
    ), { timeout: 15_000 }).toBe(true)
    await expect(video.locator('xpath=..').locator('button')).toHaveCSS('opacity', '0')
  })
}

test('every visible work video plays concurrently on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/work')
  await page.locator('button[aria-label="Play video"], button[aria-label="Pause video"]').first().scrollIntoViewIfNeeded()
  await expect.poll(async () => page.locator('video[src]').evaluateAll((videos) => {
    const visible = videos.filter((node) => {
      const rect = node.getBoundingClientRect()
      return rect.bottom > 10 && rect.top < innerHeight - 10
    }) as HTMLVideoElement[]
    return visible.length >= 4 && visible.every((video) => !video.paused && video.currentTime > 0)
  }), { timeout: 15_000 }).toBe(true)
})

test('work video pauses on tab visibility change and resumes on return', async ({ page }) => {
  await page.goto('/work')
  await page.locator('button[aria-label="Play video"], button[aria-label="Pause video"]').first().scrollIntoViewIfNeeded()
  const video = page.locator('video[src]').first()
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) => !media.paused)).toBe(true)

  // Headless Chromium does not consistently mark a background Page hidden;
  // dispatch the browser event deterministically to cover our handler.
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect.poll(() => page.evaluate(() => document.hidden)).toBe(true)
  await expect(video).toHaveJSProperty('paused', true)

  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) => !media.paused)).toBe(true)
})

test('blocked autoplay recovers from the actual Play gesture', async ({ page }) => {
  await requireClickGesture(page)
  await page.goto('/about')
  const control = page.getByRole('button', { name: 'Play video' }).first()
  await control.scrollIntoViewIfNeeded()
  await expect(control).toHaveCSS('opacity', '1')
  await control.click()
  const video = page.locator('video[src="/videos/about-video-05-web-v1.mp4"]')
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) =>
    !media.paused && media.currentTime > 0
  ), { timeout: 15_000 }).toBe(true)
})

test('failed media source can recover after a manual retry', async ({ page, browserName }) => {
  let requests = 0
  if (browserName !== 'webkit') {
    await page.route('**/videos/work/albina-sephora-web-v1.mp4', (route) => {
      requests++
      return requests === 1 ? route.fulfill({ status: 404, body: '' }) : route.continue()
    })
  }
  await page.goto('/work')
  await page.locator('button[aria-label="Play video"], button[aria-label="Pause video"]').first().scrollIntoViewIfNeeded()
  const video = page.locator('video[src="/videos/work/albina-sephora-web-v1.mp4"]')
  const control = video.locator('xpath=..').locator('button')
  if (browserName === 'webkit') {
    // Windows WebKit's media process bypasses Playwright request routing.
    // Dispatch the media error after playback starts to exercise the same UI.
    await expect.poll(() => video.evaluate((media: HTMLVideoElement) => !media.paused)).toBe(true)
    await video.evaluate((media: HTMLVideoElement) => media.dispatchEvent(new Event('error')))
  } else {
    await expect.poll(() => video.evaluate((media: HTMLVideoElement) => media.error !== null)).toBe(true)
  }
  await expect(control).toHaveCSS('opacity', '1')
  await control.click()
  if (browserName !== 'webkit') await expect.poll(() => requests).toBeGreaterThan(1)
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) =>
    media.error === null && !media.paused && media.currentTime > 0
  ), { timeout: 15_000 }).toBe(true)
})
