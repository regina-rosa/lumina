// A devotional the author writes and shares. The "shared" subset is what
// gets encoded into a link; the stored version adds a local id.

export type SharedDevotional = {
  title: string;
  author: string;
  verseRef: string;
  body: string;
  coverColor: string; // hex, baked in so it looks the same for every reader
  createdAt: string; // ISO timestamp
};

export type Devotional = SharedDevotional & { id: string };

export const COVER_COLORS: { id: string; label: string; color: string }[] = [
  { id: "amber", label: "Amber", color: "#f59e0b" },
  { id: "orange", label: "Orange", color: "#f97316" },
  { id: "rose", label: "Rose", color: "#f43f5e" },
  { id: "violet", label: "Violet", color: "#8b5cf6" },
  { id: "sky", label: "Sky", color: "#0ea5e9" },
  { id: "emerald", label: "Emerald", color: "#10b981" },
];

const STORAGE_KEY = "lumina.devotionals";

export function loadDevotionals(): Devotional[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Devotional[];
    return parsed.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

function save(devotionals: Devotional[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(devotionals));
}

export function getDevotional(id: string): Devotional | undefined {
  return loadDevotionals().find((d) => d.id === id);
}

export function upsertDevotional(input: {
  id?: string;
  title: string;
  author: string;
  verseRef: string;
  body: string;
  coverColor: string;
}): Devotional {
  const devotionals = loadDevotionals();
  const existing = input.id
    ? devotionals.find((d) => d.id === input.id)
    : undefined;

  const devotional: Devotional = {
    id: existing?.id ?? crypto.randomUUID(),
    title: input.title,
    author: input.author,
    verseRef: input.verseRef,
    body: input.body,
    coverColor: input.coverColor,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };

  const next = existing
    ? devotionals.map((d) => (d.id === devotional.id ? devotional : d))
    : [devotional, ...devotionals];

  save(next.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  return devotional;
}

export function deleteDevotional(id: string): Devotional[] {
  const remaining = loadDevotionals().filter((d) => d.id !== id);
  save(remaining);
  return remaining;
}

export function toShared(devotional: SharedDevotional): SharedDevotional {
  return {
    title: devotional.title,
    author: devotional.author,
    verseRef: devotional.verseRef,
    body: devotional.body,
    coverColor: devotional.coverColor,
    createdAt: devotional.createdAt,
  };
}

export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
