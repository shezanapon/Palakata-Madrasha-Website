import type { Metadata } from "next";
import {
  Bullets,
  ContentWrap,
  P,
  PageHeader,
  Section,
} from "@/components/content/primitives";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        titleEn="About the Madrasah"
        titleBn="মাদ্রাসা পরিচিতি"
        subtitleEn="History, mission and leadership of Palakata Alim Madrasah."
        subtitleBn="পালাকাটা আলিম মাদ্রাসার ইতিহাস, লক্ষ্য ও নেতৃত্ব।"
      />
      <ContentWrap>
        <Section id="history" titleEn="History" titleBn="ইতিহাস">
          <P
            en="Palakata Alim Madrasah was established with the noble aim of spreading Islamic and modern education side by side. From humble beginnings it has grown into one of the region's leading institutions, serving over 1500 students across Ebtedayee, Dakhil and Alim levels."
            bn="ইসলামি ও আধুনিক শিক্ষা পাশাপাশি বিস্তারের মহৎ উদ্দেশ্যে পালাকাটা আলিম মাদ্রাসা প্রতিষ্ঠিত হয়। ক্ষুদ্র সূচনা থেকে আজ এটি ইবতেদায়ী, দাখিল ও আলিম স্তরে ১৫০০-এরও বেশি শিক্ষার্থীর সেবায় অঞ্চলের অন্যতম শীর্ষ প্রতিষ্ঠানে পরিণত হয়েছে।"
          />
          <P
            en="[UPDATE: Add the full founding story, key milestones and the names of early patrons here.]"
            bn="[UPDATE: প্রতিষ্ঠার পূর্ণ ইতিহাস, গুরুত্বপূর্ণ মাইলফলক ও প্রাথমিক পৃষ্ঠপোষকদের নাম এখানে যুক্ত করুন।]"
          />
        </Section>

        <Section id="mission" titleEn="Mission & Vision" titleBn="লক্ষ্য ও উদ্দেশ্য">
          <P
            en="Our mission is to produce God-fearing, knowledgeable and responsible citizens grounded in the Qur'an and Sunnah while equipped for the modern world."
            bn="আমাদের লক্ষ্য হলো কুরআন ও সুন্নাহর ভিত্তিতে আল্লাহভীরু, জ্ঞানী ও দায়িত্বশীল নাগরিক তৈরি করা, যারা একই সাথে আধুনিক বিশ্বের জন্য প্রস্তুত।"
          />
          <Bullets
            items={[
              { en: "Excellence in Islamic and academic education", bn: "ইসলামি ও একাডেমিক শিক্ষায় উৎকর্ষ" },
              { en: "Building strong moral character (akhlaq)", bn: "উত্তম নৈতিক চরিত্র (আখলাক) গঠন" },
              { en: "A safe, disciplined and caring environment", bn: "নিরাপদ, সুশৃঙ্খল ও যত্নশীল পরিবেশ" },
              { en: "Service to community and nation", bn: "সমাজ ও জাতির সেবা" },
            ]}
          />
        </Section>

        <Section id="principal" titleEn="Principal's Message" titleBn="অধ্যক্ষের বাণী">
          <P
            en="[UPDATE: Principal's message — a warm welcome and the institution's guiding philosophy.]"
            bn="[UPDATE: অধ্যক্ষের বাণী — আন্তরিক স্বাগত ও প্রতিষ্ঠানের পথনির্দেশক দর্শন।]"
          />
        </Section>

        <Section id="vice-principal" titleEn="Vice Principal's Message" titleBn="উপাধ্যক্ষের বাণী">
          <P
            en="[UPDATE: Vice Principal's message.]"
            bn="[UPDATE: উপাধ্যক্ষের বাণী।]"
          />
        </Section>

        <Section id="achievements" titleEn="Achievements" titleBn="অর্জনসমূহ">
          <Bullets
            items={[
              { en: "100% pass rate in recent Dakhil examinations", bn: "সাম্প্রতিক দাখিল পরীক্ষায় শতভাগ পাস" },
              { en: "Multiple Golden A+ in Alim board exams", bn: "আলিম বোর্ড পরীক্ষায় একাধিক গোল্ডেন এ+" },
              { en: "Champions in Upazila & District Qira'at competitions", bn: "উপজেলা ও জেলা কিরাত প্রতিযোগিতায় চ্যাম্পিয়ন" },
            ]}
          />
        </Section>
      </ContentWrap>
    </>
  );
}
