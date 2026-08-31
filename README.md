# Aperture

A bright, editorial film magazine built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion, powered by the TMDB API.

## Design

- **Palette** — cool paper (`#EFF1EC`), ink black-blue text, cobalt (`#1D3E8C`), ochre accent (`#D98E2B`).
- **Type** — Newsreader (display serif, editorial) paired with Work Sans (UI/body).
- **Motion** — a single hero entrance, scroll-triggered section reveals, underline-draw link hovers. Everything respects `prefers-reduced-motion`.
- **Layout** — an asymmetric magazine grid (one lead story + a supporting grid) instead of horizontal scroll shelves, so it reads like a print spread rather than a streaming app.
- **Signature feature** — a personal "reading list" (bookmark icon on every card), saved to `localStorage`, with its own page at `/reading-list` backed by a batch-details API route.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in your TMDB credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

```
TMDB_API_KEY=              # v3 API key (kept for completeness; not required if using the token below)
TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
API_ACCESS_TOKEN=          # TMDB v4 read access token — used as the Bearer token server-side
```

`API_ACCESS_TOKEN` never reaches the browser — all TMDB calls happen in server components (`lib/tmdb.js`) or in route handlers under `app/api/`.

## Project structure

```
app/
  page.js                  Home — cover-story hero + editorial section grids
  movie/[id]/page.js       Movie profile — cast, trailer, similar titles
  search/page.js           Search results
  genre/[id]/page.js       Genre browse with "Load more"
  reading-list/page.js     Saved films (client-side, localStorage-backed)
  api/
    search/route.js        Autocomplete + search backend
    genre/[id]/route.js    Paginated genre browse backend
    movie/[id]/similar/route.js
    movies/batch/route.js  Resolves saved IDs into full movie objects
components/                 Navbar, Hero, SectionGrid, MovieCard, SaveButton, ...
lib/
  tmdb.js                  Server-only TMDB data layer
  utils.js                 Formatting helpers
  useReadingList.js        Client hook for the localStorage reading list
```

## Deploying

Deploys cleanly to Vercel. Set the four environment variables above in the
project's Vercel settings before the first deploy.
