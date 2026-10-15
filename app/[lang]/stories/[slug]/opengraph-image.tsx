import { ImageResponse } from "next/og";
import { getStory, localizeStory, stories } from "@/lib/stories";
import { loadChineseFont } from "@/lib/og-font";
import { LANGS, isLang, type L } from "@/lib/i18n/config";

// Per-story preview card for shared links.
export const alt = "A Bible story on Lumina";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FOOTER: L = {
  en: "Lumina · Bible stories in plain words",
  id: "Lumina · cerita Alkitab dengan bahasa sederhana",
  zh: "Lumina · 用简单的话讲圣经故事",
};

export function generateStaticParams() {
  return LANGS.flatMap((lang) => stories.map((story) => ({ lang, slug: story.slug })));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  let lang = isLang(raw) ? raw : "en";
  const original = getStory(slug);
  let story = original ? localizeStory(original, lang) : undefined;

  // Chinese needs its own font; fall back to English if it can't be fetched.
  let font: ArrayBuffer | null = null;
  if (lang === "zh" && story) {
    font = await loadChineseFont(`${story.verseRef}${story.title}${story.summary}${FOOTER.zh}`);
    if (!font) {
      lang = "en";
      story = localizeStory(original!, "en");
    }
  }
  const color = story?.coverColor ?? "#ec4899";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          color: "#fdf8f0",
          background: `radial-gradient(120% 120% at 15% 0%, ${color} 0%, #3a2a20 55%, #16120e 100%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "10px 24px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.28)",
            fontSize: 28,
            letterSpacing: lang === "zh" ? 1 : 3,
            textTransform: "uppercase",
          }}
        >
          {story?.verseRef ?? "Bible Stories"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 84, lineHeight: 1.1, letterSpacing: lang === "zh" ? 0 : -2 }}>
            {story?.title ?? "Bible Stories"}
          </div>
          <div style={{ fontSize: 34, opacity: 0.75, maxWidth: 950 }}>{story?.summary ?? ""}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 32, opacity: 0.85 }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: color }} />
          {FOOTER[lang]}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Noto Sans SC", data: font, weight: 500, style: "normal" }] : undefined,
    },
  );
}
