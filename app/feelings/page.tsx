"use client";

import { useEffect, useState } from "react";
import { feelings, getFeeling, type Feeling } from "@/lib/feelings";
import { checkIn, loadCheckIns, type CheckIn } from "@/lib/activity";
import { loadFavorites, toggleFavorite } from "@/lib/favorites";
import { dateKey } from "@/lib/journal";

function lastSevenDays(): { key: string; label: string }[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      key: dateKey(d),
      label: new Intl.DateTimeFormat("en-US", { weekday: "narrow" }).format(d),
    };
  });
}

export default function FeelingsPage() {
  const [selected, setSelected] = useState<Feeling | null>(null);
  const [checkIns, setCheckIns] = useState<Record<string, CheckIn>>({});
  const [saved, setSaved] = useState<Set<string>>(new Set());
  // Built after mount so the prerendered page doesn't bake in a build-time date.
  const [days, setDays] = useState<{ key: string; label: string }[]>([]);

  useEffect(() => {
    const all = loadCheckIns();
    setCheckIns(all);
    setDays(lastSevenDays());
    setSaved(new Set(loadFavorites().map((f) => f.reference)));
    // Open a feeling from the home page link (?f=tired), else today's check-in.
    const fromUrl = new URLSearchParams(window.location.search).get("f");
    const initial = getFeeling(fromUrl ?? all[dateKey(new Date())]?.feeling ?? "");
    if (initial) {
      setSelected(initial);
      if (fromUrl) {
        checkIn(initial.id);
        setCheckIns(loadCheckIns());
      }
    }
  }, []);

  function choose(feeling: Feeling) {
    setSelected(feeling);
    checkIn(feeling.id);
    setCheckIns(loadCheckIns());
  }

  function handleSave(reference: string, text: string) {
    const updated = toggleFavorite({ reference, text });
    setSaved(new Set(updated.map((f) => f.reference)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">For your heart</h1>
        <p className="mt-1 text-sm text-muted">
          How are you feeling today? Pick one and sit with what God says about it.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {feelings.map((feeling) => {
          const active = selected?.id === feeling.id;
          return (
            <button
              key={feeling.id}
              onClick={() => choose(feeling)}
              className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-sm transition-colors ${
                active
                  ? "border-accent bg-accent/10 font-medium text-accent-strong"
                  : "border-line bg-card text-ink/80 hover:border-accent/40"
              }`}
            >
              <span className="text-xl" aria-hidden>
                {feeling.emoji}
              </span>
              {feeling.label}
            </button>
          );
        })}
      </div>

      {selected && (
        <section className="flex flex-col gap-4">
          <p className="rounded-2xl border border-accent/25 bg-accent/[0.07] p-5 font-serif text-lg leading-relaxed text-ink">
            {selected.note}
          </p>
          <ul className="flex flex-col gap-3">
            {selected.verses.map((verse) => {
              const isSaved = saved.has(verse.reference);
              return (
                <li
                  key={verse.reference}
                  className="rounded-2xl border border-line bg-card p-5"
                >
                  <p className="font-serif text-lg leading-relaxed text-ink/90">
                    &ldquo;{verse.text}&rdquo;
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-sm text-accent-strong">{verse.reference}</p>
                    <button
                      onClick={() => handleSave(verse.reference, verse.text)}
                      className="text-xs font-medium text-muted hover:text-ink"
                    >
                      {isSaved ? "★ Saved" : "☆ Save"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="text-xs uppercase tracking-[0.2em] text-muted">
          Your last 7 days
        </h2>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center">
          {days.map((day) => {
            const feeling = getFeeling(checkIns[day.key]?.feeling ?? "");
            return (
              <div key={day.key} className="flex flex-col items-center gap-1">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/[0.04] text-lg"
                  title={feeling?.label}
                >
                  {feeling ? feeling.emoji : ""}
                </span>
                <span className="text-[11px] text-muted">{day.label}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
