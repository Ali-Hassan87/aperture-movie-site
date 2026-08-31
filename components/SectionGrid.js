import Link from "next/link";
import Image from "next/image";
import { tmdbImage } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";
import RatingBadge from "@/components/RatingBadge";
import SaveButton from "@/components/SaveButton";
import MovieCard from "@/components/MovieCard";
import Reveal from "@/components/Reveal";

/**
 * Renders a magazine-style section: a small aperture-dot marker + rule for
 * the header, a large lead story card, and a supporting grid of standard
 * cards — an asymmetric layout instead of a uniform scrolling shelf.
 */
export default function SectionGrid({ title, subtitle, movies, viewAllHref }) {
  if (!movies?.length) return null;
  const [lead, ...rest] = movies;
  const supporting = rest.slice(0, 5);

  return (
    <section className="py-10 sm:py-14 border-t border-line first:border-t-0">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex items-end justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-ochre" aria-hidden="true" />
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-ink">{title}</h2>
              {subtitle && <p className="text-sm text-ink-faint mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {viewAllHref && (
            <Link href={viewAllHref} className="ink-link hidden sm:inline text-sm text-cobalt shrink-0">
              View all
            </Link>
          )}
        </Reveal>

        <Reveal className="grid grid-cols-1 lg:grid-cols-3 gap-6" delay={0.05}>
          <Link
            href={`/movie/${lead.id}`}
            className="group relative lg:col-span-2 lg:row-span-1 block rounded-xl overflow-hidden bg-white border border-line hover:shadow-lift transition-shadow duration-300"
          >
            <SaveButton movieId={lead.id} />
            <div className="grid sm:grid-cols-2">
              <div className="relative aspect-[16/10] sm:aspect-auto sm:h-full bg-paper overflow-hidden">
                {(lead.backdrop_path || lead.poster_path) && (
                  <Image
                    src={tmdbImage(lead.backdrop_path || lead.poster_path, "w780")}
                    alt={`${lead.title} still`}
                    fill
                    sizes="(max-width: 640px) 100vw, 45vw"
                    className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.02]"
                  />
                )}
              </div>
              <div className="p-6 flex flex-col justify-center">
                <p className="text-xs text-ochre-deep mb-2">Featured</p>
                <h3 className="font-display text-2xl text-ink leading-snug ink-link">{lead.title}</h3>
                <p className="text-sm text-ink-dim mt-3 line-clamp-3 leading-relaxed">{lead.overview}</p>
                <div className="flex items-center gap-4 mt-4">
                  <RatingBadge value={lead.vote_average} />
                  <span className="text-xs text-ink-faint">{formatYear(lead.release_date)}</span>
                </div>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {supporting.slice(0, 2).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </Reveal>

        {supporting.length > 2 && (
          <Reveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6" delay={0.08}>
            {supporting.slice(2).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
