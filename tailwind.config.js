/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5a52ff',
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}