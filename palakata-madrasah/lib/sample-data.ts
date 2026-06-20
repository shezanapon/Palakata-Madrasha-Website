import type { Bilingual } from "./i18n";

/**
 * Placeholder content used until the database/admin panel is wired up.
 * Replace by fetching from Prisma (Notice, Event, Achievement, GalleryImage).
 */

export interface DatedItem {
  id: string;
  date: string; // ISO date
  title: Bilingual;
  href?: string;
}

export const notices: DatedItem[] = [
  {
    id: "n1",
    date: "2026-06-15",
    title: {
      en: "Alim 1st year admission 2026 has started",
      bn: "আলিম প্রথম বর্ষ ভর্তি ২০২৬ শুরু হয়েছে",
    },
    href: "/notice",
  },
  {
    id: "n2",
    date: "2026-06-10",
    title: {
      en: "Half-yearly examination routine published",
      bn: "অর্ধবার্ষিক পরীক্ষার রুটিন প্রকাশিত হয়েছে",
    },
    href: "/notice",
  },
  {
    id: "n3",
    date: "2026-06-02",
    title: {
      en: "Tuition fees for June can now be paid",
      bn: "জুন মাসের বেতন এখন পরিশোধ করা যাবে",
    },
    href: "/notice",
  },
  {
    id: "n4",
    date: "2026-05-28",
    title: {
      en: "Eid-ul-Adha holiday notice",
      bn: "ঈদুল আযহার ছুটির বিজ্ঞপ্তি",
    },
    href: "/notice",
  },
];

export const events: DatedItem[] = [
  {
    id: "e1",
    date: "2026-07-05",
    title: { en: "Annual Hifz competition", bn: "বার্ষিক হিফজ প্রতিযোগিতা" },
    href: "/events",
  },
  {
    id: "e2",
    date: "2026-07-18",
    title: { en: "Parents' meeting (Dakhil)", bn: "অভিভাবক সমাবেশ (দাখিল)" },
    href: "/events",
  },
  {
    id: "e3",
    date: "2026-08-01",
    title: { en: "Seerat-un-Nabi conference", bn: "সীরাতুন্নবী সম্মেলন" },
    href: "/events",
  },
];

export const achievements: { id: string; year: number; title: Bilingual }[] = [
  {
    id: "a1",
    year: 2025,
    title: { en: "100% pass rate in Dakhil exam", bn: "দাখিল পরীক্ষায় শতভাগ পাস" },
  },
  {
    id: "a2",
    year: 2025,
    title: { en: "3 students earned golden A+ in Alim", bn: "আলিমে ৩ জন গোল্ডেন এ+" },
  },
  {
    id: "a3",
    year: 2024,
    title: { en: "Champion — Upazila Quran recitation", bn: "চ্যাম্পিয়ন — উপজেলা কিরাত" },
  },
];

export const heroSlides: { caption: Bilingual }[] = [
  { caption: { en: "Madrasah Main Gate", bn: "মাদ্রাসা প্রধান ফটক" } },
  { caption: { en: "Classroom & Students", bn: "শ্রেণিকক্ষ ও শিক্ষার্থী" } },
  { caption: { en: "Events & Graduation", bn: "অনুষ্ঠান ও সমাবর্তন" } },
  { caption: { en: "Campus Facilities", bn: "ক্যাম্পাস সুবিধা" } },
];
