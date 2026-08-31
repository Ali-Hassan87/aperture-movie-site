import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-soft">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-ink-faint max-w-sm">
            Aperture reads film data from The Movie Database and frames it
            the way a good magazine would — one story at a time.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-ink-dim">
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="ink-link hover:text-cobalt transition-colors">
            Data by TMDB
          </a>
          <span className="text-line">·</span>
          <span>&copy; {new Date().getFullYear()} Aperture</span>
        </div>
      </div>
    </footer>
  );
}
