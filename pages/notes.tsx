import { GetStaticProps } from "next";
import Head from "next/head";
import NoteCards from "../components/NoteCards";
import PageTitle from "../components/PageTitle";
import { getSortedNotesData } from "../lib/notes";
import { Post } from "../lib/types";

export const getStaticProps: GetStaticProps = () => {
  const allNotesData = getSortedNotesData();
  return {
    props: {
      allNotesData,
    },
  };
};

interface NotesProps {
  allNotesData: Post[];
}

const Notes: React.FC<NotesProps> = ({ allNotesData }) => {
  return (
    <>
      <Head>
        <title>Book Notes - Parsa Mesgarha</title>
      </Head>
      <PageTitle name="Book Notes" />
      <NoteCards notes={allNotesData} />
    </>
  );
};

export default Notes;
