/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        light: ["var(--font-ralewayLight)"],
        reg: ["var(--font-ralewayNormal)"],
        med: ["var(--font-ralewayMedium)"],
        sb: ["var(--font-ralewaySemiBold)"],
        b: ["var(--font-ralewayBold)"],
        deb: ["var(--font-dotoexb)"],
      },
    },
  },
  plugins: [],
};
