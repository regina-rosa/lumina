import Link from "next/link";
import { readingTime, formatDate } from "@/lib/devotionals";
import { listDevotionals } from "@/lib/devotionalStore";
import DeleteDevotional from "@/components/DeleteDevotional";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function DevotionalsPage() {
  const devotionals = await listDevotionals();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-ink">Devotionals</h1>
          <p className="mt-1 text-sm text-muted">
            Reflections to read and share. Anyone with this page can read them.
          </p>
        </div>
        <Link
          href="/write"
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          + Write
        </Link>
      </div>

      {devotionals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-card p-10 text-center">
          <p className="text-sm text-muted">
            No devotionals published yet. Write the first one.
          </p>
          <Link
            href="/write"
            className="mt-4 inline-block rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Start writing
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {devotionals.map((devotional) => {
            const excerpt = devotional.body
              .replace(/\s+/g, " ")
              .slice(0, 140)
              .trim();
            return (
              <li
                key={devotional.id}
                className="overflow-hidden rounded-2xl border border-line bg-card"
              >
                <Link href={`/read/${devotional.id}`} className="flex gap-4 p-5">
                  <span
                    aria-hidden
                    className="h-16 w-16 shrink-0 rounded-xl sm:h-20 sm:w-20"
                    style={{
                      background: `radial-gradient(120% 120% at 20% 0%, ${devotional.coverColor}, color-mix(in srgb, ${devotional.coverColor} 25%, #16120e))`,
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-lg leading-snug text-ink">
                      {devotional.title}
                    </p>
                    <p className="text-xs text-muted">
                      {devotional.author.trim() || "Anonymous"} ·{" "}
                      {formatDate(devotional.createdAt)} ·{" "}
                      {readingTime(devotional.body)} min read
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-sm text-ink/70">
                      {excerpt}
                      {devotional.body.length > 140 ? "…" : ""}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end gap-4 border-t border-line px-5 py-2.5 text-xs">
                  <Link
                    href={`/write?id=${devotional.id}`}
                    className="text-muted hover:text-ink"
                  >
                    Edit
                  </Link>
                  <DeleteDevotional id={devotional.id} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
