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
  const filename = path.split("/").pop()!;
  imageMap.set(filename, module.default);
}

async function optimizeImage(filename: string): Promise<string> {
  const imageMetadata = imageMap.get(filename);
  if (!imageMetadata) return `https://parsam.io/${filename}`;

  try {
    const optimized = await getImage({
      src: imageMetadata,
      format: "webp",
      width: 1200,
      quality: 80,
    });
    return new URL(optimized.src, "https://parsam.io").href;
  } catch {
    return `https://parsam.io/${filename}`;
  }
}

async function processPostContent(markdown: string): Promise<string> {
  const html = parser.render(markdown);
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
  const transformations = new Map<string, string>();

  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    if (src.startsWith("/") && !src.startsWith("//")) {
      const filename = src.substring(1);
      const isImage = /\.(jpeg|jpg|png|webp|gif)$/i.test(filename);

      if (isImage && imageMap.has(filename)) {
        transformations.set(src, await optimizeImage(filename));
      } else {
        transformations.set(src, `https://parsam.io${src}`);
      }
    }
  }

  let processedHtml = html;
  for (const [original, optimized] of transformations) {
    const escapedOriginal = original.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    processedHtml = processedHtml.replace(
      new RegExp(`src="${escapedOriginal}"`, "g"),
      `src="${optimized}"`,
    );
  }

  return sanitizeHtml(processedHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "video",
      "source",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      video: [
        "controls",
        "width",
        "height",
        "style",
        "autoplay",
        "loop",
        "muted",
        "playsinline",
      ],
      source: ["src", "type"],
    },
  });
}

export async function GET(context: APIContext) {
  const posts = await getBlogPosts();

  const items = await Promise.all(
    posts.map(async (post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/${post.id}/`,
      content: await processPostContent(post.body!),
    })),
  );

  return rss({
    title: "Parsa Mesgarha",
    description: "",
    site: new URL(context.site!),
    items,
  });
}
