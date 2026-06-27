import type { DocEntry } from './content';

export interface DocHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface ParsedDocPath {
  docSlug: string;
  pageSlug: string;
  entryId: string;
}

export interface DocSet {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: Date;
  order: number;
  pages: DocEntry[];
}

export function parseDocPath(entryId: string): ParsedDocPath {
  const slashIndex = entryId.indexOf('/');

  if (slashIndex === -1) {
    return { docSlug: entryId, pageSlug: 'index', entryId };
  }

  return {
    docSlug: entryId.slice(0, slashIndex),
    pageSlug: entryId.slice(slashIndex + 1),
    entryId,
  };
}

export function getDocPageHref(docSlug: string, pageSlug: string): string {
  if (pageSlug === 'index') {
    return `/docs/${docSlug}/`;
  }

  return `/docs/${docSlug}/${pageSlug}/`;
}

export function buildDocSets(entries: DocEntry[]): DocSet[] {
  const pagesByDoc = new Map<string, DocEntry[]>();

  for (const entry of entries) {
    const { docSlug } = parseDocPath(entry.id);
    const pages = pagesByDoc.get(docSlug) ?? [];
    pages.push(entry);
    pagesByDoc.set(docSlug, pages);
  }

  return [...pagesByDoc.entries()]
    .map(([slug, pages]) => {
      const sortedPages = pages.sort((left, right) => {
        const orderDiff = left.data.order - right.data.order;
        return orderDiff !== 0 ? orderDiff : left.data.title.localeCompare(right.data.title, 'zh-CN');
      });

      const indexPage =
        sortedPages.find((page) => parseDocPath(page.id).pageSlug === 'index') ?? sortedPages[0];

      return {
        slug,
        title: indexPage.data.title,
        summary: indexPage.data.summary ?? '',
        category: indexPage.data.category ?? '未分类',
        publishedAt: indexPage.data.publishedAt ?? new Date(0),
        order: indexPage.data.order,
        pages: sortedPages,
      };
    })
    .sort((left, right) => {
      const orderDiff = left.order - right.order;
      return orderDiff !== 0 ? orderDiff : right.publishedAt.getTime() - left.publishedAt.getTime();
    });
}

export function findDocSet(docSets: DocSet[], slug: string): DocSet | undefined {
  return docSets.find((docSet) => docSet.slug === slug);
}

export function filterDocHeadings(headings: DocHeading[], maxDepth = 3) {
  return headings.filter((heading) => heading.depth >= 2 && heading.depth <= maxDepth);
}

export function getCurrentPageIndex(docSet: DocSet, entryId: string): number {
  return docSet.pages.findIndex((page) => page.id === entryId);
}
