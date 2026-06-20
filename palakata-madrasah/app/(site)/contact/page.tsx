import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { ContentWrap, PageHeader } from "@/components/content/primitives";
import { ContactForm } from "@/components/content/contact-form";
import { T } from "@/components/i18n/language-provider";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        titleEn="Contact Us"
        titleBn="যোগাযোগ"
        subtitleEn="We would love to hear from you."
        subtitleBn="আমরা আপনার কাছ থেকে শুনতে আগ্রহী।"
      />
      <ContentWrap>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Info */}
          <div className="space-y-3">
            <ContactRow icon={<MapPin className="size-5" strokeWidth={1.5} />} label={<T en="Address" bn="ঠিকানা" />}>
              <T en={site.contact.address.en} bn={site.contact.address.bn} />
            </ContactRow>
            <ContactRow icon={<Phone className="size-5" strokeWidth={1.5} />} label={<T en="Phone" bn="ফোন" />}>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} dir="ltr" className="hover:text-orange">
                {site.contact.phone}
              </a>
            </ContactRow>
            <ContactRow icon={<Mail className="size-5" strokeWidth={1.5} />} label={<T en="Email" bn="ইমেইল" />}>
              <a href={`mailto:${site.contact.email}`} className="hover:text-orange">
                {site.contact.email}
              </a>
            </ContactRow>
            <ContactRow icon={<Clock className="size-5" strokeWidth={1.5} />} label={<T en="Office Hours" bn="অফিস সময়" />}>
              <T en="Sat–Thu, 9:00 AM – 4:00 PM" bn="শনি–বৃহঃ, সকাল ৯টা – বিকাল ৪টা" />
            </ContactRow>

            <div className="flex aspect-video items-center justify-center rounded-lg border border-line bg-secondary text-sm text-muted-ink">
              <T en="[ Map location — embed Google Map ]" bn="[ মানচিত্র — গুগল ম্যাপ যুক্ত করুন ]" />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display mb-4 inline-block border-b-2 border-gold pb-2 text-xl font-semibold text-green-dark">
              <T en="Send a Message" bn="বার্তা পাঠান" />
            </h2>
            <ContactForm />
          </div>
        </div>
      </ContentWrap>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-line bg-white p-4 shadow-sm">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-dark text-gold">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-ink">{label}</p>
        <p className="mt-0.5 text-sm text-ink">{children}</p>
      </div>
    </div>
  );
}
