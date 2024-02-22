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
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            fontSize: rem(17),
            color: theme("colors.black"),
            a: {
              fontWeight: "700",
              "&:hover": {
                textDecoration: "none",
                color: theme("colors.zinc.500"),
              },
            },
          },
        },
        invert: {
          css: {
            color: theme("colors.white"),
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
