"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CandidateSummary } from "@/lib/api/candidates";

const GRID_COLS = "grid-cols-[2fr_1.2fr_0.8fr_1.1fr_1.2fr_1fr]";

function scoreBand(score: number): { label: string; className: string } {
  if (score >= 75) return { label: "Strong fit", className: "bg-emerald-100 text-emerald-700" };
  if (score >= 60) return { label: "Possible fit", className: "bg-yellow-100 text-yellow-700" };
  return { label: "Weak fit", className: "bg-red-100 text-red-700" };
}

function Row({ candidate, className }: { candidate: CandidateSummary; className?: string }) {
  const router = useRouter();
  const [shortlisted, setShortlisted] = useState(false);
  const band = scoreBand(candidate.score);

  return (
    <div
      className={`grid items-center ${GRID_COLS} mt-1 cursor-pointer rounded-xl px-4 py-4 text-sm hover:bg-neutral-100 ${className ?? ""}`}
      onClick={() => router.push(`/candidates/${candidate.id}`)}
    >
      <span className='text-base font-medium leading-tight text-neutral-800'>{candidate.name}</span>
      <span className='text-neutral-600'>{candidate.role}</span>
      <span className='tabular-nums text-neutral-600'>{candidate.score}</span>
      <span className={`justify-self-start rounded-full px-2.5 py-0.5 text-xs font-semibold ${band.className}`}>
        {band.label}
      </span>
      <span className='text-neutral-600'>
        {new Date(candidate.completedAt).toLocaleDateString()}
      </span>
      <span onClick={(e) => e.stopPropagation()}>
        <label className='flex items-center gap-1.5 text-xs text-neutral-500'>
          <input
            type='checkbox'
            className='size-4 accent-neutral-800'
            checked={shortlisted}
            onChange={(e) => setShortlisted(e.target.checked)}
          />
          Shortlist
        </label>
      </span>
    </div>
  );
}

export function CandidateTable({ results }: { results: CandidateSummary[] }) {
  const [sortBy, setSortBy] = useState<"score" | "date">("score");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const changeSort = (nextSortBy: "score" | "date") => {
    if (nextSortBy === sortBy) {
      setSortDirection((current) => (current === "desc" ? "asc" : "desc"));
      return;
    }

    setSortBy(nextSortBy);
    setSortDirection("desc");
  };

  const sortArrow = (column: "score" | "date") => {
    if (column !== sortBy) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const sorted = [...results].sort((a, b) => {
    const comparison =
      sortBy === "score"
        ? a.score - b.score
        : new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();

    return comparison * (sortDirection === "asc" ? 1 : -1);
  });

  return (
    <div className='overflow-hidden rounded-md border border-neutral-300 bg-white'>
      <div className='border-b border-neutral-300 bg-neutral-50 px-6'>
        <div className={`grid h-12 items-center ${GRID_COLS} text-xs font-bold uppercase tracking-[1.92px] text-neutral-600`}>
          <span>Name</span>
          <span>Role</span>
          <button
            type='button'
            className={`flex cursor-pointer items-center gap-1 justify-self-start rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 ${sortBy === "score" ? "text-neutral-800" : ""}`}
            onClick={() => changeSort("score")}
            aria-label={`Sort by score ${sortBy === "score" && sortDirection === "desc" ? "ascending" : "descending"}`}
          >
            Score
            <span aria-hidden='true'>{sortArrow("score")}</span>
          </button>
          <span>Fit</span>
          <button
            type='button'
            className={`flex cursor-pointer items-center gap-1 justify-self-start rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 ${sortBy === "date" ? "text-neutral-800" : ""}`}
            onClick={() => changeSort("date")}
            aria-label={`Sort by completed date ${sortBy === "date" && sortDirection === "desc" ? "ascending" : "descending"}`}
          >
            Completed
            <span aria-hidden='true'>{sortArrow("date")}</span>
          </button>
          <span />
        </div>
      </div>
      <div className='px-2 pb-2 pt-1'>
        {sorted.map((candidate, i) => (
          <Row key={i} candidate={candidate} className={i % 2 ? "bg-neutral-50/50" : "bg-neutral-50"} />
        ))}
      </div>
    </div>
  );
}
