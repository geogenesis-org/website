import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

import { formatReadingTime } from './format';

export type DocEntry = CollectionEntry<'docs'>;
export type EventEntry = CollectionEntry<'events'>;
export type NewsEntry = CollectionEntry<'news'>;
export type PageEntry = CollectionEntry<'pages'>;
export type SingletonPageId = 'about';

export function estimateReadingTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getReadingTimeLabel(body: string) {
  return formatReadingTime(estimateReadingTime(body));
}

export async function getDocEntries() {
  const entries = await getCollection('docs');
  return entries.sort((left, right) => {
    const orderDiff = left.data.order - right.data.order;
    if (orderDiff !== 0) return orderDiff;
    return right.data.publishedAt.getTime() - left.data.publishedAt.getTime();
  });
}

export async function getEventEntries() {
  const entries = await getCollection('events');
  return entries.sort((left, right) => {
    const dateDiff = left.data.eventDate.getTime() - right.data.eventDate.getTime();
    return dateDiff !== 0 ? dateDiff : left.data.order - right.data.order;
  });
}

export async function getNewsEntries() {
  const entries = await getCollection('news');
  return entries.sort((left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime());
}

export async function getPageEntry(id: SingletonPageId) {
  const entry = await getEntry('pages', id);
  if (!entry) {
    throw new Error(`Missing singleton page content for ${id}`);
  }
  return entry;
}
