import Link from "next/link";
import { Post } from "../lib/types";
import Date from "./Date";

interface ArticleItemProps {
  article: Post;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  return (
    <li className="mb-8" key={article.slug}>
      <Link
        href={`/articles/${article.slug}`}
        className="hover:text-neutral-500 dark:hover:text-neutral-400 transition-all text-3xl sm:text-4xl font-bold"
      >
        {article.title}
      </Link>
      <p className="font-mono text-neutral-600 dark:text-neutral-400 mt-2">
        <Date dateString={article.date} />
      </p>
    </li>
  );
};

export default ArticleItem;
