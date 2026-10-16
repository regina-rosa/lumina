import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MailboxForm from "@/components/MailboxForm";
import { Han } from "@/components/i18n";
import { getWallNotes } from "@/lib/mailbox";
import { LANG_LABELS, isLang } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/ui";

// The wall refreshes from the Sheet every few minutes.
export const revalidate = 300;

const STICKY = ["#fef3c7", "#fce7f3", "#e0f2fe", "#dcfce7", "#ede9fe", "#ffedd5"];

export async function generateMetadata({ params }: PageProps<"/[lang]/mailbox">): Promise<Metadata> {
  const { lang } = await params;
  return isLang(lang) ? { title: ui[lang].mailbox.title, description: ui[lang].mailbox.intro } : {};
}

export default async function MailboxPage({ params }: PageProps<"/[lang]/mailbox">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = ui[lang].mailbox;
  const notes = await getWallNotes();
  const date = new Intl.DateTimeFormat(LANG_LABELS[lang].locale, { day: "numeric", month: "short" });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-2xl text-ink">
          <Han>{t.title}</Han>
        </h1>
        <p className="mt-1 text-sm text-muted">{t.intro}</p>
      </div>

      <MailboxForm />

      <section className="flex flex-col gap-4">
        <h2 className="px-1 font-hand text-2xl leading-none text-accent-strong">
          <Han>{t.wallTitle}</Han>
        </h2>
        {notes.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-card p-8 text-center text-sm text-muted">
            {t.wallEmpty}
          </p>
        ) : (
          <ul className="columns-1 gap-4 sm:columns-2">
            {notes.map((note, i) => (
              <li
                key={`${note.time}-${i}`}
                className="mb-4 break-inside-avoid rounded-xl p-5 text-[#2b2420] shadow-sm"
                style={{ background: STICKY[i % STICKY.length], transform: `rotate(${((i * 7) % 5) - 2}deg)` }}
              >
                <p className="text-xs text-[#2b2420]/50">
                  {(t.types[note.type] ?? t.types.hi)[0]} {note.name || t.anonymous} · {date.format(new Date(note.time))}
                </p>
                <p className="mt-2 whitespace-pre-wrap font-hand text-xl leading-snug">{note.message}</p>
                {note.reply && (
                  <div className="mt-3 border-t border-[#2b2420]/10 pt-3">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-[#2b2420]/50">{t.reply} 🌸</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{note.reply}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
