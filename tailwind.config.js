/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './content/**/*.{md,html}',
    './layouts/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
