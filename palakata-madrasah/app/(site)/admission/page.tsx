import type { Metadata } from "next";
import {
  Bullets,
  ContentWrap,
  P,
  PageHeader,
  Section,
} from "@/components/content/primitives";

export const metadata: Metadata = { title: "Admission" };

export default function AdmissionPage() {
  return (
    <>
      <PageHeader
        titleEn="Admission"
        titleBn="ভর্তি"
        subtitleEn="Admission information, online application, notices and fees."
        subtitleBn="ভর্তি তথ্য, অনলাইন আবেদন, বিজ্ঞপ্তি ও ফি।"
      />
      <ContentWrap>
        <Section id="info" titleEn="Admission Information" titleBn="ভর্তি তথ্য">
          <P
            en="Admission to Ebtedayee, Dakhil and Alim levels opens at the start of each academic year. Seats are limited and offered on merit and seat availability."
            bn="ইবতেদায়ী, দাখিল ও আলিম স্তরে প্রতি শিক্ষাবর্ষের শুরুতে ভর্তি শুরু হয়। আসন সীমিত এবং মেধা ও আসন প্রাপ্যতার ভিত্তিতে প্রদান করা হয়।"
          />
          <Bullets
            items={[
              { en: "Birth certificate of the applicant", bn: "আবেদনকারীর জন্ম নিবন্ধন সনদ" },
              { en: "Previous class transfer/result certificate", bn: "পূর্ববর্তী শ্রেণির ছাড়পত্র/ফলাফল সনদ" },
              { en: "Recent passport-size photographs", bn: "সাম্প্রতিক পাসপোর্ট সাইজ ছবি" },
              { en: "Guardian's national ID copy", bn: "অভিভাবকের জাতীয় পরিচয়পত্রের কপি" },
            ]}
          />
        </Section>

        <Section id="apply" titleEn="Online Application" titleBn="অনলাইন আবেদন">
          <P
            en="[UPDATE: Embed the online application form or link to the board's admission portal here. Until then, please collect and submit forms at the madrasah office.]"
            bn="[UPDATE: অনলাইন আবেদন ফরম এখানে যুক্ত করুন বা বোর্ডের ভর্তি পোর্টালের লিংক দিন। ততক্ষণ পর্যন্ত মাদ্রাসা অফিস থেকে ফরম সংগ্রহ ও জমা দিন।]"
          />
        </Section>

        <Section id="notice" titleEn="Admission Notice" titleBn="ভর্তি বিজ্ঞপ্তি">
          <P
            en="Admission for the 2026 session is now open. See the Notice Board for the detailed circular, deadlines and class-wise seat information."
            bn="২০২৬ শিক্ষাবর্ষের ভর্তি চলছে। বিস্তারিত বিজ্ঞপ্তি, সময়সীমা ও শ্রেণিভিত্তিক আসন তথ্যের জন্য নোটিশ বোর্ড দেখুন।"
          />
        </Section>

        <Section id="fees" titleEn="Fees & Charges" titleBn="ফি ও চার্জ">
          <P
            en="[UPDATE: Add the official admission fee, monthly tuition and exam fee structure per class.]"
            bn="[UPDATE: শ্রেণিভিত্তিক ভর্তি ফি, মাসিক বেতন ও পরীক্ষার ফি কাঠামো যুক্ত করুন।]"
          />
        </Section>
      </ContentWrap>
    </>
  );
}
