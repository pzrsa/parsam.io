import Head from "next/head";
import Link from "next/link";
import NowPlaying from "../components/NowPlaying";

const Index: React.FC = () => {
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
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          Hi, I&apos;m Parsa.
        </h1>
        <p className="font-mono text-sm sm:text-lg font-semibold text-neutral-600 dark:text-neutral-400">
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
          I&apos;m a 19 year old from London, England keen on learning deeply
          about{" "}
          <Link href="/about">
            <a>stuff I love</a>
          </Link>{" "}
          including tech, startups and life.
        </p>
        <p>
          I currently work within the{" "}
          <a
            href="https://www.w3.org"
            rel="prefetch noreferrer"
            target="_blank"
          >
            Web
          </a>{" "}
          on{" "}
          <a
            href="https://android.com"
            rel="prefetch noreferrer"
            target="_blank"
          >
            Android
          </a>{" "}
          team, focusing on problems related to the Web ecosystem for Android
          devices.
        </p>
        <p>
          I write{" "}
          <Link href="/notes">
            <a>notes</a>
          </Link>{" "}
          on the books I&apos;ve read, providing summaries for others through my
          thoughts on the book. I also write{" "}
          <Link href="/articles">
            <a>articles</a>
          </Link>{" "}
          (though rarely) on stuff I find interesting enough to share.
        </p>
      </div>
    </>
  );
};

export default Index;
