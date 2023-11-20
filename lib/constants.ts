import { Bricolage_Grotesque, Source_Code_Pro } from "next/font/google";
import path from "path";

export const POSTS_DIRECTORY = path.join(process.cwd(), "posts");
export const FEED_PATH = "./public/feed.atom";
export const FONT_SOURCE_CODE_PRO = Source_Code_Pro({
  subsets: ["latin"],
});
export const FONT_BRICOLAGE = Bricolage_Grotesque({
  subsets: ["latin"],
});
