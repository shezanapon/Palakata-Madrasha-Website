import type { Metadata } from "next";
import { ContentWrap, PageHeader, Section, P } from "@/components/content/primitives";

export const metadata: Metadata = { title: "Co-Curriculum" };

export default function CoCurriculumPage() {
  return (
    <>
      <PageHeader
        titleEn="Co-Curricular Activities"
        titleBn="সহশিক্ষা কার্যক্রম"
        subtitleEn="Events, sports, cultural programs and scouting."
        subtitleBn="অনুষ্ঠান, ক্রীড়া, সাংস্কৃতিক কর্মসূচি ও স্কাউটিং।"
      />
      <ContentWrap>
        <Section id="sports" titleEn="Sports" titleBn="ক্রীড়া">
          <P
            en="Annual sports competitions encourage fitness, teamwork and discipline among students."
            bn="বার্ষিক ক্রীড়া প্রতিযোগিতা শিক্ষার্থীদের মধ্যে সুস্থতা, দলগত কাজ ও শৃঙ্খলা উৎসাহিত করে।"
          />
        </Section>
        <Section id="cultural" titleEn="Cultural Programs" titleBn="সাংস্কৃতিক কর্মসূচি">
          <P
            en="Qira'at, hamd-naat, Islamic speech and recitation competitions are held throughout the year."
            bn="সারা বছর কিরাত, হামদ-নাত, ইসলামি বক্তৃতা ও তিলাওয়াত প্রতিযোগিতা অনুষ্ঠিত হয়।"
          />
        </Section>
        <Section id="scout" titleEn="Scout" titleBn="স্কাউট">
          <P
            en="Our scouting program builds leadership, service and survival skills."
            bn="আমাদের স্কাউটিং কর্মসূচি নেতৃত্ব, সেবা ও টিকে থাকার দক্ষতা গড়ে তোলে।"
          />
        </Section>
      </ContentWrap>
    </>
  );
}
