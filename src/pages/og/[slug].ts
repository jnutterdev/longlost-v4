import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderCard } from '../../../scripts/og-card/render-card.mjs';

function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts', (p) => !p.data.draft);
  return posts.map((post) => ({ params: { slug: `${post.id}.png` }, props: { post } }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  const tags = post.data.tag ? (Array.isArray(post.data.tag) ? post.data.tag : [post.data.tag]) : [];

  const png = await renderCard({
    title: post.data.title,
    excerpt: post.data.excerpt,
    tags,
    date: fmtDate(post.data.date),
  });

  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
