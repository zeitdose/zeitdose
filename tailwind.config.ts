import type { Config } from 'tailwindcss'

import { fontFamily } from 'tailwindcss/defaultTheme'
import animate from 'tailwindcss-animate'

export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['class'],
  plugins: [animate],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        sand: {
          1: 'var(--sand-1)',
          2: 'var(--sand-2)',
          3: 'var(--sand-3)',
          4: 'var(--sand-4)',
          5: 'var(--sand-5)',
          6: 'var(--sand-6)',
          7: 'var(--sand-7)',
          8: 'var(--sand-8)',
          9: 'var(--sand-9)',
          10: 'var(--sand-10)',
          11: 'var(--sand-11)',
          12: 'var(--sand-12)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        slate: {
          1: 'var(--slate-1)',
          2: 'var(--slate-2)',
          3: 'var(--slate-3)',
          4: 'var(--slate-4)',
          5: 'var(--slate-5)',
          6: 'var(--slate-6)',
          7: 'var(--slate-7)',
          8: 'var(--slate-8)',
          9: 'var(--slate-9)',
          10: 'var(--slate-10)',
          11: 'var(--slate-11)',
          12: 'var(--slate-12)',
        },
        slateA: {
          1: 'var(--slate-a1)',
          2: 'var(--slate-a2)',
          3: 'var(--slate-a3)',
          4: 'var(--slate-a4)',
          5: 'var(--slate-a5)',
          6: 'var(--slate-a6)',
          7: 'var(--slate-a7)',
          8: 'var(--slate-a8)',
          9: 'var(--slate-a9)',
          10: 'var(--slate-a10)',
          11: 'var(--slate-a11)',
          12: 'var(--slate-a12)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
} satisfies Config
