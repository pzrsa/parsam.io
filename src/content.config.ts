import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    author: z.string().optional(),
    description: z.string().optional(),
  }),
});

const albums = defineCollection({
  loader: file("src/data/favourites.json", {
    parser: (text) => JSON.parse(text).albums,
  }),
  schema: z.object({
    title: z.string(),
    imageID: z.string(),
  }),
});

const filmsShows = defineCollection({
  loader: file("src/data/favourites.json", {
    parser: (text) => JSON.parse(text).filmsShows,
  }),
  schema: z.object({
    title: z.string(),
    imageID: z.string(),
  }),
});

const books = defineCollection({
  loader: file("src/data/favourites.json", {
    parser: (text) => JSON.parse(text).books,
  }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { blog, albums, filmsShows, books };
