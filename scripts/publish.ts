import {
  copyFileSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { execFileSync } from "node:child_process";
import { homedir, tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const VAULT = join(
  homedir(),
  "Library/Mobile Documents/iCloud~md~obsidian/Documents/parsa",
);
const NOTES = join(VAULT, "notes/parsam.io");
const ATTACHMENTS = join(VAULT, "attachments");
const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG = join(REPO, "src/data/blog");
const ASSETS = join(REPO, "src/assets/blog");
const PUBLIC_BLOG = join(REPO, "public/blog");

const VIDEO_TYPES: Record<string, string> = {
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
};

type Frontmatter = Record<string, string>;
type Note = {
  file: string;
  path: string;
  fm: Frontmatter;
  body: string;
  defaultSlug: string;
  published: { slug: string; path: string } | null;
};
type Ref = { raw: string; name: string; alt: string };
type Imported = {
  finalName: string;
  srcPath: string;
  videoType: string | undefined;
};

const kebab = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const stripExt = (file: string) => file.replace(/\.[^.]+$/, "");
const postSlug = (file: string) => file.replace(/\.(md|mdx)$/, "");

function ask(question: string, def: string): string {
  const answer = (prompt(`${question}${def ? ` [${def}]` : ""}:`) ?? "").trim();
  return answer || def;
}

function unifiedDiff(oldContent: string, newContent: string): string {
  const dir = mkdtempSync(join(tmpdir(), "publish-diff-"));
  const oldPath = join(dir, "current.md");
  const newPath = join(dir, "updated.md");
  writeFileSync(oldPath, oldContent);
  writeFileSync(newPath, newContent);

  try {
    return execFileSync(
      "diff",
      ["-u", "-L", "current", "-L", "updated", oldPath, newPath],
      { encoding: "utf8" },
    );
  } catch (e: any) {
    if (typeof e.stdout === "string") return e.stdout;
    throw e;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function parseNote(src: string): { fm: Frontmatter; body: string } | null {
  const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;

  const fm: Frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;

    let value = line.slice(i + 1).trim();
    if (/^(".*"|'.*')$/.test(value)) value = value.slice(1, -1);
    fm[line.slice(0, i).trim()] = value;
  }

  return { fm, body: src.slice(match[0].length) };
}

const readNote = (path: string) => parseNote(readFileSync(path, "utf8"));

function findRefs(body: string): Ref[] {
  const refs: Ref[] = [];

  for (const match of body.matchAll(/!\[\[([^\]|]+?)(?:\|([^\]]*))?\]\]/g)) {
    refs.push({
      raw: match[0],
      name: match[1].trim(),
      alt: match[2]?.trim() ?? "",
    });
  }

  for (const match of body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    const target = match[2].trim();
    if (
      /^[a-z]+:\/\//i.test(target) ||
      target.startsWith("/") ||
      target.startsWith("..")
    ) {
      continue;
    }

    refs.push({
      raw: match[0],
      name: decodeURIComponent(target),
      alt: match[1].trim(),
    });
  }

  return refs;
}

function resolveAttachment(name: string): string | null {
  for (const dir of [ATTACHMENTS, NOTES]) {
    const path = join(dir, name);
    if (existsSync(path)) return path;
  }

  return null;
}

function findAsset(stem: string, videoType: string | undefined): string | null {
  const dir = videoType ? PUBLIC_BLOG : ASSETS;
  if (!existsSync(dir)) return null;

  for (const file of readdirSync(dir)) {
    if (kebab(stripExt(file)) === stem) return file;
  }

  return null;
}

function importAttachment(
  srcPath: string,
  allowExisting: boolean,
  preferredName?: string | null,
): Imported {
  const ext = extname(srcPath).toLowerCase();
  const videoType = VIDEO_TYPES[ext];
  const destDir = videoType ? PUBLIC_BLOG : ASSETS;
  const destLabel = videoType ? "public/blog" : "src/assets/blog";
  const original = basename(srcPath);
  const fallback = kebab(stripExt(original));
  const preferredStem = kebab(stripExt(preferredName ?? original)) || fallback;

  if (
    allowExisting &&
    preferredName &&
    existsSync(join(destDir, preferredName))
  ) {
    console.log(`  using existing ${destLabel}/${preferredName}`);
    return { finalName: preferredName, srcPath, videoType };
  }

  if (allowExisting && existsSync(join(destDir, preferredStem + ext))) {
    console.log(`  using existing ${destLabel}/${preferredStem}${ext}`);
    return { finalName: preferredStem + ext, srcPath, videoType };
  }

  console.log(`  attachment: ${srcPath}`);

  let def = preferredStem;
  while (true) {
    const name = kebab(stripExt(ask(`  name for "${original}"`, def))) || def;
    const finalName = name + ext;

    if (existsSync(join(destDir, finalName))) {
      if (allowExisting) {
        console.log(`  using existing ${destLabel}/${finalName}`);
        return { finalName, srcPath, videoType };
      }

      console.log(
        `  ${destLabel}/${finalName} already exists — pick another name`,
      );
      def = name;
      continue;
    }

    copyFileSync(srcPath, join(destDir, finalName));
    console.log(`  ✓ ${original} → ${destLabel}/${finalName}`);
    return { finalName, srcPath, videoType };
  }
}

function updateSourceNote(
  note: Note,
  refs: Ref[],
  imported: Map<string, Imported>,
  cover: string,
): void {
  const original = readFileSync(note.path, "utf8");
  let next = original;

  for (const ref of refs) {
    const imp = imported.get(ref.name);
    if (!imp) continue;

    const replacement = ref.raw.startsWith("![[")
      ? `![[${imp.finalName}${ref.alt ? `|${ref.alt}` : ""}]]`
      : `![${ref.alt}](${imp.finalName})`;
    next = next.replaceAll(ref.raw, replacement);
  }

  if (cover && cover !== decodeURIComponent(note.fm.cover?.trim() ?? "")) {
    const match = next.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (match) {
      const eol = next.includes("\r\n") ? "\r\n" : "\n";
      const lines = match[1].split(/\r?\n/);
      const value = /^[A-Za-z0-9._/-]+$/.test(cover)
        ? cover
        : JSON.stringify(cover);
      const i = lines.findIndex((line) => line.startsWith("cover:"));
      if (i === -1) lines.push(`cover: ${value}`);
      else lines[i] = `cover: ${value}`;
      next = `---${eol}${lines.join(eol)}${eol}---${next.slice(match[0].length)}`;
    }
  }

  if (next !== original) {
    writeFileSync(note.path, next);
    console.log("  ✓ Obsidian note filenames updated");
  }
}

const publishedBySlug = new Map<
  string,
  { slug: string; path: string; title?: string }
>();
const publishedByTitle = new Map<
  string,
  { slug: string; path: string; title?: string }
>();

for (const file of readdirSync(BLOG)) {
  if (!/\.(md|mdx)$/.test(file)) continue;

  const post = {
    slug: postSlug(file),
    path: join(BLOG, file),
    title: readNote(join(BLOG, file))?.fm.title,
  };

  publishedBySlug.set(post.slug, post);
  if (post.title) publishedByTitle.set(post.title.toLowerCase(), post);
}

const candidates: Note[] = [];
for (const file of readdirSync(NOTES).sort()) {
  if (!file.endsWith(".md")) continue;

  const path = join(NOTES, file);
  const parsed = readNote(path);
  if (!parsed) continue;
  if (parsed.fm.publish !== "true") continue;

  const defaultSlug = kebab(file.slice(0, -3));
  const title = parsed.fm.title?.toLowerCase();
  const published =
    publishedBySlug.get(defaultSlug) ??
    (title ? publishedByTitle.get(title) : undefined) ??
    null;

  candidates.push({
    file,
    path,
    fm: parsed.fm,
    body: parsed.body,
    defaultSlug,
    published,
  });
}

if (candidates.length === 0) {
  console.log("Nothing to publish or update. Flip `publish: true` on a note.");
  process.exit(0);
}

const created: string[] = [];

for (const note of candidates) {
  const isUpdate = note.published !== null;
  console.log(
    `\n${isUpdate ? "Updating" : "Publishing"} "${note.fm.title || note.file}" (${note.file})`,
  );

  if (!note.fm.date || !note.fm.title) {
    console.warn("  ⚠ missing date or title in frontmatter — skipping");
    continue;
  }

  const slug = note.published?.slug ?? note.defaultSlug;
  if (
    !note.published &&
    (existsSync(join(BLOG, slug + ".md")) || existsSync(join(BLOG, slug + ".mdx")))
  ) {
    console.warn(`  ⚠ "${slug}" already exists as a different post — skipping`);
    continue;
  }

  const refs = findRefs(note.body);
  const imported = new Map<string, Imported>();
  const missing = new Set<string>();

  for (const ref of refs) {
    if (imported.has(ref.name) || missing.has(ref.name)) continue;

    const src = resolveAttachment(ref.name);
    if (!src) {
      console.warn(
        `  ⚠ attachment not found in vault: "${ref.name}" — reference left as-is`,
      );
      missing.add(ref.name);
      continue;
    }

    const ext = extname(src).toLowerCase();
    const videoType = VIDEO_TYPES[ext];
    const existingByRef = findAsset(kebab(stripExt(ref.name)), videoType);
    const cover = decodeURIComponent(note.fm.cover?.trim() ?? "");
    const existingByCover =
      cover && refs.length === 1 && !videoType
        ? findAsset(kebab(stripExt(cover)), undefined)
        : null;

    imported.set(
      ref.name,
      importAttachment(src, isUpdate, existingByRef ?? existingByCover),
    );
  }

  let body = note.body;
  for (const ref of refs) {
    const imp = imported.get(ref.name);
    if (!imp) continue;

    const replacement = imp.videoType
      ? `<video controls>\n  <source src="/blog/${imp.finalName}" type="${imp.videoType}" />\n</video>`
      : `![${ref.alt}](../../assets/blog/${imp.finalName})`;
    body = body.replaceAll(ref.raw, replacement);
  }

  let cover = decodeURIComponent(note.fm.cover?.trim() ?? "");
  const importedCover = cover ? imported.get(cover) : undefined;
  if (importedCover) {
    cover = importedCover.finalName;
  } else if (cover) {
    const matchingImage = [...imported.values()].find(
      (i) =>
        !i.videoType && kebab(stripExt(i.finalName)) === kebab(stripExt(cover)),
    );
    const coverPath = resolveAttachment(cover);
    const existingCover = findAsset(kebab(stripExt(cover)), undefined);

    if (matchingImage) {
      cover = matchingImage.finalName;
      console.log(`  cover → ${cover} (matched renamed image)`);
    } else if (coverPath) {
      const imp = importAttachment(coverPath, isUpdate, existingCover);
      imported.set(cover, imp);
      cover = imp.finalName;
    } else if (existingCover) {
      cover = existingCover;
    } else if (!existsSync(join(ASSETS, cover))) {
      console.warn(
        `  ⚠ cover "${cover}" not found in vault or src/assets/blog — keeping value as-is`,
      );
    }
  }

  const fm = [
    `date: ${note.fm.date}`,
    `title: ${JSON.stringify(note.fm.title)}`,
  ];
  if (note.fm.author) fm.push(`author: ${JSON.stringify(note.fm.author)}`);
  if (note.fm.description)
    fm.push(`description: ${JSON.stringify(note.fm.description)}`);
  if (cover) fm.push(`cover: ${cover}`);

  const outputFile = note.published?.path ?? join(BLOG, slug + ".md");
  const outputPath = `src/data/blog/${basename(outputFile)}`;
  const newContent = `---\n${fm.join("\n")}\n---\n\n${body.trim()}\n`;

  if (isUpdate) {
    const oldContent = readFileSync(outputFile, "utf8");
    if (oldContent === newContent) {
      console.log("  no changes — skipping");
      continue;
    }
    console.log(unifiedDiff(oldContent, newContent));
  }

  if (
    !/^y/i.test(
      ask(`  ${isUpdate ? "update" : "publish"} this note? (y/n)`, "y"),
    )
  ) {
    console.log("  skipped");
    continue;
  }

  const seenAttachments = new Set<string>();
  for (const imp of imported.values()) {
    if (
      seenAttachments.has(imp.srcPath) ||
      dirname(imp.srcPath) !== ATTACHMENTS
    )
      continue;
    seenAttachments.add(imp.srcPath);

    const nextPath = join(ATTACHMENTS, imp.finalName);
    if (imp.srcPath === nextPath) continue;
    if (existsSync(nextPath)) {
      console.warn(
        `  ⚠ Obsidian already has ${imp.finalName}; source filename left as-is`,
      );
      continue;
    }

    renameSync(imp.srcPath, nextPath);
    console.log(`  ✓ Obsidian attachment → ${imp.finalName}`);
  }
  updateSourceNote(note, refs, imported, cover);

  writeFileSync(outputFile, newContent);
  created.push(outputPath);
  console.log(`  ✓ ${outputPath}`);
}

if (created.length === 0) {
  console.log("\nNo posts created.");
} else {
  console.log(`\nDone — ${created.join(", ")}`);
  console.log("\nNext steps:");
  console.log("  bun run dev   # preview the post");
  console.log("  git add -A && git commit -m 'add post' && git push");
}
