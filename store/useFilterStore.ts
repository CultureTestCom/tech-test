import { create } from "zustand";
import {
  getCandidates,
  type CandidateFilters,
  type CandidateSummary,
} from "@/lib/api/candidates";

interface FilterState {
  filters: CandidateFilters;
  results: CandidateSummary[];
  loading: boolean;
  setFilter: <K extends keyof CandidateFilters>(
    key: K,
    value: CandidateFilters[K]
  ) => void;
  clearFilters: () => void;
  fetchResults: (filters: CandidateFilters) => Promise<void>;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  filters: { role: "all", minScore: 0, search: "" },
  results: [],
  loading: false,

  setFilter: (key, value) => {
    set({ filters: { ...get().filters, [key]: value } });
  },

  clearFilters: () => {
    const cleared: CandidateFilters = { role: "all", minScore: 0, search: "" };
    set({ filters: cleared });
    get().fetchResults(cleared);
  },

  fetchResults: async (filters) => {
    set({ loading: true });
    try {
      const data = await getCandidates(filters);
      set({ results: data, loading: false });
    } catch {
      set({ results: [], loading: false });
    }
  },
}));
