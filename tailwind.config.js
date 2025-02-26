/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#92E596",
        secondary: "#005fcc",
        tertiary: "#009963",
        background: "#F5F9F7",
        sidebar: "#56D76B1f", // Sidebar background color
        textPrimary: "#92E596", // Text color
        textSecondary: "#324054", // Secondary text color
        textLightGray: "#565656",
        textSlateGray: "#71839B",
        textLightBlack: "#3F3F3F",
        clientAppBackground: "#EBF9EC"
      },
    },
  },
  plugins: [],
}

