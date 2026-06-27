// @ts-check
import cloudflare from '@astrojs/cloudflare';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import icon from '@twodft/astro-icon';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const deployTarget = process.env.ASTRO_DEPLOY_TARGET;

const adapter =
  deployTarget === 'vercel'
    ? vercel()
    : deployTarget === 'cloudflare'
      ? cloudflare({
          imageService: 'compile',
          prerenderEnvironment: 'node',
        })
      : undefined;

export default defineConfig({
  ...(adapter ? { adapter } : {}),
  integrations: [
    react(),
    icon({
      include: {
        mdi: ['email-outline'],
        'simple-icons': ['github', 'wechat', 'bilibili'],
      },
    }),
  ],
  vite: {
    plugins: /** @type {import('vite').PluginOption[]} */ ([tailwindcss()]),
  },
});
