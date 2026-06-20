import type { Metadata } from "next";
import { ImageIcon } from "lucide-react";
import { ContentWrap, PageHeader } from "@/components/content/primitives";
import { T } from "@/components/i18n/language-provider";

export const metadata: Metadata = { title: "Gallery" };

const tiles = [
  { en: "Annual Sports Day", bn: "বার্ষিক ক্রীড়া দিবস" },
  { en: "Qira'at Competition", bn: "কিরাত প্রতিযোগিতা" },
  { en: "Campus & Mosque", bn: "ক্যাম্পাস ও মসজিদ" },
  { en: "Dakhil Result Celebration", bn: "দাখিল ফলাফল উদযাপন" },
  { en: "Seerat Conference", bn: "সীরাত সম্মেলন" },
  { en: "Classroom Activities", bn: "শ্রেণিকক্ষ কার্যক্রম" },
  { en: "Library", bn: "গ্রন্থাগার" },
  { en: "Graduation Day", bn: "সমাবর্তন দিবস" },
];

const GRADS = [
  "from-[#7a9fb5] to-[#3f6b87]",
  "from-[#8a9c7a] to-[#4f6342]",
  "from-[#9f8a6b] to-[#6e5634]",
  "from-[#6b8e9f] to-[#345b6e]",
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        titleEn="Photo Gallery"
        titleBn="ছবি গ্যালারি"
        subtitleEn="Moments from campus life, events and achievements."
        subtitleBn="ক্যাম্পাস জীবন, অনুষ্ঠান ও অর্জনের মুহূর্ত।"
      />
      <ContentWrap>
        <div id="photos" className="grid scroll-mt-24 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile, i) => (
            <figure
              key={i}
              className="group overflow-hidden rounded-lg border border-line bg-white shadow-sm"
            >
              <div
                className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${GRADS[i % GRADS.length]}`}
              >
                <ImageIcon className="size-9 text-white/70" strokeWidth={1.2} />
              </div>
              <figcaption className="p-3 text-center text-[13px] font-medium text-ink">
                <T en={tile.en} bn={tile.bn} />
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="text-center text-sm text-muted-ink">
          <T
            en="[UPDATE: Replace these placeholders with real gallery images uploaded from the admin panel.]"
            bn="[UPDATE: এই প্লেসহোল্ডারগুলো অ্যাডমিন প্যানেল থেকে আপলোড করা প্রকৃত গ্যালারি ছবি দিয়ে প্রতিস্থাপন করুন।]"
          />
        </p>
      </ContentWrap>
    </>
  );
}
