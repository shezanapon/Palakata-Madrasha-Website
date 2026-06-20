import type { Metadata } from "next";
import { ContentWrap, PageHeader, Section, P } from "@/components/content/primitives";

export const metadata: Metadata = { title: "Facilities" };

const facilities = [
  { id: "library", en: "Library", bn: "গ্রন্থাগার", descEn: "A well-stocked library with Islamic and academic books, reference materials and a quiet reading space.", descBn: "ইসলামি ও একাডেমিক বই, রেফারেন্স সামগ্রী এবং শান্ত পঠন পরিবেশসহ সমৃদ্ধ গ্রন্থাগার।" },
  { id: "computer-lab", en: "Computer Lab", bn: "কম্পিউটার ল্যাব", descEn: "Modern computers giving students hands-on ICT skills.", descBn: "শিক্ষার্থীদের হাতে-কলমে আইসিটি দক্ষতা প্রদানে আধুনিক কম্পিউটার।" },
  { id: "science-lab", en: "Science Lab", bn: "বিজ্ঞান ল্যাব", descEn: "Equipped laboratory for practical science education.", descBn: "ব্যবহারিক বিজ্ঞান শিক্ষার জন্য সুসজ্জিত পরীক্ষাগার।" },
  { id: "hostel", en: "Hostel", bn: "ছাত্রাবাস", descEn: "Safe residential accommodation with supervision and regular meals.", descBn: "তত্ত্বাবধান ও নিয়মিত খাবারসহ নিরাপদ আবাসিক ব্যবস্থা।" },
  { id: "mosque", en: "Mosque", bn: "মসজিদ", descEn: "A spacious mosque on campus for the five daily prayers and Qur'an study.", descBn: "পাঁচ ওয়াক্ত নামাজ ও কুরআন অধ্যয়নের জন্য ক্যাম্পাসে প্রশস্ত মসজিদ।" },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader
        titleEn="Facilities"
        titleBn="সুযোগ-সুবিধা"
        subtitleEn="Library, labs, hostel and mosque on our campus."
        subtitleBn="আমাদের ক্যাম্পাসে গ্রন্থাগার, ল্যাব, ছাত্রাবাস ও মসজিদ।"
      />
      <ContentWrap>
        {facilities.map((f) => (
          <Section key={f.id} id={f.id} titleEn={f.en} titleBn={f.bn}>
            <P en={f.descEn} bn={f.descBn} />
          </Section>
        ))}
      </ContentWrap>
    </>
  );
}
