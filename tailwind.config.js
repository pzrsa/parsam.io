module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: "#4885ed",
          red: "#db3236",
          yellow: "#f4c20d",
          green: "#3cba54",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.blue.600"),
              fontWeight: "700",
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme("colors.blue.500"),
              fontWeight: "700",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
