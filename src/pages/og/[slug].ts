import { existsSync } from 'node:fs';
import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const posts = await getCollection('posts', p => !p.data.draft);
const pages = Object.fromEntries(posts.map(p => [p.id, p.data]));

// When src/assets/og-frame.png exists, it's used as the card background.
// The frame should be 1200×630px and include the header labels
// ("longlostforgotten.com" top-left, "TRANSMISSION_LOG" top-right)
// with the title/description area clear below ~70px from the top.
const hasFrame = existsSync('./src/assets/og-frame.png');

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'slug',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.excerpt ?? 'longlostforgotten.com · a personal log',
    bgGradient: [[30, 30, 46]],
    ...(hasFrame ? { bgImage: { path: './src/assets/og-frame.png', fit: 'cover' } } : {}),
    border: {
      color: [203, 166, 247],
      width: 6,
      side: 'inline-start',
    },
    padding: hasFrame ? 80 : 60,
    font: {
      title: {
        color: [205, 214, 244],
        size: 60,
        families: ['IBM Plex Sans'],
        weight: 'Bold',
        lineHeight: 1.25,
      },
      description: {
        color: [166, 173, 200],
        size: 22,
        families: ['IBM Plex Sans'],
        weight: 'Normal',
        lineHeight: 1.6,
      },
    },
    fonts: [
      './node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff',
      './node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-700-normal.woff',
    ],
  }),
});
