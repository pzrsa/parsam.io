# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**

```bash
bun run dev
```

**Build for production:**

```bash
bun run build
```

**Preview production build:**

```bash
bun run preview
```

**Package manager:** Use `bun` for installing dependencies (bun.lock present)

## Architecture Overview

This is an Astro 5.9.0 static site generator project for a personal website/blog with the following key architectural patterns:

**Content-First Architecture:**

- Blog posts are stored as Markdown files in `/src/data/blog/` with frontmatter metadata
- Three content collections: blog, albums, filmsShows (configured in `/src/content.config.ts`)
- Favorites data (albums/films) stored in `/src/data/favourites.json`

**Component Structure:**

- `/src/components/Layout.astro` - Main layout with SEO, meta tags, and page structure
- `/src/components/Prose.astro` - Typography wrapper for content
- `/src/components/NowPlaying.astro` - Server-side rendered Spotify integration
- `/src/pages/` - File-based routing with dynamic blog post routes

**API Integration:**

- Spotify "Now Playing" API at `/src/pages/api/now-playing.ts`
- Uses environment variables for API credentials
- Real-time music status display

## Tech Stack

- **Framework:** Astro 5.9.0 with TypeScript (strict mode)
- **Styling:** TailwindCSS 4.1.8 with typography plugin
- **Deployment:** Vercel with edge middleware and web analytics
- **Content:** Markdown with frontmatter, Astro content collections

## Key Development Patterns

**Content Management:**

- Blog posts use slug-based URLs derived from filenames
- All content goes through Astro's content collections API
- RSS feed auto-generated from blog posts

**Styling Approach:**

- Custom TailwindCSS theme with Google/Tesla brand colors
- Global styles in `/src/styles/global.css`
- Prose styling handled by typography plugin

**SEO & Performance:**

- Comprehensive meta tags and Open Graph support in Layout component
- Custom OG image generation for blog posts
- Image optimization configured for external domains (Spotify, TMDB)

## Important File Locations

- Content config: `/src/content.config.ts`
- Blog posts: `/src/data/blog/*.md`
- Favorites data: `/src/data/favourites.json`
- Main layout: `/src/components/Layout.astro`
- Global styles: `/src/styles/global.css`
- Astro config: `/astro.config.ts`

## Notes

- No testing framework currently configured
- Uses Prettier with Astro plugin for code formatting
- Site URL: https://parsam.io
- Spotify integration requires SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables
