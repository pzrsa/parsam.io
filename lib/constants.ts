import { Source_Code_Pro, Source_Serif_4 } from "next/font/google";
import path from "path";

export const POSTS_DIRECTORY = path.join(process.cwd(), "posts");
export const FEED_PATH = "./public/feed.atom";
export const FONT_SOURCE_CODE_PRO = Source_Code_Pro({
  subsets: ["latin"],
});
export const FONT_SOURCE_SERIF = Source_Serif_4({
  subsets: ["latin"],
});
