import { HeroSlider } from "@/components/home/hero-slider";
import { WelcomeSection } from "@/components/home/welcome-section";
import { SidebarCards } from "@/components/home/sidebar-cards";
import { InfoCards } from "@/components/home/info-cards";
import { StatsBand } from "@/components/home/stats-band";

export default function HomePage() {
  return (
    <>
      {/* Hero band. `relative` anchors the decorative glow; `isolate` keeps
          it from painting over anything outside this section. */}
      <section className="relative isolate py-12 lg:py-22">
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px]"
        />
        <div className="mx-auto max-w-page px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="flex flex-col gap-8">
              <HeroSlider />
              <WelcomeSection />
            </div>
            <SidebarCards />
          </div>
        </div>
      </section>

      {/* Alternating surface for rhythm — no divider rules between sections. */}
      <section className="bg-surface py-12 lg:py-22">
        <InfoCards />
      </section>

      <StatsBand />
    </>
  );
}
