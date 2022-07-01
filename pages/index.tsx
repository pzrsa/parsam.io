import Head from "next/head";
import Link from "next/link";
import NowPlaying from "../components/NowPlaying";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Parsa Mesgarha - Programmer, lifelong learner.</title>
      </Head>
      <div className="gap-1">
        <h1 className="text-4xl font-extrabold sm:text-5xl fold:text-3xl">
          👋 Hey, I&apos;m Parsa.
        </h1>
        <p className="text-sm sm:text-lg font-semibold text-neutral-600 dark:text-neutral-400">
          Software Development Apprentice at{" "}
          <span className="text-google-blue">G</span>
          <span className="text-google-red">o</span>
          <span className="text-google-yellow">o</span>
          <span className="text-google-blue">g</span>
          <span className="text-google-green">l</span>
          <span className="text-google-red">e</span>
        </p>
        <div className="max-w-fit my-6">
          <NowPlaying />
        </div>
      </div>
      <div className="prose dark:prose-invert">
        <p>
          I&apos;m a 19 year old from London, England keen on learning deeply
          about stuff I love including tech, startups and life.
        </p>
        <p>
          I currently work within the{" "}
          <a
            href="https://play.google.com/console/about/"
            rel="prefetch noreferrer"
            target="_blank"
          >
            Play Console
          </a>{" "}
          team, with a focus on making it the best app distribution platform for
          developers.
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

export default Home;
