"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { tmdbImage } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";
import RatingBadge from "@/components/RatingBadge";
import SaveButton from "@/components/SaveButton";

export default function MovieCard({ movie, priority = false, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const poster = tmdbImage(movie.poster_path, "w342");

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative bg-white border border-line rounded-lg overflow-hidden hover:shadow-lift transition-shadow duration-300 ${className}`}
    >
      <SaveButton movieId={movie.id} />
      <Link href={`/movie/${movie.id}`} className="block focus-visible:outline-none">
        <div className="relative aspect-[2/3] bg-paper overflow-hidden">
          {poster ? (
            <Image
              src={poster}
              alt={`${movie.title} poster`}
              fill
              priority={priority}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 23vw, 220px"
              className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-ink-faint text-xs px-4 text-center">
              No poster available
            </div>
          )}
        </div>
        <div className="p-3.5">
          <h3 className="font-display text-base text-ink leading-snug line-clamp-1 ink-link">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-ink-faint">{formatYear(movie.release_date)}</span>
            <RatingBadge value={movie.vote_average} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
