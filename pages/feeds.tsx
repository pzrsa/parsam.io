import { GetStaticProps } from "next";
import Head from "next/head";
import PageTitle from "../components/PageTitle";
import { generateFeeds } from "../lib/feeds";

export const getStaticProps: GetStaticProps = async () => {
  generateFeeds();
  return { props: {} };
};

export default function Feeds() {
  const title = "Feeds - Parsa Mesgarha";
  const image = "feeds.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={title} key="og:description" />
        <meta
          property="og:image"
          content={`https://parsam.io/images/og/${image}`}
          key="og:image"
        />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={title}
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content={`https://parsam.io/images/og/${image}`}
          key="twitter:image"
        />
      </Head>
      <PageTitle name="Feeds" />
      <div className="prose dark:prose-invert">
        <h1 className="text-2xl font-bold mb-3 mt-8">RSS</h1>
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
        <h1 className="text-2xl font-bold mb-3 mt-8">Email</h1>
        <p>
          If you&apos;d prefer to receive my posts in your inbox, you can
          subscribe to my{" "}
          <a
            href={"https://parsam.substack.com/"}
            rel="prefetch noreferrer"
            target="_blank"
          >
            Substack
          </a>
          .
        </p>
      </div>
    </>
  );
}
