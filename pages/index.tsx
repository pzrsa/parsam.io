import Head from "next/head";
import Link from "next/link";
import NowPlaying from "../components/NowPlaying";
import styles from "../styles/modules/Home.module.css";
import utilStyles from "../styles/utils.module.css";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Parsa Mesgarha - Programmer, lifelong learner.</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.greeting}>
          <h1 className={utilStyles.heading2Xl}>👋 Hi, I&apos;m Parsa.</h1>
          <p className={utilStyles.lightText}>
            Software Development Apprentice at{" "}
            <span style={{ color: "#4885ed" }}>G</span>
            <span style={{ color: "#db3236" }}>o</span>
            <span style={{ color: "#f4c20d" }}>o</span>
            <span style={{ color: "#4885ed" }}>g</span>
            <span style={{ color: "#3cba54" }}>l</span>
            <span style={{ color: "#db3236" }}>e</span>
          </p>
          <div className={styles.nowPlaying}>
            <NowPlaying />
          </div>
        </div>
      </header>
      <div>
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
          team, helping developers with publishing and maintaining their app on
          the Play Store.
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
    </div>
  );
};

export default Home;
