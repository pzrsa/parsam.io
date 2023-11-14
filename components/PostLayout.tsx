import Head from "next/head";
import Image from "next/legacy/image";
import Link from "next/link";
import { Post as PostType } from "../lib/types";
import Date from "./Date";
import { FONT_SOURCE_CODE_PRO } from "../lib/constants";

interface PostProps {
  data: PostType;
}

const PostLayout: React.FC<PostProps> = ({ data }) => {
  const title = `${data.title} - Parsa Mesgarha`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          property="og:site_name"
          content={data.author ? `${data.title} by ${data.author}` : data.title}
          key="og:site_name"
        />
        <meta
          property="og:title"
          content={data.author ? `${data.title} by ${data.author}` : data.title}
          key="og:title"
        />
        <meta
          property="og:description"
          content={data.author ? data.description : data.title}
          key="og:description"
        />
        {data.author ? (
          <meta
            property="og:image"
            content={`https://parsam.io/images/books/${data.id}.jpg`}
            key="og:image"
          />
        ) : (
          <meta property="og:image" key="og:image" />
        )}
        <meta
          name="twitter:title"
          content={data.author ? `${data.title} by ${data.author}` : data.title}
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content={data.author ? data.description : data.title}
          key="twitter:description"
        />

        {data.author ? (
          <meta
            name="twitter:image"
            content={`https://parsam.io/images/books/${data.id}.jpg`}
            key="twitter:image"
          />
        ) : (
          <meta property="twitter:image" key="twitter:image" />
        )}
      </Head>
      <div className="mb-6 px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
          {data.title}
        </h1>
        <div className="flex gap-3 items-center">
          <span
            className={`text-neutral-600 dark:text-neutral-400 flex-1 ${FONT_SOURCE_CODE_PRO.className}`}
          >
            {data.author ? (
              <>
                {data.author}
                {" // "}
              </>
            ) : (
              ""
            )}
            <Date dateString={data.date} format="MMMM D, YYYY" />
          </span>
          <span>
            <Link
              href={"/blog"}
              className={`font-bold hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2 ${FONT_SOURCE_CODE_PRO.className}`}
            >
              Back
            </Link>
          </span>
        </div>
      </div>
      <article
        className="prose dark:prose-invert px-6"
        dangerouslySetInnerHTML={{ __html: data.contentHtml }}
      />
      {data.author ? (
        <div className="aspect-w-6 aspect-h-8 overflow-hidden rounded-lg mx-12">
          <Image
            alt={data.title}
            src={`/images/books/${data.id}.jpg`}
            layout="fill"
          />
        </div>
      ) : null}
    </>
  );
};

export default PostLayout;
