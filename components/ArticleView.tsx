import {
  formatDate,
  readingTime,
  type SharedDevotional,
} from "@/lib/devotionals";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export default function ArticleView({
  devotional,
}: {
  devotional: SharedDevotional;
}) {
  const color = devotional.coverColor || "#f59e0b";
  const author = devotional.author.trim() || "Anonymous";
  const paragraphs = devotional.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-card">
      {/* Cover */}
      <div
        className="relative h-44 w-full sm:h-56"
        style={{
          background: `radial-gradient(120% 120% at 15% 0%, ${color} 0%, color-mix(in srgb, ${color} 35%, #16120e) 55%, #16120e 100%)`,
        }}
      >
        {devotional.verseRef.trim() && (
          <span className="absolute bottom-4 left-6 rounded-full bg-black/25 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm">
            {devotional.verseRef}
          </span>
        )}
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <h1 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {devotional.title || "Untitled devotional"}
        </h1>

        <div className="mt-5 flex items-center gap-3 border-b border-line pb-6">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: color }}
          >
            {initials(author)}
          </span>
          <div className="text-sm">
            <p className="font-medium text-ink">{author}</p>
            <p className="text-muted">
              {formatDate(devotional.createdAt)} ·{" "}
              {readingTime(devotional.body)} min read
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5">
          {paragraphs.length === 0 ? (
            <p className="text-muted">No content yet.</p>
          ) : (
            paragraphs.map((para, i) => (
              <p
                key={i}
                className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-ink/90"
              >
                {para}
              </p>
            ))
          )}
        </div>
      </div>
    </article>
  );
}
