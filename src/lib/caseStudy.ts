export type CaseStudyTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type CaseStudySection = {
  id: string;
  title: string;
  content: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getHeadingId(text: string, counts: Map<string, number>) {
  const base = slugify(text) || "section";
  const next = (counts.get(base) ?? 0) + 1;
  counts.set(base, next);
  return next === 1 ? base : `${base}-${next}`;
}

export function parseCaseStudy(markdown = "") {
  const counts = new Map<string, number>();
  const toc: CaseStudyTocItem[] = [];
  const sections: CaseStudySection[] = [];
  let current: { id: string; title: string; lines: string[] } | null = null;

  const pushCurrent = () => {
    if (!current) return;
    const content = current.lines.join("\n").trim();
    if (content) {
      sections.push({ id: current.id, title: current.title, content });
    }
  };

  for (const line of markdown.split("\n")) {
    if (/^#\s+/.test(line)) continue;

    const h2 = line.match(/^##\s+(.+)/);
    if (h2) {
      pushCurrent();
      const title = h2[1].trim();
      const id = getHeadingId(title, counts);
      toc.push({ id, text: title, level: 2 });
      current = { id, title, lines: [] };
      continue;
    }

    const h3 = line.match(/^###\s+(.+)/);
    if (h3 && current) {
      const title = h3[1].trim();
      const id = getHeadingId(title, counts);
      toc.push({ id, text: title, level: 3 });
      current.lines.push(line);
      continue;
    }

    if (current) current.lines.push(line);
  }

  pushCurrent();
  return { sections, toc };
}
