import { NextRequest, NextResponse } from "next/server";
import { candidates } from "@/lib/fixtures";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await sleep(100 + Math.random() * 300);

  const { id } = await params;
  const candidate = candidates.find((c) => c.id === id);

  if (!candidate) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json(candidate);
}
