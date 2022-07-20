import { Feed } from "feed";
import fs from "fs";
import {
  ARTICLES_ATOM_FEED,
  FEED_FOLDER,
  NOTES_ATOM_FEED,
  NOTES_DIRECTORY,
} from "./constants";
import { getSortedPostData } from "./posts";
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
    image: "https://parsam.io/images/og/notes.svg",
    copyright: `All rights reserved ${new Date().getFullYear()}, Parsa Mesgarha`,
    author: {
      name: "Parsa Mesgarha",
      email: "hi@parsam.io",
      link: "https://parsam.io/",
    },
  });

  (posts as Post[]).forEach((post) => {
    feed.addItem({
      id: post.slug,
      title: post.title,
      description: post.description,
      link: `https://parsam.io/notes/${post.slug}`,
      image: post.image,
      content: post.contentHtml,
      date: new Date(post.date),
    });
  });

  fs.mkdirSync(FEED_FOLDER, { recursive: true });
  fs.writeFileSync(NOTES_ATOM_FEED, feed.atom1());
};

const generateArticlesFeed = () => {
  const posts = getSortedPostData(NOTES_DIRECTORY);

  const feed = new Feed({
    title: "Parsa's Articles",
    description: "Thoughts on stuff I find interesting.",
    id: "https://parsam.io/articles",
    link: "https://parsam.io/articles",
    image: "https://parsam.io/images/og/articles.svg",
    copyright: `All rights reserved ${new Date().getFullYear()}, Parsa Mesgarha`,
    author: {
      name: "Parsa Mesgarha",
      email: "hi@parsam.io",
      link: "https://parsam.io/",
    },
  });

  (posts as Post[]).forEach((post) => {
    feed.addItem({
      id: post.slug,
      title: post.title,
      link: `https://parsam.io/notes/${post.slug}`,
      content: post.contentHtml,
      date: new Date(post.date),
    });
  });

  fs.mkdirSync(FEED_FOLDER, { recursive: true });
  fs.writeFileSync(ARTICLES_ATOM_FEED, feed.atom1());
};
