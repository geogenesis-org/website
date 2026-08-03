// @ts-check
import { defineConfig } from 'astro/config';

const githubPagesBuild = process.env.GITHUB_PAGES === 'true';
const githubPages = {
  site: 'https://geogenesis-org.github.io',
  base: '/website',
};

export default defineConfig({
  ...(githubPagesBuild ? githubPages : {}),
  vite: {
    build: {
      // Keep Fontsource's CJK unicode-range files separate so browsers only
      // download the glyph slices used on the current page.
      assetsInlineLimit: 0,
    },
  },
});
