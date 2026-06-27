import type { DocEntry } from './content';

export interface DocGroup {
  category: string;
  entries: DocEntry[];
}

export function groupDocsByCategory(entries: DocEntry[]): DocGroup[] {
  const groups = new Map<string, DocEntry[]>();

  for (const entry of entries) {
    const list = groups.get(entry.data.category) ?? [];
    list.push(entry);
    groups.set(entry.data.category, list);
  }

  return [...groups.entries()].map(([category, categoryEntries]) => ({
    category,
    entries: categoryEntries.sort(
      (left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
    ),
  }));
}

export interface DocHeading {
  depth: number;
  slug: string;
  text: string;
}

export function filterDocHeadings(headings: DocHeading[], maxDepth = 3) {
  return headings.filter((heading) => heading.depth >= 2 && heading.depth <= maxDepth);
}
