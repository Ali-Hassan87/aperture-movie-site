import Hero from "@/components/Hero";
import SectionGrid from "@/components/SectionGrid";
import { tmdb } from "@/lib/tmdb";

export const revalidate = 3600;

export default async function HomePage() {
  const [trending, popular, topRated, upcoming, nowPlaying] = await Promise.all([
    tmdb.trending("week"),
    tmdb.popular(),
    tmdb.topRated(),
    tmdb.upcoming(),
    tmdb.nowPlaying(),
  ]);

  const heroMovie = trending?.results?.[0];

  return (
    <div>
      <Hero movie={heroMovie} />

      <SectionGrid
        title="In theaters"
        subtitle="Playing on the big screen this week"
        movies={nowPlaying?.results}
      />
      <SectionGrid
        title="Critically adored"
        subtitle="The highest rated films on record"
        movies={topRated?.results}
      />
      <SectionGrid
        title="Popular right now"
        subtitle="Widely watched, widely discussed"
        movies={popular?.results}
      />
      <SectionGrid
        title="Coming soon"
        subtitle="On its way to a screen near you"
        movies={upcoming?.results}
      />
    </div>
  );
}
