export type JournalEntry = {
  id: string;
  dateKey: string; // YYYY-MM-DD, local date the entry belongs to
  verseReference: string;
  reflection: string;
  createdAt: string; // ISO timestamp
};

const STORAGE_KEY = "lumina.journal.entries";

export function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function loadEntries(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as JournalEntry[];
    return parsed.sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  } catch {
    return [];
  }
}

function saveEntries(entries: JournalEntry[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function upsertEntryForToday(input: {
  verseReference: string;
  reflection: string;
}): JournalEntry[] {
  const today = dateKey(new Date());
  const entries = loadEntries();
  const existingIndex = entries.findIndex((e) => e.dateKey === today);
  const entry: JournalEntry = {
    id: existingIndex >= 0 ? entries[existingIndex].id : crypto.randomUUID(),
    dateKey: today,
    verseReference: input.verseReference,
    reflection: input.reflection,
    createdAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.push(entry);
  }

  const sorted = entries.sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  saveEntries(sorted);
  return sorted;
}

export function deleteEntry(id: string): JournalEntry[] {
  const remaining = loadEntries().filter((e) => e.id !== id);
  saveEntries(remaining);
  return remaining;
}

export function currentStreak(entries: JournalEntry[]): number {
  if (entries.length === 0) return 0;

  const dates = new Set(entries.map((e) => e.dateKey));
  const cursor = new Date();

  if (!dates.has(dateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!dates.has(dateKey(cursor))) return 0;
  }

  let streak = 0;
  while (dates.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
