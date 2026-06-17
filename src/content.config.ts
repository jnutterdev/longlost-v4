import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.union([z.string(), z.date()]).transform(d => d instanceof Date ? d.toISOString() : d),
    excerpt: z.string().optional(),
    tag: z.string().optional(),
    readTime: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    discussionUrl: z.string().optional(),
  }),
});

export const collections = { posts };
