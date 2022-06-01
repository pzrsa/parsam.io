import { GetStaticPaths, GetStaticProps } from "next";
import Post from "../../components/Post";
import { getAllArticleSlugs, getArticleData } from "../../lib/articles";
import { Post as PostType } from "../../lib/types";

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
  articleData: PostType;
}

const Article: React.FC<ArticleProps> = ({ articleData }) => {
  return <Post postType="article" postData={articleData} />;
};

export default Article;
