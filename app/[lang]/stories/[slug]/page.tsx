import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStory, localizeStory, readingMinutes, stories } from "@/lib/stories";
import ShareButton from "@/components/ShareButton";
import { Han } from "@/components/i18n";
import { LANGS, isLang, withLang } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/ui";

type Props = PageProps<"/[lang]/stories/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => stories.map((story) => ({ lang, slug: story.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const original = getStory(slug);
  if (!original || !isLang(lang)) return {};
  const story = localizeStory(original, lang);
  return {
    title: story.title,
    description: story.summary,
    openGraph: { title: story.title, description: story.summary, type: "article", siteName: "Lumina" },
  };
}

// Scripture quotes are the paragraphs followed by a "— Book 1:2" line.
const isCitation = (p: string) => p.startsWith("— ");

export default async function StoryPage({ params }: Props) {
  const { lang, slug } = await params;
  const original = getStory(slug);
  if (!original || !isLang(lang)) notFound();
  const t = ui[lang];
  const story = localizeStory(original, lang);

  const index = stories.indexOf(original);
  const next = localizeStory(stories[(index + 1) % stories.length], lang);
  const paragraphs = story.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      <article className="overflow-hidden rounded-3xl border border-line bg-card">
        <div
          className="relative h-44 w-full sm:h-56"
          style={{
            background: `radial-gradient(120% 120% at 15% 0%, ${story.coverColor} 0%, color-mix(in srgb, ${story.coverColor} 35%, #16120e) 55%, #16120e 100%)`,
          }}
        >
          <span className="absolute bottom-4 left-6 rounded-full bg-black/25 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm">
            {story.verseRef}
          </span>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <h1 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
            <Han>{story.title}</Han>
          </h1>
          <p className="mt-3 border-b border-line pb-6 text-sm text-muted">
            <Han>{story.summary}</Han> · {t.home.minRead(readingMinutes(story.body))}
          </p>

          <div className="mt-6 flex flex-col gap-5">
            {paragraphs.map((para, i) =>
              isCitation(para) ? (
                <p key={i} className="-mt-3 text-sm text-muted">
                  {para}
                </p>
              ) : (
                <p
                  key={i}
                  className={`whitespace-pre-wrap font-serif text-lg leading-relaxed ${
                    paragraphs[i + 1] && isCitation(paragraphs[i + 1])
                      ? "border-l-2 border-accent/60 pl-4 italic text-ink"
                      : "text-ink/90"
                  }`}
                >
                  <Han>{para}</Han>
                </p>
              ),
            )}
          </div>

          {t.stories.note && <p className="mt-8 text-xs text-muted">{t.stories.note}</p>}

          <div className="mt-6 flex border-t border-line pt-6">
            <ShareButton title={story.title} text={`${story.title} (${story.verseRef}) 🤍`} label={t.stories.share} />
          </div>
        </div>
      </article>

      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <Link href={withLang(lang, "/stories")} className="font-medium text-accent-strong hover:text-accent">
          {t.stories.all}
        </Link>
        <Link
          href={withLang(lang, `/stories/${next.slug}`)}
          className="rounded-2xl border border-line bg-card px-4 py-3 font-medium text-accent-strong hover:text-accent sm:border-0 sm:bg-transparent sm:p-0"
        >
          {t.stories.next}: <Han>{next.title}</Han> →
        </Link>
      </div>
    </div>
  );
}
