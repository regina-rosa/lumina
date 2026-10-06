"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readingTime } from "@/lib/devotionals";
import { stories, storyOfToday, type Story } from "@/lib/stories";
import { loadReadStories } from "@/lib/activity";

export default function TodayStory() {
  const [story, setStory] = useState<Story | null>(null);
  const [upNext, setUpNext] = useState(false);

  useEffect(() => {
    // Once today's story is read, suggest the next unread one instead.
    const read = loadReadStories();
    const today = storyOfToday();
    const next = read[today.slug] ? stories.find((s) => !read[s.slug]) : undefined;
    setStory(next ?? today);
    setUpNext(Boolean(next));
  }, []);

  if (!story) {
    return <div className="h-28 animate-pulse rounded-2xl border border-line bg-card" />;
  }

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="flex gap-4 rounded-2xl border border-line bg-card p-5 transition-colors hover:border-accent/40"
    >
      <span
        aria-hidden
        className="h-16 w-16 shrink-0 rounded-xl"
        style={{
          background: `radial-gradient(120% 120% at 20% 0%, ${story.coverColor}, color-mix(in srgb, ${story.coverColor} 25%, #16120e))`,
        }}
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-[0.2em] text-accent-strong">
          {upNext ? "Up next for you" : "Today\u2019s story"}
        </p>
        <p className="mt-1 font-serif text-lg leading-snug text-ink">
          {story.title}
        </p>
        <p className="text-xs text-muted">
          {story.verseRef} · {readingTime(story.body)} min read
        </p>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink/70">
          {story.summary}
        </p>
      </div>
    </Link>
  );
}
