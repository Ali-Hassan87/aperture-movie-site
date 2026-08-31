import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Calendar } from "lucide-react";
import { tmdb, tmdbImage } from "@/lib/tmdb";
import { formatYear, formatRuntime, findTrailer, findCertification } from "@/lib/utils";
import SectionGrid from "@/components/SectionGrid";
import RatingBadge from "@/components/RatingBadge";
import TrailerButton from "@/components/TrailerButton";
import SaveButton from "@/components/SaveButton";
import Reveal from "@/components/Reveal";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  try {
    const movie = await tmdb.details(params.id);
    return {
      title: `${movie.title} — Aperture`,
      description: movie.overview?.slice(0, 155),
    };
  } catch {
    return { title: "Aperture" };
  }
}

export default async function MovieDetailPage({ params }) {
  let movie;
  try {
    movie = await tmdb.details(params.id);
  } catch {
    notFound();
  }

  const backdrop = tmdbImage(movie.backdrop_path, "original");
  const poster = tmdbImage(movie.poster_path, "w500");
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const trailerKey = findTrailer(movie.videos);
  const certification = findCertification(movie.release_dates);

  return (
    <div>
      <section className="border-b border-line bg-paper-soft">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-14 pb-12">
          <Reveal className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              {backdrop && (
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-line shadow-lift">
                  <Image src={backdrop} alt={`${movie.title} still`} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                </div>
              )}
            </div>

            <div className="lg:col-span-3">
              {movie.tagline && (
                <p className="text-ochre-deep italic font-display text-lg mb-2">{movie.tagline}</p>
              )}
              <h1 className="font-display text-3xl sm:text-5xl text-ink text-balance leading-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-sm text-ink-dim">
                <RatingBadge value={movie.vote_average} size="lg" />
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {formatYear(movie.release_date)}
                </span>
                {movie.runtime ? (
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {formatRuntime(movie.runtime)}
                  </span>
                ) : null}
                {certification && (
                  <span className="rounded border border-line px-2 py-0.5 text-xs">{certification}</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {movie.genres?.map((g) => (
                  <span key={g.id} className="rounded-full border border-line bg-white px-3 py-1 text-xs text-ink-dim">
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-ink-dim leading-relaxed max-w-2xl">{movie.overview}</p>

              {director && (
                <p className="mt-5 text-sm text-ink-faint">
                  Directed by <span className="text-ink">{director.name}</span>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-8">
                <TrailerButton youtubeKey={trailerKey} />
                <SaveButton movieId={movie.id} variant="button" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {cast.length > 0 && (
        <Reveal className="mx-auto max-w-7xl px-5 sm:px-8 py-12" delay={0.05}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ochre" />
            <h2 className="font-display text-2xl text-ink">Cast</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {cast.map((person) => (
              <div key={person.cast_id || person.credit_id}>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-paper border border-line">
                  {person.profile_path ? (
                    <Image src={tmdbImage(person.profile_path, "w185")} alt={person.name} fill sizes="120px" className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-ink-faint text-xs">—</div>
                  )}
                </div>
                <p className="mt-2 text-xs text-ink line-clamp-1">{person.name}</p>
                <p className="text-xs text-ink-faint line-clamp-1">{person.character}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      <SectionGrid title="More like this" movies={movie.similar?.results} />
    </div>
  );
}
