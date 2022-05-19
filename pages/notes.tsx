import { GetStaticProps } from "next";
import Head from "next/head";
import Posts from "../components/Posts";
import { getSortedNotesData } from "../lib/notes";

export const getStaticProps: GetStaticProps = () => {
  const allNotesData = getSortedNotesData();
  return {
    props: {
      allNotesData,
    },
  };
};

interface NotesProps {
  allNotesData: [{ slug: string; title: string; date: string; author: string }];
}

const Notes: React.FC<NotesProps> = ({ allNotesData }) => {
  return (
    <>
      <Head>
        <title>Book Notes - Parsa Mesgarha</title>
      </Head>
      <header>
        <h1 className="text-4xl font-extrabold mb-8">Book Notes</h1>
      </header>
      <Posts postType="notes" itemsData={allNotesData} />
    </>
  );
};

export default Notes;
