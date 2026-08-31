import { Star } from "lucide-react";
import { formatRating } from "@/lib/utils";

export default function RatingBadge({ value, size = "sm" }) {
  const dims = size === "lg" ? "text-base" : "text-sm";
  return (
    <span className={`inline-flex items-center gap-1.5 text-ochre-deep ${dims}`}>
      <Star size={size === "lg" ? 16 : 13} fill="currentColor" />
      {formatRating(value)}
    </span>
  );
}
