"use client";

import { useEffect, useState } from "react";
import Flower from "@/components/Flower";
import { activityByDay, dailyStreak, longestStreak, type DayActivity } from "@/lib/activity";
import { dateKey } from "@/lib/journal";
import { loadName } from "@/lib/profile";

const WEEKS = 5;

const KIND_LABELS: Record<string, string> = {
  checkin: "checked in 💛",
  story: "read a Bible story 📖",
  quiet: "had quiet time 🕯️",
  memorize: "memorized a verse 🌱",
};

type Plot = { key: string; date: Date; day?: DayActivity; isToday: boolean };

function stageFor(day?: DayActivity): number {
  if (!day) return 0;
  return Math.min(4, day.kinds.length + (day.journaled ? 1 : 0));
}

// Stable "random" color per day so the garden looks the same each visit.
function seedFor(key: string): number {
  return key.split("").reduce((sum, ch) => sum + ch.charCodeAt(0) * 7, 0);
}

export default function GardenPage() {
  const [plots, setPlots] = useState<Plot[] | null>(null);
  const [name, setName] = useState("");
  const [stats, setStats] = useState({ bloomed: 0, full: 0, streak: 0, best: 0 });
  const [selected, setSelected] = useState<Plot | null>(null);

  useEffect(() => {
    const days = activityByDay();
    const today = new Date();
    // Start on a Monday so each row is a week.
    const start = new Date(today);
    start.setDate(today.getDate() - ((today.getDay() + 6) % 7) - (WEEKS - 1) * 7);
    const list: Plot[] = Array.from({ length: WEEKS * 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const key = dateKey(date);
      return { key, date, day: days[key], isToday: key === dateKey(today) };
    });
    setPlots(list);
    setSelected(list.find((p) => p.isToday) ?? null);
    setName(loadName());
    const keys = Object.keys(days);
    setStats({
      bloomed: keys.length,
      full: Object.values(days).filter((d) => stageFor(d) >= 3).length,
      streak: dailyStreak(),
      best: longestStreak(keys),
    });
  }, []);

  const today = new Date();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">
          {name ? `${name}'s garden` : "your garden"} 🌷
        </h1>
        <p className="mt-1 text-sm text-muted">
          Every day you spend a little time with God, something grows here. The
          more you do, the more it blooms.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "flowers grown", value: stats.bloomed },
          { label: "full blooms", value: stats.full },
          { label: "day streak", value: stats.streak },
          { label: "longest streak", value: stats.best },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-card p-4">
            <p className="font-serif text-2xl text-accent-strong">{s.value}</p>
            <p className="mt-0.5 text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-line bg-gradient-to-b from-accent/[0.06] to-[#6fae7a]/[0.10] p-4 sm:p-6">
        <div className="mb-2 grid grid-cols-7 text-center text-[11px] uppercase tracking-wide text-muted">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {(plots ?? []).map((plot) => {
            const future = plot.date > today && !plot.isToday;
            const isSelected = selected?.key === plot.key;
            return (
              <button
                key={plot.key}
                disabled={future}
                onClick={() => setSelected(plot)}
                aria-label={plot.date.toDateString()}
                className={`group relative flex aspect-[5/6] items-end justify-center rounded-xl transition-colors ${
                  isSelected ? "bg-card ring-2 ring-accent/60" : "hover:bg-card"
                } ${future ? "opacity-25" : ""}`}
              >
                <Flower
                  stage={future ? 0 : stageFor(plot.day)}
                  seed={seedFor(plot.key)}
                  className={`h-full w-full ${stageFor(plot.day) >= 3 ? "sway" : ""}`}
                />
                {plot.isToday && (
                  <span className="absolute -top-1 right-0.5 font-hand text-sm text-accent-strong">
                    today
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div className="rounded-2xl border border-line bg-card p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            }).format(selected.date)}
          </p>
          {stageFor(selected.day) === 0 ? (
            <p className="mt-2 font-hand text-2xl text-ink/80">
              {selected.isToday
                ? "nothing planted yet today… one small thing is enough 🌱"
                : "a resting day. rest is part of gardening too 🌾"}
            </p>
          ) : (
            <ul className="mt-2 flex flex-col gap-1 font-hand text-2xl text-ink/90">
              {selected.day?.kinds.map((k) => <li key={k}>you {KIND_LABELS[k]}</li>)}
              {selected.day?.journaled && <li>you wrote in your journal ✍️</li>}
            </ul>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
        {["resting", "1 thing", "2 things", "3 things", "4+ things"].map((label, stage) => (
          <span key={label} className="flex items-center gap-1">
            <Flower stage={stage} seed={stage + 1} className="h-7 w-6" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
