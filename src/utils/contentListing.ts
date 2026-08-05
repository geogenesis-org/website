import { getCollection, type CollectionEntry } from 'astro:content';
import { formatContentDate } from './content';
import { getInterviewIdentity } from './interviews';
import { sitePath } from './paths';

export const LIST_PAGE_SIZE = 6;

export type ListingSection = 'docs' | 'interviews' | 'news';
export type ListingVisual = 'documents' | 'interviews' | 'news';
export type ListingTone = 'light' | 'mid' | 'dark';

export const collectionReturnStateKey = (section: ListingSection) =>
  `geogenesis-${section}-return-state`;

export interface ContentListItem {
  href: string;
  title: string;
  summary?: string;
  publishedAt: string;
  publishedLabel: string;
  readTime: string;
  tone: ListingTone;
  visual: ListingVisual;
}

const withDate = (publishedAt: Date) => ({
  publishedAt: publishedAt.toISOString(),
  publishedLabel: formatContentDate(publishedAt),
});

export function createDocsListing(entries: CollectionEntry<'docs'>[]): ContentListItem[] {
  return entries
    .filter((item) => item.id.endsWith('/index') || !item.id.includes('/'))
    .sort((a, b) => a.data.order - b.data.order)
    .map((item) => ({
      href: sitePath(`/docs/${item.id.replace(/\/index$/, '')}/`),
      title: item.data.title,
      summary: item.data.summary,
      ...withDate(item.data.publishedAt),
      readTime: item.data.readTime,
      tone: item.data.tone,
      visual: 'documents',
    }));
}

export function createInterviewsListing(
  entries: CollectionEntry<'interviews'>[],
): ContentListItem[] {
  return entries
    .sort((a, b) => a.data.order - b.data.order)
    .map((item) => {
      const identity = getInterviewIdentity(item.data);
      return {
        href: sitePath(`/interviews/${item.id}/`),
        title: item.data.title,
        summary: `${identity.name} ${identity.affiliation}`,
        ...withDate(item.data.publishedAt),
        readTime: item.data.readTime,
        tone: item.data.tone,
        visual: 'interviews',
      };
    });
}

export function createNewsListing(entries: CollectionEntry<'news'>[]): ContentListItem[] {
  return entries
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
    .map((item) => ({
      href: sitePath(`/news/${item.id}/`),
      title: item.data.title,
      summary: item.data.summary,
      ...withDate(item.data.publishedAt),
      readTime: item.data.readTime,
      tone: item.data.tone,
      visual: 'news',
    }));
}

export async function getContentListing(section: ListingSection): Promise<ContentListItem[]> {
  if (section === 'docs') return createDocsListing(await getCollection('docs'));
  if (section === 'interviews') return createInterviewsListing(await getCollection('interviews'));
  return createNewsListing(await getCollection('news'));
}
