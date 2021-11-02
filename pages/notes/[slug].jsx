import Post from "../../components/Post";
import { getAllNoteSlugs, getNoteData } from "../../lib/notes";

export const getStaticProps = async ({ params }) => {
  const noteData = await getNoteData(params.slug);
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

const Note = ({ noteData }) => {
  return <Post postData={noteData} />;
};

export default Note;
