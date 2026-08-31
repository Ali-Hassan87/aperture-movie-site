"use client";

import { Bookmark } from "lucide-react";
import { useReadingList } from "@/lib/useReadingList";

export default function SaveButton({ movieId, variant = "icon" }) {
  const { isSaved, toggle } = useReadingList();
  const saved = isSaved(movieId);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(movieId);
        }}
        aria-pressed={saved}
        aria-label={saved ? "Remove from reading list" : "Add to reading list"}
        className={`absolute top-2 right-2 z-10 flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-sm transition-colors ${
          saved ? "bg-cobalt text-paper" : "bg-paper/85 text-ink hover:bg-paper"
        }`}
      >
        <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(movieId)}
      aria-pressed={saved}
      className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm transition-colors ${
        saved
          ? "border-cobalt bg-cobalt text-paper"
          : "border-ink/25 text-ink hover:border-cobalt hover:text-cobalt"
      }`}
    >
      <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
      {saved ? "Saved to reading list" : "Save to reading list"}
    </button>
  );
}
