/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // for app directory
    './pages/**/*.{js,ts,jsx,tsx}', // for pages directory
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
       fontFamily: {
        // ... other font families
        inter:['inter display','sans'],
        instrument: ['Instrument Serif', 'serif'],
      },
    },
  },
  plugins: [],
}
