"use client";

import { useEffect } from "react";
import { useFilterStore } from "@/store/useFilterStore";
import { Filters } from "@/components/Filters";
import { CandidateTable } from "@/components/CandidateTable";

export function CandidatesView() {
  const results = useFilterStore((s) => s.results);
  const loading = useFilterStore((s) => s.loading);

  useEffect(() => {
    const { filters, fetchResults } = useFilterStore.getState();
    fetchResults(filters);
  }, []);

  const averageScore =
    results.length > 0
      ? results.reduce((acc, c) => acc + c.score, 0) / results.length
      : null;

  const strongFits = results.filter((c) => c.score >= 80).length;

  return (
    <main className='mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12'>
      <header className='flex flex-col gap-2'>
        <h1 className='font-serif text-4xl leading-tight tracking-[-0.032em]'>Candidate results</h1>
        <p className='text-base leading-tight text-neutral-500'>
          Behavioural screen results for open roles.
          {averageScore !== null && (
            <span className='font-medium text-neutral-800'>
              {" "}
              Average score: {averageScore.toFixed(1)} · {strongFits} strong{" "}
              {strongFits === 1 ? "fit" : "fits"}
            </span>
          )}
        </p>
      </header>

      <Filters />

      {loading ? (
        <p className='rounded-xl bg-neutral-100 p-8 text-center text-base text-neutral-500'>Loading candidates…</p>
      ) : results.length === 0 ? (
        <p className='rounded-xl bg-neutral-100 p-8 text-center text-base text-neutral-500'>
          No candidates match your filters.
        </p>
      ) : (
        <CandidateTable results={results} />
      )}
    </main>
  );
}
