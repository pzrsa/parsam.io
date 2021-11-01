import styles from "../styles/modules/Posts.module.css";

const Posts = ({ itemsData }) => {
  return (
    <section>
      <ul className={styles.list}>
        {itemsData.map(({ slug, title, date }) => (
          <li className={styles.listItem} key={slug}>
            {title}
            <br />
            {slug}
            <br />
            {date}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Posts;
