const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './content/**/*.{md,html}',
    './layouts/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
