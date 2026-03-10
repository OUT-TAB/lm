/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#010101',
          surface: '#121212',
          neon: '#00F2EA',
          pink: '#FF0050',
          secondary: '#3B82F6',
          border: '#2A2A2A',
          textHigh: '#FFFFFF',
          textLow: '#94A3B8'
        }
      }
    },
  },
  plugins: [],
}