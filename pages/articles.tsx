import { GetStaticProps } from "next";
import Head from "next/head";
import ArticlesList from "../components/ArticlesList";
import PageTitle from "../components/PageTitle";
import { getSortedArticlesData } from "../lib/articles";
import { Post } from "../lib/types";

export const getStaticProps: GetStaticProps = () => {
  const allArticlesData = getSortedArticlesData();
  return {
    props: {
      allArticlesData,
    },
  };
};

interface ArticlesProps {
  allArticlesData: Post[];
}

const Articles: React.FC<ArticlesProps> = ({ allArticlesData }) => {
  return (
    <>
      <Head>
        <title>Articles - Parsa Mesgarha</title>
      </Head>
      <PageTitle name="Articles" />
      <ArticlesList articles={allArticlesData} />
    </>
  );
};

export default Articles;
