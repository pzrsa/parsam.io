import { GetStaticPaths, GetStaticProps } from "next";
import Post from "../../components/Post";
import { ARTICLES_DIRECTORY } from "../../lib/constants";
import { getAllPostSlugs, getPostData } from "../../lib/posts";
import { Post as PostType } from "../../lib/types";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleData = await getPostData(params!.slug, ARTICLES_DIRECTORY);
  return {
    props: {
      articleData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs(ARTICLES_DIRECTORY);
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
