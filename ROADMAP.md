# Candidate results: what's next

Where this screen is going over the next quarter. This is the real backlog for
the area, lightly trimmed. Read it before the call.

The four items below are what we've committed to. They're ordered by when we
want them, not by how hard they are.

---

## 1. Shared shortlisting

> "A couple of us review candidates as results come in during the week. I keep
> a separate spreadsheet of who we want to take to interview, which is
> ridiculous. The shortlist should just live in CultureTest, so when I come
> back on Thursday I can pick up where I left off."
>
> Head of Talent, ~60 person company

The checkbox in the table today is a placeholder and does nothing. We want it
real: shortlisting a candidate should stick, survive sorting and filtering,
survive a refresh, and be visible to everyone on the hiring team, not just the
person who ticked it. We also want a way to see the shortlist on its own
without scrolling the full list.

This is the next thing we build.

## 2. Volume

Our first customers had 10 to 20 candidates per role. Our largest account is
now at 400 and is running three roles at once. The list currently loads
everything in one request and renders the lot.

We need paging or infinite scroll, and filtering that remains useful and
responsive at that scale.

## 3. Fit bands everywhere

Right now the score band ("Strong fit", "Possible fit", "Weak fit") only exists
on this screen. Three things want it next:

- A weekly digest email: "4 new strong fits this week."
- CSV export for customers who still want their spreadsheet.
- The candidate's own results page, which is a separate surface.

Sales have also asked whether bands can be configurable per company, because a
75 for one customer is not a 75 for another. Not committed, but it's coming.

Whatever a band means, it has to mean the same thing in all of these places.

## 4. Multiple workspaces

Agencies and group companies want one login across several hiring workspaces.
That means a workspace switcher, and results that are scoped to the workspace
you're in.

Practically it also means people will be sending each other links to filtered
views and to individual candidates, and expecting the right thing to load.

---

## Constraints worth knowing

- The backend is Go and Postgres. We own the API spec jointly, so if the right
  answer is "the backend should do this", say so. That's a normal conversation
  here, not a blocker.
- We're a small team shipping weekly. Something that works and is honest about
  what it doesn't do beats something complete in six weeks.
- Hiring decisions get made off this screen. If it shows something wrong,
  somebody real gets rejected or advanced on bad information.
