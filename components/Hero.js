"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { tmdbImage } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";
import RatingBadge from "@/components/RatingBadge";
import SaveButton from "@/components/SaveButton";

export default function Hero({ movie }) {
  const shouldReduceMotion = useReducedMotion();
  if (!movie) return null;

  const backdrop = tmdbImage(movie.backdrop_path, "original");
  const anim = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <section className="border-b border-line bg-paper-soft">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-14 pb-10">
        <motion.div {...anim} className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-2 relative">
            <p className="flex items-center gap-2 text-xs text-ochre-deep mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-ochre" /> This week's cover story
            </p>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] text-ink text-balance">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 mt-5">
              <RatingBadge value={movie.vote_average} size="lg" />
              <span className="text-sm text-ink-faint">{formatYear(movie.release_date)}</span>
            </div>
            <p className="mt-5 text-ink-dim leading-relaxed line-clamp-4">{movie.overview}</p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link
                href={`/movie/${movie.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-cobalt text-paper font-semibold px-6 py-3 text-sm hover:bg-cobalt-bright transition-colors"
              >
                Read the full profile
              </Link>
              <SaveButton movieId={movie.id} variant="button" />
            </div>
          </div>

          <div className="lg:col-span-3 relative">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-line shadow-lift">
              {backdrop && (
                <Image src={backdrop} alt={`${movie.title} still`} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
