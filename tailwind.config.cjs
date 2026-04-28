/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Match the live BioChef SPA: Material Grey 100 surface, Material Teal 500 primary, Material Deep Orange 500 secondary
        background: '#F5F5F5',
        surface: '#FFFFFF',
        border: '#E0E0E0',
        text: {
          DEFAULT: '#1A1A1A',
          secondary: '#525252',
          tertiary: '#6B6B6B'
        },
        // Primary brand — Material Teal (matches the live app's `primary.main: #009688`)
        brand: {
          DEFAULT: '#009688',
          dark: '#00796B',
          light: '#E0F2F1',
          50: '#E0F2F1',
          100: '#B2DFDB',
          200: '#80CBC4',
          300: '#4DB6AC',
          400: '#26A69A',
          500: '#009688',
          600: '#00897B',
          700: '#00796B',
          800: '#00695C'
        },
        // Accent — Material Deep Orange (matches the live app's `secondary.main: #ff5722`)
        accent: {
          DEFAULT: '#FF5722',
          dark: '#E64A19',
          light: '#FBE9E7',
          50: '#FBE9E7',
          100: '#FFCCBC',
          500: '#FF5722',
          600: '#F4511E',
          700: '#E64A19'
        },
        // Secondary - Purple (AI/ML, Federated Learning, Analysis)
        secondary: {
          DEFAULT: '#7C3AED',
          dark: '#6D28D9',
          light: '#F5F3FF',
          50: '#FAF5FF',
          100: '#F5F3FF',
          200: '#EDE9FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95'
        },
        // Tertiary - Blue (Infrastructure, Data, Security)
        tertiary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#EFF6FF',
          50: '#F0F9FF',
          100: '#EFF6FF',
          200: '#DBEAFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A'
        }
      },
      fontFamily: {
        // Roboto everywhere matches the live BioChef app's MUI theme exactly.
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Roboto Mono', 'Consolas', 'monospace']
      },
      fontSize: {
        'display-1': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-2': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-2': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }]
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'section': '5rem',
        'section-mobile': '3rem'
      },
      maxWidth: {
        'container': '1200px',
        'content': '720px',
        'hero': '640px'
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'sm': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'lg': '0 12px 32px rgba(0, 0, 0, 0.14)',
        'xl': '0 20px 48px rgba(0, 0, 0, 0.18)',
        'nav': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'button': '0 2px 8px rgba(0, 150, 136, 0.25)',
        'brand': '0 4px 14px rgba(0, 150, 136, 0.25)',
        'brand-lg': '0 8px 24px rgba(0, 150, 136, 0.2)',
        'accent': '0 4px 14px rgba(255, 87, 34, 0.25)',
        'secondary': '0 4px 14px rgba(124, 58, 237, 0.25)'
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px'
      },
      transitionDuration: {
        '250': '250ms'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px'
    }
  },
  plugins: []
};
