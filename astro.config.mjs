// @ts-check
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const githubPagesBuild = process.env.GITHUB_PAGES === 'true';
const githubPages = {
  site: 'https://geogenesis-org.github.io',
  base: '/website',
};

export default defineConfig({
  ...(githubPagesBuild ? githubPages : {}),
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  vite: {
    build: {
      // Keep Fontsource's CJK unicode-range files separate so browsers only
      // download the glyph slices used on the current page.
      assetsInlineLimit: 0,
    },
  },
});
