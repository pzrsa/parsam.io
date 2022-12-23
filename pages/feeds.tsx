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
  const image = "feeds.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:image"
          content={`https://parsam.io/images/og/${image}`}
          key="og:image"
        />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:image"
          content={`https://parsam.io/images/og/${image}`}
          key="twitter:image"
        />
      </Head>
      <PageTitle name="Feeds" />
      <div className="prose dark:prose-invert">
        <ul>
          <li>
            <a href={"/notes.atom"}>Book Notes</a>
          </li>
          <li>
            <a href={"/articles.atom"}>Articles</a>
          </li>
        </ul>
        <p>
          For reading RSS feeds, I recommend{" "}
          <a
            href={
              "https://apps.apple.com/app/netnewswire-rss-reader/id1480640210"
            }
            rel="prefetch noreferrer"
            target="_blank"
          >
            NetNewsWire
          </a>{" "}
          for iOS, and{" "}
          <a
            href={
              "https://play.google.com/store/apps/details?id=com.nononsenseapps.feeder.play"
            }
            rel="prefetch noreferrer"
            target="_blank"
          >
            Feeder
          </a>{" "}
          for Android.
        </p>
      </div>
    </>
  );
};

export default Feeds;
