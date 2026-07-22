// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
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

  adapter: cloudflare({
    imageService: "compile",
  }),

  markdown: {
    shikiConfig: {
      theme: "gruvbox-dark-hard",
    },
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Charis SIL",
      cssVariable: "--font-charis-sil",
      weights: ["400", "700"],
      styles: ["normal", "italic"],
    },
  ],

  integrations: [mdx(), preact()],
});
