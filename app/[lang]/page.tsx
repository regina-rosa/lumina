import Link from "next/link";
import { notFound } from "next/navigation";
import VerseCard from "@/components/VerseCard";
import TodayStory from "@/components/TodayStory";
import TodayLabel from "@/components/TodayLabel";
import Greeting from "@/components/Greeting";
import { Han } from "@/components/i18n";
import { feelings } from "@/lib/feelings";
import { isLang, withLang } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/ui";

const EXPLORE = [
  { href: "/stories", emoji: "📖", key: "stories" },
  { href: "/quiz", emoji: "🧩", key: "quiz" },
  { href: "/letters", emoji: "💌", key: "letters" },
  { href: "/cards", emoji: "✨", key: "cards" },
  { href: "/quiet", emoji: "🕯️", key: "quiet" },
  { href: "/memorize", emoji: "🌱", key: "memorize" },
] as const;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = ui[lang];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <TodayLabel />
        <Greeting />
      </div>

      <VerseCard />

      <section className="rounded-2xl border border-line bg-card p-5 sm:p-6">
        <h2 className="font-serif text-lg text-ink">
          <Han>{t.home.heartTitle}</Han>
        </h2>
        <p className="text-xs text-muted">{t.home.heartSub}</p>
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
          {feelings.map((f) => (
            <Link
              key={f.id}
              href={withLang(lang, `/feelings?f=${f.id}`)}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink/80 hover:border-accent/40"
            >
              <span aria-hidden>{f.emoji}</span>
              <Han>{f.label[lang]}</Han>
            </Link>
          ))}
        </div>
      </section>

      <TodayStory />

      <section className="flex flex-col gap-3">
        <h2 className="px-1 font-hand text-2xl leading-none text-accent-strong">{t.home.explore}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {EXPLORE.map((item) => {
            const [title, blurb] = t.home.tiles[item.key];
            return (
              <Link
                key={item.href}
                href={withLang(lang, item.href)}
                className="group flex flex-col gap-2 rounded-2xl border border-line bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
              >
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-xl transition-transform group-hover:rotate-6 group-hover:scale-110"
                >
                  {item.emoji}
                </span>
                <span className="block font-serif text-base leading-tight text-ink">
                  <Han>{title}</Han>
                </span>
                <span className="text-xs leading-snug text-ink/60">
                  <Han>{blurb}</Han>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <Link
        href={withLang(lang, "/mailbox")}
        className="group flex items-center gap-4 rounded-2xl border border-dashed border-accent/40 bg-accent/[0.05] p-5 transition-colors hover:bg-accent/10"
      >
        <span aria-hidden className="text-3xl transition-transform group-hover:-rotate-12 group-hover:scale-110">
          📮
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-lg leading-snug text-ink">
            <Han>{t.mailbox.homeCard[0]}</Han>
          </span>
          <span className="block text-sm text-ink/60">{t.mailbox.homeCard[1]}</span>
        </span>
        <span aria-hidden className="text-accent-strong">→</span>
      </Link>

      <p className="pb-2 text-center font-hand text-xl text-ink/50">{t.home.footer}</p>
    </div>
  );
}
