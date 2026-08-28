"use client";

import { useMemo, useState } from "react";
import { dateKey, type JournalEntry } from "@/lib/journal";

const WEEKDAY_LABELS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

// Monday = 0 ... Sunday = 6
function mondayIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

function formatKey(key: string): string {
  const [year, month, day] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default function JournalCalendar({
  entries,
}: {
  entries: JournalEntry[];
}) {
  const [viewDate, setViewDate] = useState(() => startOfMonth(new Date()));
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const entryByKey = useMemo(() => {
    const map = new Map<string, JournalEntry>();
    for (const e of entries) map.set(e.dateKey, e);
    return map;
  }, [entries]);

  const today = dateKey(new Date());

  const leadingBlanks = mondayIndex(viewDate);
  const totalDays = daysInMonth(viewDate);
  const cells: (number | null)[] = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const monthLabel = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(viewDate);

  function changeMonth(delta: number) {
    setViewDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
    );
    setSelectedKey(null);
  }

  const selectedEntry = selectedKey ? entryByKey.get(selectedKey) : undefined;

  return (
    <div className="rounded-2xl border border-line bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => changeMonth(-1)}
          aria-label="Bulan sebelumnya"
          className="rounded-full px-2 py-1 text-sm text-muted hover:bg-ink/5"
        >
          ‹
        </button>
        <p className="text-sm font-medium capitalize text-ink">{monthLabel}</p>
        <button
          onClick={() => changeMonth(1)}
          aria-label="Bulan berikutnya"
          className="rounded-full px-2 py-1 text-sm text-muted hover:bg-ink/5"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <span key={`blank-${i}`} />;
          const key = dateKey(
            new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
          );
          const marked = entryByKey.has(key);
          const isToday = key === today;
          const isSelected = key === selectedKey;
          return (
            <button
              key={key}
              onClick={() => setSelectedKey(isSelected ? null : key)}
              className={`flex aspect-square items-center justify-center rounded-full text-xs transition-colors ${
                marked
                  ? "bg-accent font-medium text-white hover:opacity-90"
                  : isToday
                    ? "border border-accent text-ink hover:bg-accent/10"
                    : "text-ink/60 hover:bg-ink/5"
              } ${isSelected ? "ring-2 ring-accent ring-offset-2 ring-offset-transparent" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {selectedKey && (
        <div className="mt-4 rounded-xl border border-line bg-ink/[0.03] p-4">
          <p className="text-xs capitalize text-muted">
            {formatKey(selectedKey)}
          </p>
          {selectedEntry ? (
            <>
              <p className="mt-1 text-xs uppercase tracking-wide text-accent-strong">
                {selectedEntry.verseReference}
              </p>
              <p className="mt-2 line-clamp-4 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                {selectedEntry.reflection}
              </p>
            </>
          ) : (
            <p className="mt-1 text-sm text-muted">
              Belum ada renungan di tanggal ini.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
