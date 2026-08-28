export type Prayer = {
  id: string;
  title: string;
  detail: string;
  createdAt: string; // ISO timestamp
  answeredAt: string | null; // ISO timestamp when marked answered
};

const STORAGE_KEY = "lumina.prayers";

export function loadPrayers(): Prayer[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Prayer[];
    return parsed.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

function savePrayers(prayers: Prayer[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prayers));
}

export function addPrayer(input: { title: string; detail: string }): Prayer[] {
  const prayers = loadPrayers();
  const prayer: Prayer = {
    id: crypto.randomUUID(),
    title: input.title,
    detail: input.detail,
    createdAt: new Date().toISOString(),
    answeredAt: null,
  };
  const updated = [prayer, ...prayers].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  savePrayers(updated);
  return updated;
}

export function toggleAnswered(id: string): Prayer[] {
  const prayers = loadPrayers();
  const index = prayers.findIndex((p) => p.id === id);
  if (index === -1) return prayers;
  prayers[index] = {
    ...prayers[index],
    answeredAt: prayers[index].answeredAt ? null : new Date().toISOString(),
  };
  savePrayers(prayers);
  return prayers;
}

export function deletePrayer(id: string): Prayer[] {
  const remaining = loadPrayers().filter((p) => p.id !== id);
  savePrayers(remaining);
  return remaining;
}
