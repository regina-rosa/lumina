import Link from "next/link";
import { readingTime } from "@/lib/devotionals";
import { stories, storySections } from "@/lib/stories";

export default function StoriesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-2xl text-ink">Bible Stories</h1>
        <p className="mt-1 text-sm text-muted">
          {stories.length} stories from Genesis to Acts, retold in plain words.
          No journaling needed, just read.
        </p>
        <nav className="mt-4 flex gap-2 text-sm">
          {storySections.map((section) => (
            <a
              key={section.title}
              href={`#${section.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-line bg-card px-3 py-1 text-ink/70 hover:text-ink"
            >
              {section.title} · {section.stories.length}
            </a>
          ))}
        </nav>
      </div>

      {storySections.map((section) => (
        <section
          key={section.title}
          id={section.title.toLowerCase().replace(/\s+/g, "-")}
          className="flex scroll-mt-6 flex-col gap-4"
        >
          <h2 className="text-xs uppercase tracking-[0.2em] text-accent-strong">
            {section.title}
          </h2>
          <ul className="flex flex-col gap-4">
            {section.stories.map((story) => (
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
        </section>
      ))}
    </div>
  );
}
