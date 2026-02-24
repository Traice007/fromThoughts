# Design Partner Strategy — Post-Hire Founder ICP

*Last updated: February 2026*

> This document captures the strategic thinking on what to build and deliver first for design partners (post-hire founders with 1–2 sales reps). Read in conjunction with `docs/strategy/icp-assumptions.md` and `docs/product/product-roadmap-2026.md`.

---

## The Core Question

What is the lowest-risk, highest-value thing to build that demonstrates value to a post-hire founder design partner and generates the first evidence that fromThoughts works?

---

## The Competitive Boundary: Where HubSpot Ends

Before deciding what to build, the critical boundary to understand:

**HubSpot shows you data. fromThoughts tells you what that data means and what to do about it.**

These look similar on the surface but are completely different in value and mechanism.

| HubSpot does | fromThoughts does |
|---|---|
| Shows you 7 deals in "Proposal Sent" | Tells you 3 of them are dead and names which ones |
| Shows you pipeline coverage ratio | Tells you whether you'll hit this quarter's target and what needs to happen |
| Shows you deal velocity by stage | Tells your rep which 3 accounts to focus on this week and exactly why |
| Shows you activity logs | Tells you whether underperformance is a people problem or a process problem |
| Shows you conversion rates | Tells you the one structural fix that would move your pipeline most |

**HubSpot is the speedometer. fromThoughts is the driver.**

### What to avoid positioning-wise

Do NOT frame the design partner deliverable as:
- "We'll document your ICP" → HubSpot has target accounts and buyer persona builders
- "We'll fix your deal stage definitions" → HubSpot lets you configure custom stages with probabilities
- "We'll give you pipeline analytics" → HubSpot Professional has conversion rates and forecasting

These read as CRM configuration and invite the direct comparison. A design partner will reasonably say "HubSpot already does that at €50/month."

### What is genuinely not competed

- **The pipeline reality verdict** — "You have €180K in pipeline. €65K is real. Here's why." This requires judgment applied to their specific deals, not a dashboard.
- **This week's 3 priorities** for the founder + 3 for the rep, specific, ranked, impact-estimated — HubSpot has no concept of a curated weekly action list.
- **The structural observation** — the pattern across all their deals that Ranjith sees from the outside that the founder can't see because they're inside every individual deal.
- **People problem or process problem verdict** — strategic judgment on underperformance. No tool does this.

---

## The Right First Deliverable for Design Partners

**Not:** ICP documentation, deal stage redefinitions, or pipeline analytics.

**Yes:** Three things that require judgment, not just data visualisation:

1. **Pipeline reality verdict** — after reviewing their pipeline, a clear honest statement: what's genuinely active vs. what's zombie. No CRM produces this. It requires someone willing to call a deal dead that the rep thinks is still alive.

2. **This week's 3 priorities** — specific, ranked by impact, with a named next action for each. Not "follow up with Acme" but "reference the implementation concern from the Tuesday call and send the ROI one-pager referencing their Q2 deadline."

3. **One structural observation** — the systemic pattern Ranjith sees that the founder hasn't noticed because they're too close. This is the "moment of truth" mechanism: when Ranjith calls something, it happens, and the founder never ignores the product again.

---

## The Sequence: Service First, Then Build

### Step 0: Validate manually (no build required)

Before writing a line of code:

1. Conduct a 45-min pipeline review call with 1 design partner
2. Take structured notes: top 3–5 deals, each with stage / value / last activity / what's blocking
3. Within 24 hours, send a structured email or Notion doc with the three elements above
4. Watch for three signals: Do they read it? Act on at least one item? Ask for next week's list?

If all three happen consistently across 3–4 weeks with 2–3 founders, the engagement model is validated. If they don't engage, adjust format or content before building.

**The hypothesis to test:** "A founder will pay €15K/year because Ranjith + AI give them better pipeline focus than they'd have alone." This can only be answered by delivering the service to someone, not by asking them about it.

### Step 1: Build the Opportunities Dashboard

Once the engagement model is validated through manual delivery, build the system that makes it persistent and scalable. This is the **Opportunities Dashboard** — already planned and scoped in the product roadmap.

The Opportunities board turns Ranjith's manual review into a permanent product artifact in the founder's dashboard:
- Founder opens their dashboard Monday morning and sees their curated list
- They can share it with their rep ("here's our focus this week")
- They can track status over time (open → in progress → done)
- Historical weeks accumulate — this is the evidence artifact for design partner conversion

### Step 2: Admin interface (Ranjith's side)

The admin interface lets Ranjith:
- See all users and their pipeline data
- Create/edit/delete opportunities per user
- Review and enrich AI-drafted opportunities before they go live

Ranjith remains in the loop on every opportunity. Nothing reaches the founder that hasn't been reviewed. This is the right level of AI involvement at this stage.

---

## What the Opportunities Dashboard Is (and Isn't)

**It is NOT:**
- A pipeline visualisation (that's HubSpot/Pipedrive)
- An automated AI output (Ranjith reviews everything)
- A CRM feature (it's the output of strategic thinking, not data display)

**It IS:**
- Ranjith's judgment made visible and persistent in the product
- The weekly deliverable that justifies the €15K/year subscription
- The thing that validates the engagement model before building CRM integration

---

## Design Partner Conversation Questions (Post-Hire ICP)

Use these in the first review call to gather the data needed to populate the Opportunities board:

- *"Walk me through what your rep did last week — concretely."*
- *"Show me a deal you're worried about right now. What makes you worried?"*
- *"How do you tell your rep where to focus each week? What's that conversation like?"*
- *"What percentage of deals last quarter did you personally close?"*
- *"Is underperformance a people problem or a process problem — how do you know?"*
- *"How do you know when a deal is about to go cold — before it's already gone?"*

---

## Competitive Context (Feb 2026 research)

No tool currently exists for a founder + single rep structured pipeline review at this stage and price point:

- **Scratchpad** — requires Salesforce, mid-market positioning
- **Ebsta** — 100–249 employee target, custom/high pricing, HubSpot or Salesforce required
- **Clari** — enterprise, $100–125/user/month + $5K–50K platform fee
- **Gong** — $5K/year base + $1,200–1,600/user/year; ROI only emerges at 10+ reps
- **Skarbe** — deal-level only ($95–175/month), no strategic layer, no team direction
- **Husaca** — €5–7K/month, human-only, Amsterdam-based, no AI leverage
- **HubSpot** — data visualisation, no judgment layer, no "here's what to do this week"

**The gap:** No tool does AI-assisted strategic guidance + human review at €15K/year for this ICP. The market has tools for teams that already have RevOps maturity, tools that generate templates, and expensive human consultants. Nothing in between.

**Key stats:** See `docs/strategy/market-stats.md` for fully sourced and credibility-rated statistics. For conversations: Bridge Group's 2024 data shows fewer than 1 in 2 SaaS AEs hit quota, and the average new hire takes 5.7 months to ramp. The 68% figure (RVNU, Dec 2025) is directionally useful but too thinly sourced for public claims.

---

## What Success Looks Like for Design Partners

The product roadmap identifies five retention mechanisms. For design partners, the goal is to trigger at least one:

1. **Fear of loss on a specific deal** — Ranjith flags a deal going cold before it dies. The founder acts on it. This is the highest-value first event.
2. **The moment of truth** — Ranjith calls something specific, it happens exactly as predicted, the founder becomes a believer. Cannot be manufactured but can be set up by making specific, verifiable predictions.
3. **Accountability pull-through** — The founder engages with the dashboard in the days before the monthly review call because they don't want to show up unprepared.

For the first 2–3 design partners, success is:
- They come back asking for next week's list
- They share the opportunities with their rep
- They act on at least one item per week
- After 4–6 weeks: "fromThoughts flagged that deal and I didn't act on it — I won't ignore it again"
