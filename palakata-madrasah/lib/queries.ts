import { prisma } from "@/lib/db";
import {
  events as sampleEvents,
  notices as sampleNotices,
  type DatedItem,
} from "@/lib/sample-data";

/**
 * Read helpers for public pages. Each falls back to placeholder sample data if
 * the database is unreachable or empty, so the site always renders.
 */

export async function getNotices(limit?: number): Promise<DatedItem[]> {
  try {
    const rows = await prisma.notice.findMany({
      where: { isPublished: true },
      orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
      take: limit,
    });
    if (rows.length === 0) return limit ? sampleNotices.slice(0, limit) : sampleNotices;
    return rows.map((n) => ({
      id: n.id,
      date: n.publishedAt.toISOString(),
      title: { en: n.titleEn, bn: n.titleBn },
      href: "/notice",
    }));
  } catch {
    return limit ? sampleNotices.slice(0, limit) : sampleNotices;
  }
}

export async function getEvents(limit?: number): Promise<DatedItem[]> {
  try {
    const rows = await prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { eventDate: "asc" },
      take: limit,
    });
    if (rows.length === 0) return limit ? sampleEvents.slice(0, limit) : sampleEvents;
    return rows.map((e) => ({
      id: e.id,
      date: e.eventDate.toISOString(),
      title: { en: e.titleEn, bn: e.titleBn },
      href: "/events",
    }));
  } catch {
    return limit ? sampleEvents.slice(0, limit) : sampleEvents;
  }
}
