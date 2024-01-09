import type { Config } from "tailwindcss";

const round = (num: any) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = (px: any) => `${round(px / 16)}rem`;

const config: Config = {
  darkMode: "media",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#111",
        blackHover: "#222",
        google: {
          blue: "#4885ed",
          red: "#db3236",
          yellow: "#f4c20d",
          green: "#3cba54",
        },
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.black"),
            fontSize: rem(17),
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
            fontSize: rem(17),
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

export default config;