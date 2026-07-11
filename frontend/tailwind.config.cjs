/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      extend: {
      keyframes: {
        scaleMove: {
          '0%': { transform: 'scale(0) translate(-100%, -100%)', opacity: '0' },
          '100%': { transform: 'scale(1) translate(0, 0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        scaleMove: 'scaleMove 1s ease-out forwards',
        fadeIn: 'fadeIn 1s ease-in forwards',
      },
    },
  },
  plugins: [],

});



 