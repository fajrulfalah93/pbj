/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brick: {
          50 : '#ead0cc',
          100: '#daaaa3',
          200: '#c98279',
          300: '#b75b4e',
          400: '#a42e1e',
          500: '#7a1406',
          600: '#9c1a09',
        },
      }
    },
  },
  plugins: [],
}
