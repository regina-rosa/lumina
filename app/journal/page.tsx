"use client";

import { useEffect, useState } from "react";
import {
  deleteEntry,
  loadEntries,
  updateEntry,
  type JournalEntry,
} from "@/lib/journal";
import JournalCalendar from "@/components/JournalCalendar";

function formatDateKey(key: string): string {
  const [year, month, day] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function EntryCard({
  entry,
  onChange,
}: {
  entry: JournalEntry;
  onChange: (entries: JournalEntry[]) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(entry.reflection);

  function save() {
    onChange(updateEntry(entry.id, draft.trim()));
    setEditing(false);
  }

  return (
    <li className="rounded-2xl border border-black/10 bg-white/60 p-5">
      <div className="mb-2 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-amber-700/80">
            {entry.verseReference}
          </p>
          <p className="text-sm text-[#1c1917]/50">
            {formatDateKey(entry.dateKey)}
          </p>
        </div>
        <div className="flex shrink-0 gap-3 text-xs">
          {editing ? (
            <>
              <button
                onClick={save}
                className="font-medium text-amber-700 hover:text-amber-900"
              >
                Simpan
              </button>
              <button
                onClick={() => {
                  setDraft(entry.reflection);
                  setEditing(false);
                }}
                className="text-[#1c1917]/40 hover:text-[#1c1917]"
              >
                Batal
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="text-[#1c1917]/40 hover:text-[#1c1917]"
              >
                Edit
              </button>
              <button
                onClick={() => onChange(deleteEntry(entry.id))}
                className="text-[#1c1917]/40 hover:text-red-600"
              >
                Hapus
              </button>
            </>
          )}
        </div>
      </div>

      {editing ? (
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          className="w-full resize-none rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-[#1c1917] outline-none focus:border-amber-500/60"
        />
      ) : (
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#1c1917]">
          {entry.reflection}
        </p>
      )}
    </li>
  );
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

      <JournalCalendar entries={entries} />

      {entries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-black/15 bg-white/40 p-8 text-center text-sm text-[#1c1917]/50">
          Belum ada renungan tersimpan. Tulis yang pertama di Beranda.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} onChange={setEntries} />
          ))}
        </ul>
      )}
    </div>
  );
}
