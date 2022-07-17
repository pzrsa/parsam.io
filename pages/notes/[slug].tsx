import { GetStaticProps } from "next";
import Post from "../../components/Post";
import { getAllPostSlugs, getPostData } from "../../lib/posts";
import { Post as PostType } from "../../lib/types";
import path from "path";

const notesDirectory = path.join(process.cwd(), "data/notes");

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const noteData = await getPostData(params!.slug, notesDirectory);
  return {
    props: {
      noteData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllPostSlugs(notesDirectory);
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
