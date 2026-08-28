"use client";

import { useEffect, useState } from "react";
import {
  currentStreak,
  dateKey,
  loadEntries,
  upsertEntryForToday,
  type JournalEntry,
} from "@/lib/journal";
import { verseOfToday } from "@/lib/verses";
import StreakBadge from "./StreakBadge";

export default function TodayJournal() {
  const [entries, setEntries] = useState<JournalEntry[] | null>(null);
  const [reflection, setReflection] = useState("");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    const loaded = loadEntries();
    setEntries(loaded);
    const today = loaded.find((e) => e.dateKey === dateKey(new Date()));
    if (today) setReflection(today.reflection);
  }, []);

  if (entries === null) {
    return (
      <div className="animate-pulse rounded-2xl border border-line bg-card p-6">
        <div className="h-4 w-40 rounded bg-ink/10" />
      </div>
    );
  }

  const streak = currentStreak(entries);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reflection.trim()) return;
    const updated = upsertEntryForToday({
      verseReference: verseOfToday().reference,
      reflection: reflection.trim(),
    });
    setEntries(updated);
    setSavedAt(Date.now());
  }

  return (
    <div className="rounded-2xl border border-line bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-lg text-ink">
          Today's devotional
        </h2>
        <StreakBadge streak={streak} />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={reflection}
          onChange={(e) => {
            setReflection(e.target.value);
            setSavedAt(null);
          }}
          placeholder="What is God saying to you through today's verse?"
          rows={4}
          className="resize-none rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Save devotional
          </button>
          {savedAt && (
            <span className="text-xs text-muted">Saved ✓</span>
          )}
        </div>
      </form>
    </div>
  );
}
