import { createHash } from "node:crypto";
import { existsSync, mkdirSync, renameSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { postMarkdown } from "./linear-markdown";

// Keep Linear's download cache separate from the site's normal Markdown/assets.
export async function copyLinearPostToBlog(
  exportDirectory: string,
  repo: string,
) {
  const post = await Bun.file(join(exportDirectory, "post.json")).json();
  const markdown = await Bun.file(join(exportDirectory, "post.md")).text();
  if (
    typeof post.slug !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)
  )
    throw new Error("Invalid post slug.");
  const frontmatter = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) throw new Error("The export is missing frontmatter.");
  const metadata = Bun.YAML.parse(frontmatter[1]) as Record<string, unknown>;
  let body = markdown.slice(frontmatter[0].length);
  const blog = join(repo, "src/data/blog");
  const md = join(blog, `${post.slug}.md`);
  const mdx = join(blog, `${post.slug}.mdx`);
  if (existsSync(md) && existsSync(mdx))
    throw new Error(
      `Both ${post.slug}.md and .mdx exist. Keep one before publishing.`,
    );
  const path = existsSync(mdx) ? mdx : md;
  const files: { path: string; bytes: Uint8Array }[] = [];
  for (const asset of post.assets) {
    if (typeof asset.name !== "string" || basename(asset.name) !== asset.name)
      throw new Error("Invalid asset filename.");
    const bytes = new Uint8Array(
      await Bun.file(join(exportDirectory, "assets", asset.name)).arrayBuffer(),
    );
    const image = asset.type.startsWith("image/");
    const folder = join(repo, image ? "src/assets/blog" : "public/blog");
    let name = asset.name;
    let destination = join(folder, name);
    const matches = async (file: string) =>
      existsSync(file) &&
      Buffer.from(await Bun.file(file).arrayBuffer()).equals(bytes);
    if (existsSync(destination) && !(await matches(destination))) {
      const hash = createHash("sha256")
        .update(bytes)
        .digest("hex")
        .slice(0, 12);
      const extension = extname(name);
      name = `${basename(name, extension)}-${hash}${extension}`;
      destination = join(folder, name);
      if (existsSync(destination) && !(await matches(destination)))
        throw new Error(`Asset filename collision: ${name}`);
    }
    files.push({ path: destination, bytes });
    body = body.replaceAll(
      `assets/${asset.name}`,
      image ? `../../assets/blog/${name}` : `/blog/${name}`,
    );
    if (metadata.cover === `assets/${asset.name}`) {
      if (!image) throw new Error("The cover must be an image.");
      metadata.cover = name;
    }
  }
  if (
    metadata.cover !== undefined &&
    (typeof metadata.cover !== "string" ||
      basename(metadata.cover) !== metadata.cover ||
      (!files.some(
        (file) =>
          file.path === join(repo, "src/assets/blog", metadata.cover as string),
      ) &&
        !existsSync(join(repo, "src/assets/blog", metadata.cover))))
  )
    throw new Error(
      "The cover image is missing. Put it between the metadata block and divider in Linear.",
    );
  const content = postMarkdown(metadata, body);
  mkdirSync(blog, { recursive: true });
  if (existsSync(path)) {
    const backup = join(
      exportDirectory,
      "backups",
      new Date().toISOString().replace(/[:.]/g, "-"),
      "blog",
    );
    mkdirSync(backup, { recursive: true });
    await Bun.write(join(backup, basename(path)), Bun.file(path));
  }
  for (const file of files) {
    mkdirSync(dirname(file.path), { recursive: true });
    await Bun.write(file.path, file.bytes);
  }
  const temporary = `${path}.linear-${process.pid}.tmp`;
  writeFileSync(temporary, content);
  renameSync(temporary, path);
  return { path, slug: post.slug, assets: files.length };
}
