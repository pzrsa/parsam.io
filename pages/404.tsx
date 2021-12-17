import Head from "next/head";
import utilStyles from "../styles/utils.module.css";

const Custom404: React.FC = () => {
  return (
    <div>
      <Head>
        <title>404 - Parsa Mesgarha</title>
      </Head>
      <h1 style={{ textAlign: "center" }} className={utilStyles.heading2Xl}>
        404 - Page not found
      </h1>
    </div>
  );
};

export default Custom404;
