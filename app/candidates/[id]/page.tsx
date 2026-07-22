import Link from "next/link";
import { getCandidateById } from "@/lib/api/candidates";
import { headers } from "next/headers";


function fitLabel(score: number): string {
  if (score >= 70) return "Strong fit";
  if (score >= 60) return "Possible fit";
  return "Weak fit";
}

export default async function CandidatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host") ?? "localhost:3000";

  const base = process.env.NEXT_PUBLIC_API_URL ?? `${proto}://${host}`;

  const candidate = await getCandidateById(id, base);

  return (
    <main className='mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12'>
      <Link href='/' className='text-sm text-neutral-500 hover:text-neutral-800'>
        ← All candidates
      </Link>

      <header className='flex flex-col gap-2'>
        <h1 className='font-serif text-4xl leading-tight tracking-[-0.032em]'>{candidate.name}</h1>
        <p className='text-base leading-tight text-neutral-500'>
          {candidate.role} · Overall score {candidate.score} - {" "}
          {fitLabel(candidate.score)}
        </p>
      </header>

      <section className='rounded-md border border-neutral-300 bg-white p-6'>
        <h2 className='mb-4 text-lg font-medium leading-tight'>Dimension breakdown</h2>
        {candidate.dimensions.map((d) => (
          <div key={d.label} className='grid grid-cols-[240px_1fr_48px] items-center gap-4 py-2'>
            <span className='text-sm text-neutral-800'>{d.label}</span>
            <div className='h-2 overflow-hidden rounded-full bg-neutral-200'>
              <div
                className='h-full rounded-full bg-neutral-800'
                style={{ width: `${d.score}%` }}
              />
            </div>
            <span className='text-right text-sm tabular-nums text-neutral-600'>{d.score}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
