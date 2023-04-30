import { GetStaticPaths, GetStaticProps } from "next";
import PostLayout from "../components/PostLayout";
import { getAllPostIds, getPostData } from "../lib/posts";
import { Post as PostType } from "../lib/types";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getPostData(params!.id as string);
  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
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
