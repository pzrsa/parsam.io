import Head from "next/head";
import utilStyles from "../styles/utils.module.css";

const Notes = () => {
  return (
    <div>
      <Head>
        <title>Book Notes - Parsa Mesgarha</title>
      </Head>
      <header>
        <h1 className={utilStyles.heading2Xl}>Book Notes</h1>
      </header>
    </div>
  );
};

export default Notes;
