// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://parsam-io.pages.dev",
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["node:buffer"],
    },
  },
  image: {
    domains: ["i.scdn.co", "image.tmdb.org"],
  },
  adapter: cloudflare(),
});
