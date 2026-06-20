export type Lang = "en" | "bn";

export const DEFAULT_LANG: Lang = "bn"; // Bengali-first for Bangladeshi users

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert ASCII digits in a string/number to Bengali numerals. */
export function toBnNumeral(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/** Localize a number to the active language's numerals. */
export function localizeNumber(value: string | number, lang: Lang): string {
  return lang === "bn" ? toBnNumeral(value) : String(value);
}

/** A piece of bilingual text. */
export interface Bilingual {
  en: string;
  bn: string;
}

export function pick(text: Bilingual, lang: Lang): string {
  return lang === "bn" ? text.bn : text.en;
}
