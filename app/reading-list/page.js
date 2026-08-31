"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { useReadingList } from "@/lib/useReadingList";
import MovieCard from "@/components/MovieCard";

export default function ReadingListPage() {
  const { ids } = useReadingList();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ids.length === 0) {
      setMovies([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/movies/batch?ids=${ids.join(",")}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .finally(() => setLoading(false));
  }, [ids]);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-12 pb-20">
      <div className="flex items-center gap-3 mb-2">
        <Bookmark size={18} className="text-cobalt" />
        <h1 className="font-display text-3xl text-ink">Your reading list</h1>
      </div>
      <p className="text-sm text-ink-faint mb-8">
        Saved on this device — tap the bookmark on any film to add or remove it.
      </p>

      {loading && <p className="text-ink-faint py-10">Loading your list...</p>}

      {!loading && movies.length === 0 && (
        <p className="text-ink-faint py-16 text-center max-w-md mx-auto">
          Nothing saved yet. Browse the front page and tap the bookmark icon
          on any film to keep it here.
        </p>
      )}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
