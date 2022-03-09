import Head from "next/head";
import Link from "next/link";
import styles from "../styles/modules/Post.module.css";
import utilStyles from "../styles/utils.module.css";
import Date from "./Date";
import { useRouter } from "next/router";

interface PostProps {
  postType: string;
  postData: {
    title: string;
    author: string;
    date: string;
    contentHtml: string;
  };
}

const Post: React.FC<PostProps> = ({ postType, postData }) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{postData.title} - Parsa Mesgarha</title>
        <meta
          property="og:site_name"
          content={postData.title}
          key="og:site_name"
        />
        <meta property="og:title" content={postData.title} key="og:title" />
        {/*<meta property="og:image" content={image} />*/}
        <meta
          name="twitter:title"
          content={postData.title}
          key="twitter:title"
        />
        {/*<meta name="twitter:image" content={image} />*/}
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
