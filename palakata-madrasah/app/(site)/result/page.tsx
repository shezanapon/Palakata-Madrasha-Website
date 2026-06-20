import type { Metadata } from "next";
import { ContentWrap, PageHeader } from "@/components/content/primitives";
import { ResultSearch } from "@/components/content/result-search";
import { T } from "@/components/i18n/language-provider";

export const metadata: Metadata = { title: "Results" };

export default function ResultPage() {
  return (
    <>
      <PageHeader
        titleEn="Examination Results"
        titleBn="পরীক্ষার ফলাফল"
        subtitleEn="Enter your roll number to view your results."
        subtitleBn="ফলাফল দেখতে আপনার রোল নম্বর লিখুন।"
      />
      <ContentWrap>
        <ResultSearch />
        <p className="text-center text-sm text-muted-ink">
          <T
            en="Students can also log in to view full result cards, attendance and fees."
            bn="শিক্ষার্থীরা সম্পূর্ণ ফলাফল কার্ড, উপস্থিতি ও ফি দেখতে লগইনও করতে পারে।"
          />
        </p>
      </ContentWrap>
    </>
  );
}
