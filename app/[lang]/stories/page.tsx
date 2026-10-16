import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { localizeStory, readingMinutes, stories, storySections } from "@/lib/stories";
import { Han } from "@/components/i18n";
import { isLang, withLang } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/stories">): Promise<Metadata> {
  const { lang } = await params;
  return isLang(lang) ? { title: ui[lang].stories.title } : {};
}

export default async function StoriesPage({ params }: PageProps<"/[lang]/stories">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = ui[lang];
  const sectionTitle = (s: "old" | "new") => (s === "old" ? t.stories.oldTestament : t.stories.newTestament);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-2xl text-ink">
          <Han>{t.stories.title}</Han>
        </h1>
        <p className="mt-1 text-sm text-muted">{t.stories.intro(stories.length)}</p>
        <nav className="mt-4 flex flex-wrap gap-2 text-sm">
          {storySections.map((section) => (
            <a
              key={section.title}
              href={`#${section.title}`}
              className="rounded-full border border-line bg-card px-3 py-1 text-ink/70 hover:text-ink"
            >
              {sectionTitle(section.title)} · {section.stories.length}
            </a>
          ))}
        </nav>
      </div>

      {storySections.map((section) => (
        <section key={section.title} id={section.title} className="flex scroll-mt-6 flex-col gap-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-accent-strong">{sectionTitle(section.title)}</h2>
          <ul className="flex flex-col gap-4">
            {section.stories.map((original) => {
              const story = localizeStory(original, lang);
              return (
                <li key={story.slug} className="overflow-hidden rounded-2xl border border-line bg-card">
                  <Link href={withLang(lang, `/stories/${story.slug}`)} className="flex gap-4 p-4 sm:p-5">
                    <span
                      aria-hidden
                      className="h-16 w-16 shrink-0 rounded-xl sm:h-20 sm:w-20"
                      style={{
                        background: `radial-gradient(120% 120% at 20% 0%, ${story.coverColor}, color-mix(in srgb, ${story.coverColor} 25%, #16120e))`,
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-lg leading-snug text-ink">
                        <Han>{story.title}</Han>
                      </p>
                      <p className="text-xs text-muted">
                        {story.verseRef} · {t.home.minRead(readingMinutes(story.body))}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-sm text-ink/70">
                        <Han>{story.summary}</Han>
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <Link
        href={withLang(lang, "/mailbox?type=story")}
        className="rounded-2xl border border-dashed border-accent/40 bg-accent/[0.05] p-5 text-center text-sm font-medium text-accent-strong hover:bg-accent/10"
      >
        {t.mailbox.requestStory}
      </Link>
    </div>
  );
}
