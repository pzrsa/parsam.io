const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = (px) => `${round(px / 16)}rem`;

module.exports = {
  darkMode: "media",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#111",
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
            color: theme("colors.black"),
            fontSize: rem(18),
            a: {
              color: theme("colors.blue.600"),
              fontWeight: "700",
              "&:hover": {
                "text-decoration": "none",
              },
            },
          },
        },
        invert: {
          css: {
            fontSize: rem(18),
            color: theme("colors.white"),
            a: {
              color: theme("colors.blue.500"),
            },
          },
        },
      }),
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
