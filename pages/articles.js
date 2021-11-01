import { getSortedArticlesData } from "../lib/articles";
import utilStyles from "../styles/utils.module.css";

export const getStaticProps = () => {
  const allArticlesData = getSortedArticlesData();
  return {
    props: {
      allArticlesData,
    },
  };
};

const Articles = ({ allArticlesData }) => {
  return (
    <div>
      <header>
        <h1 className={utilStyles.heading2Xl}>Articles</h1>
      </header>
      <section>
        <ul className={utilStyles.list}>
          {allArticlesData.map(({ slug, date, title }) => (
            <li className={utilStyles.listItem} key={slug}>
              {title}
              <br />
              {slug}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Articles;
