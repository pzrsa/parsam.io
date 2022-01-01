import { GetStaticProps } from "next";
import Post from "../../components/Post";
import { getAllNoteSlugs, getNoteData } from "../../lib/notes";

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
  noteData: {
    title: string;
    author: string;
    date: string;
    contentHtml: string;
  };
}

const Note: React.FC<NoteProps> = ({ noteData }) => {
  return <Post postType="note" postData={noteData} />;
};

export default Note;
