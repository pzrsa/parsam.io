import Link from "next/link";
import DateFormat from "../components/DateFormat";
import { getAllPostIds, getPostData } from "../lib/posts";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { title, description, author } = await getPostData(params.id);

  const image = `https://parsam.io/og?title=${title}`;

  return {
    title: title,
    description: author ? description : title,
    openGraph: {
      title: title,
      description: author ? description : title,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@pzrsaa",
      title: title,
      description: author ? description : title,
      images: image,
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3">
          {post.title}
        </h1>
        <div className="flex gap-3 items-center">
          <span className="text-zinc-600 dark:text-zinc-400 flex-1">
            {post.author ? (
              <>
                {post.author}
                {" // "}
              </>
            ) : (
              ""
            )}
            <DateFormat dateString={post.date} format="MMMM D, YYYY" />
          </span>
        </div>
      </div>
      <article
        className="prose dark:prose-invert prose-img:rounded-sm prose-img:shadow-2xl"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </section>
  );
}
