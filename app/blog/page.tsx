import { Metadata } from "next";
import Link from "next/link";
import { SiRss } from "react-icons/si";
import { DateFormat } from "../components/common";
import { BLOG_OG_PATH } from "../lib/constants";
import { generateFeed } from "../lib/feed";
import { getSortedPostData } from "../lib/posts";
import { Post } from "../lib/types";

export const metadata: Metadata = {
  title: "Blog",
  openGraph: {
    url: "https://parsam.io",
    images: [BLOG_OG_PATH],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@pzrsaa",
    images: [BLOG_OG_PATH],
  },
};

export default function Page() {
  generateFeed();
  const posts = getSortedPostData() as Post[];

  return (
    <>
      <span className="flex gap-1 items-baseline">
        <span className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-8">Blog</h1>
        </span>
        <a href="/feed.atom">
          <SiRss />
        </a>
      </span>
      <ul className="flex flex-col gap-4">
        {posts.map((post, i) => {
          const getYear = (date: string) => new Date(date).getFullYear();
          const year = getYear(post.date);
          const firstForYear =
            !posts[i - 1] || getYear(posts[i - 1].date) !== year;
          const lastForYear =
            !posts[i + 1] || getYear(posts[i + 1].date) !== year;

          return (
            <li key={post.id}>
              {firstForYear && (
                <span className="font-bold flex justify-end mb-3">{year}</span>
              )}
              <span className={`flex ${lastForYear ? "mb-4" : ""}`}>
                <span className="flex-1">
                  <Link href={`/${post.id}`}>
                    <span className="font-semibold">{post.title}</span>
                    {post.author && (
                      <span>
                        <span className="text-zinc-600">
                          {" - "}
                          {post.author}
                        </span>
                      </span>
                    )}
                  </Link>
                </span>
                <span className="text-zinc-600">
                  <DateFormat dateString={post.date} format="MMM D" />
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
