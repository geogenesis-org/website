import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    publishedAt: z.coerce.date(),
    readTime: z.string(),
    tone: z.enum(['light', 'mid', 'dark']).default('mid'),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const interviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/interviews' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    guest: z.string().optional(),
    role: z.string().optional(),
    affiliation: z.string().optional(),
    anonymous: z.boolean().default(false),
    publishedAt: z.coerce.date(),
    readTime: z.string(),
    quote: z.string(),
    tone: z.enum(['light', 'mid', 'dark']).default('mid'),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    readTime: z.string(),
    tone: z.enum(['light', 'mid', 'dark']).default('mid'),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = {
  docs,
  interviews,
  news,
};
