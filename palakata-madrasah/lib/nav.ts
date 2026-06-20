import type { Bilingual } from "./i18n";

export interface NavItem extends Bilingual {
  href?: string;
  children?: NavItem[];
}

/** Primary navigation (spec §8). Sub-items link to anchored sections. */
export const navItems: NavItem[] = [
  {
    en: "About",
    bn: "পরিচিতি",
    href: "/about",
    children: [
      { en: "History", bn: "ইতিহাস", href: "/about#history" },
      { en: "Mission & Vision", bn: "লক্ষ্য ও উদ্দেশ্য", href: "/about#mission" },
      { en: "Principal's Message", bn: "অধ্যক্ষের বাণী", href: "/about#principal" },
      { en: "Vice Principal's Message", bn: "উপাধ্যক্ষের বাণী", href: "/about#vice-principal" },
    ],
  },
  {
    en: "Academic",
    bn: "একাডেমিক",
    href: "/academic",
    children: [
      { en: "Classes", bn: "শ্রেণিসমূহ", href: "/academic#classes" },
      { en: "Syllabus", bn: "সিলেবাস", href: "/academic#syllabus" },
      { en: "Routine", bn: "রুটিন", href: "/academic#routine" },
      { en: "Academic Calendar", bn: "একাডেমিক ক্যালেন্ডার", href: "/academic#calendar" },
      { en: "Results", bn: "ফলাফল", href: "/result" },
    ],
  },
  {
    en: "Admission",
    bn: "ভর্তি",
    href: "/admission",
    children: [
      { en: "Admission Info", bn: "ভর্তি তথ্য", href: "/admission#info" },
      { en: "Online Application", bn: "অনলাইন আবেদন", href: "/admission#apply" },
      { en: "Admission Notice", bn: "ভর্তি বিজ্ঞপ্তি", href: "/admission#notice" },
      { en: "Fees & Charges", bn: "ফি ও চার্জ", href: "/admission#fees" },
    ],
  },
  {
    en: "Administration",
    bn: "প্রশাসন",
    href: "/administration",
    children: [
      { en: "Governing Body", bn: "পরিচালনা পর্ষদ", href: "/administration#governing-body" },
      { en: "Principal", bn: "অধ্যক্ষ", href: "/administration#principal" },
      { en: "Teachers", bn: "শিক্ষকবৃন্দ", href: "/administration#teachers" },
      { en: "Staff", bn: "কর্মচারী", href: "/administration#staff" },
    ],
  },
  {
    en: "Facilities",
    bn: "সুযোগ-সুবিধা",
    href: "/facilities",
    children: [
      { en: "Library", bn: "গ্রন্থাগার", href: "/facilities#library" },
      { en: "Computer Lab", bn: "কম্পিউটার ল্যাব", href: "/facilities#computer-lab" },
      { en: "Science Lab", bn: "বিজ্ঞান ল্যাব", href: "/facilities#science-lab" },
      { en: "Hostel", bn: "ছাত্রাবাস", href: "/facilities#hostel" },
      { en: "Mosque", bn: "মসজিদ", href: "/facilities#mosque" },
    ],
  },
  {
    en: "Co-Curriculum",
    bn: "সহশিক্ষা",
    href: "/co-curriculum",
    children: [
      { en: "Events", bn: "অনুষ্ঠান", href: "/events" },
      { en: "Sports", bn: "ক্রীড়া", href: "/co-curriculum#sports" },
      { en: "Cultural Programs", bn: "সাংস্কৃতিক", href: "/co-curriculum#cultural" },
      { en: "Scout", bn: "স্কাউট", href: "/co-curriculum#scout" },
    ],
  },
  {
    en: "Gallery",
    bn: "গ্যালারি",
    href: "/gallery",
    children: [
      { en: "Photo Gallery", bn: "ছবি গ্যালারি", href: "/gallery#photos" },
      { en: "Video Gallery", bn: "ভিডিও গ্যালারি", href: "/gallery#videos" },
      { en: "Events", bn: "অনুষ্ঠান", href: "/events" },
    ],
  },
  {
    en: "Departments",
    bn: "বিভাগসমূহ",
    href: "/departments",
    children: [
      { en: "Ebtedayee", bn: "ইবতেদায়ী", href: "/departments#ebtedayee" },
      { en: "Dakhil", bn: "দাখিল", href: "/departments#dakhil" },
      { en: "Alim", bn: "আলিম", href: "/departments#alim" },
    ],
  },
  { en: "Contact", bn: "যোগাযোগ", href: "/contact" },
  { en: "Alumni", bn: "প্রাক্তন", href: "/alumni" },
];
