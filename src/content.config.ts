import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data" }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    author: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { blog };
