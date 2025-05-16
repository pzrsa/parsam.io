import { getCollection, type CollectionEntry } from "astro:content";
import { ImageResponse } from "@vercel/og";

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<"blog"> };
}

export async function GET({ props }: Props) {
  const { post } = props;

  const formattedDate = post.data.date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const html = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "60px",
        backgroundColor: "white",
        color: "black",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            },
            children: [
              {
                type: "h1",
                props: {
                  style: {
                    fontSize: "48px",
                    fontWeight: "bold",
                    margin: "0",
                    lineHeight: "1.3",
                    maxWidth: "90%",
                  },
                  children: post.data.title,
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    fontSize: "16px",
                    marginTop: "10px",
                  },
                  children: formattedDate,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              borderTop: "1px solid black",
              paddingTop: "20px",
              display: "flex",
            },
            children: [
              {
                type: "span",
                props: {
                  style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                  },
                  children: "Parsa Mesgarha",
                },
              },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "Inter",
        data: await fetch(
          "https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff",
        ).then((res) => res.arrayBuffer()),
        weight: 700,
        style: "normal",
      },
      {
        name: "Inter",
        data: await fetch(
          "https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-500-normal.woff",
        ).then((res) => res.arrayBuffer()),
        weight: 500,
        style: "normal",
      },
      {
        name: "Inter",
        data: await fetch(
          "https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff",
        ).then((res) => res.arrayBuffer()),
        weight: 400,
        style: "normal",
      },
    ],
  });
}

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}
