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
          dark: '#131011',
          light: '#FFFFFF',
          gray: '#F1F1F1',
        },
        foreground: {
          white: '#FFFFFF',
          dark: '#141414',
          muted: '#2B2B2B',
          gray: '#7A7A7A',
          light: '#797979',
          mutedOnDark: '#797979',
        },
        button: {
          bg: '#FFFFFF',
          text: '#000000',
          hover: '#8B8B8B',
          hoverLight: '#ECECEC',
          hoverDark: '#777777',
          hoverWhite: 'rgba(255, 255, 255, 0.69)',
        },
        accent: {
          red: '#E23125',
          pink: '#FF74D4',
        },
        border: {
          light: '#FFFFFF',
          dark: '#000000',
        },
        divider: {
          darkMid: '#323232',
          lightMid: '#5a5a5a',
        },
      },
      fontFamily: {
        anegra: ['var(--font-anegra)', 'sans-serif'],
        brasika: ['var(--font-brasika)', 'serif'],
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
        'card': '20px',
        'button': '30px',
        'badge': '42px',
      },
      boxShadow: {
        'card': '0 0 10px -5px rgba(0, 0, 0, 0.5)',
        'header': '0 0 10px -5px rgba(0, 0, 0, 0.5)',
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
