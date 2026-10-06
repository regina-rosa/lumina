import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readingTime } from "@/lib/devotionals";
import { getStory, stories } from "@/lib/stories";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "Story not found — Lumina" };
  return {
    title: `${story.title} — Lumina`,
    description: story.summary,
    openGraph: { title: story.title, description: story.summary, type: "article" },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const index = stories.indexOf(story);
  const next = stories[(index + 1) % stories.length];
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
            {story.title}
          </h1>
          <p className="mt-3 border-b border-line pb-6 text-sm text-muted">
            {story.summary} · {readingTime(story.body)} min read
          </p>

          <div className="mt-6 flex flex-col gap-5">
            {paragraphs.map((para, i) =>
              para.startsWith("— ") ? (
                <p key={i} className="-mt-3 text-sm text-muted">
                  {para}
                </p>
              ) : (
                <p
                  key={i}
                  className={`whitespace-pre-wrap font-serif text-lg leading-relaxed ${
                    paragraphs[i + 1]?.startsWith("— ")
                      ? "border-l-2 border-accent/60 pl-4 italic text-ink"
                      : "text-ink/90"
                  }`}
                >
                  {para}
                </p>
              ),
            )}
          </div>
        </div>
      </article>

      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/stories"
          className="font-medium text-accent-strong hover:text-accent"
        >
          ← All stories
        </Link>
        <Link
          href={`/stories/${next.slug}`}
          className="rounded-2xl border border-line bg-card px-4 py-3 font-medium text-accent-strong hover:text-accent sm:border-0 sm:bg-transparent sm:p-0"
        >
          Next: {next.title} →
        </Link>
      </div>
    </div>
  );
}
