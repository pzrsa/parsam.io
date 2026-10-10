import { createHash } from "node:crypto";
import { basename, extname } from "node:path";
import { markdown } from "./linear-markdown";

// Signatures expire; the upload path is the stable identity of a Linear file.
export function linearUpload(target?: string | null) {
  if (!target) return;
  try {
    const url = new URL(target);
    if (url.origin === "https://uploads.linear.app")
      return `${url.origin}${url.pathname}`;
  } catch {}
}

export function extractCover(body: string) {
  const tokens = markdown.parse(body, {});
  const divider = tokens.findIndex(
    (token) => token.type === "hr" && token.level === 0,
  );
  if (divider < 0) return { body, cover: undefined };
  const before = tokens.slice(0, divider);
  const children = before.flatMap((token) => token.children ?? []);
  // Only an image-only area above the divider is a cover, not article text.
  if (
    before.some(
      (token) =>
        !["paragraph_open", "inline", "paragraph_close"].includes(token.type),
    ) ||
    children.some(
      (token) => !["image", "softbreak", "hardbreak"].includes(token.type),
    )
  )
    return { body, cover: undefined };
  const images = children.filter((token) => token.type === "image");
  if (images.length > 1)
    throw new Error(
      "Put only one image between the metadata block and divider.",
    );
  const image = images[0];
  const target = image?.attrGet("src");
  if (image && !linearUpload(target))
    throw new Error(
      "Upload the cover image to Linear instead of using an external image URL.",
    );
  return {
    body: body
      .split("\n")
      .slice(tokens[divider].map![1])
      .join("\n")
      .trimStart(),
    cover: image ? { url: target!, label: image.content } : undefined,
  };
}

// Linear often uses the original filename as image text. It isn't a caption.
export function isAttachmentLabel(text: string) {
  return /^[^\[\]<>\r\n/\\]{1,160}\.(?:png|jpe?g|webp|gif|avif|svg|mp4|webm|mov|pdf)$/i.test(
    text,
  );
}

export function attachmentFilename(
  label: string,
  extension: string,
  bytes: Uint8Array,
) {
  const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
  const stem = basename(label, extname(label));
  const junk =
    /^(?:file-)?[0-9a-f-]{16,}$/i.test(stem) ||
    /^(?:img|dsc|photo|screenshot|pasted[-_ ]image|image)[-_ ]?[\d_.-]*$/i.test(
      stem,
    ) ||
    (stem.length >= 20 && /^[a-z0-9]+$/i.test(stem) && /\d/.test(stem));
  const name =
    isAttachmentLabel(label) && !junk
      ? stem
          .normalize("NFKD")
          .replace(/\p{M}/gu, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : "";
  return { name, hash, extension };
}
