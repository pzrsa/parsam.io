import { getCollection, type CollectionEntry } from "astro:content";
import { ImageResponse } from "@vercel/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

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

  let coverDataUrl: string | undefined;
  if (post.data.cover) {
    try {
      const imgBuffer = readFileSync(
        join(process.cwd(), "src/assets/blog", post.data.cover),
      );
      const ext = post.data.cover.split(".").pop()?.toLowerCase() ?? "jpeg";
      const mime = ext === "png" ? "image/png" : "image/jpeg";
      coverDataUrl = `data:${mime};base64,${imgBuffer.toString("base64")}`;
    } catch {
      // cover not found, continue without it
    }
  }

  const leftPanel = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        flex: 1,
        minWidth: 0,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            },
            children: [
              {
                type: "h1",
                props: {
                  style: {
                    fontSize: coverDataUrl ? "42px" : "52px",
                    fontWeight: "700",
                    margin: "0",
                    lineHeight: "1.3",
                  },
                  children: post.data.title,
                },
              },
              // {
              //   type: "span",
              //   props: {
              //     style: {
              //       fontSize: "18px",
              //       fontWeight: "400",
              //     },
              //     children: formattedDate,
              //   },
              // },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              borderTop: "3px solid black",
              paddingTop: "20px",
              display: "flex",
            },
            children: [
              {
                type: "span",
                props: {
                  style: {
                    fontSize: "22px",
                    fontWeight: "700",
                    flex: 1,
                  },
                  children: "Parsa Mesgarha",
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    fontSize: "18px",
                    fontWeight: "400",
                  },
                  children: "parsam.io",
                },
              },
            ],
          },
        },
      ],
    },
  };

  const html = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "60px",
        backgroundColor: "#ffedd5",
        color: "black",
        fontFamily: "Bitter",
        gap: coverDataUrl ? "48px" : "0",
      },
      children: coverDataUrl
        ? [
            leftPanel,
            {
              type: "img",
              props: {
                src: coverDataUrl,
                style: {
                  width: "360px",
                  height: "360px",
                  objectFit: "cover",
                  border: "2px solid black",
                  boxShadow: "4px 4px 0 0 rgba(0,0,0,1)",
                  flexShrink: 0,
                },
              },
            },
          ]
        : [leftPanel],
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "Bitter",
        data: await fetch(
          "https://cdn.jsdelivr.net/npm/@fontsource/bitter/files/bitter-latin-700-normal.woff",
        ).then((res) => res.arrayBuffer()),
        weight: 700,
        style: "normal",
      },
      {
        name: "Bitter",
        data: await fetch(
          "https://cdn.jsdelivr.net/npm/@fontsource/bitter/files/bitter-latin-400-normal.woff",
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
