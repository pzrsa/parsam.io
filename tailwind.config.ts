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
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            fontSize: rem(17),
            color: theme("colors.black"),
            a: {
              color: theme("colors.blue.600"),
              fontWeight: "700",
              "&:hover": {
                textDecoration: "none",
              },
            },
          },
        },
        invert: {
          css: {
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
