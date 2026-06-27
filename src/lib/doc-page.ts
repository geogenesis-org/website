import { render } from 'astro:content';

import { getReadingTimeLabel, type DocEntry } from './content';
import { filterDocHeadings, parseDocPath, type DocSet } from './docs';
import { formatLongDate } from './format';

export async function prepareDocPage(entry: DocEntry, docSet: DocSet) {
  const { Content, headings } = await render(entry);
  const { pageSlug } = parseDocPath(entry.id);

  return {
    Content,
    tocHeadings: filterDocHeadings(headings),
    pageTitle: pageSlug === 'index' ? docSet.title : entry.data.title,
    docMeta: [
      { label: '分类', value: docSet.category },
      { label: '发布', value: formatLongDate(docSet.publishedAt) },
      { label: '页数', value: `${docSet.pages.length} 页` },
      { label: '本页阅读', value: getReadingTimeLabel(entry.body ?? '') },
    ],
  };
}
