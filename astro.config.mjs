// @ts-check
import { defineConfig } from 'astro/config';

const githubPagesBuild = process.env.GITHUB_PAGES === 'true';
const githubPages = {
  site: 'https://geogenesis-org.github.io',
  base: '/website',
};

export default defineConfig({
  ...(githubPagesBuild ? githubPages : {}),
});
