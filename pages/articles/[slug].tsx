import { GetStaticPaths, GetStaticProps } from "next";
import Post from "../../components/Post";
import { Post as PostType } from "../../lib/types";
import path from "path";
import { getAllPostSlugs, getPostData } from "../../lib/posts";

const articlesDirectory = path.join(process.cwd(), "data/articles");

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleData = await getPostData(params!.slug, articlesDirectory);
  return {
    props: {
      articleData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs(articlesDirectory);
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
