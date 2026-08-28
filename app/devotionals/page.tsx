"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  deleteDevotional,
  formatDate,
  loadDevotionals,
  readingTime,
  toShared,
  type Devotional,
} from "@/lib/devotionals";
import { buildShareUrl } from "@/lib/share";

function DevotionalRow({
  devotional,
  onDelete,
}: {
  devotional: Devotional;
  onDelete: (id: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = buildShareUrl(window.location.origin, toShared(devotional));
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <li className="flex items-start gap-4 rounded-2xl border border-line bg-card p-5">
      <span
        aria-hidden
        className="mt-1 h-10 w-10 shrink-0 rounded-lg"
        style={{
          background: `linear-gradient(135deg, ${devotional.coverColor}, color-mix(in srgb, ${devotional.coverColor} 30%, transparent))`,
        }}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-serif text-lg text-ink">
          {devotional.title}
        </p>
        <p className="text-xs text-muted">
          {formatDate(devotional.createdAt)} · {readingTime(devotional.body)} min
          read
          {devotional.verseRef ? ` · ${devotional.verseRef}` : ""}
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          <button
            onClick={copyLink}
            className="font-medium text-accent-strong hover:text-accent"
          >
            {copied ? "Copied ✓" : "Copy link"}
          </button>
          <Link
            href={`/write?id=${devotional.id}`}
            className="text-muted hover:text-ink"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(devotional.id)}
            className="text-muted hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default function DevotionalsPage() {
  const [devotionals, setDevotionals] = useState<Devotional[] | null>(null);

  useEffect(() => {
    setDevotionals(loadDevotionals());
  }, []);

  if (devotionals === null) {
    return <p className="text-sm text-muted">Loading…</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-ink">My devotionals</h1>
          <p className="mt-1 text-sm text-muted">
            Everything you&apos;ve written, ready to share.
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
            No devotionals yet. Write your first one and share it with the
            world.
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
          {devotionals.map((devotional) => (
            <DevotionalRow
              key={devotional.id}
              devotional={devotional}
              onDelete={(id) => setDevotionals(deleteDevotional(id))}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
