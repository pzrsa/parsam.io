import path from "path";

export const POSTS_DIRECTORY = path.join(process.cwd(), "posts");
export const NOTES_DIRECTORY = path.join(process.cwd(), "data/notes");
export const ARTICLES_DIRECTORY = path.join(process.cwd(), "data/articles");
export const FEED_PATH = "./public/feed.atom";
export const NOTES_FEED_PATH = "./public/notes.atom";
export const ARTICLES_FEED_PATH = "./public/articles.atom";
