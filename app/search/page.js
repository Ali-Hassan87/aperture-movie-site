import { tmdb } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

export const revalidate = 0;

export async function generateMetadata({ searchParams }) {
  const q = searchParams?.q || "";
  return { title: q ? `"${q}" — Aperture` : "Search — Aperture" };
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q?.trim() || "";
  const data = query ? await tmdb.search(query, 1) : { results: [], total_pages: 0 };

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-12 pb-20">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-ochre" />
        <h1 className="font-display text-3xl text-ink">
          {query ? `Results for "${query}"` : "Search"}
        </h1>
      </div>
      <p className="text-sm text-ink-faint mb-8">
        {query
          ? `${data.total_results ?? data.results?.length ?? 0} films found`
          : "Use the search bar above to find a film."}
      </p>

      {query && (
        <MovieGrid
          initialMovies={data.results}
          totalPages={data.total_pages}
          fetchUrl={`/api/search?q=${encodeURIComponent(query)}`}
        />
      )}
    </div>
  );
}
