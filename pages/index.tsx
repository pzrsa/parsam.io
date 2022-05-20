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
          👋 Hi, I&apos;m Parsa.
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
          I&apos;m an 18 year old from London, England who&apos;s keen on
          learning deeply about stuff like tech, startups, and life. I tend to
          spend the majority of my time learning through books, podcasts and
          other resources online.
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
          team, with a focus on making the Google Play Console the best app
          distribution platform for developers.
        </p>
        <p>
          My website is where I write{" "}
          <Link href="/notes">
            <a>notes</a>
          </Link>{" "}
          on the books I’ve read, providing summaries for others to get a rough
          understanding of what the book is about. On top of that, I write{" "}
          <Link href="/articles">
            <a>articles</a>
          </Link>{" "}
          which revolve around the topics I’m most interested in. I’m trying my
          best to improve on making quality posts, so feel free to message me on{" "}
          <a
            href="https://twitter.com/_parsam"
            rel="prefetch noreferrer"
            target="_blank"
          >
            twitter
          </a>{" "}
          with any feedback you might have.
        </p>
        <p>
          Also if you don’t want to miss out on any book notes I publish,
          subscribe to my{" "}
          <a
            href="https://parsam.substack.com/"
            rel="prefetch noreferrer"
            target="_blank"
          >
            Substack
          </a>{" "}
          so they land straight into your inbox.
        </p>
      </div>
    </>
  );
};

export default Home;
