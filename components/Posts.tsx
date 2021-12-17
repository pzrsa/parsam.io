import Link from "next/link";
import Date from "../components/Date";
import styles from "../styles/modules/Posts.module.css";
import utilStyles from "../styles/utils.module.css";

interface PostsProps {
  postType: string;
  itemsData: [{ slug: string; title: string; date: string; author: string }];
}

const Posts: React.FC<PostsProps> = ({ postType, itemsData }) => {
  return (
    <section>
      <ul className={styles.list}>
        {itemsData.map(({ slug, title, date, author }) => (
          <li className={styles.listItem} key={slug}>
            <Link href={`/${postType}/${slug}`}>
              <a className={utilStyles.headingXl}>{title}</a>
            </Link>
            <br />
            <p className={utilStyles.lightText}>
              {postType === "notes" ? <>by {author} - </> : ""}
              <Date dateString={date} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Posts;
