import { Metadata } from "next";
import Link from "next/link";
import { SiRss } from "react-icons/si";
import DateFormat from "../components/DateFormat";
import { BLOG_OG_PATH } from "../lib/constants";
import { generateFeed } from "../lib/feed";
import { getSortedPostData } from "../lib/posts";
import { Post } from "../lib/types";

export const metadata: Metadata = {
  title: "Blog",
  openGraph: {
    images: [BLOG_OG_PATH],
  },
  twitter: {
    images: [BLOG_OG_PATH],
  },
};

export default function Page() {
  generateFeed();
  const posts = getSortedPostData() as Post[];

  return (
    <>
      <div className="px-4">
        <div className="px-2">
          <span className="flex gap-1 items-baseline">
            <span className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-8">Blog</h1>
            </span>
            <a
              href="/feed.atom"
              className="sm:text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all rounded-sm p-2"
            >
              <SiRss />
            </a>
          </span>
        </div>
        <ul>
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
                  <span className="font-bold flex justify-end mb-3">
                    {year}
                  </span>
                )}
                <Link href={`/${post.id}`}>
                  <span
                    className={`flex items-baseline hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all rounded-sm p-2 gap-6 ${
                      lastForYear ? "mb-4" : ""
                    }`}
                  >
                    <span className="flex-1 text-lg ">
                      <span className="font-semibold">{post.title}</span>
                      {post.author && (
                        <span>
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {" // "}
                            {post.author}
                          </span>
                          <div className="mt-2 font-light text-zinc-800 dark:text-zinc-200">
                            {post.description}
                          </div>
                        </span>
                      )}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      <DateFormat dateString={post.date} format="MMM D" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

interface ExternalLinkProps {
  href: string;
  name: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, name }) => {
  return (
    <a href={href} rel="prefetch noreferrer" target="_blank">
      {name}
    </a>
  );
};
