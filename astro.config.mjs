// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import mdx from "@astrojs/mdx";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://parsam.io",

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    domains: ["i.scdn.co", "image.tmdb.org"],
  },

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    edgeMiddleware: true,
  }),

  markdown: {
    shikiConfig: {
      theme: "gruvbox-dark-hard",
    },
  },

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Bitter",
        cssVariable: "--font-bitter",
        weights: ["400 800"],
      },
    ],
  },

  integrations: [mdx(), preact()],
});