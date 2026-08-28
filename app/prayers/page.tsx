"use client";

import { useEffect, useState } from "react";
import {
  addPrayer,
  deletePrayer,
  loadPrayers,
  toggleAnswered,
  type Prayer,
} from "@/lib/prayers";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function PrayerCard({
  prayer,
  onChange,
}: {
  prayer: Prayer;
  onChange: (prayers: Prayer[]) => void;
}) {
  const answered = prayer.answeredAt !== null;

  return (
    <li
      className={`rounded-2xl border p-5 transition-colors ${
        answered
          ? "border-amber-600/20 bg-amber-50/70"
          : "border-black/10 bg-white/60"
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className={`font-serif text-base leading-snug text-[#1c1917] ${
              answered ? "line-through decoration-amber-700/40" : ""
            }`}
          >
            {prayer.title}
          </p>
          <p className="text-xs text-[#1c1917]/50">
            {answered
              ? `Dijawab · ${formatDate(prayer.answeredAt!)}`
              : `Didoakan sejak ${formatDate(prayer.createdAt)}`}
          </p>
        </div>
        <div className="flex shrink-0 gap-3 text-xs">
          <button
            onClick={() => onChange(toggleAnswered(prayer.id))}
            className="font-medium text-amber-700 hover:text-amber-900"
          >
            {answered ? "Buka lagi" : "Dijawab"}
          </button>
          <button
            onClick={() => onChange(deletePrayer(prayer.id))}
            className="text-[#1c1917]/40 hover:text-red-600"
          >
            Hapus
          </button>
        </div>
      </div>
      {prayer.detail && (
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#1c1917]/80">
          {prayer.detail}
        </p>
      )}
    </li>
  );
}

export default function PrayersPage() {
  const [prayers, setPrayers] = useState<Prayer[] | null>(null);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    setPrayers(loadPrayers());
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setPrayers(addPrayer({ title: title.trim(), detail: detail.trim() }));
    setTitle("");
    setDetail("");
  }

  if (prayers === null) {
    return <p className="text-sm text-[#1c1917]/50">Memuat pokok doa...</p>;
  }

  const open = prayers.filter((p) => p.answeredAt === null);
  const answered = prayers.filter((p) => p.answeredAt !== null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-[#1c1917]">Pokok doa</h1>
        <p className="mt-1 text-sm text-[#1c1917]/50">
          Tuliskan pergumulanmu, dan lihat bagaimana Tuhan menjawab.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white/60 p-6"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Apa yang ingin kamu doakan?"
          className="rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#1c1917] outline-none placeholder:text-[#1c1917]/40 focus:border-amber-500/60"
        />
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Rincian (opsional)"
          rows={2}
          className="resize-none rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#1c1917] outline-none placeholder:text-[#1c1917]/40 focus:border-amber-500/60"
        />
        <button
          type="submit"
          className="self-start rounded-full bg-[#1c1917] px-5 py-2 text-sm font-medium text-[#faf8f3] transition-colors hover:bg-[#1c1917]/85"
        >
          Tambah pokok doa
        </button>
      </form>

      {prayers.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-black/15 bg-white/40 p-8 text-center text-sm text-[#1c1917]/50">
          Belum ada pokok doa. Mulai bawa satu hal kepada Tuhan hari ini.
        </p>
      ) : (
        <>
          {open.length > 0 && (
            <ul className="flex flex-col gap-4">
              {open.map((prayer) => (
                <PrayerCard
                  key={prayer.id}
                  prayer={prayer}
                  onChange={setPrayers}
                />
              ))}
            </ul>
          )}

          {answered.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-700/70">
                Sudah dijawab · {answered.length}
              </p>
              <ul className="flex flex-col gap-4">
                {answered.map((prayer) => (
                  <PrayerCard
                    key={prayer.id}
                    prayer={prayer}
                    onChange={setPrayers}
                  />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
