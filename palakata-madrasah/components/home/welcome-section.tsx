"use client";

import { useLang } from "@/components/i18n/language-provider";
import { site } from "@/lib/site";

export function WelcomeSection() {
  const { t } = useLang();

  return (
    <section className="mt-6 rounded-lg border border-line bg-white p-6 shadow-sm sm:p-9">
      <h2 className="font-display mb-4 inline-block border-b-2 border-gold pb-2.5 text-2xl font-semibold text-green-dark sm:text-[26px]">
        {t("Welcome", "স্বাগতম")}
      </h2>

      <p className="mb-3.5 font-semibold italic text-green-dark">
        {t("Assalamu Alaikum Wa Rahmatullah", "আসসালামু আলাইকুম ওয়া রহমাতুল্লাহ")}
      </p>

      <div className="space-y-3.5 text-[14.5px] leading-[1.85] text-[#374151]">
        <p>
          {t(
            `Welcome to the official website of ${site.name.en}. For decades our institution has combined authentic Islamic scholarship with modern academic excellence, preparing students to serve their faith, family and nation.`,
            `${site.name.bn}-এর অফিসিয়াল ওয়েবসাইটে আপনাকে স্বাগতম। কয়েক দশক ধরে আমাদের প্রতিষ্ঠান প্রকৃত ইসলামি জ্ঞানের সাথে আধুনিক শিক্ষার সমন্বয় ঘটিয়ে শিক্ষার্থীদের দ্বীন, পরিবার ও জাতির সেবায় প্রস্তুত করে আসছে।`
          )}
        </p>
        <p>
          {t(
            "Our dedicated teachers, disciplined environment and Qur'an-centred curriculum nurture both knowledge and good character (akhlaq). We invite you to explore our programs, facilities and achievements.",
            "আমাদের নিবেদিতপ্রাণ শিক্ষকবৃন্দ, সুশৃঙ্খল পরিবেশ এবং কুরআন-কেন্দ্রিক পাঠ্যক্রম জ্ঞান ও উত্তম চরিত্র (আখলাক) উভয়ই গঠন করে। আমাদের প্রোগ্রাম, সুযোগ-সুবিধা ও অর্জন সম্পর্কে জানতে আপনাকে আমন্ত্রণ জানাই।"
          )}
        </p>
      </div>

      <div className="mt-5 border-t border-dashed border-line pt-3.5 text-[13px] text-muted-ink">
        <strong className="font-bold text-green-dark">
          {t(site.principal.name.en, site.principal.name.bn)}
        </strong>{" "}
        — {t(site.principal.title.en, site.principal.title.bn)}, {t(site.name.en, site.name.bn)}
      </div>
    </section>
  );
}
