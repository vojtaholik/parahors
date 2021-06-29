const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: { ...colors.trueGray },
        ...colors,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
