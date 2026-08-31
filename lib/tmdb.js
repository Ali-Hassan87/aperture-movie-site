// Server-only TMDB data layer. Never import this from a "use client" file —
// it reads the private API_ACCESS_TOKEN and must not reach the browser bundle.

const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TOKEN = process.env.API_ACCESS_TOKEN;

/**
 * Low-level fetch wrapper around the TMDB v3 REST API, authenticated with the
 * v4 read-access bearer token. Uses Next.js's fetch cache with a sane default
 * revalidation window so pages stay fast without ever going fully stale.
 */
async function tmdbFetch(path, params = {}, revalidateSeconds = 3600) {
  if (!TOKEN) {
    throw new Error(
      "Missing API_ACCESS_TOKEN. Copy .env.local.example to .env.local and add your TMDB v4 access token."
    );
  }

  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
    next: { revalidate: revalidateSeconds },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`TMDB request failed (${res.status}) for ${path}: ${body}`);
  }

  return res.json();
}

export const tmdb = {
  trending: (window = "week") => tmdbFetch(`/trending/movie/${window}`),
  popular: (page = 1) => tmdbFetch("/movie/popular", { page }),
  topRated: (page = 1) => tmdbFetch("/movie/top_rated", { page }),
  upcoming: (page = 1) => tmdbFetch("/movie/upcoming", { page }),
  nowPlaying: (page = 1) => tmdbFetch("/movie/now_playing", { page }),
  genres: () => tmdbFetch("/genre/movie/list"),
  byGenre: (genreId, page = 1) =>
    tmdbFetch("/discover/movie", {
      with_genres: genreId,
      page,
      sort_by: "popularity.desc",
    }),
  search: (query, page = 1) =>
    query ? tmdbFetch("/search/movie", { query, page, include_adult: false }) : Promise.resolve({ results: [], total_pages: 0 }),
  details: (id) =>
    tmdbFetch(`/movie/${id}`, {
      append_to_response: "credits,videos,similar,release_dates",
    }),
};

/** Build a full TMDB image URL from a path and a size bucket. */
export function tmdbImage(path, size = "w500") {
  const base = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || "https://image.tmdb.org/t/p";
  if (!path) return null;
  return `${base}/${size}${path}`;
}
