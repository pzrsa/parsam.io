import Head from "next/head";
import Link from "next/link";
import styles from "../styles/modules/Post.module.css";
import utilStyles from "../styles/utils.module.css";
import Date from "./Date";

const Post = ({ postType, postData }) => {
  return (
    <div>
      <Head>
        <title>{postData.title} - Parsa Mesgarha</title>
      </Head>
      <header>
        <h1 className={utilStyles.heading2Xl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {postType === "note" ? <>by {postData.author} - </> : ""}
          <Date dateString={postData.date} />
        </div>
      </header>
      <article dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <div className={styles.backToPage}>
        <Link href={`/${postType}s`}>
          <a>
            <h1 className={utilStyles.headingMd}>← Back to {postType}s</h1>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Post;
