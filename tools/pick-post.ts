import { emitKeypressEvents, type Key } from "node:readline";

// A small scrolling picker using only Bun's built-in terminal support.
export async function pickPost<T extends { label: string }>(
  posts: T[],
  initialQuery = "",
): Promise<T | undefined> {
  const { stdin, stdout } = process;
  if (!stdin.isTTY || !stdout.isTTY)
    throw new Error(
      "Run bun run publish in a terminal to choose a post, or provide its exact slug or Linear URL.",
    );

  let query = initialQuery.replace(/[\x00-\x1f\x7f]/g, " ");
  let selected = 0;
  let first = 0;
  let matches = posts;
  const wasRaw = stdin.isRaw;
  const { promise, resolve: finish } = Promise.withResolvers<T | undefined>();
  const cancel = () => finish(undefined);

  function render() {
    matches = posts.filter((post) =>
      post.label.toLowerCase().includes(query.toLowerCase()),
    );
    selected = Math.max(0, Math.min(selected, matches.length - 1));
    const height = Math.max(1, Math.min(12, (stdout.rows || 24) - 5));
    first = Math.max(0, Math.min(first, matches.length - height, selected));
    if (selected >= first + height) first = selected - height + 1;

    const width = Math.max(1, (stdout.columns || 80) - 1);
    const lines = [
      "Unpublished first · newest publication dates first",
      "Type to filter · ↑/↓ scroll · Enter copy · Esc cancel",
      `Post > ${query}`,
      ...matches.slice(first, first + height).map((post, index) => {
        const active = first + index === selected;
        const text = `${active ? ">" : " "} ${post.label}`;
        return active ? `\x1b[7m${text}\x1b[0m` : text;
      }),
      matches.length
        ? `${selected + 1} of ${matches.length} posts`
        : "No matching posts. Edit your search to continue.",
    ];
    stdout.write(
      "\x1b[H\x1b[2J" +
        lines.map((line) => Bun.sliceAnsi(line, 0, width)).join("\r\n"),
    );
  }

  function onKey(text: string, key: Key) {
    if (key.name === "escape" || (key.ctrl && key.name === "c"))
      return cancel();
    if (key.name === "return") {
      if (matches[selected]) finish(matches[selected]);
      return;
    }
    if (key.name === "up") selected--;
    else if (key.name === "down") selected++;
    else {
      const printable =
        text && !key.ctrl && !key.meta && !/[\x00-\x1f\x7f]/.test(text);
      if (key.name === "backspace") query = [...query].slice(0, -1).join("");
      else if (key.ctrl && key.name === "u") query = "";
      else if (printable) query += text;
      else return;
      selected = first = 0;
    }
    render();
  }

  try {
    // Allow a short wait for arrow-key sequences without delaying plain Esc.
    // @ts-expect-error Readline accepts timeout options; its types require a full Interface.
    emitKeypressEvents(stdin, { escapeCodeTimeout: 30 });
    stdin.setRawMode(true);
    stdin.on("keypress", onKey);
    stdout.on("resize", render);
    process.on("SIGINT", cancel);
    process.on("SIGTERM", cancel);
    stdout.write("\x1b[?1049h\x1b[?25l");
    stdin.resume();
    render();
    return await promise;
  } finally {
    stdin.off("keypress", onKey);
    stdout.off("resize", render);
    process.off("SIGINT", cancel);
    process.off("SIGTERM", cancel);
    stdin.setRawMode(wasRaw);
    stdin.pause();
    stdout.write("\x1b[?25h\x1b[?1049l");
  }
}
