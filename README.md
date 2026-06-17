# long lost forgotten

Personal blog. Astro 6 + TinaCMS + Cloudflare Pages.

## Stack

- **Framework**: Astro 6 (static output)
- **CMS**: TinaCMS (git-backed, local dev via `tinacms dev`)
- **Hosting**: Cloudflare Pages
- **Fonts**: IBM Plex Sans + IBM Plex Mono via Bunny Fonts
- **Palette**: Catppuccin Mocha

## Local dev

```bash
npm install

# With TinaCMS (full editing UI at /admin)
npm run tina:dev

# Astro only (no CMS)
npm run dev
```

## TinaCMS setup

1. Create a project at https://app.tina.io
2. Copy .env.example to .env
3. Fill in TINA_CLIENT_ID and TINA_TOKEN
4. Add the same vars to your Cloudflare Pages environment settings

## Cloudflare Pages deployment

- Build command: npm run tina:build
- Build output directory: dist
- Node version: 22

## Content

Posts live in src/content/posts/ as Markdown files. Frontmatter fields:

  title: post title
  date: 'YYYY-MM-DD'
  excerpt: one-line summary shown in the post list
  tags:
    - tag
  draft: false
