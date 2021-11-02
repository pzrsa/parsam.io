import Head from "next/head";
import NowPlaying from "../components/NowPlaying";
import styles from "../styles/modules/Home.module.css";
import utilStyles from "../styles/utils.module.css";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Parsa Mesgarha</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.greeting}>
          <h1 className={utilStyles.heading2Xl}>👋 Hi, I&apos;m Parsa.</h1>
          <p className={utilStyles.lightText}>
            Software Development Apprentice at Google{" "}
          </p>
          <div className={styles.nowPlaying}>
            <NowPlaying />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
