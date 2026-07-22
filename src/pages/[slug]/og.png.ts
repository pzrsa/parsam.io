export const prerender = false;

import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { ImageResponse } from "workers-og";
import { Buffer } from "node:buffer";

const covers = import.meta.glob<string>("../../assets/blog/*", {
  eager: true,
  query: "?url",
  import: "default",
});

export const GET: APIRoute = async ({ params, url }) => {
  const post = (await getCollection("blog")).find((p) => p.id === params.slug);
  if (!post) return new Response("Not found", { status: 404 });

  const coverPath = post.data.cover
    ? covers[`../../assets/blog/${post.data.cover}`]
    : undefined;

  let coverDataUrl: string | undefined;
  if (coverPath) {
    const res = await fetch(new URL(coverPath, url));
    if (res.ok) {
      const buf = await res.arrayBuffer();
      const ext = coverPath.split(".").pop()?.toLowerCase();
      const mime =
        ext === "png"
          ? "image/png"
          : ext === "webp"
            ? "image/webp"
            : "image/jpeg";
      coverDataUrl = `data:${mime};base64,${Buffer.from(buf).toString("base64")}`;
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
        fontFamily: "Literata",
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
        name: "Literata",
        data: await fetch(
          "https://cdn.jsdelivr.net/npm/@fontsource/literata/files/literata-latin-700-normal.woff",
        ).then((res) => res.arrayBuffer()),
        weight: 700,
        style: "normal",
      },
      {
        name: "Literata",
        data: await fetch(
          "https://cdn.jsdelivr.net/npm/@fontsource/literata/files/literata-latin-400-normal.woff",
        ).then((res) => res.arrayBuffer()),
        weight: 400,
        style: "normal",
      },
    ],
  });
};
