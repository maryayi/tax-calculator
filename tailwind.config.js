/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#152238',
        porcelain: '#EEF3F3',
        kashi: {
          50: '#F0F9F8',
          100: '#DCF0ED',
          200: '#B5E0DA',
          300: '#83C7BE',
          400: '#4EA89D',
          500: '#2B8B80',
          600: '#157A6F',
          700: '#10635B',
          800: '#0D4F49',
          900: '#0A3D39',
        },
        saffron: {
          50: '#FDF6E9',
          100: '#FAE9C8',
          300: '#EDBE62',
          400: '#E3A93C',
          500: '#D9930F',
          600: '#B87A08',
          700: '#92600A',
        },
        lapis: {
          600: '#2B4A9B',
          700: '#233E85',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgb(21 34 56 / 0.04), 0 8px 24px -12px rgb(21 34 56 / 0.12)',
      },
    },
  },
  plugins: [],
};
