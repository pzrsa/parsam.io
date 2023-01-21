import { GetStaticProps } from "next";
import Head from "next/head";
import BookCard from "../components/BookCard";
import PageTitle from "../components/PageTitle";
import { NOTES_DIRECTORY } from "../lib/constants";
import { getSortedPostData } from "../lib/posts";
import { Post } from "../lib/types";

export const getStaticProps: GetStaticProps = async () => {
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
  const description = "Notes on the books I've read.";
  const image = "notes.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
        <meta
          property="og:image"
          content={`https://parsam.io/images/og/${image}`}
          key="og:image"
        />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={description}
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content={`https://parsam.io/images/og/${image}`}
          key="twitter:image"
        />
      </Head>
      <PageTitle name="Book Notes" />
      <div className="mx-auto">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-3">
          {allNotesData.map((note) => (
            <BookCard key={note.slug} note={note} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
