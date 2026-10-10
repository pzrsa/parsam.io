import { LinearClient } from "@linear/sdk";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { pickPost } from "./pick-post";
import {
  assertUniqueSlugs,
  publicationDate,
  readLinearPost,
} from "./linear-markdown";

// Pick a Linear post and copy it into the blog. View it with bun dev.
const repo = resolve(import.meta.dir, "..");
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    date: { type: "string" },
  },
});
const apiKey = process.env.LINEAR_API_KEY;
if (!apiKey) throw new Error("Set LINEAR_API_KEY in this repo's .env first.");
try {
  const query = positionals.join(" ").trim();
  let selected: string | undefined;
  if (/^(?:https:\/\/linear\.app\/|[a-f0-9-]{36}$)/.test(query)) {
    selected = query;
  } else {
    const client = new LinearClient({ apiKey });
    const connection = await client.documents({
      first: 100,
      filter: { team: { key: { eq: "P" } } },
    });
    while (connection.pageInfo.hasNextPage) await connection.fetchNext();
    const posts = connection.nodes
      .flatMap((document) => {
        if (document.trashed || document.archivedAt) return [];
        const { metadata } = readLinearPost(document.content ?? "");
        const { slug } = metadata;
        if (typeof slug !== "string") return [];
        let status = String(metadata.status ?? "draft");
        if (status === "published") status = "live";
        const date = publicationDate(metadata.date);
        return {
          id: document.id,
          title: document.title,
          slug,
          status,
          date,
          createdAt: document.createdAt,
          label:
            `${(date ?? "undated").padEnd(10)}  [${status.padEnd(5)}] ${document.title} (${slug})`.replace(
              /[\x00-\x1f\x7f]/g,
              " ",
            ),
        };
      })
      .sort(
        (a, b) =>
          Number(a.status === "live") - Number(b.status === "live") ||
          (b.date ?? "").localeCompare(a.date ?? "") ||
          b.createdAt.getTime() - a.createdAt.getTime() ||
          a.title.localeCompare(b.title),
      );
    if (!posts.length)
      throw new Error("No Linear posts with slug metadata were found.");
    const exact = posts.find(
      (post) => query && post.slug.toLowerCase() === query.toLowerCase(),
    );
    const post = exact ?? (await pickPost(posts, query));
    if (post) {
      assertUniqueSlugs(
        posts.filter(
          (candidate) =>
            candidate.slug.toLowerCase() === post.slug.toLowerCase(),
        ),
      );
      selected = post.id;
    }
  }
  if (selected) {
    const command = [
      process.execPath,
      join(repo, "tools/linear-import.ts"),
      selected,
      "--blog",
    ];
    if (values.date) command.push("--date", values.date);
    const child = Bun.spawn(command, {
      cwd: repo,
      stdin: "inherit",
      stdout: "inherit",
      stderr: "inherit",
    });
    process.on("SIGINT", () => child.kill("SIGINT"));
    process.on("SIGTERM", () => child.kill("SIGTERM"));
    process.exitCode = await child.exited;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
