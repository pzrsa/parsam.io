import { LinearClient } from "@linear/sdk";
import { mkdirSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { copyLinearPostToBlog } from "./linear-to-blog";
import {
  markdown,
  postMarkdown,
  publicationDate,
  readLinearPost,
} from "./linear-markdown";
import {
  attachmentFilename,
  extractCover,
  isAttachmentLabel,
  linearUpload,
} from "./linear-media";

// Cache the Linear document and assets; --blog also copies them into Astro.
const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  allowPositionals: true,
  options: {
    slug: { type: "string" },
    date: { type: "string" },
    blog: { type: "boolean" },
  },
});
if (positionals.length !== 1) {
  throw new Error(
    "Usage: bun run publish [slug or document URL] [--date YYYY-MM-DD]",
  );
}
const apiKey = process.env.LINEAR_API_KEY;
if (!apiKey) throw new Error("Set LINEAR_API_KEY in your local .env first.");

let documentId = positionals[0];
if (documentId.startsWith("https://")) {
  const url = new URL(documentId);
  if (url.hostname !== "linear.app")
    throw new Error("Expected a linear.app document URL.");
  const match = url.pathname.match(/\/document\/[^/]*?([a-f0-9]{12})\/?$/);
  if (!match) throw new Error("Could not find the document ID in that URL.");
  documentId = match[1];
}

const client = new LinearClient({ apiKey });
const document = await client.document(documentId);
if (document.trashed || document.archivedAt)
  throw new Error("This document is archived or in the trash.");
let { body, metadata } = readLinearPost(document.content ?? "");
const coverSection = extractCover(body);
body = coverSection.body;
if (coverSection.cover) metadata.cover = coverSection.cover.url;
delete metadata.obsidian_backup;
delete metadata.public;
const slug = values.slug ?? metadata.slug;
if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  throw new Error(
    "Supply --slug <lowercase-slug>, or add slug to a leading YAML code block.",
  );
}
const output = join(repo, ".linear", slug);
const previousFile = Bun.file(join(output, "post.json"));
const previous = (await previousFile.exists())
  ? await previousFile.json()
  : undefined;
if (previous && previous.documentId !== document.id) {
  throw new Error(
    `The local export ${slug} belongs to a different document. Choose another slug.`,
  );
}
const rawStatus = metadata.status ?? "draft";
// Accept old exports while keeping the writing workflow draft -> ready -> live.
const status = rawStatus === "published" ? "live" : rawStatus;
if (!["draft", "ready", "live"].includes(status)) {
  throw new Error("The status must be draft, ready, or live.");
}
const date = publicationDate(values.date ?? metadata.date);
if (!date) {
  throw new Error(
    "Set date to YYYY-MM-DD in Linear (replace 2026-MM-DD), or supply --date YYYY-MM-DD.",
  );
}
const description = metadata.description;
if (description !== undefined && typeof description !== "string") {
  throw new Error("The description must be text.");
}

const source = {
  id: document.id,
  slugId: document.slugId,
  title: document.title,
  url: document.url,
  content: document.content,
  createdAt: document.createdAt,
  updatedAt: document.updatedAt,
};
const backup = join(
  output,
  "backups",
  new Date().toISOString().replace(/[:.]/g, "-"),
);
mkdirSync(backup, { recursive: true });
mkdirSync(join(output, "assets"), { recursive: true });
await Bun.write(join(backup, "document.json"), JSON.stringify(source, null, 2));
await Bun.write(join(backup, "document.md"), document.content ?? "");

type Asset = { name: string; type: string; bytes: number };
const uploads = new Map<string, string>();
const coverTarget =
  typeof metadata.cover === "string" ? linearUpload(metadata.cover) : undefined;
if (coverTarget) uploads.set(coverTarget, coverSection.cover?.label ?? "");
const environment: { references?: Record<string, { href: string }> } = {};
const tokens = markdown.parse(body, environment);
for (const token of tokens) {
  for (const child of token.children ?? []) {
    const target = child.attrGet(child.type === "image" ? "src" : "href");
    const key = linearUpload(target);
    if (!key) continue;
    const index = token.children!.indexOf(child);
    const label =
      child.type === "image"
        ? child.content
        : (token.children![index + 1]?.content ?? "");
    if (
      !uploads.has(key) ||
      (!isAttachmentLabel(uploads.get(key)!) && isAttachmentLabel(label))
    )
      uploads.set(key, label);
  }
}

const extensions: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "image/svg+xml": ".svg",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
  "application/pdf": ".pdf",
};
const assets = new Map<string, Asset>();
const identical = new Map<string, Asset>();
for (const [target, label] of uploads) {
  // Never forward the API key to another origin through a redirect.
  const response = await fetch(target, {
    headers: { Authorization: apiKey },
    redirect: "error",
  });
  if (!response.ok)
    throw new Error(
      `An attachment could not be downloaded (HTTP ${response.status}).`,
    );
  const type = (
    response.headers.get("content-type") ?? "application/octet-stream"
  ).split(";")[0];
  if (target === coverTarget && !type.startsWith("image/"))
    throw new Error("The cover must be an image.");
  const disposition = response.headers.get("content-disposition") ?? "";
  const filename = disposition.match(/filename="([^"]+)"/i)?.[1] ?? label;
  const hint = extname(filename).toLowerCase();
  const extension =
    extensions[type] ?? (/^\.[a-z0-9]{1,8}$/.test(hint) ? hint : ".bin");
  const bytes = new Uint8Array(await response.arrayBuffer());
  const suggested = attachmentFilename(filename, extension, bytes);
  const existing = identical.get(`${suggested.hash}${extension}`);
  if (existing) {
    assets.set(target, existing);
    continue;
  }
  let name = `${suggested.name || `${slug}-${suggested.hash}`}${extension}`;
  const cached = Bun.file(join(output, "assets", name));
  if (
    (await cached.exists()) &&
    !Buffer.from(await cached.arrayBuffer()).equals(bytes)
  )
    name = `${suggested.name || slug}-${suggested.hash}${extension}`;
  await Bun.write(join(output, "assets", name), bytes);
  const asset = { name, type, bytes: bytes.byteLength };
  assets.set(target, asset);
  identical.set(`${suggested.hash}${extension}`, asset);
  console.log(
    `Downloaded ${name} (${bytes.byteLength.toLocaleString()} bytes)`,
  );
}

const escape = (text: string) => markdown.utils.escapeHtml(text);
const lines = body.split("\n");
const edits: { start: number; end: number; text: string }[] = [];
let videoIndex = 0;
for (const token of tokens) {
  if (!["inline", "reference_definition"].includes(token.type) || !token.map)
    continue;
  const [start, end] = token.map;
  let text = lines.slice(start, end).join("\n");
  const children = token.children ?? [];
  const standalone =
    token.level === 1 &&
    children.length === 3 &&
    children[0].type === "link_open" &&
    children[2].type === "link_close";
  const video = standalone
    ? assets.get(linearUpload(children[0].attrGet("href")) ?? "")
    : undefined;
  if (video?.type.startsWith("video/")) {
    const hero = videoIndex++ === 0;
    const attributes = hero
      ? 'controls autoplay muted loop playsinline preload="metadata" data-scroll-play'
      : 'controls muted loop playsinline preload="none" data-scroll-play';
    text = `<video ${attributes}>\n  <source src="assets/${video.name}" type="${escape(video.type)}"/>\n</video>`;
  } else {
    const targets =
      token.type === "reference_definition"
        ? [environment.references?.[token.meta.label]?.href]
        : children.map((child) =>
            child.attrGet(child.type === "image" ? "src" : "href"),
          );
    for (const target of targets) {
      const asset = assets.get(linearUpload(target) ?? "");
      if (asset) text = text.replaceAll(target!, `assets/${asset.name}`);
    }
    for (const child of children) {
      if (
        child.type === "image" &&
        linearUpload(child.attrGet("src")) &&
        isAttachmentLabel(child.content)
      )
        text = text.replaceAll(`![${child.content}]`, "![]");
    }
  }
  if (text !== lines.slice(start, end).join("\n"))
    edits.push({ start, end, text });
}
for (const edit of edits.sort((a, b) => b.start - a.start)) {
  lines.splice(edit.start, edit.end - edit.start, edit.text);
}
body = lines.join("\n");
const exportedMetadata: Record<string, unknown> = {
  ...metadata,
  date,
  title: document.title,
  status,
};
if (description) exportedMetadata.description = description;
const cover = assets.get(coverTarget ?? "");
if (cover) exportedMetadata.cover = `assets/${cover.name}`;
await Bun.write(join(output, "post.md"), postMarkdown(exportedMetadata, body));
await Bun.write(
  join(output, "post.json"),
  JSON.stringify(
    {
      documentId: document.id,
      slug,
      date,
      description,
      status,
      metadata: exportedMetadata,
      updatedAt: document.updatedAt,
      assets: [...new Set(assets.values())],
    },
    null,
    2,
  ),
);

console.log(`Exported "${document.title}" to ${output}`);
console.log(
  `Saved Markdown, ${identical.size} attachments, and a source backup.`,
);
if (values.blog) {
  const copied = await copyLinearPostToBlog(output, repo);
  console.log(`Copied "${document.title}" to ${copied.path}`);
  console.log(`Run bun dev, then open /${copied.slug}.`);
}
