/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        'gray-50': '#FAFAFA',
        'gray-100': '#DFE2EB',
        'gray-200': '#C3C6CF',
        'gray-300': '#A7ABB3',
        'gray-400': '#8D9199',
        'gray-500': '#73777F',
        'gray-600': '#5A5E66',
        'gray-700': '#43474E',
        'gray-800': '#2D3137',
        'gray-900': '#181B22',

        'primaria-50': '#C3C6CF',
        'primaria-300': '#D0E9FB',
        'primaria-500': '#89C8F5',
        'primaria-700': '#0C66A4',
        'primaria-800': '#003c68', // Esta cor não está no Design System da Logique
        'primaria-900': '#052B46',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
