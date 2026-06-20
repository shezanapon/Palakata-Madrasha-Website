import { QuranAnimation } from "@/components/home/quran-animation";
import { HeroSlider } from "@/components/home/hero-slider";
import { WelcomeSection } from "@/components/home/welcome-section";
import { SidebarCards } from "@/components/home/sidebar-cards";
import { InfoCards } from "@/components/home/info-cards";
import { StatsBand } from "@/components/home/stats-band";

export default function HomePage() {
  return (
    <>
      <QuranAnimation />

      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            <HeroSlider />
            <WelcomeSection />
          </div>
          <SidebarCards />
        </div>
      </div>

      <InfoCards />
      <StatsBand />
    </>
  );
}
