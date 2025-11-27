module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mustard: {
          DEFAULT: '#E3A018',
          50: '#FDF8E8',
          100: '#FAF0D1',
          200: '#F5E0A3',
          300: '#F0D175',
          400: '#EBC147',
          500: '#E3A018',
          600: '#B58013',
          700: '#87600E',
          800: '#5A400A',
          900: '#2D2005',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
