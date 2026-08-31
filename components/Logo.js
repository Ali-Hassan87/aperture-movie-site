import Link from "next/link";

/**
 * Wordmark logo: a small camera-aperture iris beside the "Aperture" name,
 * set in the display serif to read as a masthead rather than an app icon.
 */
export default function Logo({ className = "" }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label="Aperture — home"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="12" cy="12" r="10.5" stroke="#1D3E8C" strokeWidth="1.3" />
        <path
          d="M12 5.2 L16.6 8 L16.6 16 L12 18.8 L7.4 16 L7.4 8 Z"
          stroke="#D98E2B"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.1" fill="#1D3E8C" />
      </svg>
      <span className="font-display text-xl tracking-tight text-ink group-hover:text-cobalt transition-colors duration-300">
        Aperture
      </span>
    </Link>
  );
}
