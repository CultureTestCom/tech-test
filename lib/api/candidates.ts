import {
  listCandidates,
  getGetCandidateByIdUrl,
} from "@/lib/api/generated";

// FIXME(dan, contractor): the generated types have score as a string, which
// broke every comparison and sort in the UI. Redeclared them here as numbers
// to unblock the build - regenerate once the v0.4 spec lands.

export interface CandidateSummary {
  id: string;
  name: string;
  role: "Engineering" | "Product" | "Sales";
  score: number;
  completedAt: string;
}

export interface DimensionScore {
  label: string;
  score: number;
}

export interface CandidateDetail extends CandidateSummary {
  dimensions: DimensionScore[];
}

export interface CandidateFilters {
  role: string;
  minScore: number;
  search: string;
}

export async function getCandidates(
  filters: CandidateFilters
): Promise<CandidateSummary[]> {
  const { data, status } = await listCandidates({
    role: filters.role,
    minScore: filters.minScore,
    search: filters.search,
  });

  if (status !== 200) {
    throw new Error(`getCandidates failed: ${status}`);
  }

  return data as unknown as CandidateSummary[];
}

export async function getCandidateById(
  id: string,
  base = ""
): Promise<CandidateDetail> {
  // the generated client is same-origin only, which doesn't work from a server
  // component - borrowing its url builder and doing the fetch here
  const res = await fetch(`${base}${getGetCandidateByIdUrl(id)}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`getCandidateById failed: ${res.status}`);
  }

  return (await res.json()) as CandidateDetail;
}
