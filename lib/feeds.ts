import { Feed } from "feed";
import fs from "fs";
import {
  ARTICLES_DIRECTORY,
  ARTICLES_FEED_PATH,
  NOTES_DIRECTORY,
  NOTES_FEED_PATH,
} from "./constants";
import { getPostData, getSortedPostData } from "./posts";
import { Post } from "./types";

export const generateFeeds = () => {
  generateNotesFeed();
  generateArticlesFeed();
};

const generateNotesFeed = () => {
  const posts = getSortedPostData(NOTES_DIRECTORY);

  const feed = new Feed({
    title: "Parsa's Book Notes",
    description: "Notes on the books I've read.",
    id: "https://parsam.io/notes",
    link: "https://parsam.io/notes",
    favicon: "https://parsam.io/favicons/favicon.ico",
    image: "https://parsam.io/images/og/notes.jpg",
    copyright: `All rights reserved ${new Date().getFullYear()}, Parsa.`,
    author: {
      name: "Parsa",
      email: "hi@parsam.io",
      link: "https://parsam.io/",
    },
  });

  (posts as Post[]).forEach(async (post) => {
    const postData = await getPostData(post!.slug, NOTES_DIRECTORY);

    feed.addItem({
      id: post.slug,
      title: post.title,
      content: postData.contentHtml,
      link: `https://parsam.io/notes/${post.slug}`,
      image: `https://parsam.io/images/notes/covers/${post.slug}.jpg`,
      date: new Date(post.date),
    });

    fs.writeFileSync(NOTES_FEED_PATH, feed.atom1());
  });
};

const generateArticlesFeed = () => {
  const posts = getSortedPostData(ARTICLES_DIRECTORY);

  const feed = new Feed({
    title: "Parsa's Articles",
    description: "Thoughts on stuff I find interesting.",
    id: "https://parsam.io/articles",
    link: "https://parsam.io/articles",
    favicon: "https://parsam.io/favicons/favicon.ico",
    image: "https://parsam.io/images/og/articles.jpg",
    copyright: `All rights reserved ${new Date().getFullYear()}, Parsa.`,
    author: {
      name: "Parsa",
      email: "hi@parsam.io",
      link: "https://parsam.io/",
    },
  });

  (posts as Post[]).forEach(async (post) => {
    const postData = await getPostData(post!.slug, ARTICLES_DIRECTORY);

    feed.addItem({
      id: post.slug,
      title: post.title,
      content: postData.contentHtml,
      link: `https://parsam.io/articles/${post.slug}`,
      date: new Date(post.date),
    });

    fs.writeFileSync(ARTICLES_FEED_PATH, feed.atom1());
  });
};
