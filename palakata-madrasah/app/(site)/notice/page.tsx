import type { Metadata } from "next";
import { ContentWrap, PageHeader } from "@/components/content/primitives";
import { DatedList } from "@/components/content/dated-list";
import { getNotices } from "@/lib/queries";

export const metadata: Metadata = { title: "Notice Board" };
export const dynamic = "force-dynamic";

export default async function NoticePage() {
  const notices = await getNotices();
  return (
    <>
      <PageHeader
        titleEn="Notice Board"
        titleBn="নোটিশ বোর্ড"
        subtitleEn="Official announcements and circulars."
        subtitleBn="অফিসিয়াল ঘোষণা ও বিজ্ঞপ্তি।"
      />
      <ContentWrap>
        <DatedList items={notices} />
      </ContentWrap>
    </>
  );
}
