import MarkdownIt from "markdown-it";

export const markdown = new MarkdownIt({ html: true });
// Keep reference definitions and their source locations for attachment rewrites.
markdown.core.ruler.disable("strip_references");

export type Metadata = Record<string, unknown>;

export function readLinearPost(content: string) {
  const body = content.replace(/\r\n?/g, "\n");
  const first = markdown.parse(body, {})[0];
  if (first?.type === "fence" && first.info.trim() === "yaml") {
    const metadata = Bun.YAML.parse(first.content);
    if (
      metadata &&
      typeof metadata === "object" &&
      !Array.isArray(metadata) &&
      "slug" in metadata
    ) {
      return {
        metadata: metadata as Metadata,
        body: body.split("\n").slice(first.map![1]).join("\n").trimStart(),
      };
    }
  }
  return { metadata: {} as Metadata, body };
}

export function postMarkdown(metadata: Metadata, body: string) {
  const fields = { ...metadata };
  for (const key of ["slug", "public", "obsidian_backup"]) delete fields[key];
  return `---\n${Bun.YAML.stringify(fields, null, 2).trimEnd()}\n---\n\n${body.trim()}\n`;
}

export function publicationDate(value: unknown) {
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  )
    return value;
}

export function assertUniqueSlugs(posts: { slug: string }[]) {
  const seen = new Set<string>();
  for (const post of posts) {
    const slug = post.slug.toLowerCase();
    if (seen.has(slug))
      throw new Error(
        `Multiple Linear documents use slug "${post.slug}". Give each a unique slug.`,
      );
    seen.add(slug);
  }
}
