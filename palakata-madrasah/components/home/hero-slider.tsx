"use client";

import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { useLang } from "@/components/i18n/language-provider";
import { heroSlides } from "@/lib/sample-data";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-[#7a9fb5] via-[#5e8aa6] to-[#3f6b87]",
  "from-[#6b8e9f] via-[#4f7a8c] to-[#345b6e]",
  "from-[#8a9c7a] via-[#6e845e] to-[#4f6342]",
  "from-[#9f8a6b] via-[#8c714f] to-[#6e5634]",
];

export function HeroSlider() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
      <div className="relative aspect-video">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-gradient-to-br transition-opacity duration-700",
              GRADIENTS[i % GRADIENTS.length],
              i === index ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={i !== index}
          >
            <div className="px-6 text-center text-white">
              <div className="inline-block rounded-md border border-gold/40 bg-black/35 px-6 py-3.5 backdrop-blur-[2px]">
                <p className="font-bangla text-xl font-bold sm:text-2xl">{site.name.bn}</p>
                <p className="font-display text-xs tracking-widest sm:text-sm">{site.name.en}</p>
              </div>
              <p className="mt-4 inline-flex items-center gap-1.5 text-[13px] italic tracking-wide text-[#e3dab9]">
                <ImageIcon className="size-3.5" strokeWidth={1.5} />[ {t(slide.caption.en, slide.caption.bn)} ]
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1.5 bg-white py-3.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index ? "w-6 bg-orange" : "w-2 bg-line hover:bg-muted-ink"
            )}
          />
        ))}
      </div>
    </div>
  );
}
