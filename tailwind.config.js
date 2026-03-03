/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'slow-pan': 'pan 20s linear infinite alternate',
      },
      keyframes: {
        pan: {
          '0%': { objectPosition: '0% 50%' },
          '100%': { objectPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}