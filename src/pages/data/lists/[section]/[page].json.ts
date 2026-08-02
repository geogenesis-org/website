import type { APIRoute } from 'astro';
import {
  getContentListing,
  LIST_PAGE_SIZE,
  type ContentListItem,
  type ListingSection,
} from '../../../../utils/contentListing';

interface PageProps {
  items: ContentListItem[];
}

export const prerender = true;

export async function getStaticPaths() {
  const sections: ListingSection[] = ['docs', 'interviews', 'news'];
  const paths = [];

  for (const section of sections) {
    const items = await getContentListing(section);
    const totalPages = Math.ceil(items.length / LIST_PAGE_SIZE);

    for (let page = 2; page <= totalPages; page += 1) {
      const start = (page - 1) * LIST_PAGE_SIZE;
      paths.push({
        params: { section, page: String(page) },
        props: { items: items.slice(start, start + LIST_PAGE_SIZE) },
      });
    }
  }

  return paths;
}

export const GET: APIRoute = ({ props }) => {
  const { items } = props as PageProps;
  return new Response(JSON.stringify({ items }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
