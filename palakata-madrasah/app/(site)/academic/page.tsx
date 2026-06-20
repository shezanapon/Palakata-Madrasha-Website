import type { Metadata } from "next";
import {
  ContentWrap,
  FeatureGrid,
  P,
  PageHeader,
  Section,
} from "@/components/content/primitives";

export const metadata: Metadata = { title: "Academic" };

export default function AcademicPage() {
  return (
    <>
      <PageHeader
        titleEn="Academic"
        titleBn="একাডেমিক"
        subtitleEn="Classes, syllabus, routine and academic calendar."
        subtitleBn="শ্রেণিসমূহ, সিলেবাস, রুটিন ও একাডেমিক ক্যালেন্ডার।"
      />
      <ContentWrap>
        <Section id="classes" titleEn="Classes" titleBn="শ্রেণিসমূহ">
          <P
            en="The madrasah follows the Bangladesh Madrasah Education Board curriculum across three levels."
            bn="মাদ্রাসাটি বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ডের পাঠ্যক্রম তিনটি স্তরে অনুসরণ করে।"
          />
          <FeatureGrid
            items={[
              { en: "Ebtedayee (Class 1–5)", bn: "ইবতেদায়ী (১ম–৫ম শ্রেণি)", descEn: "Primary Islamic foundation", descBn: "প্রাথমিক ইসলামি ভিত্তি" },
              { en: "Dakhil (Class 6–10)", bn: "দাখিল (৬ষ্ঠ–১০ম শ্রেণি)", descEn: "Secondary level", descBn: "মাধ্যমিক স্তর" },
              { en: "Alim (Class 11–12)", bn: "আলিম (১১শ–১২শ শ্রেণি)", descEn: "Higher secondary level", descBn: "উচ্চ মাধ্যমিক স্তর" },
            ]}
          />
        </Section>

        <Section id="syllabus" titleEn="Syllabus" titleBn="সিলেবাস">
          <P
            en="[UPDATE: Attach class-wise syllabus PDFs or describe subjects for each level.]"
            bn="[UPDATE: শ্রেণিভিত্তিক সিলেবাস PDF যুক্ত করুন বা প্রতিটি স্তরের বিষয়সমূহ বর্ণনা করুন।]"
          />
        </Section>

        <Section id="routine" titleEn="Class Routine" titleBn="ক্লাস রুটিন">
          <P
            en="[UPDATE: Publish the current class routine here or attach as a downloadable file.]"
            bn="[UPDATE: বর্তমান ক্লাস রুটিন এখানে প্রকাশ করুন বা ডাউনলোডযোগ্য ফাইল যুক্ত করুন।]"
          />
        </Section>

        <Section id="calendar" titleEn="Academic Calendar" titleBn="একাডেমিক ক্যালেন্ডার">
          <P
            en="[UPDATE: List term dates, examinations and major holidays for the year.]"
            bn="[UPDATE: বছরের টার্ম তারিখ, পরীক্ষা ও প্রধান ছুটির তালিকা দিন।]"
          />
        </Section>
      </ContentWrap>
    </>
  );
}
