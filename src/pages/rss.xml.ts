import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import { getBlogPosts } from "../data/utils";

const parser = new MarkdownIt({ html: true });

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/blog/*.{jpeg,jpg,png,webp,gif}",
  { eager: true },
);

const imageMap = new Map<string, ImageMetadata>();
for (const [path, module] of Object.entries(imageModules)) {
  imageMap.set(path.split("/").pop()!, module.default);
}

async function optimizeImage(filename: string, siteUrl: URL): Promise<string> {
  const metadata = imageMap.get(filename);
  if (!metadata) return new URL(`/${filename}`, siteUrl).href;

  try {
    const optimized = await getImage({ src: metadata });
    return new URL(optimized.src, siteUrl).href;
  } catch {
    return new URL(`/${filename}`, siteUrl).href;
  }
}

async function processPostContent(markdown: string, siteUrl: URL): Promise<string> {
  const html = parser.render(markdown);
  const transformations = new Map<string, string>();
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;

  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    if (src.startsWith("http") || src.startsWith("//")) continue;

    const filename = src.includes("assets/blog/")
      ? src.split("/").pop()!
      : src.substring(1);

    const isImage = /\.(jpeg|jpg|png|webp|gif)$/i.test(filename);

    if (isImage && imageMap.has(filename)) {
      transformations.set(src, await optimizeImage(filename, siteUrl));
    } else if (src.startsWith("/")) {
      transformations.set(src, new URL(src, siteUrl).href);
    }
  }

  let result = html;
  for (const [original, optimized] of transformations) {
    const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(`src="${escaped}"`, "g"), `src="${optimized}"`);
  }

  return sanitizeHtml(result, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "video", "source"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      video: ["controls", "width", "height", "style", "autoplay", "loop", "muted", "playsinline"],
      source: ["src", "type"],
    },
  });
}

export async function GET(context: APIContext) {
  const posts = await getBlogPosts();
  const siteUrl = new URL(context.site!);

  const items = await Promise.all(
    posts.map(async (post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/${post.id}/`,
      content: await processPostContent(post.body!, siteUrl),
    })),
  );

  return rss({
    title: "Parsa Mesgarha",
    description: "",
    site: siteUrl,
    items,
  });
}
