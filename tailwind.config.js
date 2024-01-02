/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "fe-moderate-blue": "hsl(238, 40%, 52%)",
      "fe-soft-red": "hsl(358, 79%, 66%)",
      "fe-light-grayish-blue": "hsl(239, 57%, 85%)",
      "fe-pale-red": "hsl(357, 100%, 86%)",
      "fe-dark-blue": "hsl(212, 24%, 26%)",
      "fe-grayish-Blue": "hsl(211, 10%, 45%)",
      "fe-light-gray": "hsl(223, 19%, 93%)",
      "fe-very-light-gray": "hsl(228, 33%, 97%)",
      "fe-white": "hsl(0, 0%, 100%)",
    },
    fontFamily: {
      feRubik: ["Rubik", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
