import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps } from "next/types";
import { SiRss } from "react-icons/si";
import DateFormat from "../components/Date";
import PageTitle from "../components/PageTitle";
import { getSortedPostData } from "../lib/posts";
import { Post } from "../lib/types";

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostData();
  return {
    props: {
      posts,
    },
  };
};

interface BlogProps {
  posts: Post[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const title = "Blog - Parsa Mesgarha";
  const image = "blog.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={title} key="og:description" />
        <meta
          property="og:image"
          content={`https://parsam.io/images/og/${image}`}
          key="og:image"
        />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={title}
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content={`https://parsam.io/images/og/${image}`}
          key="twitter:image"
        />
      </Head>
      <div className="px-6">
        <span className="flex gap-1 items-baseline">
          <span className="flex-1">
            <PageTitle>Blog</PageTitle>
          </span>
          <a
            href="/feed.atom"
            className="sm:text-lg hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2"
          >
            <SiRss />
          </a>
        </span>
        <ul>
          {posts.map((post, i) => {
            const getYear = (date: string) => new Date(date).getFullYear();
            const year = getYear(post.date);
            const firstForYear =
              !posts[i - 1] || getYear(posts[i - 1].date) !== year;
            const lastForYear =
              !posts[i + 1] || getYear(posts[i + 1].date) !== year;

            return (
              <li key={post.id}>
                {firstForYear && (
                  <span className="font-bold flex justify-end mb-3">
                    {year}
                  </span>
                )}
                <Link href={`/${post.id}`}>
                  <span
                    className={`flex items-baseline hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2 gap-6 ${
                      lastForYear ? "mb-4" : ""
                    }`}
                  >
                    <span className="flex-1 text-lg ">
                      <span className="font-semibold">{post.title}</span>
                      {post.author && (
                        <span>
                          <span className="font-mono text-neutral-600 dark:text-neutral-400">
                            {" // "}
                            {post.author}
                          </span>
                          <div className="mt-2 font-light text-neutral-800 dark:text-neutral-200">
                            {post.description}
                          </div>
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-neutral-600 dark:text-neutral-400">
                      <DateFormat dateString={post.date} format="MMM D" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Blog;

interface ExternalLinkProps {
  href: string;
  name: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, name }) => {
  return (
    <a href={href} rel="prefetch noreferrer" target="_blank">
      {name}
    </a>
  );
};
