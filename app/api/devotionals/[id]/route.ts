import { NextResponse } from "next/server";
import { getDevotionalById, removeDevotional } from "@/lib/devotionalStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const devotional = await getDevotionalById(id);
  if (!devotional) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(devotional);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await removeDevotional(id);
  return NextResponse.json({ ok: true });
}
