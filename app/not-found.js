import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
      <p className="font-display italic text-ochre-deep text-lg mb-3">Page not filed</p>
      <h1 className="font-display text-4xl sm:text-5xl text-ink mb-4">This story doesn't exist</h1>
      <p className="text-ink-faint max-w-md mb-8">
        The film you're looking for isn't in this issue. It may have been
        pulled, or the link may be out of date.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-cobalt text-paper font-semibold px-6 py-3 text-sm hover:bg-cobalt-bright transition-colors"
      >
        Back to the front page
      </Link>
    </div>
  );
}
