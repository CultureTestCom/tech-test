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

**First, you look at the codebase.** Talk us through it. We want to hear
what you find, both bugs and how it's put together: where the architecture
will hold up and where it won't, what would make it easier to build on, and
what's missing. Then tell us what needs fixing now, what can wait, and why.

Please don't use AI tools for this stage. We want to see how you read code
on your own. You can use them in the second stage.

**Second, you build something.** Read the three emails in
[CUSTOMER_FEEDBACK.md](./CUSTOMER_FEEDBACK.md), decide which one you'd deal
with first, and spend the rest of the session (about 45 minutes) building
part of it in this repo. Before you start, tell us which one you've picked,
why, and what you're going to build. Keep it small. We'd rather see
something that works than something bigger that half works, and we want to
hear what you decided to leave out.

For this stage, use whatever tools you normally use. AI assistants are fine,
and so is not using them. If something you found in the first stage gets in the way of
what you're building, fix it. If it doesn't, leave it and say so. A few
practical points:

- If you need a new endpoint, add a stub under `app/api/` like the existing
  ones. Keeping the data in memory is fine.
- Add it to `openapi.yaml` and run `npm run api:generate`. If orval gives you
  trouble, write the call by hand and tell us.
- The mock API fails now and then on purpose, like staging does. If you
  finish early, make sure what you've built handles that.

We'll finish by going through what you built, including what you'd need the
real Go backend to provide.

You'll probably find bugs along the way, but we're not counting them and we
don't expect you to find everything. Focus on what you think matters, tell us
what you're basing that on and what you're unsure about, and push back where
you disagree.

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
the spec. Everything outside that directory is written by hand, including
the code that wraps the generated client. In the real product the same spec
generates the Go server handlers.

There's no real backend in this repo. The routes under `app/api/` stand in
for it and read from `lib/fixtures.ts`. They behave like staging: variable
latency and the occasional failure.

## Other commands

```bash
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run build       # production build
```
