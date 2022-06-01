import { GetStaticProps } from "next";
import Post from "../../components/Post";
import { getAllNoteSlugs, getNoteData } from "../../lib/notes";
import { Post as PostType } from "../../lib/types";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const noteData = await getNoteData(params!.slug);
  return {
    props: {
      noteData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllNoteSlugs();
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
