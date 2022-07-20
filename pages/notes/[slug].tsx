import { GetStaticProps } from "next";
import Post from "../../components/Post";
import { NOTES_DIRECTORY } from "../../lib/constants";
import { getAllPostSlugs, getPostData } from "../../lib/posts";
import { Post as PostType } from "../../lib/types";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const noteData = await getPostData(params!.slug, NOTES_DIRECTORY);
  return {
    props: {
      noteData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllPostSlugs(NOTES_DIRECTORY);
  return {
    paths,
    fallback: false,
  };
};

interface NoteProps {
  noteData: PostType;
}

const Note: React.FC<NoteProps> = ({ noteData }) => {
  return <Post postType="note" postData={noteData} />;
};

export default Note;
