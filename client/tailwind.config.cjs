/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'linkedin-gray': '#00000099',
        'linkedin-black': '#000000E6',
        'linkedin-blue': '#0A66C2',
        'linkedin-darkblue': '#004182',
        'linkedin-red': '#CC1016',
      },
      boxShadow: {
        '2': 'inset 0 0 0 1px #0A66C2',
        'input-shadow': '0 0 0 1px #0073b1',
      },
    },
  },
  plugins: [],
}
