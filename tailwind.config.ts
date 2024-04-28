import formsPlugin from '@tailwindcss/forms'
import headlessuiPlugin from '@headlessui/tailwindcss'
import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1.1' }],
      '8xl': ['5rem', { lineHeight: '1.1' }],
      '9xl': ['6rem', { lineHeight: '1' }],
      '10xl': ['8rem', { lineHeight: '1' }]
    },
    extend: {
      colors: {
        primary: '#f02d5e',
        accent: '#f02d5e',
        'accent-light': '#F1688A'
      },
      maxWidth: {
        '2xl': '40rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      fontFamily: {
        sans: 'var(--font-inter)',
        display: 'var(--font-inter)'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        }
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 100ms cubic-bezier(0.16, 1, 0.5, 1)',
        slideRightAndFade: 'slideRightAndFade 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        fadeIn: 'fadeIn 1s ease-in-out forwards'
      }
    }
  },
  plugins: [
    formsPlugin,
    headlessuiPlugin,
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
} satisfies Config
