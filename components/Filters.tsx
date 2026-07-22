"use client";

import { useMemo } from "react";
import { useFilterStore } from "@/store/useFilterStore";

function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: A) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export function Filters() {
  const filters = useFilterStore((s) => s.filters);
  const setFilter = useFilterStore((s) => s.setFilter);
  const clearFilters = useFilterStore((s) => s.clearFilters);
  const fetchResults = useFilterStore((s) => s.fetchResults);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const state = useFilterStore.getState();
        state.fetchResults({ ...state.filters, search: value });
      }, 300),
    [],
  );

  return (
    <div className='flex items-end gap-4 rounded-md border border-neutral-300 bg-white p-4'>
      <label className='flex flex-col gap-1 text-xs font-semibold text-neutral-600'>
        Role
        <select
          className='h-9 rounded-md border border-neutral-300 bg-white px-2 text-sm font-normal text-neutral-800 outline-none focus:border-neutral-500'
          value={filters.role}
          onChange={(e) => {
            setFilter("role", e.target.value);
            fetchResults({ ...filters, role: e.target.value });
          }}
        >
          <option value='all'>All roles</option>
          <option value='Engineering'>Engineering</option>
          <option value='Product'>Product</option>
          <option value='Sales'>Sales</option>
        </select>
      </label>

      <label className='flex flex-col gap-1 text-xs font-semibold text-neutral-600'>
        Min score
        <select
          className='h-9 rounded-md border border-neutral-300 bg-white px-2 text-sm font-normal text-neutral-800 outline-none focus:border-neutral-500'
          value={filters.minScore}
          onChange={(e) => {
            const v = Number(e.target.value);
            setFilter("minScore", v);
            fetchResults({ ...filters, minScore: v });
          }}
        >
          <option value={0}>Any</option>
          <option value={60}>60+</option>
          <option value={75}>75+</option>
          <option value={90}>90+</option>
        </select>
      </label>

      <label className='flex flex-col gap-1 text-xs font-semibold text-neutral-600'>
        Search
        <input
          className='h-9 rounded-md border border-neutral-300 bg-white px-2 text-sm font-normal text-neutral-800 outline-none focus:border-neutral-500'
          type='text'
          placeholder='Candidate name…'
          value={filters.search}
          onChange={(e) => {
            setFilter("search", e.target.value);
            debouncedSearch(e.target.value);
          }}
        />
      </label>

      <button
        type='button'
        onClick={clearFilters}
        className='h-9 cursor-pointer rounded-full border border-neutral-300 bg-white px-4 text-sm font-medium leading-tight hover:bg-neutral-100'
      >
        Clear filters
      </button>
    </div>
  );
}
