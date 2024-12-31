import { DateFormat, ExternalLink } from "../components/common";
import { getAllPostIds, getPostData } from "../lib/posts";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const { title, description, author } = await getPostData(id);

  const image = author
    ? `https://parsam.io/og?title=${title} - ${author}`
    : `https://parsam.io/og?title=${title}`;

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

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await getPostData(id);

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3">
          {post.title}
        </h1>
        <div className="flex gap-3 items-center">
          <span className="flex-1 text-zinc-600">
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
          {post.draft ? <span>DRAFT</span> : ""}
        </div>
      </div>
      <article
        className="prose prose-h1:text-2xl prose-h2:text-xl prose-headings:text-lg prose-img:rounded-sm prose-img:shadow-2xl"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <hr className="my-12 border-neutral-300" />
      <div className="prose">
        <p>If you enjoyed this post, please consider...</p>
        <ul>
          <li>
            following me on{" "}
            <ExternalLink href="https://x.com/pzrsaa">Twitter/X</ExternalLink>
          </li>
          <li>sharing it with a friend</li>
          <li>
            subscribing via <a href="/feed.atom">RSS</a> to get the latest posts
          </li>
          <li>
            sharing your thoughts over{" "}
            <ExternalLink href="mailto:hi@parsam.io">email</ExternalLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
