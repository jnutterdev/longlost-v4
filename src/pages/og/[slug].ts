import { existsSync } from 'node:fs';
import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const posts = await getCollection('posts', p => !p.data.draft);
const pages = Object.fromEntries(posts.map(p => [p.id, p.data]));

// When public/images/og-frame.png exists, it's used as the card background.
// The frame should be 1200×630px. The title/description start at y≈80px,
// so keep the top ~70px clear of content and put any bottom decoration below y≈450px.
const FRAME_PATH = './public/images/og-frame.png';
const hasFrame = existsSync(FRAME_PATH);

function buildDescription(page: { excerpt?: string; tag?: string | string[] }): string {
  const excerpt = page.excerpt ?? 'longlostforgotten.com · a personal log';
  const tags = page.tag
    ? (Array.isArray(page.tag) ? page.tag : [page.tag])
    : [];
  return tags.length ? `${excerpt}\n\n· ${tags.join('  · ')}` : excerpt;
}

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'slug',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: buildDescription(page),
    bgGradient: [[30, 30, 46]],
    ...(hasFrame ? { bgImage: { path: FRAME_PATH, fit: 'cover' } } : {}),
    // Border is only visible when there's no frame (bgImage paints over it in draw order)
    ...(!hasFrame ? { border: { color: [203, 166, 247] as [number, number, number], width: 6, side: 'inline-start' as const } } : {}),
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
