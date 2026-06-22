import { FEE_TYPES } from "./constants";
import type { Bilingual } from "./i18n";

export function feeTypeLabel(type: string): Bilingual {
  return FEE_TYPES.find((f) => f.value === type) ?? { en: type, bn: type };
}

/** Human label for a fee, e.g. "Monthly Tuition — 2026-07". */
export function feeLabel(type: string, month: string | null, year: number): Bilingual {
  const base = feeTypeLabel(type);
  const suffix = month ? ` — ${month}` : ` — ${year}`;
  return { en: base.en + suffix, bn: base.bn + suffix };
}
