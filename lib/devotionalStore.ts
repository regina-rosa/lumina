// Server-only data layer backed by Netlify Blobs. Do NOT import this from
// client components — it is used by route handlers and server components only.
import { getStore } from "@netlify/blobs";
import type { Devotional } from "./devotionals";

function store() {
  // Strong consistency so a freshly published devotional shows up in the
  // feed immediately.
  return getStore({ name: "devotionals", consistency: "strong" });
}

export async function listDevotionals(): Promise<Devotional[]> {
  const s = store();
  const { blobs } = await s.list();
  const items = await Promise.all(
    blobs.map(
      (b) => s.get(b.key, { type: "json" }) as Promise<Devotional | null>
    )
  );
  return items
    .filter((d): d is Devotional => Boolean(d))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getDevotionalById(
  id: string
): Promise<Devotional | null> {
  return (await store().get(id, { type: "json" })) as Devotional | null;
}

export async function putDevotional(devotional: Devotional): Promise<void> {
  await store().setJSON(devotional.id, devotional);
}

export async function removeDevotional(id: string): Promise<void> {
  await store().delete(id);
}
