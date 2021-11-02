import Post from "../../components/Post";
import { getAllArticleSlugs, getArticleData } from "../../lib/articles";

export const getStaticProps = async ({ params }) => {
  const articleData = await getArticleData(params.slug);
  return {
    props: {
      articleData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllArticleSlugs();
  return {
    paths,
    fallback: false,
  };
};

const Article = ({ articleData }) => {
  return <Post postData={articleData} />;
};

export default Article;
