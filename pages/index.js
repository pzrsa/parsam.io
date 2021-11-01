import utilStyles from "../styles/utils.module.css";

const Home = () => {
  return (
    <div>
      <header>
        <h1 className={utilStyles.headingXl}>👋 Hey, I&apos;m Parsa.</h1>
        <p className={utilStyles.lightText}>
          Software Development Apprentice at Google{" "}
        </p>
      </header>
    </div>
  );
};

export default Home;
