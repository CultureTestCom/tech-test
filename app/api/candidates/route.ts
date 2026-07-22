import { NextRequest, NextResponse } from "next/server";
import { candidates } from "@/lib/fixtures";

// Local stand-in for the backend API 
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(req: NextRequest) {
  await sleep(150 + Math.random() * 1050);

  // staging environment like flakiness 
  if (Math.random() < 0.125) {
    return NextResponse.json({ error: "upstream timeout" }, { status: 502 });
  }

  const params = req.nextUrl.searchParams;
  const role = params.get("role");
  const minScore = Number(params.get("minScore") ?? 0);
  const search = (params.get("search") ?? "").toLowerCase();

  const results = candidates
    .filter((c) => (role && role !== "all" ? c.role === role : true))
    .filter((c) => Number(c.score) >= minScore)
    .filter((c) => (search ? c.name.toLowerCase().includes(search) : true))
    .map((c) => ({
      id: c.id,
      name: c.name,
      role: c.role,
      score: c.score,
      completedAt: c.completedAt,
    }));

  return NextResponse.json(results);
}
