"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Bell,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserCog,
  UserRound,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { MadrasahSeal } from "@/components/ui/madrasah-seal";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLang } from "@/components/i18n/language-provider";
import type { AppRole } from "@/types/next-auth";
import { cn } from "@/lib/utils";

interface NavLink {
  en: string;
  bn: string;
  href: string;
  icon: LucideIcon;
}

const ADMIN_NAV: NavLink[] = [
  { en: "Overview", bn: "ওভারভিউ", href: "/dashboard", icon: LayoutDashboard },
  { en: "Students", bn: "শিক্ষার্থী", href: "/dashboard/students", icon: Users },
  { en: "Results", bn: "ফলাফল", href: "/dashboard/results", icon: ClipboardList },
  { en: "Finance", bn: "অর্থ", href: "/dashboard/finance", icon: Wallet },
  { en: "Notices", bn: "নোটিশ", href: "/dashboard/notices", icon: Bell },
  { en: "Events", bn: "অনুষ্ঠান", href: "/dashboard/events", icon: CalendarDays },
  { en: "Gallery", bn: "গ্যালারি", href: "/dashboard/gallery", icon: ImageIcon },
  { en: "Teachers", bn: "শিক্ষক", href: "/dashboard/teachers", icon: GraduationCap },
  { en: "User Accounts", bn: "ব্যবহারকারী", href: "/dashboard/users", icon: UserCog },
  { en: "Settings", bn: "সেটিংস", href: "/dashboard/settings", icon: Settings },
];

const TEACHER_NAV: NavLink[] = [
  { en: "Overview", bn: "ওভারভিউ", href: "/dashboard", icon: LayoutDashboard },
  { en: "Enter Results", bn: "ফলাফল এন্ট্রি", href: "/dashboard/results", icon: ClipboardList },
  { en: "Notices", bn: "নোটিশ", href: "/dashboard/notices", icon: Bell },
];

const STUDENT_NAV: NavLink[] = [
  { en: "My Profile", bn: "আমার প্রোফাইল", href: "#profile", icon: UserRound },
  { en: "My Results", bn: "আমার ফলাফল", href: "#results", icon: ClipboardList },
  { en: "Attendance", bn: "উপস্থিতি", href: "#attendance", icon: CalendarDays },
  { en: "Fees", bn: "ফি", href: "#fees", icon: Wallet },
  { en: "Notices", bn: "নোটিশ", href: "#notices", icon: Bell },
];

function navFor(role: AppRole): NavLink[] {
  if (role === "STUDENT") return STUDENT_NAV;
  if (role === "TEACHER") return TEACHER_NAV;
  return ADMIN_NAV; // ADMIN, PRINCIPAL
}

export function DashboardShell({
  role,
  name,
  username,
  children,
}: {
  role: AppRole;
  name: string;
  username: string;
  children: React.ReactNode;
}) {
  const { t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = navFor(role);

  const roleLabel: Record<AppRole, [string, string]> = {
    PRINCIPAL: ["Principal", "অধ্যক্ষ"],
    ADMIN: ["Administrator", "প্রশাসক"],
    TEACHER: ["Teacher", "শিক্ষক"],
    STUDENT: ["Student", "শিক্ষার্থী"],
  };

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-green-dark transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-2.5 border-b border-gold/20 p-4">
          <MadrasahSeal className="size-9 shrink-0" />
          <span className="font-display text-[13px] font-semibold leading-tight text-white">
            {t("Palakata Madrasah", "পালাকাটা মাদ্রাসা")}
          </span>
          <button onClick={() => setOpen(false)} className="ml-auto text-white/70 lg:hidden">
            <X className="size-5" />
          </button>
        </div>

        <div className="m-4 rounded-md border border-gold/30 bg-gold/15 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-gold/70">{t("Logged in as", "লগইন")}</p>
          <p className="text-sm font-semibold text-gold">{name}</p>
          <p className="text-[11px] text-white/50">
            @{username} · {t(roleLabel[role][0], roleLabel[role][1])}
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto py-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const isAnchor = item.href.startsWith("#");
            const active = !isAnchor && pathname === item.href;
            const className = cn(
              "flex items-center gap-3 border-l-[3px] px-4 py-2.5 text-[13px] transition-colors hover:bg-white/[0.07] hover:text-white",
              active
                ? "border-gold bg-white/[0.07] text-white"
                : "border-transparent text-white/75 hover:border-gold"
            );
            const inner = (
              <>
                <Icon className="size-4 shrink-0" strokeWidth={1.5} />
                {t(item.en, item.bn)}
              </>
            );
            return isAnchor ? (
              <a key={item.en} href={item.href} onClick={() => setOpen(false)} className={className}>
                {inner}
              </a>
            ) : (
              <Link key={item.en} href={item.href} onClick={() => setOpen(false)} className={className}>
                {inner}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => signOut({ redirectTo: "/" })}
          className="m-4 flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 py-2.5 text-[13px] text-white/70 transition-colors hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
        >
          <LogOut className="size-4" strokeWidth={1.5} />
          {t("Logout", "লগআউট")}
        </button>
      </aside>

      {/* Backdrop for mobile */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white px-4 py-3 lg:px-6">
          <button onClick={() => setOpen(true)} className="text-green-dark lg:hidden" aria-label="Open menu">
            <Menu className="size-6" />
          </button>
          <h1 className="font-display text-lg font-semibold text-green-dark">
            {t("Dashboard", "ড্যাশবোর্ড")}
          </h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden text-sm text-muted-ink hover:text-green-dark sm:inline">
              {t("View site", "সাইট দেখুন")}
            </Link>
            <LanguageToggle />
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
