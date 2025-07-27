/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        dark: {
          100: '#1a1a1a',
          200: '#2a2a2a',
          300: '#3a3a3a',
          400: '#4a4a4a',
          500: '#5a5a5a',
          600: '#6a6a6a',
          700: '#7a7a7a',
          800: '#8a8a8a',
          900: '#9a9a9a',
        },
        // Neo-brutalism colors
        neo: {
          yellow: '#FFD93D',
          orange: '#FF6B35',
          red: '#FF2E2E',
          pink: '#FF6B9D',
          purple: '#8B5CF6',
          blue: '#3B82F6',
          green: '#10B981',
          lime: '#84CC16',
          black: '#000000',
          white: '#FFFFFF',
          gray: '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'custom': '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
        'dark': '0 4px 20px 0 rgba(0, 0, 0, 0.2)',
        // Neo-brutalism shadows
        'neo': '4px 4px 0px 0px #000000',
        'neo-lg': '8px 8px 0px 0px #000000',
        'neo-xl': '12px 12px 0px 0px #000000',
        'neo-inner': 'inset 2px 2px 0px 0px #000000',
        'neo-yellow': '4px 4px 0px 0px #FFD93D',
        'neo-orange': '4px 4px 0px 0px #FF6B35',
        'neo-red': '4px 4px 0px 0px #FF2E2E',
        'neo-blue': '4px 4px 0px 0px #3B82F6',
        'neo-green': '4px 4px 0px 0px #10B981',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        // Neo-brutalism borders
        'neo': '0px',
        'neo-sm': '2px',
        'neo-md': '4px',
        'neo-lg': '8px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-neo': 'bounce-neo 0.6s ease-in-out',
      },
      keyframes: {
        'bounce-neo': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [],
}