import Head from "next/head";
import utilStyles from "../styles/utils.module.css";

interface AboutProps {}

const About: React.FC<AboutProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Parsa Mesgarha - About</title>
      </Head>
      <header>
        <h1 className={utilStyles.heading2Xl}>About Me</h1>
      </header>
      <div>
        <h2 className={utilStyles.headingLg}>Interests</h2>
        <ul>
          <li>Tech</li>
        </ul>
        <h2 className={utilStyles.headingLg}>Values</h2>
      </div>
    </>
  );
};

export default About;
