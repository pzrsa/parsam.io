// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

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
        name: "Chivo Mono",
        cssVariable: "--font-chivo-mono",
        weights: ["100 900"],
      },
    ],
  },
});
