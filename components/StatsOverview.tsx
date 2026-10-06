"use client";

import { useEffect, useState } from "react";
import { loadEntries } from "@/lib/journal";
import { dailyStreak, loadReadStories } from "@/lib/activity";
import { loadPrayers } from "@/lib/prayers";

type Stat = { label: string; value: number };

export default function StatsOverview() {
  const [stats, setStats] = useState<Stat[] | null>(null);

  useEffect(() => {
    const entries = loadEntries();
    const prayers = loadPrayers();
    setStats([
      { label: "Day streak", value: dailyStreak() },
      { label: "Stories read", value: Object.keys(loadReadStories()).length },
      { label: "Journal entries", value: entries.length },
      { label: "Prayers answered", value: prayers.filter((p) => p.answeredAt).length },
    ]);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {(stats ?? Array.from({ length: 4 }, () => null)).map((stat, i) => (
        <div
          key={stat?.label ?? i}
          className="rounded-2xl border border-line bg-card p-4"
        >
          {stat ? (
            <>
              <p className="font-serif text-2xl text-accent-strong">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
            </>
          ) : (
            <div className="animate-pulse space-y-2">
              <div className="h-7 w-8 rounded bg-ink/10" />
              <div className="h-3 w-16 rounded bg-ink/10" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
