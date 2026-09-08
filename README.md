# CultureTest: Candidate Results

## What this is

This repo is a toy demo of the results screen our customers use. 
A list of candidates, their overall score and a fit band. 

For the purposes of the call, assume a contractor built this before you
joined and it's now yours. It works, more or less, and customers are using
it.

There's no roadmap for this screen yet. What we do have is
[CUSTOMER_FEEDBACK.md](./CUSTOMER_FEEDBACK.md), three emails from customers.
Deciding what to build from them is part of the call.

## What we'll do on the call

There are two stages.

**First Stage:** Talk us through it. We want to hear
what you find, both bugs and how it's put together: where the architecture
will hold up and where it won't, what would make it easier to build on, and
what's missing. Then tell us what needs fixing now, what can wait, and why.

Please don't use AI tools for this stage. We want to see how you read code
on your own. You can use them in the second stage.

**Second Stage:** Read the three emails in
[CUSTOMER_FEEDBACK.md](./CUSTOMER_FEEDBACK.md), decide which one you'd deal
with first, and spend the rest of the session (about 45 minutes) building
part of it in this repo. Before you start, tell us which one you've picked,
why, and what you're going to build. Keep it small. We'd rather see
something that works than something bigger that half works, and we want to
hear what you decided to leave out.

For this stage, use whatever tools you normally use. AI assistants are fine,
and so is not using them.

We'll finish by going through what you built, including what you'd need the
real Go backend to provide.


## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## How the API works

`openapi.yaml` is the source of truth. [orval](https://orval.dev) generates
the types and fetch client under `lib/api/generated/` from it:

```bash
npm run api:generate
```

The generated code is committed, so you only need to run that if you change
the spec. Everything outside that directory is written by hand.
In the real product the same spec generates the Go server handlers.

There's no real backend in this repo. The routes under `app/api/` stand in
for it and read from `lib/fixtures.ts`. They behave like staging: variable
latency and the occasional failure.

## Other commands

```bash
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run build       # production build
```
