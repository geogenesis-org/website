import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    category: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
    order: z.number().default(0),
  }),
});

const interviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/interviews' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    guest: z.string(),
    role: z.string(),
    field: z.string(),
    location: z.string(),
    publishedAt: z.coerce.date(),
    readTime: z.string(),
    quote: z.string(),
    palette: z.enum(['sage', 'rust', 'blue']).default('sage'),
    initials: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    author: z.string(),
    publishedAt: z.coerce.date(),
    readTime: z.string(),
    accent: z.enum(['moss', 'clay', 'ocean']).default('moss'),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = {
  docs,
  interviews,
  news,
};
