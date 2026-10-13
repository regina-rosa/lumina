import { ImageResponse } from "next/og";

// Preview card shown when a Lumina link is pasted into TikTok, WhatsApp, etc.
export const alt = "Lumina — little moments with God";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PETALS = [
  { x: 70, y: 60, s: 70, c: "#f9a8c4", r: 20 },
  { x: 1040, y: 80, s: 90, c: "#fb9db4", r: -30 },
  { x: 980, y: 470, s: 64, c: "#f7c1d4", r: 45 },
  { x: 120, y: 470, s: 84, c: "#fbcfe8", r: -15 },
  { x: 860, y: 40, s: 40, c: "#fda4af", r: 10 },
  { x: 260, y: 90, s: 36, c: "#f9a8c4", r: 60 },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #fff1f4 0%, #fbd3df 100%)",
          color: "#7a2e45",
          position: "relative",
        }}
      >
        {PETALS.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.s,
              height: p.s * 0.8,
              background: p.c,
              borderRadius: "80% 0 80% 0",
              transform: `rotate(${p.r}deg)`,
            }}
          />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: "#ec4899",
              boxShadow: "0 0 40px 14px rgba(236,72,153,0.45)",
            }}
          />
          <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: -4 }}>Lumina</div>
        </div>
        <div style={{ marginTop: 18, fontSize: 46, fontStyle: "italic", opacity: 0.9 }}>
          little moments with God
        </div>
        <div style={{ marginTop: 34, fontSize: 28, opacity: 0.65 }}>
          Bible stories · verses for your heart · quizzes · verse cards
        </div>
      </div>
    ),
    size,
  );
}
