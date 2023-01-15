import { GetStaticProps } from "next";
import Head from "next/head";
import ArticlesList from "../components/ArticlesList";
import PageTitle from "../components/PageTitle";
import { ARTICLES_DIRECTORY } from "../lib/constants";
import { getSortedPostData } from "../lib/posts";
import { Post } from "../lib/types";

export const getStaticProps: GetStaticProps = async () => {
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
  const description = "Thoughts on stuff I find interesting.";
  const image = "articles.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
        <meta
          property="og:image"
          content={`https://parsam.io/images/og/${image}`}
          key="og:image"
        />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={description}
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content={`https://parsam.io/images/og/${image}`}
          key="twitter:image"
        />
      </Head>
      <PageTitle name="Articles" />
      <ArticlesList articles={allArticlesData} />
    </>
  );
};

export default Articles;
