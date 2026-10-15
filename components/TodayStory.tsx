"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { localizeStory, readingMinutes, storyOfToday, type Story } from "@/lib/stories";
import { Han, useLang, useT } from "@/components/i18n";
import { withLang } from "@/lib/i18n/config";

export default function TodayStory() {
  const lang = useLang();
  const t = useT();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    setStory(localizeStory(storyOfToday(), lang));
  }, [lang]);

  if (!story) {
    return <div className="h-28 animate-pulse rounded-2xl border border-line bg-card" />;
  }

  return (
    <Link
      href={withLang(lang, `/stories/${story.slug}`)}
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
        <p className="text-xs uppercase tracking-[0.2em] text-accent-strong">{t.home.todaysStory}</p>
        <p className="mt-1 font-serif text-lg leading-snug text-ink">
          <Han>{story.title}</Han>
        </p>
        <p className="text-xs text-muted">
          {story.verseRef} · {t.home.minRead(readingMinutes(story.body))}
        </p>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink/70">
          <Han>{story.summary}</Han>
        </p>
      </div>
    </Link>
  );
}
