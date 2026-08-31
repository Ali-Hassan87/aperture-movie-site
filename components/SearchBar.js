"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Loader2 } from "lucide-react";
import { tmdbImage } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";

export default function SearchBar({ autoFocus = false }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults((data.results || []).slice(0, 6));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 320);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function submit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={submit} role="search">
        <label htmlFor="site-search" className="sr-only">Search movies</label>
        <div className="relative flex items-center">
          <Search size={15} className="absolute left-3.5 text-ink-faint pointer-events-none" />
          <input
            id="site-search"
            type="search"
            value={query}
            autoFocus={autoFocus}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search by title, actor, or era"
            className="w-full bg-white border border-line focus-visible:border-cobalt rounded-full pl-10 pr-9 py-2 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors"
          />
          {loading && <Loader2 size={14} className="absolute right-3.5 animate-spin text-cobalt" />}
        </div>
      </form>

      {open && query.trim() && (
        <div className="absolute mt-2 w-full rounded-lg border border-line bg-white shadow-lift overflow-hidden z-50">
          {results.length === 0 && !loading && (
            <p className="px-4 py-3 text-sm text-ink-faint">No films match &ldquo;{query}&rdquo;.</p>
          )}
          <ul>
            {results.map((movie) => (
              <li key={movie.id}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                    router.push(`/movie/${movie.id}`);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-paper text-left transition-colors"
                >
                  <div className="relative shrink-0 rounded overflow-hidden bg-paper" style={{ width: 36, height: 52 }}>
                    {movie.poster_path && (
                      <Image src={tmdbImage(movie.poster_path, "w92")} alt="" fill sizes="36px" className="object-cover" />
                    )}
                  </div>
                  <span className="min-w-0">
                    <span className="block text-sm text-ink truncate">{movie.title}</span>
                    <span className="block text-xs text-ink-faint">{formatYear(movie.release_date)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {results.length > 0 && (
            <button
              type="button"
              onClick={submit}
              className="w-full text-center text-xs text-cobalt hover:text-cobalt-bright py-2.5 border-t border-line"
            >
              See all results for &ldquo;{query}&rdquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
