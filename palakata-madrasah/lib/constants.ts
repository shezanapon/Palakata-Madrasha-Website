import type { Bilingual } from "./i18n";

export interface Option<T extends string = string> extends Bilingual {
  value: T;
}

export const CLASS_LEVELS: Option[] = [
  { value: "EBTEDAYEE_1", en: "Ebtedayee 1", bn: "ইবতেদায়ী ১ম" },
  { value: "EBTEDAYEE_2", en: "Ebtedayee 2", bn: "ইবতেদায়ী ২য়" },
  { value: "EBTEDAYEE_3", en: "Ebtedayee 3", bn: "ইবতেদায়ী ৩য়" },
  { value: "EBTEDAYEE_4", en: "Ebtedayee 4", bn: "ইবতেদায়ী ৪র্থ" },
  { value: "EBTEDAYEE_5", en: "Ebtedayee 5", bn: "ইবতেদায়ী ৫ম" },
  { value: "DAKHIL_6", en: "Dakhil 6", bn: "দাখিল ৬ষ্ঠ" },
  { value: "DAKHIL_7", en: "Dakhil 7", bn: "দাখিল ৭ম" },
  { value: "DAKHIL_8", en: "Dakhil 8", bn: "দাখিল ৮ম" },
  { value: "DAKHIL_9", en: "Dakhil 9", bn: "দাখিল ৯ম" },
  { value: "DAKHIL_10", en: "Dakhil 10", bn: "দাখিল ১০ম" },
  { value: "ALIM_11", en: "Alim 11", bn: "আলিম ১১শ" },
  { value: "ALIM_12", en: "Alim 12", bn: "আলিম ১২শ" },
];

export const TERMS: Option[] = [
  { value: "FIRST", en: "First Term", bn: "প্রথম সাময়িক" },
  { value: "SECOND", en: "Second Term", bn: "দ্বিতীয় সাময়িক" },
];

export const FEE_TYPES: Option[] = [
  { value: "MONTHLY", en: "Monthly Tuition", bn: "মাসিক বেতন" },
  { value: "ADMISSION", en: "Admission Fee", bn: "ভর্তি ফি" },
  { value: "EXAM_FEE", en: "Exam Fee", bn: "পরীক্ষার ফি" },
  { value: "OTHER", en: "Other", bn: "অন্যান্য" },
];

export function classLabel(value: string): Bilingual {
  return CLASS_LEVELS.find((c) => c.value === value) ?? { en: value, bn: value };
}
