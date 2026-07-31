// @ts-check
import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';

const deployTarget = process.env.ASTRO_DEPLOY_TARGET;

const adapter = deployTarget === 'cloudflare' ? cloudflare() : undefined;

export default defineConfig({
  ...(adapter ? { adapter } : {}),
});
