import { GetStaticProps } from "next";
import Head from "next/head";
import NoteCards from "../components/NoteCards";
import PageTitle from "../components/PageTitle";
import { NOTES_DIRECTORY } from "../lib/constants";
import { getSortedPostData } from "../lib/posts";
import { Post } from "../lib/types";

export const getStaticProps: GetStaticProps = () => {
  const allNotesData = getSortedPostData(NOTES_DIRECTORY);
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
  const title = "Book Notes - Parsa Mesgarha";
  const image = "notes.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:image"
          content={`https://parsam.io/images/og/${image}`}
          key="og:image"
        />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:image"
          content={`https://parsam.io/images/og/${image}`}
          key="twitter:image"
        />
      </Head>
      <PageTitle name="Book Notes" />
      <NoteCards notes={allNotesData} />
    </>
  );
};

export default Notes;
