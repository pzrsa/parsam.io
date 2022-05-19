import Link from "next/link";
import Date from "../components/Date";

interface PostsProps {
  postType: string;
  itemsData: [{ slug: string; title: string; date: string; author: string }];
}

const Posts: React.FC<PostsProps> = ({ postType, itemsData }) => {
  return (
    <section>
      <ul>
        {itemsData.map(({ slug, title, date, author }) => (
          <li className="mb-8" key={slug}>
            <Link href={`/${postType}/${slug}`}>
              <a className="text-3xl font-bold underline hover:no-underline">
                {title}
              </a>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
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
