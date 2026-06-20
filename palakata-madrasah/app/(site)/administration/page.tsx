import type { Metadata } from "next";
import {
  ContentWrap,
  P,
  PageHeader,
  Section,
} from "@/components/content/primitives";

export const metadata: Metadata = { title: "Administration" };

export default function AdministrationPage() {
  return (
    <>
      <PageHeader
        titleEn="Administration"
        titleBn="প্রশাসন"
        subtitleEn="Governing body, principal, teachers and staff."
        subtitleBn="পরিচালনা পর্ষদ, অধ্যক্ষ, শিক্ষক ও কর্মচারী।"
      />
      <ContentWrap>
        <Section id="governing-body" titleEn="Governing Body" titleBn="পরিচালনা পর্ষদ">
          <P
            en="[UPDATE: List the members of the managing committee with their designations.]"
            bn="[UPDATE: পরিচালনা কমিটির সদস্যদের নাম ও পদবিসহ তালিকা দিন।]"
          />
        </Section>
        <Section id="principal" titleEn="Principal" titleBn="অধ্যক্ষ">
          <P
            en="[UPDATE: Principal's name, qualifications and brief profile.]"
            bn="[UPDATE: অধ্যক্ষের নাম, যোগ্যতা ও সংক্ষিপ্ত পরিচিতি।]"
          />
        </Section>
        <Section id="teachers" titleEn="Teachers" titleBn="শিক্ষকবৃন্দ">
          <P
            en="Our qualified and dedicated teachers lead the academic departments. The full faculty directory is managed from the admin panel and will appear here."
            bn="আমাদের যোগ্য ও নিবেদিতপ্রাণ শিক্ষকবৃন্দ একাডেমিক বিভাগগুলো পরিচালনা করেন। সম্পূর্ণ শিক্ষক তালিকা অ্যাডমিন প্যানেল থেকে পরিচালিত হবে এবং এখানে প্রদর্শিত হবে।"
          />
        </Section>
        <Section id="staff" titleEn="Staff" titleBn="কর্মচারী">
          <P
            en="[UPDATE: List administrative and support staff.]"
            bn="[UPDATE: প্রশাসনিক ও সহায়ক কর্মচারীদের তালিকা দিন।]"
          />
        </Section>
      </ContentWrap>
    </>
  );
}
