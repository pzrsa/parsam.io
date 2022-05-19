import { GetStaticProps } from "next";
import Head from "next/head";
import Posts from "../components/Posts";
import { getSortedArticlesData } from "../lib/articles";

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
      <h1 className="text-4xl font-extrabold mb-8">Articles</h1>
      <Posts postType="articles" itemsData={allArticlesData} />
    </>
  );
};

export default Articles;
