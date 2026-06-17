# long lost forgotten

Personal blog. Astro 6 + TinaCMS + Cloudflare Pages.

## Stack

- **Framework**: Astro 6 (static output)
- **CMS**: TinaCMS (git-backed, local dev via `tinacms dev`)
- **Hosting**: Cloudflare Pages
- **Fonts**: IBM Plex Sans + IBM Plex Mono via Bunny Fonts
- **Palette**: Catppuccin Mocha
- **React**: @astrojs/react + React 19 (used for TinaCMS inline editing on the about page)

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

- Build command: `npm run tina:build`
- Build output directory: `dist`
- Node version: 22

## Pages

| Route | Description |
|---|---|
| `/` | Home — tagline, 5 most recent posts, link to archive |
| `/archive` | Full post archive grouped by year |
| `/about` | TinaCMS-managed about page |
| `/posts/[slug]` | Individual post page |

## Components

- **`PostCard.astro`** — renders a post in the recent posts list (date, title, excerpt, tags)
- **`SectionLabel.astro`** — monospace section divider label
- **`AboutEditor.tsx`** — React component for the about page; wraps TinaCMS inline editor

## TinaCMS collections

### posts

Blog posts stored as Markdown in `src/content/posts/`. Frontmatter fields:

```yaml
title: post title          # required
date: 'YYYY-MM-DD'         # required
excerpt: one-line summary  # optional, shown in post list
tags:
  - tag                    # optional; first tag shown in archive row
draft: false               # optional, defaults false — drafts are hidden from all listings
```

### about

About page data stored as JSON in `src/content/about.json`. Fields managed via TinaCMS:

- `avatar` — profile image (stored in `public/images/`)
- `avatarAlt` — alt text for the profile image
- `name` — display name
- `handle` — monospace handle shown under the name
- `location` — location string
- `bio` — rich-text bio
- `links` — list of `{ label, url }` pairs shown as footer links

## Media

TinaCMS media is stored in `public/images/` and referenced as `/images/<filename>`.
