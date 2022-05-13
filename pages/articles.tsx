import { GetStaticProps } from "next";
import Head from "next/head";
import Posts from "../components/Posts";
import { getSortedArticlesData } from "../lib/articles";
import utilStyles from "../styles/utils.module.css";

export const getStaticProps: GetStaticProps = () => {
  const allArticlesData = getSortedArticlesData();
  return {
    props: {
      allArticlesData,
    },
  };
};

interface ArticlesProps {
  allArticlesData: [
    { slug: string; title: string; date: string; author: string }
  ];
}

const Articles: React.FC<ArticlesProps> = ({ allArticlesData }) => {
  return (
    <>
      <Head>
        <title>Articles - Parsa Mesgarha</title>
      </Head>
      <header>
        <h1 className={utilStyles.heading2Xl}>Articles</h1>
      </header>
      <Posts postType="articles" itemsData={allArticlesData} />
    </>
  );
};

export default Articles;
