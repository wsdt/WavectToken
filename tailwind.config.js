module.exports = {
  purge: ['./src/subcomponents/**/*.{ts,tsx,js,jsx}', './src/pages/**/*.{ts,tsx,js,jsx}', 
  './token/src/subcomponents/**/*.{ts,tsx,js,jsx}', './token/src/pages/**/*.{ts,tsx,js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [],
}
