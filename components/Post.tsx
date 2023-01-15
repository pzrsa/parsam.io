import Head from "next/head";
import { Post } from "../lib/types";
import Date from "./Date";

interface PostProps {
  postType: "note" | "article";
  postData: Post;
}

const Post: React.FC<PostProps> = ({ postType, postData }) => {
  const title = `${postData.title} - Parsa Mesgarha`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          property="og:site_name"
          content={
            postType === "note"
              ? `${postData.title} by ${postData.author}`
              : postData.title
          }
          key="og:site_name"
        />
        <meta
          property="og:title"
          content={
            postType === "note"
              ? `${postData.title} by ${postData.author}`
              : postData.title
          }
          key="og:title"
        />
        <meta
          property="og:description"
          content={postType === "note" ? postData.description : postData.title}
          key="og:description"
        />
        {postType === "note" ? (
          <meta
            property="og:image"
            content={`https://parsam.io/images/notes/covers/${postData.slug}.jpg`}
            key="og:image"
          />
        ) : (
          <meta property="og:image" key="og:image" />
        )}
        <meta
          name="twitter:title"
          content={
            postType === "note"
              ? `${postData.title} by ${postData.author}`
              : postData.title
          }
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content={postType === "note" ? postData.description : postData.title}
          key="twitter:description"
        />

        {postType === "note" ? (
          <meta
            name="twitter:image"
            content={`https://parsam.io/images/notes/covers/${postData.slug}.jpg`}
            key="twitter:image"
          />
        ) : (
          <meta property="twitter:image" key="twitter:image" />
        )}
      </Head>
      <div className="mb-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          {postData.title}
        </h1>
        <div className="font-mono text-neutral-600 dark:text-neutral-400 mt-2">
          {postType === "note" ? <>{postData.author} • </> : ""}
          <Date dateString={postData.date} />
        </div>
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </>
  );
};

export default Post;
