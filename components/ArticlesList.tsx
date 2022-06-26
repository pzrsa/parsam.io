import Link from "next/link";
import { Post } from "../lib/types";
import Date from "./Date";

interface ArticlesListProps {
  articles: Post[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  return (
    <section>
      <ul>
        {articles.map((article) => (
          <li className="mb-8" key={article.slug}>
            <Link href={`/articles/${article.slug}`}>
              <a className="text-3xl sm:text-4xl font-bold underline hover:no-underline">
                {article.title}
              </a>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
              <Date dateString={article.date} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArticlesList;
