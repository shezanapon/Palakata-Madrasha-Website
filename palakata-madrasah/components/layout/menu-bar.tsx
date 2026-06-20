"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLang } from "@/components/i18n/language-provider";
import { navItems, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MenuBar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-white shadow-[0_2px_6px_rgba(15,58,46,0.05)]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:justify-center">
        {/* Desktop nav */}
        <ul className="hidden flex-wrap items-center justify-center lg:flex">
          {navItems.map((item) => (
            <li key={item.en} className="group relative">
              <Link
                href={item.href ?? "#"}
                className="flex items-center gap-1 border-b-[3px] border-transparent px-3.5 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-orange hover:text-green-dark"
              >
                {t(item.en, item.bn)}
                {item.children && (
                  <ChevronDown className="size-3 opacity-70" strokeWidth={2} />
                )}
              </Link>

              {item.children && (
                <ul className="invisible absolute left-0 top-full min-w-[220px] -translate-y-1 rounded-b-md border border-t-[3px] border-line border-t-orange bg-white p-1.5 opacity-0 shadow-[0_10px_30px_rgba(15,58,46,0.15)] transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <li key={child.en}>
                      <Link
                        href={child.href ?? "#"}
                        className="block rounded px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-secondary hover:pl-5 hover:text-green-dark"
                      >
                        {t(child.en, child.bn)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <span className="py-3 text-sm font-bold text-green-dark lg:hidden">
          {t("Menu", "মেনু")}
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 p-3 text-green-dark lg:hidden"
          aria-expanded={open}
          aria-label={t("Toggle menu", "মেনু খুলুন")}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
          <span className="sr-only">menu</span>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="max-h-[70vh] overflow-y-auto border-t border-line bg-white px-4 pb-5 pt-2 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mb-1 ml-auto flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-muted-ink"
          >
            <X className="size-4" /> {t("Close", "বন্ধ")}
          </button>
          <ul>
            {navItems.map((item) => (
              <MobileNavItem key={item.en} item={item} onNavigate={() => setOpen(false)} />
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

function MobileNavItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);
  const hasChildren = !!item.children?.length;

  return (
    <li className="border-b border-line">
      <div className="flex items-center justify-between">
        <Link
          href={item.href ?? "#"}
          onClick={onNavigate}
          className="block flex-1 py-3 text-sm font-semibold text-ink"
        >
          {t(item.en, item.bn)}
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={t("Expand", "খুলুন")}
            className="p-2 text-muted-ink"
          >
            <ChevronDown
              className={cn("size-4 transition-transform", expanded && "rotate-180")}
            />
          </button>
        )}
      </div>
      {hasChildren && expanded && (
        <ul className="pb-2 pl-4">
          {item.children!.map((child) => (
            <li key={child.en}>
              <Link
                href={child.href ?? "#"}
                onClick={onNavigate}
                className="block py-2 text-[13px] text-muted-ink hover:text-green-dark"
              >
                {t(child.en, child.bn)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
