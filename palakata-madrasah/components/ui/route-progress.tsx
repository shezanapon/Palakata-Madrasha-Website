"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/i18n/language-provider";

/**
 * Global navigation progress bar.
 *
 * The App Router has no router events, and `useLinkStatus` only works inside a
 * <Link> subtree — and its docs note the pending state is skipped entirely once
 * a route is prefetched, which is most of this site. So navigation start is
 * detected by intercepting anchor clicks in the capture phase, and completion
 * by watching usePathname().
 *
 * SHOW_DELAY exists so instant (prefetched, static) navigations never flash a
 * bar: if the route resolves inside the delay the bar is simply never shown.
 */
const SHOW_DELAY = 120;
const CREEP_INTERVAL = 200;
const FADE_OUT = 260;

export function RouteProgress() {
  const { t } = useLang();
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);

  const showTimer = useRef<number | null>(null);
  const creepTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const navigating = useRef(false);
  const mounted = useRef(false);

  const clearTimers = useCallback(() => {
    if (showTimer.current) window.clearTimeout(showTimer.current);
    if (creepTimer.current) window.clearInterval(creepTimer.current);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    showTimer.current = creepTimer.current = hideTimer.current = null;
  }, []);

  const start = useCallback(() => {
    if (navigating.current) return;
    navigating.current = true;
    clearTimers();

    showTimer.current = window.setTimeout(() => {
      setVisible(true);
      setValue(8);
      // Ease toward 90% and wait there — never claim completion early.
      creepTimer.current = window.setInterval(() => {
        setValue((v) => (v >= 90 ? v : v + Math.max(0.4, (90 - v) * 0.08)));
      }, CREEP_INTERVAL);
    }, SHOW_DELAY);
  }, [clearTimers]);

  const finish = useCallback(() => {
    const wasShown = navigating.current && showTimer.current === null;
    navigating.current = false;
    clearTimers();

    if (!wasShown) {
      // Resolved inside SHOW_DELAY — nothing was ever painted.
      setVisible(false);
      setValue(0);
      return;
    }

    setValue(100);
    hideTimer.current = window.setTimeout(() => {
      setVisible(false);
      setValue(0);
    }, FADE_OUT);
  }, [clearTimers]);

  // --- navigation start -----------------------------------------------------
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // new tab etc.

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // external
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return; // same page or pure hash change
      }

      start();
    };

    // Back/forward buttons also navigate.
    const onPopState = () => start();

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("popstate", onPopState);
    };
  }, [start]);

  // --- navigation complete --------------------------------------------------
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    // Deferred so the state update is not synchronous inside the effect body.
    const id = window.setTimeout(finish, 0);
    return () => window.clearTimeout(id);
  }, [pathname, finish]);

  useEffect(() => clearTimers, [clearTimers]);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      aria-label={t("Loading page", "পেজ লোড হচ্ছে")}
      className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-transparent"
    >
      <div
        className="bg-brand-600 h-full motion-safe:transition-[width] motion-safe:duration-200 motion-safe:ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
