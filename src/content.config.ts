import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 内容 schema —— 客户端与博客的耦合契约（docs/schema.md 同源）
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().default(''),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      publishAt: z.coerce.date(),
      draft: z.boolean().default(false),
      slug: z.string().optional()
    })
});

export const collections = { posts };