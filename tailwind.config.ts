import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          // Light theme surfaces
          base: '#FFFFFF', // primary page background
          soft: '#F7F7F5', // alternating sections and cards
          // Dark kept for inverse surfaces (admin dashboard, image scrims)
          dark: '#131011',
          light: '#FFFFFF',
          gray: '#F1F1F1',
        },
        foreground: {
          // Light theme text
          primary: '#111111', // headings on light backgrounds
          body: '#3D3D3D', // body text on light backgrounds
          subtle: '#555555', // secondary text on light backgrounds
          white: '#FFFFFF',
          dark: '#141414',
          muted: '#2B2B2B',
          gray: '#6B6B6B',
          light: '#797979',
          mutedOnDark: '#797979',
        },
        button: {
          // Primary CTA on light theme: dark button, white label
          bg: '#141414',
          text: '#FFFFFF',
          hover: '#8B8B8B',
          hoverLight: '#ECECEC',
          hoverDark: '#3D3D3D',
          hoverWhite: '#3D3D3D',
        },
        accent: {
          // Darkened from #E23125 for WCAG AA contrast on white (5.1:1)
          red: '#D32B1F',
        },
        border: {
          light: '#FFFFFF',
          dark: '#000000',
        },
        divider: {
          darkMid: 'rgba(0, 0, 0, 0.12)',
          lightMid: 'rgba(0, 0, 0, 0.20)',
        },
      },
      fontFamily: {
        anegra: ['var(--font-anegra)', 'sans-serif'],
        'work-sans': ['var(--font-work-sans)', 'sans-serif'],
        jost: ['var(--font-jost)', 'sans-serif'],
      },
      maxWidth: {
        container: '1300px',
      },
      screens: {
        // Responsive breakpoints
        'mobile': { max: '767px' },
        'mobile-extra': { min: '481px', max: '767px' },
        'tablet': { min: '768px', max: '1024px' },
        'tablet-extra': { min: '881px', max: '1024px' },
        'laptop': { min: '1025px', max: '1366px' },
        'desktop': { min: '1367px' },
        'widescreen': { min: '2400px' },
        // Standard min-width breakpoints
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        'section-y-desktop': '100px',
        'section-y-mobile': '50px',
        'section-x': '20px',
        'card-radius': '20px',
        'button-radius': '30px',
        // Section rhythm scale (vertical padding)
        'sec-sm': '56px',
        'sec': '96px',
        'sec-lg': '128px',
      },
      fontSize: {
        // Typography scale
        'h1-desktop': ['68px', { lineHeight: '80px', letterSpacing: '0px' }],
        'h1-mobile': ['30px', { lineHeight: '40px', letterSpacing: '0px' }],
        'h2-desktop': ['48px', { lineHeight: '58px', letterSpacing: '0.1px' }],
        'h2-mobile': ['30px', { lineHeight: '40px', letterSpacing: '0.1px' }],
        'h3-desktop': ['30px', { lineHeight: '40px', letterSpacing: '0.5px' }],
        'h3-mobile': ['25px', { lineHeight: '35px', letterSpacing: '0.5px' }],
        'body': ['14px', { lineHeight: '24px', letterSpacing: '1.5px' }],
        'body-lg': ['16px', { lineHeight: '32px', letterSpacing: '-0.8px' }],
        'nav': ['18px', { lineHeight: '24px', letterSpacing: '-0.2px' }],
      },
      borderRadius: {
        'card': '16px',
        'button': '30px',
        'badge': '42px',
      },
      boxShadow: {
        // Elevation scale for light surfaces
        'e1': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'e2': '0 8px 24px rgba(0, 0, 0, 0.06)',
        'e3': '0 20px 50px rgba(0, 0, 0, 0.10)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
