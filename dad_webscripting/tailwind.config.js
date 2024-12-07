/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#384e77',
        'yellow': '#f4d35e',
      }
    },
  },
  plugins: [],
}

