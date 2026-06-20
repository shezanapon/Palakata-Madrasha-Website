import { UtilityBar } from "@/components/layout/utility-bar";
import { Header } from "@/components/layout/header";
import { MenuBar } from "@/components/layout/menu-bar";
import { NoticeTicker } from "@/components/layout/notice-ticker";
import { Footer } from "@/components/layout/footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UtilityBar />
      <Header />
      <MenuBar />
      <NoticeTicker />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
