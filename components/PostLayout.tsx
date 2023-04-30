import Head from "next/head";
import Link from "next/link";
import { Post as PostType } from "../lib/types";
import Date from "./Date";

interface PostProps {
  postData: PostType;
}

const PostLayout: React.FC<PostProps> = ({ postData }) => {
  const title = `${postData.title} - Parsa Mesgarha`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          property="og:site_name"
          content={
            postData.book
              ? `${postData.title} by ${postData.author}`
              : postData.title
          }
          key="og:site_name"
        />
        <meta
          property="og:title"
          content={
            postData.book
              ? `${postData.title} by ${postData.author}`
              : postData.title
          }
          key="og:title"
        />
        <meta
          property="og:description"
          content={postData.book ? postData.description : postData.title}
          key="og:description"
        />
        {postData.book ? (
          <meta
            property="og:image"
            content={`https://parsam.io/images/notes/covers/${postData.id}.jpg`}
            key="og:image"
          />
        ) : (
          <meta property="og:image" key="og:image" />
        )}
        <meta
          name="twitter:title"
          content={
            postData.book
              ? `${postData.title} by ${postData.author}`
              : postData.title
          }
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content={postData.book ? postData.description : postData.title}
          key="twitter:description"
        />

        {postData.book ? (
          <meta
            name="twitter:image"
            content={`https://parsam.io/images/notes/covers/${postData.id}.jpg`}
            key="twitter:image"
          />
        ) : (
          <meta property="twitter:image" key="twitter:image" />
        )}
      </Head>
      <div className="mb-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
          {postData.title}
        </h1>
        <div className="flex gap-3">
          <span className="font-mono text-neutral-600 dark:text-neutral-400 flex-1">
            {postData.book ? (
              <>
                {postData.author}
                {" // "}
              </>
            ) : (
              ""
            )}
            <Date dateString={postData.date} format="MMM D, YYYY" />
          </span>
          <span className="font-mono font-bold hover:text-neutral-500 dark:hover:text-neutral-400 transition-all">
            <Link href={"/"}>Back</Link>
          </span>
        </div>
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </>
  );
};

export default PostLayout;
