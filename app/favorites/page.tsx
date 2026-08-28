"use client";

import { useEffect, useState } from "react";
import { loadFavorites, removeFavorite, type FavoriteVerse } from "@/lib/favorites";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteVerse[] | null>(null);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  if (favorites === null) {
    return <p className="text-sm text-muted">Loading favorites...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-2xl text-ink">Your favorite verses</h1>

      {favorites.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-card p-8 text-center text-sm text-muted">
          No verses saved yet. Mark a verse on the Home page that speaks to
          you.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {favorites.map((verse) => (
            <li
              key={verse.reference}
              className="rounded-2xl border border-line bg-card p-5"
            >
              <div className="mb-2 flex items-start justify-between gap-4">
                <p className="text-xs uppercase tracking-wide text-accent-strong">
                  {verse.reference}
                </p>
                <button
                  onClick={() => setFavorites(removeFavorite(verse.reference))}
                  className="text-xs text-muted hover:text-red-600"
                >
                  Delete
                </button>
              </div>
              <p className="font-serif text-base leading-relaxed text-ink">
                &ldquo;{verse.text}&rdquo;
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
