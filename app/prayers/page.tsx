"use client";

import { useEffect, useState } from "react";
import {
  addPrayer,
  deletePrayer,
  loadPrayers,
  toggleAnswered,
  type Prayer,
} from "@/lib/prayers";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function PrayerCard({
  prayer,
  onChange,
}: {
  prayer: Prayer;
  onChange: (prayers: Prayer[]) => void;
}) {
  const answered = prayer.answeredAt !== null;

  return (
    <li
      className={`rounded-2xl border p-5 transition-colors ${
        answered ? "border-accent/25 bg-accent/[0.07]" : "border-line bg-card"
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className={`font-serif text-base leading-snug text-ink ${
              answered ? "line-through decoration-accent/40" : ""
            }`}
          >
            {prayer.title}
          </p>
          <p className="text-xs text-muted">
            {answered
              ? `Answered · ${formatDate(prayer.answeredAt!)}`
              : `Prayed for since ${formatDate(prayer.createdAt)}`}
          </p>
        </div>
        <div className="flex shrink-0 gap-3 text-xs">
          <button
            onClick={() => onChange(toggleAnswered(prayer.id))}
            className="font-medium text-accent-strong hover:text-accent"
          >
            {answered ? "Reopen" : "Mark answered"}
          </button>
          <button
            onClick={() => onChange(deletePrayer(prayer.id))}
            className="text-muted hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      {prayer.detail && (
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink/80">
          {prayer.detail}
        </p>
      )}
    </li>
  );
}

export default function PrayersPage() {
  const [prayers, setPrayers] = useState<Prayer[] | null>(null);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    setPrayers(loadPrayers());
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setPrayers(addPrayer({ title: title.trim(), detail: detail.trim() }));
    setTitle("");
    setDetail("");
  }

  if (prayers === null) {
    return <p className="text-sm text-muted">Loading prayer list...</p>;
  }

  const open = prayers.filter((p) => p.answeredAt === null);
  const answered = prayers.filter((p) => p.answeredAt !== null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">Prayer list</h1>
        <p className="mt-1 text-sm text-muted">
          Write down what's on your heart, and see how God answers.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-6"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you want to pray for?"
          className="rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60"
        />
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Details (optional)"
          rows={2}
          className="resize-none rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60"
        />
        <button
          type="submit"
          className="self-start rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Add prayer
        </button>
      </form>

      {prayers.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-card p-8 text-center text-sm text-muted">
          No prayers yet. Start by bringing one thing to God today.
        </p>
      ) : (
        <>
          {open.length > 0 && (
            <ul className="flex flex-col gap-4">
              {open.map((prayer) => (
                <PrayerCard
                  key={prayer.id}
                  prayer={prayer}
                  onChange={setPrayers}
                />
              ))}
            </ul>
          )}

          {answered.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-strong">
                Answered · {answered.length}
              </p>
              <ul className="flex flex-col gap-4">
                {answered.map((prayer) => (
                  <PrayerCard
                    key={prayer.id}
                    prayer={prayer}
                    onChange={setPrayers}
                  />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
