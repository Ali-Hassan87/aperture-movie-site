import { tmdb } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

export const revalidate = 3600;

export default async function GenrePage({ params }) {
  const [genreList, movies] = await Promise.all([
    tmdb.genres(),
    tmdb.byGenre(params.id, 1),
  ]);

  const genreName = genreList?.genres?.find((g) => String(g.id) === params.id)?.name || "Films";

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-12 pb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-ochre" />
        <h1 className="font-display text-3xl text-ink">{genreName}</h1>
      </div>

      <MovieGrid
        initialMovies={movies.results}
        totalPages={movies.total_pages}
        fetchUrl={`/api/genre/${params.id}`}
      />
    </div>
  );
}
