import Head from "next/head";
import Posts from "../components/Posts";
import { getSortedArticlesData } from "../lib/articles";
import utilStyles from "../styles/utils.module.css";

export const getStaticProps = () => {
  const allArticlesData = getSortedArticlesData();
  return {
    props: {
      allArticlesData,
    },
  };
};

const Articles = ({ allArticlesData }) => {
  return (
    <div>
      <Head>
        <title>Articles - Parsa Mesgarha</title>
      </Head>
      <header>
        <h1 className={utilStyles.heading2Xl}>Articles</h1>
      </header>
      <Posts postType="articles" itemsData={allArticlesData} />
    </div>
  );
};

export default Articles;
