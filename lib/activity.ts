import { dateKey, loadEntries, streakFromDates } from "./journal";

// Small daily things that count toward the streak, so a day without
// journaling still counts if you read, checked in, prayed, or practiced.
export type ActivityKind = "story" | "checkin" | "quiet" | "memorize";

type ActivityLog = Record<string, ActivityKind[]>; // dateKey -> kinds

const ACTIVITY_KEY = "lumina.activity";
const READ_KEY = "lumina.stories.read";
const CHECKIN_KEY = "lumina.checkins";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked; the feature just won't remember.
  }
}

export function recordActivity(kind: ActivityKind) {
  const log = read<ActivityLog>(ACTIVITY_KEY, {});
  const today = dateKey(new Date());
  const kinds = log[today] ?? [];
  if (!kinds.includes(kind)) {
    log[today] = [...kinds, kind];
    write(ACTIVITY_KEY, log);
  }
}

export function todaysActivity(): ActivityKind[] {
  return read<ActivityLog>(ACTIVITY_KEY, {})[dateKey(new Date())] ?? [];
}

// Days with any activity at all, journaling included.
export function dailyStreak(): number {
  const dates = new Set(Object.keys(read<ActivityLog>(ACTIVITY_KEY, {})));
  for (const entry of loadEntries()) dates.add(entry.dateKey);
  return streakFromDates(dates);
}

// ---- Bible Stories reading progress ----

export function loadReadStories(): Record<string, string> {
  return read<Record<string, string>>(READ_KEY, {}); // slug -> ISO read time
}

export function setStoryRead(slug: string, isRead: boolean) {
  const readStories = loadReadStories();
  if (isRead) {
    readStories[slug] = new Date().toISOString();
    recordActivity("story");
  } else {
    delete readStories[slug];
  }
  write(READ_KEY, readStories);
  return readStories;
}

// ---- Feelings check-in ----

export type CheckIn = { feeling: string; at: string };

export function loadCheckIns(): Record<string, CheckIn> {
  return read<Record<string, CheckIn>>(CHECKIN_KEY, {}); // dateKey -> check-in
}

export function checkIn(feeling: string) {
  const checkIns = loadCheckIns();
  checkIns[dateKey(new Date())] = { feeling, at: new Date().toISOString() };
  write(CHECKIN_KEY, checkIns);
  recordActivity("checkin");
}

// ---- Garden ----

export type DayActivity = { kinds: ActivityKind[]; journaled: boolean };

// Everything done per day, journaling included.
export function activityByDay(): Record<string, DayActivity> {
  const log = read<ActivityLog>(ACTIVITY_KEY, {});
  const days: Record<string, DayActivity> = {};
  for (const [key, kinds] of Object.entries(log)) {
    days[key] = { kinds, journaled: false };
  }
  for (const entry of loadEntries()) {
    days[entry.dateKey] = {
      kinds: days[entry.dateKey]?.kinds ?? [],
      journaled: true,
    };
  }
  return days;
}

export function longestStreak(dates: string[]): number {
  const sorted = [...new Set(dates)].sort();
  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const key of sorted) {
    const [y, m, d] = key.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    const isNext =
      prev !== null && Math.round((date.getTime() - prev.getTime()) / 86_400_000) === 1;
    run = isNext ? run + 1 : 1;
    best = Math.max(best, run);
    prev = date;
  }
  return best;
}
