import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { PostWithContent, PostWithContentHtml } from "./types";
import html from "remark-html";
import { remark } from "remark";

const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostData = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post's metadata section
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData
    .filter(({ draft }: any) => !draft)
    .sort(({ date: a }: any, { date: b }: any) => {
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
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({ id: fileName.replace(/\.md$/, "") }));
};

export const getPost = (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const content = matterResult.content;

  return {
    id,
    content,
    ...matterResult.data,
  } as PostWithContent;
};

export const getPostWithHtml = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedHtml = await remark().use(html).process(matterResult.content);
  const contentHtml = processedHtml.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  } as PostWithContentHtml;
};
