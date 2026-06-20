import type { Bilingual } from "./i18n";

/**
 * Single source of truth for institution content.
 * Replace every value marked [UPDATE] with real data before going live (spec §17).
 */
export const site = {
  name: {
    en: "Palakata Alim Madrasah",
    bn: "পালাকাটা আলিম মাদ্রাসা",
  } as Bilingual,
  nameArabic: "بَلَاكَاتَا عَالِم مَدْرَسَة",
  shortName: { en: "Palakata Madrasah", bn: "পালাকাটা মাদ্রাসা" } as Bilingual,

  tagline: {
    en: "Knowledge · Faith · Character",
    bn: "জ্ঞান · ঈমান · চরিত্র",
  } as Bilingual,

  // [UPDATE] — official identifiers
  eiin: "—", // [UPDATE: EIIN]
  madrasahCode: "—", // [UPDATE: Madrasah Code]
  estYear: 1985, // [UPDATE: Founded year]

  contact: {
    phone: "+880 1XXX-XXXXXX", // [UPDATE: Phone]
    email: "info@palakata.edu.bd", // [UPDATE: Email]
    address: {
      en: "Palakata, [Union], [Upazila], [District], Bangladesh", // [UPDATE: Address]
      bn: "পালাকাটা, [ইউনিয়ন], [উপজেলা], [জেলা], বাংলাদেশ",
    } as Bilingual,
  },

  principal: {
    name: { en: "Principal Name", bn: "অধ্যক্ষের নাম" } as Bilingual, // [UPDATE]
    title: { en: "Principal", bn: "অধ্যক্ষ" } as Bilingual, // [UPDATE: honorific]
  },

  founder: {
    name: { en: "Founder Name", bn: "প্রতিষ্ঠাতার নাম" } as Bilingual, // [UPDATE]
    title: { en: "Founder & Patron", bn: "প্রতিষ্ঠাতা ও পৃষ্ঠপোষক" } as Bilingual,
  },

  socials: {
    facebook: "#",
    youtube: "#",
  },
};

/** Homepage stat band (spec §9.5). Values are [UPDATE] placeholders. */
export const stats: { value: number; suffix?: string; label: Bilingual }[] = [
  { value: 1500, suffix: "+", label: { en: "Students", bn: "শিক্ষার্থী" } },
  { value: 25, label: { en: "Teachers", bn: "শিক্ষক" } },
  { value: 30, suffix: "+", label: { en: "Years", bn: "বছর" } },
  { value: 98, suffix: "%", label: { en: "Pass Rate", bn: "পাসের হার" } },
];

/** "Important Links" sidebar card (spec §9.3). */
export const importantLinks: { label: Bilingual; href: string }[] = [
  { label: { en: "Madrasah Education Board", bn: "মাদ্রাসা শিক্ষা বোর্ড" }, href: "https://ebmeb.gov.bd" },
  { label: { en: "Ministry of Education", bn: "শিক্ষা মন্ত্রণালয়" }, href: "https://moedu.gov.bd" },
  { label: { en: "Result Portal", bn: "ফলাফল পোর্টাল" }, href: "https://eboardresults.com" },
  { label: { en: "NCTB Books", bn: "এনসিটিবি বই" }, href: "https://nctb.gov.bd" },
];
