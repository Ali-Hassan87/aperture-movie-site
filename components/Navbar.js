"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Bookmark } from "lucide-react";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";

const LINKS = [
  { href: "/", label: "Front page" },
  { href: "/genre/18", label: "Drama" },
  { href: "/genre/35", label: "Comedy" },
  { href: "/genre/878", label: "Sci-Fi" },
  { href: "/genre/99", label: "Documentary" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-paper-soft/95 backdrop-blur-sm border-b border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="h-16 flex items-center justify-between gap-6">
          <Logo />

          <nav className="hidden lg:flex items-center gap-7" aria-label="Genres">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="ink-link text-sm text-ink-dim hover:text-cobalt transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="w-64 lg:w-72">
              <SearchBar />
            </div>
            <Link
              href="/reading-list"
              className="flex items-center gap-1.5 text-sm text-ink-dim hover:text-cobalt transition-colors shrink-0"
            >
              <Bookmark size={16} /> Reading list
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-paper-soft px-5 pb-6 pt-4 space-y-5">
          <SearchBar />
          <nav className="flex flex-col gap-4" aria-label="Genres">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-base text-ink-dim hover:text-cobalt transition-colors">
                {link.label}
              </Link>
            ))}
            <Link href="/reading-list" className="flex items-center gap-1.5 text-base text-ink-dim hover:text-cobalt transition-colors">
              <Bookmark size={16} /> Reading list
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
