import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        google: {
          blue: "#4885ed",
          red: "#db3236",
          yellow: "#f4c20d",
          green: "#3cba54",
        },
        tesla: {
          red: "#cc0000",
        },
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.black"),
            h1: {
              textTransform: "uppercase",
            },
            h2: {
              textTransform: "uppercase",
            },
            h3: {
              textTransform: "uppercase",
            },
            a: {
              color: theme("colors.blue.700"),
              textDecoration: "underline",
              textDecorationThickness: "2px",
              "&:hover": {
                backgroundColor: theme("colors.black"),
                color: theme("colors.white"),
              },
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
