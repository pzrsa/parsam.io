import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import remarkExternalLinks from "remark-external-links";
import html from "remark-html";
import { POSTS_DIRECTORY } from "./constants";
import { Post } from "./types";

export const getSortedPostData = () => {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(POSTS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post's metadata section
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData.sort(({ date: a }: any, { date: b }: any) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getPostData = async (id: string): Promise<Post> => {
  const fullPath = path.join(POSTS_DIRECTORY, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkExternalLinks, {
      target: "_blank",
      rel: "prefetch noreferrer",
    })
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  } as Post;
};
