// Explicit captions are italic paragraphs immediately after an image or video.
// Older posts also use image alt text as a caption; keep that convention working.
export default function remarkMediaCaptions() {
  const processor = this;
  return (tree, file) => {
    const src = String(file.value);
    const visit = (node) => {
      if (!node.children) return;
      node.children.forEach(visit);
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const img =
          child.type === "paragraph" &&
          child.children.length === 1 &&
          child.children[0].type === "image"
            ? child.children[0]
            : undefined;
        const video =
          child.type === "html" &&
          /^<video\b/.test(child.value.trim()) &&
          /<\/video>$/.test(child.value.trim());
        if (!img && !video) continue;

        const next = node.children[i + 1];
        const explicit =
          next?.type === "paragraph" &&
          next.children.length === 1 &&
          next.children[0].type === "emphasis"
            ? next.children[0].children
            : undefined;
        let caption = explicit;
        if (!caption && img?.alt && img.position) {
          const raw = src.slice(
            img.position.start.offset,
            img.position.end.offset,
          );
          let text = img.alt;
          for (let j = 1, depth = 0; j < raw.length; j++) {
            if (raw[j] === "[") depth++;
            else if (raw[j] === "]" && --depth === 0) {
              text = raw.slice(2, j);
              break;
            }
          }
          caption = processor.parse(text).children[0]?.children ?? [];
        }
        if (!caption) continue;
        node.children[i] = {
          type: "paragraph",
          data: { hName: "figure" },
          children: [
            img ?? child,
            {
              type: "paragraph",
              data: { hName: "figcaption" },
              children: caption,
            },
          ],
        };
        if (explicit) node.children.splice(i + 1, 1);
      }
    };
    visit(tree);
  };
}
