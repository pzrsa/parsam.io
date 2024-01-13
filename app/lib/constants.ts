import { Bricolage_Grotesque } from "next/font/google";
import path from "path";

export const FONT_BRICOLAGE = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const INDEX_OG_PATH = "https://parsam.io/images/og/index.png";
export const BLOG_OG_PATH = "https://parsam.io/images/og/blog.png";

export const POSTS_DIRECTORY = path.join(process.cwd(), "posts");
export const FEED_PATH = "./public/feed.atom";
