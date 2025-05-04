// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["node:buffer"],
    },
  },
  adapter: cloudflare(),
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Work Sans",
        cssVariable: "--font-work-sans",
      },
    ],
  },
});
