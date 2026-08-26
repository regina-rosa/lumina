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
      <div className="animate-pulse rounded-2xl border border-black/10 bg-white/60 p-6">
        <div className="h-4 w-40 rounded bg-black/10" />
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
    <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-lg text-[#1c1917]">
          Renungan hari ini
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
          placeholder="Apa yang Tuhan bicarakan lewat ayat hari ini?"
          rows={4}
          className="resize-none rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-[#1c1917] outline-none placeholder:text-[#1c1917]/40 focus:border-amber-500/60"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-full bg-[#1c1917] px-5 py-2 text-sm font-medium text-[#faf8f3] transition-colors hover:bg-[#1c1917]/85"
          >
            Simpan renungan
          </button>
          {savedAt && (
            <span className="text-xs text-[#1c1917]/50">Tersimpan ✓</span>
          )}
        </div>
      </form>
    </div>
  );
}
