// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import preact from "@astrojs/preact";
import remarkMediaCaptions from "./src/plugins/remark-media-captions.mjs";

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
    processor: unified({ remarkPlugins: [remarkMediaCaptions] }),
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Literata",
      cssVariable: "--font-literata",
      weights: ["400 700"],
    },
  ],

  integrations: [mdx(), preact(), sitemap()],
});
