import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
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
  const image = "index.jpg";

  return (
    <>
      <Head>
        <title>Parsa Mesgarha - Programmer, lifelong learner.</title>
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
      <div className="gap-1">
        <h1 className="text-4xl sm:text-5xl font-extrabold ">
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
        <div className="max-w-fit my-6">
          <NowPlaying />
        </div>
      </div>
      <div className="prose dark:prose-invert">
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
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold my-2">Posts</h1>
        <ul>
          {posts.map((post, i) => {
            dayjs.extend(customParseFormat);
            const date = dayjs(post.date).format("D MMM");
            const year = new Date(post.date).getFullYear();
            const firstForYear =
              !posts[i - 1] ||
              new Date(posts[i - 1].date).getFullYear() !== year;
            const lastForYear =
              !posts[i + 1] ||
              new Date(posts[i + 1].date).getFullYear() !== year;

            return (
              <li key={post.id}>
                <span className="flex justify-end mb-1">
                  {firstForYear && <span className="font-bold">{year}</span>}
                </span>
                <Link href={`/${post.id}`} className="group">
                  <span
                    className={`flex items-center group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-all ${
                      lastForYear ? "mb-4" : ""
                    }`}
                  >
                    <span className="flex-1 text-lg font-semibold">
                      {post.title}
                    </span>
                    <span className="font-mono">{date}</span>
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
