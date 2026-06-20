import type { Metadata } from "next";
import { ContentWrap, PageHeader } from "@/components/content/primitives";
import { DatedList } from "@/components/content/dated-list";
import { getEvents } from "@/lib/queries";

export const metadata: Metadata = { title: "Events" };
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <>
      <PageHeader
        titleEn="Events"
        titleBn="অনুষ্ঠানসমূহ"
        subtitleEn="Upcoming programs and activities."
        subtitleBn="আসন্ন কর্মসূচি ও কার্যক্রম।"
      />
      <ContentWrap>
        <DatedList items={events} />
      </ContentWrap>
    </>
  );
}
