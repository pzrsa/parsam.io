import { GetStaticPaths, GetStaticProps } from "next";
import Post from "../../components/Post";
import { getAllArticleSlugs, getArticleData } from "../../lib/articles";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleData = await getArticleData(params!.slug);
  return {
    props: {
      articleData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllArticleSlugs();
  return {
    paths,
    fallback: false,
  };
};

interface ArticleProps {
  articleData: {
    title: string;
    author: string;
    date: string;
    contentHtml: string;
  };
}

const Article: React.FC<ArticleProps> = ({ articleData }) => {
  return <Post postType="article" postData={articleData} />;
};

export default Article;
