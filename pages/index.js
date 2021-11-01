import Image from "next/image";
import styles from "../styles/modules/Home.module.css";
import utilStyles from "../styles/utils.module.css";

const Home = () => {
  return (
    <div>
      <header className={styles.header}>
        <Image
          priority
          className={utilStyles.borderCircle}
          src="https://avatars.githubusercontent.com/u/76453314"
          height={144}
          width={144}
          alt="Parsa"
        />
        <div className={styles.greeting}>
          <h1 className={utilStyles.heading2Xl}>👋 Hey, I&apos;m Parsa.</h1>
          <p className={utilStyles.lightText}>
            Software Development Apprentice at Google{" "}
          </p>
        </div>
      </header>
      <div className={styles.latest}>
        <h1 className={utilStyles.headingXl}>Latest Book Note</h1>
        <h1 className={utilStyles.headingXl}>Latest Article</h1>
      </div>
    </div>
  );
};

export default Home;
