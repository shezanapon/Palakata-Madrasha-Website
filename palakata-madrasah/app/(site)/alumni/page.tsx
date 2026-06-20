import type { Metadata } from "next";
import { ContentWrap, PageHeader, Section, P } from "@/components/content/primitives";

export const metadata: Metadata = { title: "Alumni" };

export default function AlumniPage() {
  return (
    <>
      <PageHeader
        titleEn="Alumni Association"
        titleBn="প্রাক্তন শিক্ষার্থী সমিতি"
        subtitleEn="Stay connected with your madrasah family."
        subtitleBn="আপনার মাদ্রাসা পরিবারের সাথে যুক্ত থাকুন।"
      />
      <ContentWrap>
        <Section titleEn="Join the Alumni Network" titleBn="প্রাক্তন নেটওয়ার্কে যোগ দিন">
          <P
            en="Our graduates serve as imams, teachers, scholars and professionals across the country and beyond. The alumni association keeps this community connected and supports current students through mentorship and scholarships."
            bn="আমাদের স্নাতকগণ দেশে ও বিদেশে ইমাম, শিক্ষক, আলেম ও পেশাজীবী হিসেবে সেবা দিচ্ছেন। প্রাক্তন সমিতি এই সম্প্রদায়কে যুক্ত রাখে এবং পরামর্শ ও বৃত্তির মাধ্যমে বর্তমান শিক্ষার্থীদের সহায়তা করে।"
          />
          <P
            en="[UPDATE: Add an alumni registration form or contact details to join the association.]"
            bn="[UPDATE: সমিতিতে যোগ দিতে প্রাক্তন নিবন্ধন ফরম বা যোগাযোগের তথ্য যুক্ত করুন।]"
          />
        </Section>
      </ContentWrap>
    </>
  );
}
