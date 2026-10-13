import { ImageResponse } from "next/og";
import { getStory, stories } from "@/lib/stories";

// Per-story preview card for shared links.
export const alt = "A Bible story on Lumina";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory(slug);
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
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {story?.verseRef ?? "Bible Stories"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, letterSpacing: -2 }}>
            {story?.title ?? "Bible Stories"}
          </div>
          <div style={{ fontSize: 34, opacity: 0.75, maxWidth: 950 }}>{story?.summary ?? ""}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 32, opacity: 0.85 }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: color }} />
          Lumina · Bible stories in plain words
        </div>
      </div>
    ),
    size,
  );
}
