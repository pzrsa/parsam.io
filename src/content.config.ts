import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: ["**/*.{md,mdx}"], base: "./src/data/blog" }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    author: z.string().optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
  }),
});

const albums = defineCollection({
  loader: file("src/data/favourites.json", {
    parser: (text) => JSON.parse(text).albums,
  }),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    year: z.string(),
    imageID: z.string(),
  }),
});

const films = defineCollection({
  loader: file("src/data/favourites.json", {
    parser: (text) => JSON.parse(text).films,
  }),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    posterUrl: z.string(),
  }),
});

const books = defineCollection({
  loader: file("src/data/favourites.json", {
    parser: (text) => JSON.parse(text).books,
  }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    year: z.string(),
    notesSlug: z.string().optional(),
  }),
});

export const collections = { blog, albums, films, books };
