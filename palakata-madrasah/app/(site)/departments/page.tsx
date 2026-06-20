import type { Metadata } from "next";
import { ContentWrap, PageHeader, Section, P } from "@/components/content/primitives";

export const metadata: Metadata = { title: "Departments" };

export default function DepartmentsPage() {
  return (
    <>
      <PageHeader
        titleEn="Departments"
        titleBn="বিভাগসমূহ"
        subtitleEn="Ebtedayee, Dakhil and Alim academic departments."
        subtitleBn="ইবতেদায়ী, দাখিল ও আলিম একাডেমিক বিভাগ।"
      />
      <ContentWrap>
        <Section id="ebtedayee" titleEn="Ebtedayee Department" titleBn="ইবতেদায়ী বিভাগ">
          <P
            en="Classes 1–5. The primary stage builds the Qur'an, basic Arabic, Bangla, English and Mathematics foundation."
            bn="১ম–৫ম শ্রেণি। প্রাথমিক স্তরে কুরআন, প্রাথমিক আরবি, বাংলা, ইংরেজি ও গণিতের ভিত্তি গড়ে তোলা হয়।"
          />
        </Section>
        <Section id="dakhil" titleEn="Dakhil Department" titleBn="দাখিল বিভাগ">
          <P
            en="Classes 6–10. The secondary stage culminates in the Dakhil board examination, equivalent to SSC."
            bn="৬ষ্ঠ–১০ম শ্রেণি। মাধ্যমিক স্তর দাখিল বোর্ড পরীক্ষায় সম্পন্ন হয়, যা এসএসসি সমমান।"
          />
        </Section>
        <Section id="alim" titleEn="Alim Department" titleBn="আলিম বিভাগ">
          <P
            en="Classes 11–12. The higher secondary stage culminates in the Alim board examination, equivalent to HSC."
            bn="১১শ–১২শ শ্রেণি। উচ্চ মাধ্যমিক স্তর আলিম বোর্ড পরীক্ষায় সম্পন্ন হয়, যা এইচএসসি সমমান।"
          />
        </Section>
      </ContentWrap>
    </>
  );
}
