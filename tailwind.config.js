/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#252849",
        secondary: "#1C1F38",
        tertiary: "#12152C",
        lightgray: "#343651",
        liteprpl: "#21243D",
        seagreen: "#1abfbf",
      },
    },
  },
  plugins: [],
};
