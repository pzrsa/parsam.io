import { defineCollection, getCollection, z } from "astro:content";
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

const filmShowSchema = z.object({
  title: z.string(),
  imageID: z.string(),
});

const films = defineCollection({
  loader: file("src/data/favourites.json", {
    parser: (text) => JSON.parse(text).films,
  }),
  schema: filmShowSchema,
});

const shows = defineCollection({
  loader: file("src/data/favourites.json", {
    parser: (text) => JSON.parse(text).shows,
  }),
  schema: filmShowSchema,
});

export const collections = { blog, albums, films, shows };

export const getBlogPosts = async () => {
  const posts = await getCollection("blog");
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return posts;
};
