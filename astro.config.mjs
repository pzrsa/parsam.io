// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import preact from "@astrojs/preact";

function remarkImageCaptions() {
  const processor = this;
  return (tree, file) => {
    const src = String(file.value);
    const visit = (node) => {
      if (!node.children) return;
      node.children.forEach(visit);
      for (const child of node.children) {
        if (child.type !== "paragraph" || child.children.length !== 1) continue;
        const img = child.children[0];
        if (img.type !== "image" || !img.alt || !img.position) continue;

        const raw = src.slice(
          img.position.start.offset,
          img.position.end.offset,
        );
        let caption = img.alt;
        for (let i = 1, depth = 0; i < raw.length; i++) {
          if (raw[i] === "[") depth++;
          else if (raw[i] === "]" && --depth === 0) {
            caption = raw.slice(2, i);
            break;
          }
        }

        child.data = { hName: "figure" };
        child.children = [
          img,
          {
            type: "paragraph",
            data: { hName: "figcaption" },
            children: processor.parse(caption).children[0]?.children ?? [],
          },
        ];
      }
    };
    visit(tree);
  };
}

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
    remarkPlugins: [remarkImageCaptions],
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Literata",
      cssVariable: "--font-literata",
      weights: ["400 700"],
    },
    {
      provider: fontProviders.google(),
      name: "Archivo",
      cssVariable: "--font-archivo",
      weights: ["400 700"],
    },
  ],

  integrations: [mdx(), preact(), sitemap()],
});
