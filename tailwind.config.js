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
          50: "#faf4f3",
          100: "#f5e8e6",
          200: "#e6c6c2",
          300: "#d7a39d",
          400: "#ba5f53",
          500: "#9C1A09",
          600: "#8c1708",
          700: "#751407",
          800: "#5e1005",
          900: "#4c0d04",
        },
      },
    },
  },
  plugins: [],
};
