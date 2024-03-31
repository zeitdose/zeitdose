import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
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
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [animate],
} satisfies Config
