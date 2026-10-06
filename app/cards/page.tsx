"use client";

import { useEffect, useRef, useState } from "react";
import { verseOfToday, verses, type Verse } from "@/lib/verses";
import { loadFavorites } from "@/lib/favorites";
import { loadName } from "@/lib/profile";

type Size = "story" | "post";
type Lettering = "serif" | "hand";

type Template = {
  id: string;
  label: string;
  swatch: string;
  bg: [string, string];
  ink: string;
  soft: string;
  decorate: (ctx: CanvasRenderingContext2D, w: number, h: number, rand: () => number) => void;
};

const SIZES: Record<Size, { w: number; h: number; label: string }> = {
  story: { w: 1080, h: 1920, label: "Story 9:16" },
  post: { w: 1080, h: 1350, label: "Post 4:5" },
};

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function rose(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#9fbf94";
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(side * r * 0.9, r * 0.9, r * 0.75, r * 0.35, side * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = color;
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55, r * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(0,0,0,0.12)";
  ctx.lineWidth = r * 0.12;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.35, 0.3, Math.PI * 1.7);
  ctx.stroke();
  ctx.restore();
}

function star(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y);
  ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
}

function sprig(ctx: CanvasRenderingContext2D, x: number, y: number, len: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = "#7d9a72";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(len * 0.1, -len * 0.5, 0, -len);
  ctx.stroke();
  ctx.fillStyle = "#93ae88";
  for (let i = 1; i < 6; i++) {
    const t = i / 6;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(side * 22, -len * t, 26, 11, side * -0.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

const TEMPLATES: Template[] = [
  {
    id: "blush",
    label: "Blush",
    swatch: "#fbcfe8",
    bg: ["#fff1f4", "#fbd3df"],
    ink: "#7a2e45",
    soft: "rgba(122,46,69,0.55)",
    decorate(ctx, w, h, rand) {
      const colors = ["#f9a8c4", "#fb9db4", "#f7c1d4"];
      [[0.12, 0.08], [0.88, 0.1], [0.08, 0.92], [0.9, 0.9], [0.82, 0.18]].forEach(([fx, fy], i) =>
        rose(ctx, w * fx, h * fy, 36 + rand() * 26, colors[i % colors.length]),
      );
      ctx.fillStyle = "rgba(236,72,153,0.18)";
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(rand() * w, rand() * h, 3 + rand() * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  },
  {
    id: "midnight",
    label: "Midnight",
    swatch: "#1e1b4b",
    bg: ["#0b1026", "#2a2161"],
    ink: "#fdf4dc",
    soft: "rgba(253,244,220,0.6)",
    decorate(ctx, w, h, rand) {
      for (let i = 0; i < 90; i++) {
        ctx.fillStyle = `rgba(255,248,220,${0.15 + rand() * 0.55})`;
        ctx.beginPath();
        ctx.arc(rand() * w, rand() * h, rand() * 2.5 + 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#fde68a";
      // Sparkles only in the top and bottom bands, clear of the verse.
      for (let i = 0; i < 8; i++) {
        const y = i % 2 ? h * (0.04 + rand() * 0.16) : h * (0.78 + rand() * 0.18);
        star(ctx, rand() * w, y, 10 + rand() * 18);
      }
      ctx.fillStyle = "#fef3c7";
      ctx.beginPath();
      ctx.arc(w * 0.8, h * 0.1, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2a2161";
      ctx.beginPath();
      ctx.arc(w * 0.8 + 32, h * 0.1 - 18, 62, 0, Math.PI * 2);
      ctx.fill();
    },
  },
  {
    id: "sage",
    label: "Sage",
    swatch: "#c9d6bf",
    bg: ["#eef2e6", "#cfdcc4"],
    ink: "#2f3e2c",
    soft: "rgba(47,62,44,0.55)",
    decorate(ctx, w, h) {
      sprig(ctx, w * 0.1, h * 0.25, 300, 0.5);
      sprig(ctx, w * 0.92, h * 0.98, 360, -0.4);
      sprig(ctx, w * 0.95, h * 0.2, 220, -2.6);
    },
  },
  {
    id: "paper",
    label: "Paper",
    swatch: "#f5ecd9",
    bg: ["#fcf8ef", "#f3e9d6"],
    ink: "#2b2420",
    soft: "rgba(43,36,32,0.55)",
    decorate(ctx, w, h) {
      ctx.strokeStyle = "rgba(90,120,160,0.16)";
      ctx.lineWidth = 2;
      for (let y = 160; y < h; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(220,90,110,0.3)";
      ctx.beginPath();
      ctx.moveTo(130, 0);
      ctx.lineTo(130, h);
      ctx.stroke();
      ctx.save();
      ctx.translate(w / 2, 70);
      ctx.rotate(-0.04);
      ctx.fillStyle = "rgba(244,194,207,0.75)";
      ctx.fillRect(-150, -34, 300, 68);
      ctx.restore();
    },
  },
];

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export default function CardsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handRef = useRef<HTMLSpanElement>(null);
  const [choices, setChoices] = useState<Verse[]>([]);
  const [verse, setVerse] = useState<Verse | null>(null);
  const [custom, setCustom] = useState(false);
  const [customText, setCustomText] = useState("");
  const [customRef, setCustomRef] = useState("");
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [size, setSize] = useState<Size>("story");
  const [lettering, setLettering] = useState<Lettering>("serif");
  const [name, setName] = useState("");
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    const today = verseOfToday();
    const seen = new Set<string>();
    setChoices(
      [today, ...loadFavorites(), ...verses].filter((v) =>
        seen.has(v.reference) ? false : (seen.add(v.reference), true),
      ),
    );
    setVerse(today);
    setName(loadName());
    setCanShare(typeof navigator !== "undefined" && "canShare" in navigator);
  }, []);

  const text = custom ? customText : verse?.text ?? "";
  const reference = custom ? customRef : verse?.reference ?? "";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !text.trim()) return;
    let cancelled = false;
    const handFamily = handRef.current
      ? getComputedStyle(handRef.current).fontFamily
      : "cursive";
    const serif = "Georgia, 'Times New Roman', serif";

    (async () => {
      try {
        await document.fonts.load(`80px ${handFamily}`);
      } catch {}
      if (cancelled) return;
      const { w, h } = SIZES[size];
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      const grad = ctx.createLinearGradient(0, 0, w * 0.4, h);
      grad.addColorStop(0, template.bg[0]);
      grad.addColorStop(1, template.bg[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      template.decorate(ctx, w, h, seeded(reference.length * 97 + 13));

      // Fit the verse into the middle of the card, shrinking until it fits.
      const family = lettering === "hand" ? handFamily : serif;
      const maxWidth = w - 260;
      const maxHeight = h * (size === "story" ? 0.5 : 0.52);
      let fontSize = lettering === "hand" ? 104 : 84;
      let lines: string[] = [];
      let lineHeight = 0;
      const quoted = `“${text.trim()}”`;
      while (fontSize > 28) {
        ctx.font = `${lettering === "serif" ? "italic " : ""}${fontSize}px ${family}`;
        lines = wrap(ctx, quoted, maxWidth);
        lineHeight = fontSize * (lettering === "hand" ? 1.2 : 1.42);
        if (lines.length * lineHeight <= maxHeight) break;
        fontSize -= 4;
      }

      const blockHeight = lines.length * lineHeight;
      const top = h / 2 - blockHeight / 2 - 40;
      ctx.fillStyle = template.ink;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      lines.forEach((line, i) => ctx.fillText(line, w / 2, top + i * lineHeight));

      if (reference.trim()) {
        ctx.font = `600 38px ${serif}`;
        ctx.fillStyle = template.soft;
        ctx.fillText(reference.trim().toUpperCase().split("").join(" "), w / 2, top + blockHeight + 48);
      }

      ctx.font = `88px ${handFamily}`;
      ctx.fillStyle = template.ink;
      ctx.fillText(name.trim() ? `${name.trim()} 🌸` : "lumina 🌸", w / 2, h - (size === "story" ? 230 : 150));
    })();

    return () => {
      cancelled = true;
    };
  }, [text, reference, template, size, lettering, name]);

  function toBlob(): Promise<Blob | null> {
    return new Promise((resolve) => canvasRef.current?.toBlob(resolve, "image/png"));
  }

  const fileName = `verse-${(reference || "card").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.png`;

  async function download() {
    const blob = await toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function share() {
    const blob = await toBlob();
    if (!blob) return;
    const file = new File([blob], fileName, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: reference });
        return;
      } catch {
        return; // user closed the share sheet
      }
    }
    download();
  }

  const pill = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm transition-colors ${
      active ? "bg-accent font-medium text-white" : "border border-line bg-card text-ink/70 hover:text-ink"
    }`;

  return (
    <div className="flex flex-col gap-6">
      <span ref={handRef} className="hidden font-hand" />
      <div>
        <h1 className="font-serif text-2xl text-ink">verse cards ✨</h1>
        <p className="mt-1 text-sm text-muted">
          Make a pretty card for your story, your lock screen, or a friend who needs it.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="mx-auto w-full max-w-[280px] shrink-0 md:mx-0">
          <canvas
            ref={canvasRef}
            className="w-full rounded-2xl border border-line shadow-lg"
            style={{ aspectRatio: `${SIZES[size].w} / ${SIZES[size].h}` }}
          />
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Verse</p>
            <div className="flex gap-2">
              <button onClick={() => setCustom(false)} className={pill(!custom)}>Pick one</button>
              <button onClick={() => setCustom(true)} className={pill(custom)}>Write my own</button>
            </div>
            {custom ? (
              <>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Type a verse or a little note…"
                  rows={3}
                  className="resize-none rounded-lg border border-line bg-card px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60"
                />
                <input
                  value={customRef}
                  onChange={(e) => setCustomRef(e.target.value)}
                  placeholder="Reference (optional), e.g. Psalm 46:10"
                  className="rounded-lg border border-line bg-card px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60"
                />
              </>
            ) : (
              <select
                value={verse?.reference ?? ""}
                onChange={(e) => setVerse(choices.find((v) => v.reference === e.target.value) ?? null)}
                className="rounded-lg border border-line bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-accent/60"
              >
                {choices.map((v, i) => (
                  <option key={v.reference} value={v.reference}>
                    {i === 0 ? `Today: ${v.reference}` : v.reference}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Style</p>
            <div className="flex flex-wrap gap-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t)}
                  className="flex flex-col items-center gap-1 text-xs text-ink/70"
                >
                  <span
                    className={`h-12 w-12 rounded-xl border-2 ${template.id === t.id ? "border-accent" : "border-line"}`}
                    style={{ background: `linear-gradient(160deg, ${t.bg[0]}, ${t.bg[1]})` }}
                  />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Lettering</p>
              <div className="flex gap-2">
                <button onClick={() => setLettering("serif")} className={pill(lettering === "serif")}>
                  <span className="font-serif italic">Classic</span>
                </button>
                <button onClick={() => setLettering("hand")} className={pill(lettering === "hand")}>
                  <span className="font-hand text-lg leading-none">Handwritten</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Size</p>
              <div className="flex gap-2">
                {(Object.keys(SIZES) as Size[]).map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={pill(size === s)}>
                    {SIZES[s].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            {canShare && (
              <button
                onClick={share}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Share 💌
              </button>
            )}
            <button
              onClick={download}
              className={`rounded-full px-5 py-2.5 text-sm font-medium ${
                canShare ? "border border-line text-ink/80 hover:text-ink" : "bg-accent text-white hover:opacity-90"
              }`}
            >
              Download PNG
            </button>
          </div>
          {!name && (
            <p className="text-xs text-muted">
              Tip: set your name in Settings to sign your cards.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
