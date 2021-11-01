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
          src="/images/avatar.jpg"
          height={144}
          width={144}
          alt="Parsa"
        />
        <div className={styles.greeting}>
          <h1 className={utilStyles.heading2Xl}>👋 Hi, I&apos;m Parsa.</h1>
          <p className={utilStyles.lightText}>
            Software Development Apprentice at Google{" "}
          </p>
        </div>
      </header>
    </div>
  );
};

export default Home;
