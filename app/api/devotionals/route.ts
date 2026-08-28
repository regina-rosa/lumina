import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import {
  getDevotionalById,
  listDevotionals,
  putDevotional,
} from "@/lib/devotionalStore";
import type { Devotional } from "@/lib/devotionals";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const items = await listDevotionals();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const content = String(body.body ?? "").trim();
  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and body are required." },
      { status: 400 }
    );
  }

  const editId = typeof body.id === "string" && body.id ? body.id : null;
  let createdAt = new Date().toISOString();
  if (editId) {
    const existing = await getDevotionalById(editId);
    if (existing) createdAt = existing.createdAt;
  }

  const devotional: Devotional = {
    id: editId ?? randomUUID(),
    title,
    author: String(body.author ?? "").trim(),
    verseRef: String(body.verseRef ?? "").trim(),
    body: content,
    coverColor: String(body.coverColor ?? "#f59e0b"),
    createdAt,
  };

  await putDevotional(devotional);
  return NextResponse.json(devotional);
}
