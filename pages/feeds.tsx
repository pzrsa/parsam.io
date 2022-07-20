import { GetStaticProps } from "next";
import Head from "next/head";
import PageTitle from "../components/PageTitle";
import { generateFeeds } from "../lib/feeds";

export const getStaticProps: GetStaticProps = () => {
  generateFeeds();

  return { props: {} };
};

const Feeds: React.FC = () => {
  const title = "Feeds - Parsa Mesgarha";
  const image = "/images/og/feeds.svg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:image"
          content={`https://parsam.io${image}`}
          key="og:image"
        />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:image"
          content={`https://parsam.io${image}`}
          key="twitter:image"
        />
      </Head>
      <PageTitle name="Feeds" />
      <div className="prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-3 mt-8">Posts</h2>
        <ul>
          <li>
            <a href={"/notes.atom"}>Book Notes</a>
          </li>
          <li>
            <a href={"/articles.atom"}>Articles</a>
          </li>
        </ul>
        <p>
          I use{" "}
          <a
            href={"https://github.com/Ranchero-Software/NetNewsWire"}
            rel="prefetch noreferrer"
            target="_blank"
          >
            NetNewsWire
          </a>{" "}
          for reading my RSS feeds.
        </p>
      </div>
    </>
  );
};

export default Feeds;
