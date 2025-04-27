import { useRemarkSync } from "react-remark";
import { DateFormat, ExternalLink, SubscribeForm } from "../components/common";
import { getAllPostIds, getPost } from "../lib/posts";

import type { Metadata } from "next";
import remarkExternalLinks from "remark-external-links";
import { PostWithContent } from "../lib/types";
import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { title, description, author } = getPost(id);

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
  const { id } = await params;
  const post = getPost(id);

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
      <Article post={post} />
      <hr className="my-12 border-neutral-300" />
      <div className="prose prose-h3:text-lg">
        <h3>Enjoyed this post?</h3>
        <SubscribeForm />
        <p>And please consider...</p>
        <ul>
          <li>
            following me on{" "}
            <ExternalLink href="https://x.com/pzrsaa">Twitter/X</ExternalLink>
          </li>
          <li>sharing this post with a friend</li>
          <li>
            sharing your thoughts over{" "}
            <ExternalLink href="mailto:hi@parsam.io">email</ExternalLink>
          </li>
        </ul>
      </div>
    </section>
  );
}

const Article: React.FC<{ post: PostWithContent }> = ({ post }) => {
  const reactContent = useRemarkSync(post.content, {
    remarkPlugins: [
      {
        plugins: [remarkExternalLinks],
        settings: {
          target: "_blank",
          rel: "prefetch noreferrer",
        },
      } as any,
    ],
    rehypeReactOptions: {
      components: {
        img: (props: ComponentPropsWithoutRef<"img">) => {
          return (
            <span className="block mb-5">
              <a href={`/${props.src}`} target="_blank">
                <Image
                  height={800}
                  width={400}
                  style={{ width: "100%", height: "auto" }}
                  alt={props.alt ?? ""}
                  src={`/${props.src}`}
                  className="shadow-2xl mb-2"
                  priority
                />
              </a>
              {props.alt && (
                <span className="block text-center text-sm">{props.alt}</span>
              )}
            </span>
          );
        },
      },
    },
  });

  return (
    <article className="prose prose-h1:text-2xl prose-h2:text-xl prose-headings:text-lg">
      {reactContent}
    </article>
  );
};
