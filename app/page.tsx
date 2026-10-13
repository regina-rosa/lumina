import Link from "next/link";
import VerseCard from "@/components/VerseCard";
import TodayStory from "@/components/TodayStory";
import TodayLabel from "@/components/TodayLabel";
import Greeting from "@/components/Greeting";
import { feelings } from "@/lib/feelings";

const EXPLORE = [
  { href: "/stories", emoji: "📖", title: "Bible Stories", id: "Cerita Alkitab", blurb: "48 stories, easy to read" },
  { href: "/quiz", emoji: "🧩", title: "Bible Quiz", id: "Kuis Alkitab", blurb: "3 games to play" },
  { href: "/letters", emoji: "💌", title: "Open When…", id: "Buka saat…", blurb: "little letters for hard days" },
  { href: "/cards", emoji: "✨", title: "Verse Cards", id: "Kartu Ayat", blurb: "make one for your story" },
  { href: "/quiet", emoji: "🕯️", title: "Quiet Time", id: "Saat Teduh", blurb: "breathe & pray" },
  { href: "/memorize", emoji: "🌱", title: "Memorize", id: "Hafalan", blurb: "learn a verse by heart" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <TodayLabel />
        <Greeting />
      </div>

      <VerseCard />

      <section className="rounded-2xl border border-line bg-card p-5 sm:p-6">
        <h2 className="font-serif text-lg text-ink">How&apos;s your heart today?</h2>
        <p className="text-xs text-muted">Pick one, and find verses for exactly that.</p>
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
          {feelings.map((f) => (
            <Link
              key={f.id}
              href={`/feelings?f=${f.id}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink/80 hover:border-accent/40"
            >
              <span aria-hidden>{f.emoji}</span>
              {f.label}
            </Link>
          ))}
        </div>
      </section>

      <TodayStory />

      <section className="flex flex-col gap-3">
        <h2 className="px-1 font-hand text-2xl leading-none text-accent-strong">explore lumina</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {EXPLORE.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-2 rounded-2xl border border-line bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
            >
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-xl transition-transform group-hover:rotate-6 group-hover:scale-110"
              >
                {item.emoji}
              </span>
              <span>
                <span className="block font-serif text-base leading-tight text-ink">{item.title}</span>
                <span className="block text-[11px] text-muted">{item.id}</span>
              </span>
              <span className="text-xs leading-snug text-ink/60">{item.blurb}</span>
            </Link>
          ))}
        </div>
      </section>

      <p className="pb-2 text-center font-hand text-xl text-ink/50">
        made with love, for anyone who needs it 🤍
      </p>
    </div>
  );
}
