"use client";

import { useState } from "react";
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

export default function JournalCalendar({
  entries,
}: {
  entries: JournalEntry[];
}) {
  const [viewDate, setViewDate] = useState(() => startOfMonth(new Date()));
  const markedDates = new Set(entries.map((e) => e.dateKey));
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
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => changeMonth(-1)}
          aria-label="Bulan sebelumnya"
          className="rounded-full px-2 py-1 text-sm text-[#1c1917]/50 hover:bg-black/5"
        >
          ‹
        </button>
        <p className="text-sm font-medium capitalize text-[#1c1917]">
          {monthLabel}
        </p>
        <button
          onClick={() => changeMonth(1)}
          aria-label="Bulan berikutnya"
          className="rounded-full px-2 py-1 text-sm text-[#1c1917]/50 hover:bg-black/5"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-[#1c1917]/40">
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
          const marked = markedDates.has(key);
          const isToday = key === today;
          return (
            <div
              key={key}
              className={`flex aspect-square items-center justify-center rounded-full text-xs ${
                marked
                  ? "bg-amber-500 font-medium text-white"
                  : isToday
                    ? "border border-amber-500 text-[#1c1917]"
                    : "text-[#1c1917]/60"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
