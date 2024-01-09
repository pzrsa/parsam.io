import { Bricolage_Grotesque } from "next/font/google";
import path from "path";

export const POSTS_DIRECTORY = path.join(process.cwd(), "posts");
export const FEED_PATH = "./public/feed.atom";
export const FONT_BRICOLAGE = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});
