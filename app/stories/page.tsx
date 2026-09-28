import Link from "next/link";
import { readingTime } from "@/lib/devotionals";
import { stories } from "@/lib/stories";

export default function StoriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">Bible Stories</h1>
        <p className="mt-1 text-sm text-muted">
          Short retellings in plain words. No journaling needed, just read.
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {stories.map((story) => (
          <li
            key={story.slug}
            className="overflow-hidden rounded-2xl border border-line bg-card"
          >
            <Link href={`/stories/${story.slug}`} className="flex gap-4 p-5">
              <span
                aria-hidden
                className="h-16 w-16 shrink-0 rounded-xl sm:h-20 sm:w-20"
                style={{
                  background: `radial-gradient(120% 120% at 20% 0%, ${story.coverColor}, color-mix(in srgb, ${story.coverColor} 25%, #16120e))`,
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="font-serif text-lg leading-snug text-ink">
                  {story.title}
                </p>
                <p className="text-xs text-muted">
                  {story.verseRef} · {readingTime(story.body)} min read
                </p>
                <p className="mt-1.5 line-clamp-2 text-sm text-ink/70">
                  {story.summary}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
