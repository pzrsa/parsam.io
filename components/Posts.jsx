import Link from "next/link";
import Date from "../components/Date";
import styles from "../styles/modules/Posts.module.css";
import utilStyles from "../styles/utils.module.css";

const Posts = ({ postType, itemsData }) => {
  return (
    <section>
      <ul className={styles.list}>
        {itemsData.map(({ slug, title, date }) => (
          <li className={styles.listItem} key={slug}>
            <Link href={`/${postType}/${slug}`}>
              <a className={utilStyles.headingMd}>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Posts;
