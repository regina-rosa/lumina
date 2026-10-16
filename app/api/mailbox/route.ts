import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { NOTE_TYPES, sendNote, type NoteType } from "@/lib/mailbox";
import { isLang } from "@/lib/i18n/config";

export const runtime = "nodejs";

// Visitors post here; we check the note, then forward it to the Sheet.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Bots fill every field and submit instantly; people don't.
  if (body.website) return NextResponse.json({ ok: true });
  const elapsed = Number(body.elapsed ?? 0);
  if (!Number.isFinite(elapsed) || elapsed < 2500) {
    return NextResponse.json({ ok: false, error: "too_fast" }, { status: 400 });
  }

  const type = NOTE_TYPES.includes(body.type as NoteType) ? (body.type as NoteType) : "hi";
  const message = String(body.message ?? "").trim();
  const name = String(body.name ?? "").trim().slice(0, 40);
  if (message.length < 3 || message.length > 1000) {
    return NextResponse.json({ ok: false, error: "length" }, { status: 400 });
  }

  // An anonymous per-visitor key for rate limiting; the IP itself is never stored.
  const ip =
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const client = createHash("sha256")
    .update(`${ip}|${process.env.LUMINA_MAILBOX_SECRET ?? ""}`)
    .digest("hex")
    .slice(0, 32);

  const result = await sendNote({
    type,
    name,
    message,
    lang: isLang(String(body.lang)) ? String(body.lang) : "en",
    share: type !== "prayer" && body.share === true,
    client,
  });

  const status = result.ok ? 200 : result.error === "rate_limited" ? 429 : result.error === "not_configured" ? 503 : 502;
  return NextResponse.json({ ok: result.ok, error: result.error }, { status });
}
