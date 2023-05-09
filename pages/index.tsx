import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import DateFormat from "../components/Date";
import NowPlaying from "../components/NowPlaying";
import { generateFeed } from "../lib/feeds";
import { getSortedPostData } from "../lib/posts";
import { Post } from "../lib/types";

export const getStaticProps: GetStaticProps = async () => {
  generateFeed();
  const posts = getSortedPostData();
  return {
    props: {
      posts,
    },
  };
};

interface IndexProps {
  posts: Post[];
}

const Index: React.FC<IndexProps> = ({ posts }) => {
  const title = "Parsa Mesgarha";
  const image = "index.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          property="og:image"
          content={`https://parsam.io/images/og/${image}`}
          key="og:image"
        />
        <meta
          name="twitter:image"
          content={`https://parsam.io/images/og/${image}`}
          key="twitter:image"
        />
      </Head>
      <div className="gap-1 px-4">
        <div className="px-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold ">
            Hi, I&apos;m Parsa.
          </h1>
          <p className="text-sm sm:text-lg font-mono font-semibold text-neutral-600 dark:text-neutral-400">
            Software Engineering Apprentice at{" "}
            <span className="font-serif">
              <span className="text-google-blue">G</span>
              <span className="text-google-red">o</span>
              <span className="text-google-yellow">o</span>
              <span className="text-google-blue">g</span>
              <span className="text-google-green">l</span>
              <span className="text-google-red">e</span>
            </span>
          </p>
        </div>
        <div className="max-w-fit my-6">
          <NowPlaying />
        </div>
      </div>
      <div className="prose dark:prose-invert px-6">
        <p>
          I&apos;m a 19 y/o from London currently working on the{" "}
          <a href="https://web.dev/" rel="prefetch noreferrer" target="_blank">
            Web
          </a>{" "}
          via{" "}
          <a
            href="https://www.chromium.org/Home/"
            rel="prefetch noreferrer"
            target="_blank"
          >
            Chrome
          </a>{" "}
          for{" "}
          <a
            href="https://source.android.com/"
            rel="prefetch noreferrer"
            target="_blank"
          >
            Android
          </a>
          . If you&apos;re curious enough to learn more about me (for whatever
          reason), check out my <Link href="/about">about page</Link>.
        </p>
        <p>
          On this website, I write notes on the books I&apos;ve read, providing
          summaries with my thoughts on the book. I also write articles on stuff
          I find interesting enough to share.
        </p>
      </div>
      <div className="px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mt-6 px-2">Posts</h1>
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
                  <span className="font-bold flex justify-end mb-2">
                    {year}
                  </span>
                )}
                <Link href={`/${post.id}`}>
                  <span
                    className={`flex items-baseline hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2 gap-6 ${
                      lastForYear ? "mb-4" : ""
                    }`}
                  >
                    <span className="flex-1 text-lg ">
                      <span className="font-semibold">{post.title}</span>
                      {post.book && (
                        <span className="font-mono text-neutral-600 dark:text-neutral-400">
                          {" // "}
                          {post.author}
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-neutral-600 dark:text-neutral-400">
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
};

export default Index;
