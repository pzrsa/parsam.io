import { GetStaticProps } from "next";
import Head from "next/head";
import Posts from "../components/Posts";
import { getSortedNotesData } from "../lib/notes";
import utilStyles from "../styles/utils.module.css";

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
    <div>
      <Head>
        <title>Book Notes - Parsa Mesgarha</title>
      </Head>
      <header>
        <h1 className={utilStyles.heading2Xl}>Book Notes</h1>
      </header>
      <Posts postType="notes" itemsData={allNotesData} />
    </div>
  );
};

export default Notes;
