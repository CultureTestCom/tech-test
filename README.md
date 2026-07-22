# CultureTest: Candidate Results

## Context

This app is a toy demo of what a customer sees: a list of candidates, their
overall score and fit band. Our users use this view to decide who to shortlist for interviews, so what it shows needs to be trustworthy.

For the purposes of this tech test, assume this feature was built by a
contractor before you joined and you've inherited it. It works, more or less, and it's in front of customers.

We're about to build the next quarter of work on top of it. [ROADMAP.md](./ROADMAP.md) explains what the plans are. 

## What we'll do on the call

You'll walk us through the code and tell us what you make of it. We'll then
discuss what you would do with it and design the first roadmap item together,
out loud. There is no coding phase.

Although you'll probably find bugs, this isn't a bug-spotting competition and
we aren't counting how many you identify.

We're interested in how you assess an inherited codebase as a foundation for
what comes next: how its architecture will hold up, what would make it easier
to build in, and how you decide what must change now versus what can be carried
deliberately as debt.

We don't expect an exhaustive review. Focus on the areas you think matter and
explain the evidence, trade-offs and unknowns behind your judgement. Ask
questions and challenge our assumptions when you disagree.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## How the API works

We're spec first. `openapi.yaml` is the contract. The transport types and fetch
client under `lib/api/generated/` are produced from it by
[orval](https://orval.dev):

```bash
npm run api:generate
```

The generated output is committed, so you don't need to run it. Code outside
that directory is handwritten application code, even when it wraps the
generated client. In the real product the same spec generates the Go server
handlers.

There's no real backend in this repo. The routes under `app/api/` are a local
stand in for it, reading from `lib/fixtures.ts`. They simulate staging
conditions, including variable latency and occasional upstream failures.

## Other commands

```bash
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run build       # production build
```
