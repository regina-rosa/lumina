"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadReadStories, setStoryRead } from "@/lib/activity";
import { stories } from "@/lib/stories";

function useReadStories() {
  const [read, setRead] = useState<Record<string, string> | null>(null);
  useEffect(() => {
    setRead(loadReadStories());
  }, []);
  return [read, setRead] as const;
}

// Progress bar and "continue" link at the top of the stories list.
export function StoriesProgress() {
  const [read] = useReadStories();
  if (!read) return <div className="h-[72px]" />;

  const count = stories.filter((s) => read[s.slug]).length;
  const next = stories.find((s) => !read[s.slug]);
  const percent = Math.round((count / stories.length) * 100);

  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      <div className="flex items-center justify-between gap-3 text-sm">
        <p className="shrink-0 whitespace-nowrap text-ink">
          <span className="font-medium">{count}</span>
          <span className="text-muted"> of {stories.length} read</span>
        </p>
        {next ? (
          <Link
            href={`/stories/${next.slug}`}
            className="min-w-0 truncate font-medium text-accent-strong hover:text-accent"
          >
            {count === 0 ? "Start" : "Continue"}: {next.title} →
          </Link>
        ) : (
          <p className="font-medium text-accent-strong">All done! 🎉</p>
        )}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// Small check shown next to a story in the list once it's been read.
export function ReadMark({ slug }: { slug: string }) {
  const [read] = useReadStories();
  if (!read?.[slug]) return null;
  return (
    <span className="ml-1.5 text-xs font-medium text-accent-strong" title="Read">
      ✓ read
    </span>
  );
}

// Toggle at the end of a story.
export function MarkReadButton({ slug }: { slug: string }) {
  const [read, setRead] = useReadStories();
  if (!read) return null;
  const isRead = Boolean(read[slug]);

  return (
    <button
      onClick={() => setRead({ ...setStoryRead(slug, !isRead) })}
      className={`self-start rounded-full px-5 py-2 text-sm font-medium transition-colors ${
        isRead
          ? "border border-accent/40 bg-accent/10 text-accent-strong"
          : "bg-accent text-white hover:opacity-90"
      }`}
    >
      {isRead ? "✓ Read" : "Mark as read"}
    </button>
  );
}
