import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    publishedAt: z.coerce.date(),
    order: z.number().default(0),
    image: z.string().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    eventDate: z.coerce.date(),
    eventTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/)
      .optional(),
    location: z.string(),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string(),
    category: z.string(),
    image: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    eyebrow: z.string(),
    image: z.string().optional(),
    highlights: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = {
  docs,
  events,
  news,
  pages,
};
