import { z, defineCollection } from "astro:content";
import { glob } from 'astro/loaders';
import { createDirectoryCollection } from "@lib/loaders";
import { directorySchema } from "@validation/directory";

const directory = createDirectoryCollection();

const directoryZh = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/directory-zh" }),
  schema: ({ image }) => directorySchema(image())
});

const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/pages" }),
  schema: ({ image }) => z.object({
    image: image().optional(),
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/blog" }),
  schema: ({image}) => z.object({
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: image().optional(),
  }),
});

export const collections = {
  directory,
  directoryZh,
  pages,
  blog,
};
