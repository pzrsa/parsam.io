import { GetStaticProps } from "next";
import Head from "next/head";
import ArticlesList from "../components/ArticlesList";
import PageTitle from "../components/PageTitle";
import { ARTICLES_DIRECTORY } from "../lib/constants";
import { getSortedPostData } from "../lib/posts";
import { Post } from "../lib/types";

export const getStaticProps: GetStaticProps = () => {
  const allArticlesData = getSortedPostData(ARTICLES_DIRECTORY);
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
  const title = "Articles - Parsa Mesgarha";
  const image = "/images/og/articles.svg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:image"
          content={`https://parsam.io${image}`}
          key="og:image"
        />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:image"
          content={`https://parsam.io${image}`}
          key="twitter:image"
        />
      </Head>
      <PageTitle name="Articles" />
      <ArticlesList articles={allArticlesData} />
    </>
  );
};

export default Articles;
