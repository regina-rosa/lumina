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
  return new Intl.DateTimeFormat("en-US", {
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
    <li className="rounded-2xl border border-line bg-card p-5">
      <div className="mb-2 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-accent-strong">
            {entry.verseReference}
          </p>
          <p className="text-sm text-muted">{formatDateKey(entry.dateKey)}</p>
        </div>
        <div className="flex shrink-0 gap-3 text-xs">
          {editing ? (
            <>
              <button
                onClick={save}
                className="font-medium text-accent-strong hover:text-accent"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setDraft(entry.reflection);
                  setEditing(false);
                }}
                className="text-muted hover:text-ink"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="text-muted hover:text-ink"
              >
                Edit
              </button>
              <button
                onClick={() => onChange(deleteEntry(entry.id))}
                className="text-muted hover:text-red-600"
              >
                Delete
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
          className="w-full resize-none rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent/60"
        />
      ) : (
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">
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
    return <p className="text-sm text-muted">Loading journal...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-2xl text-ink">Your devotional journal</h1>

      <JournalCalendar entries={entries} />

      {entries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-card p-8 text-center text-sm text-muted">
          No devotionals saved yet. Write your first one on the Home page.
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
