import Image from "next/legacy/image";
import Link from "next/link";
import DateFormat from "../components/DateFormat";
import { getAllPostIds, getPostData } from "../lib/posts";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { title, description, author, id } = await getPostData(params.id);

  return {
    title: title,
    description: author ? description : title,
    openGraph: {
      title: title,
      description: author ? description : title,
      images: author && [`https://parsam.io/images/books/${id}.jpg`],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@pzrsaa",
      title: title,
      description: author ? description : title,
      images: author && [`https://parsam.io/images/books/${id}.jpg`],
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
      <div className="mb-6 px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
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
          <span>
            <Link
              href={"/blog"}
              className="font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all rounded-sm p-2"
            >
              Back
            </Link>
          </span>
        </div>
      </div>
      <article
        className="prose dark:prose-invert px-6 prose-img:rounded-sm prose-img:shadow-sm"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      {post.author ? (
        <div className="aspect-w-6 aspect-h-8 overflow-hidden rounded-lg mx-12">
          <Image
            alt={post.title}
            src={`/images/books/${post.id}.jpg`}
            layout="fill"
          />
        </div>
      ) : null}
    </section>
  );
}
