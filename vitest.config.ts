import { defineConfig } from 'vitest/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: { '@': rootDir },
  },
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
      include: [
        'lib/contact/validation.ts',
        'lib/data/testimonials.ts',
        'lib/seo/metadata.ts',
        'lib/uploads/image-signature.ts',
        'lib/performance/*.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
})
