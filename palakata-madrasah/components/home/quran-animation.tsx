"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/components/i18n/language-provider";

const FATIHA = [
  "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
  "الرَّحْمَٰنِ الرَّحِيمِ",
  "مَالِكِ يَوْمِ الدِّينِ",
  "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
  "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
  "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
];

const clamp = (v: number, min = 0, max = 1) => Math.min(Math.max(v, min), max);

export function QuranAnimation() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, total);
      setP(total > 0 ? scrolled / total : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const coverRot = -164 * clamp(p / 0.75);
  const pagesOpacity = clamp((p - 0.6) / 0.4);
  const hintOpacity = clamp(1 - p / 0.12);
  const glow = 0.35 + clamp(p) * 0.5;

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-[#0c1142]">
      <div className="pattern-overlay sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Ambient gold glow */}
        <div
          className="pointer-events-none absolute size-[420px] rounded-full bg-gold blur-[120px]"
          style={{ opacity: glow * 0.5, transform: `scale(${0.7 + p * 0.8})` }}
        />

        {/* Gold rays */}
        <div
          className="pointer-events-none absolute"
          style={{ opacity: clamp(p / 0.6) * 0.5 }}
          aria-hidden
        >
          {[-40, -20, 0, 20, 40].map((deg) => (
            <span
              key={deg}
              className="absolute left-0 top-0 h-[260px] w-[2px] origin-top bg-gradient-to-b from-gold/80 to-transparent"
              style={{ transform: `rotate(${deg}deg) translateY(-10px)` }}
            />
          ))}
        </div>

        {/* Book */}
        <div className="relative" style={{ perspective: "1600px" }}>
          <div
            className="relative h-[320px] w-[230px] sm:h-[380px] sm:w-[270px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Inner pages */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-r-md rounded-l-sm border border-gold/30 bg-gradient-to-b from-[#fdfaf0] to-[#f3ead2] px-4 py-6 text-center shadow-2xl transition-opacity"
              style={{ opacity: pagesOpacity }}
            >
              <p className="font-arabic mb-3 text-[15px] font-bold text-gold-dark">
                ﷽
              </p>
              <div className="space-y-1.5">
                {FATIHA.map((line, i) => (
                  <p key={i} className="font-arabic text-[13px] leading-relaxed text-green-dark sm:text-sm">
                    {line}
                  </p>
                ))}
              </div>
              <p className="font-display mt-4 text-[10px] tracking-widest text-gold-dark">
                AL-FATIHA
              </p>
            </div>

            {/* Cover (hinged on left spine) */}
            <div
              className="absolute inset-0 overflow-hidden rounded-r-md rounded-l-sm border-r-4 border-r-[#0a2a20] bg-gradient-to-br from-green-mid via-green-dark to-[#0a2a20] shadow-2xl"
              style={{
                transformOrigin: "left center",
                transform: `rotateY(${coverRot}deg)`,
                backfaceVisibility: "hidden",
              }}
            >
              {/* double gold frame */}
              <div className="absolute inset-3 rounded-sm border-2 border-gold/70" />
              <div className="absolute inset-5 rounded-sm border border-gold/40" />
              {/* diamond ornament */}
              <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-gold/60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
                <p className="font-arabic text-2xl font-bold text-gold drop-shadow sm:text-[28px]">
                  القرآن الكريم
                </p>
                <p className="font-display text-[11px] tracking-[0.3em] text-gold/90">
                  THE HOLY QURAN
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="pointer-events-none absolute bottom-10 flex flex-col items-center gap-1 text-gold transition-opacity"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-sm tracking-wide">
            {t("Scroll to open", "খুলতে স্ক্রোল করুন")}
          </span>
          <ChevronDown className="size-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
