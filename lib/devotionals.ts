// A devotional published earlier. New ones can't be written anymore; old
// links under /read/<id> still open read-only.

export type SharedDevotional = {
  title: string;
  author: string;
  verseRef: string;
  body: string;
  coverColor: string; // hex, baked in so it looks the same for every reader
  createdAt: string; // ISO timestamp
};

export type Devotional = SharedDevotional & { id: string };

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
