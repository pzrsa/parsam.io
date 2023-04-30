import { GetStaticPaths, GetStaticProps } from "next";
import PostLayout from "../components/PostLayout";
import { POSTS_DIRECTORY } from "../lib/constants";
import { getAllPostIds, getPostData } from "../lib/posts";
import { Post as PostType } from "../lib/types";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getPostData(params!.id as string, POSTS_DIRECTORY);
  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds(POSTS_DIRECTORY);
  return {
    paths,
    fallback: false,
  };
};

interface PostProps {
  data: PostType;
}

const Post: React.FC<PostProps> = ({ data }) => {
  return <PostLayout postData={data} />;
};

export default Post;
