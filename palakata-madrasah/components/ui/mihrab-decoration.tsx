import { cn } from "@/lib/utils";

/**
 * Arched mihrab / mosque-window decoration shown on the right of the header
 * (custom artwork, not a Lucide icon).
 */
export function MihrabDecoration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-[140px] w-[130px] shrink-0 overflow-hidden rounded-t-[65px] rounded-b-lg border-2 border-gold shadow-lg",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#5a8bb8] via-[#7aa4cb] to-[#a8c5dc]" />
      <svg
        viewBox="0 0 130 140"
        className="absolute bottom-0 left-0 h-[75%] w-full"
        aria-hidden="true"
      >
        {/* Central dome */}
        <path
          d="M65 30c-13 0-22 11-22 26v44h44V56c0-15-9-26-22-26Z"
          fill="#0f3a2e"
          opacity="0.85"
        />
        <path d="M65 18a4 4 0 0 1 4 4 5.5 5.5 0 1 0-4 6 4 4 0 0 1-4-4 4 4 0 0 1 4-6Z" fill="#d4b87c" />
        {/* Side minarets */}
        <rect x="14" y="56" width="12" height="44" rx="3" fill="#0f3a2e" opacity="0.7" />
        <path d="M20 48c-4 0-6 3-6 8h12c0-5-2-8-6-8Z" fill="#0f3a2e" opacity="0.7" />
        <rect x="104" y="56" width="12" height="44" rx="3" fill="#0f3a2e" opacity="0.7" />
        <path d="M110 48c-4 0-6 3-6 8h12c0-5-2-8-6-8Z" fill="#0f3a2e" opacity="0.7" />
      </svg>
      <span
        className="pointer-events-none absolute inset-1.5 rounded-t-[60px] rounded-b border border-white/40"
        aria-hidden="true"
      />
    </div>
  );
}
