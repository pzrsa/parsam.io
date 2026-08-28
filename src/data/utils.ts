import { getCollection, type CollectionEntry } from "astro:content";
import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt({ html: true });

export const getBlogPosts = async () => {
  const posts = await getCollection("blog");
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return posts;
};

export const getPostExcerpt = (post: CollectionEntry<"blog">) => {
  const text = markdown
    .parse(post.body ?? "", {})
    .flatMap((token) =>
      token.type === "inline"
        ? (token.children ?? [])
            .map((child) => {
              if (child.type === "text" || child.type === "code_inline") {
                return child.content;
              }
              if (child.type === "softbreak" || child.type === "hardbreak") {
                return " ";
              }
              return "";
            })
            .join("")
        : [],
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= 160) return text;
  return `${text.slice(0, 160).replace(/\s+\S*$/, "")}…`;
};

export const getPostDescription = (post: CollectionEntry<"blog">) =>
  post.data.description || getPostExcerpt(post);
