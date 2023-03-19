import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Date from "../components/Date";
import NowPlaying from "../components/NowPlaying";
import { ARTICLES_DIRECTORY, NOTES_DIRECTORY } from "../lib/constants";
import { getLatestPost } from "../lib/posts";
import { Post } from "../lib/types";

export const getStaticProps: GetStaticProps = async () => {
  const latestBookNote = getLatestPost(NOTES_DIRECTORY);
  const latestArticle = getLatestPost(ARTICLES_DIRECTORY);
  return {
    props: {
      latestBookNote,
      latestArticle,
    },
  };
};

interface IndexProps {
  latestBookNote: Post;
  latestArticle: Post;
}

const Index: React.FC<IndexProps> = ({ latestBookNote, latestArticle }) => {
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
          I&apos;m a 19 y/o from London constantly learning on a deeper level
          about the stuff I care about. If you&apos;re curious enough to learn
          more about me (for whatever reason), check out my{" "}
          <Link href="/about">about page</Link>.
        </p>
        <p>
          I&apos;m currently working on the{" "}
          <a href="https://web.dev/" rel="prefetch noreferrer" target="_blank">
            Web Platform
          </a>
          , mostly through{" "}
          <a
            href="https://www.chromium.org/Home/"
            rel="prefetch noreferrer"
            target="_blank"
          >
            Chrome
          </a>{" "}
          on{" "}
          <a
            href="https://source.android.com/"
            rel="prefetch noreferrer"
            target="_blank"
          >
            Android
          </a>{" "}
          devices.
        </p>
        <p>
          I write <Link href="/notes">notes</Link> on the books I&apos;ve read,
          providing summaries for others through my thoughts on the book. I also
          write <Link href="/articles">articles</Link> on stuff I find
          interesting enough to share.
        </p>
      </div>
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold my-4">
          Latest Book Note
        </h1>
        <Link
          href={`/notes/${latestBookNote.slug}`}
          className="hover:text-neutral-500 dark:hover:text-neutral-400 transition-all text-2xl sm:text-3xl font-bold"
        >
          {latestBookNote.title}
        </Link>
        <p className="font-mono text-neutral-600 dark:text-neutral-400">
          {latestBookNote.author} • {latestBookNote.genre} •{" "}
          <Date dateString={latestBookNote.date} />
        </p>
        <p className="mt-2">{latestBookNote.description}</p>
      </div>
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold my-4">Latest Article</h1>
        <Link
          href={`/articles/${latestArticle.slug}`}
          className="hover:text-neutral-500 dark:hover:text-neutral-400 transition-all text-2xl sm:text-3xl font-bold"
        >
          {latestArticle.title}
        </Link>
        <p className="font-mono text-neutral-600 dark:text-neutral-400 mt-1">
          <Date dateString={latestArticle.date} />
        </p>
      </div>
    </>
  );
};

export default Index;
