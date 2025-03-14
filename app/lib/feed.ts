import { Feed, Item } from "feed";
import fs from "fs";
import { BLOG_OG_PATH } from "./constants";
import { getPostWithHtml, getSortedPostData } from "./posts";
import type { PostWithContentHtml } from "./types";

const feedPath = "./public/feed.atom";

export const generateFeed = () => {
  const posts = getSortedPostData();

  const feed = new Feed({
    title: "Parsa Mesgarha's Blog",
    description: "Parsa Mesgarha's Blog",
    id: "https://parsam.io/",
    link: "https://parsam.io/blog",
    favicon: "https://parsam.io/favicon.ico",
    image: BLOG_OG_PATH,
    copyright: `All rights reserved ${new Date().getFullYear()}, Parsa.`,
    author: {
      name: "Parsa Mesgarha",
      email: "hi@parsam.io",
      link: "https://parsam.io/",
    },
  });

  (posts as PostWithContentHtml[]).forEach(async (post) => {
    const postData = await getPostWithHtml(post.id);

    let item: Item = {
      id: post.id,
      title: post.title,
      image: post.author
        ? `https://parsam.io/og?title=${post.title} - ${post.author}`
        : `https://parsam.io/og?title=${post.title}`,
      content: postData.contentHtml,
      link: `https://parsam.io/${post.id}`,
      date: new Date(`${post.date}T19:19:19`),
    };

    feed.addItem(item);

    fs.writeFileSync(feedPath, feed.atom1());
  });
};
