import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Circular madrasah seal — inline SVG (custom artwork, not a Lucide icon).
 * Octagram star, central dome + crescent, and establishment year.
 */
export function MadrasahSeal({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("block", className)}
      role="img"
      aria-label={title ?? "Palakata Alim Madrasah seal"}
    >
      <defs>
        <radialGradient id="seal-fill" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="68%" stopColor="#f0e8d0" />
          <stop offset="100%" stopColor="#d4b87c" />
        </radialGradient>
      </defs>

      {/* Outer rings */}
      <circle cx="60" cy="60" r="58" fill="url(#seal-fill)" stroke="#a07830" strokeWidth="2" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="#0f3a2e" strokeWidth="1.4" />
      <circle
        cx="60"
        cy="60"
        r="45"
        fill="none"
        stroke="#0f3a2e"
        strokeWidth="0.8"
        strokeDasharray="1.5 3"
      />

      {/* Octagram star (two rotated squares) */}
      <g fill="#155441" opacity="0.95">
        <rect x="38" y="38" width="44" height="44" rx="3" />
        <rect x="38" y="38" width="44" height="44" rx="3" transform="rotate(45 60 60)" />
      </g>
      <circle cx="60" cy="60" r="24" fill="#fdfaf0" />

      {/* Dome + crescent + minaret hint */}
      <g fill="#0f3a2e">
        <path d="M60 44c-7 0-12 5.5-12 13v3h24v-3c0-7.5-5-13-12-13Z" />
        <rect x="46" y="60" width="28" height="3.5" rx="1.5" />
        <path d="M60 39.5a3 3 0 0 1 3 3 4.2 4.2 0 1 0-3 5 3 3 0 0 1-3-3 3 3 0 0 1 3-5Z" />
      </g>

      {/* Establishment year */}
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontSize="7.5"
        fontWeight="700"
        fill="#a07830"
        letterSpacing="0.5"
      >
        EST {site.estYear}
      </text>
    </svg>
  );
}
