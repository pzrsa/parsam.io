import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { getBlogPosts } from "../lib/utils";

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const posts = await getBlogPosts();
  return rss({
    title: "Parsa Mesgarha",
    description: "",
    site: new URL(context.site!),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/${post.id}/`,
      content: sanitizeHtml(parser.render(post.body!), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
  });
}
