"use client";

import { useEffect, useState } from "react";
import { deleteEntry, loadEntries, type JournalEntry } from "@/lib/journal";

function formatDateKey(key: string): string {
  const [year, month, day] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[] | null>(null);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  if (entries === null) {
    return <p className="text-sm text-[#1c1917]/50">Memuat jurnal...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-2xl text-[#1c1917]">Jurnal renunganmu</h1>

      {entries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-black/15 bg-white/40 p-8 text-center text-sm text-[#1c1917]/50">
          Belum ada renungan tersimpan. Tulis yang pertama di Beranda.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-2xl border border-black/10 bg-white/60 p-5"
            >
              <div className="mb-2 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-amber-700/80">
                    {entry.verseReference}
                  </p>
                  <p className="text-sm text-[#1c1917]/50">
                    {formatDateKey(entry.dateKey)}
                  </p>
                </div>
                <button
                  onClick={() => setEntries(deleteEntry(entry.id))}
                  className="text-xs text-[#1c1917]/40 hover:text-red-600"
                  aria-label="Hapus renungan"
                >
                  Hapus
                </button>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#1c1917]">
                {entry.reflection}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
