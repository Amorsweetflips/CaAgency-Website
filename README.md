# CA Agency - Next.js Migration

Pixel-perfect migration from Elementor to Next.js 14 App Router.

## Setup

```bash
npm install
npm run dev
```

## Project Structure

- `app/(site)/` - Page routes
- `components/layout/` - Header, Footer, MobileMenu
- `components/blocks/` - Page sections (Hero, Carousels, Grids)
- `components/ui/` - Reusable UI components
- `lib/` - Utilities and fonts

## Assets Required

1. **Fonts** (place in `public/fonts/`):
   - Anegra.ttf
   - BrasikaDisplay.woff2, BrasikaDisplay.ttf

2. **Images** (place in `public/images/`):
   - `site/logo-white.png` - White logo for header
   - `site/logo-color.png` - Color logo for footer
   - `logos/*.png` - Brand logos (26 images)
   - `talents/*.jpg` - Talent photos

3. **Videos** (place in `public/videos/`):
   - Self-hosted MP4 files referenced in pages

## Status

✅ Phase 1: Project Foundation
✅ Phase 2: Layout Components
✅ Phase 3: UI Components (partial)
🔄 Phase 4: Block Components (in progress)
⏳ Phase 5: Page Assembly
⏳ Phase 6: SEO & Polish
