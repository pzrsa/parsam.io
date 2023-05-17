import { Feed, Item } from "feed";
import fs from "fs";
import { FEED_PATH } from "./constants";
import { getPostData, getSortedPostData } from "./posts";
import type { Post } from "./types";

export const generateFeed = () => {
  const posts = getSortedPostData();

  const feed = new Feed({
    title: "Parsa's Posts",
    description: "Parsa's Posts",
    id: "https://parsam.io/",
    link: "https://parsam.io/",
    favicon: "https://parsam.io/favicons/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, Parsa.`,
    author: {
      name: "Parsa",
      email: "hi@parsam.io",
      link: "https://parsam.io/",
    },
  });

  (posts as Post[]).forEach(async (post) => {
    const postData = await getPostData(post.id);
    let item: Item = {
      id: post.id,
      title: post.title,
      content: postData.contentHtml,
      link: `https://parsam.io/${post.id}`,
      date: new Date(post.date),
    };
    if (post.author) {
      item.image = `https://parsam.io/images/notes/covers/${post.id}.jpg`;
    }

    feed.addItem(item);

    fs.writeFileSync(FEED_PATH, feed.atom1());
  });
};
