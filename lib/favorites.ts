import type { Verse } from "./verses";

export type FavoriteVerse = Verse & { savedAt: string };

const STORAGE_KEY = "lumina.favorites";

export function loadFavorites(): FavoriteVerse[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FavoriteVerse[];
    return parsed.sort((a, b) => b.savedAt.localeCompare(a.savedAt));
  } catch {
    return [];
  }
}

function saveFavorites(favorites: FavoriteVerse[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function isFavorite(reference: string, favorites: FavoriteVerse[]): boolean {
  return favorites.some((f) => f.reference === reference);
}

export function toggleFavorite(verse: Verse): FavoriteVerse[] {
  const favorites = loadFavorites();
  const exists = favorites.some((f) => f.reference === verse.reference);
  const updated = exists
    ? favorites.filter((f) => f.reference !== verse.reference)
    : [...favorites, { ...verse, savedAt: new Date().toISOString() }];
  saveFavorites(updated);
  return updated;
}

export function removeFavorite(reference: string): FavoriteVerse[] {
  const remaining = loadFavorites().filter((f) => f.reference !== reference);
  saveFavorites(remaining);
  return remaining;
}
