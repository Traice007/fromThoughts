# fromThoughts — 2026 Product Roadmap

*Last updated: February 2026*
*Goal: Make the €15K/year Pro tier deliver comparable value to a fractional VP of Sales (€80K-120K/year)*

---

## What a Fractional VP Actually Does (the benchmark)

A fractional VP at SalesQuarters or Husaca, 1-3 days/week, typically delivers:

1. **Weekly pipeline review** — reviews every open deal, flags risks, prioritizes next actions
2. **Rep coaching** — listens to calls, gives feedback, helps improve close rate
3. **Process building** — defines stages, qualification criteria, handoff procedures
4. **Forecasting** — gives the founder a realistic revenue forecast based on pipeline health
5. **Hiring guidance** — when to hire, what profile, compensation benchmarking, interview process
6. **Strategic adjustment** — adapts the plan based on what's working and what isn't

fromThoughts needs to deliver most of this through AI + Ranjith's time, at 1/5th the cost.

---

## Phase 0: Current Product (Live)
- One-time execution plan with OKRs, gap analysis, recommendations
- Pipeline import (CSV/Google Sheets)
- CRM integration preference capture (HubSpot, Pipedrive)
- Manual follow-up by Ranjith

**Gap vs. fractional VP:** One-time output, no ongoing engagement, no pipeline monitoring, no rep coaching.

---

## Phase 1: The Weekly Brief + Pipeline Dashboard (Q2 2026)
*Makes the product recurring. Justifies the shift from one-time to annual pricing.*

### 1.1 CRM Read Integration
- **HubSpot and Pipedrive read access** (OAuth 2.0, already partially built)
- Pull deal data: stage, value, close date, last activity, owner
- Sync weekly (or on-demand)
- For non-CRM users: enhanced CSV import with scheduled re-upload reminders

### 1.2 Pipeline Dashboard + fromThoughts Health Score
- Visual pipeline view: deals by stage, value, age
- Health indicators: pipeline coverage ratio, average deal age per stage, conversion rates between stages
- Trend lines: week-over-week changes in pipeline value, deal count, stage velocity
- **Stall detection**: flag deals with no activity in X days (configurable)
- **fromThoughts Health Score (0-100)**: single number combining:
  - Pipeline Score (30%): coverage, deal count, value distribution
  - Velocity Score (25%): stage progression speed, stall rate, time-to-close (inspired by Husaca's velocity concept)
  - Execution Score (25%): activity levels, follow-up speed, next-action completion
  - Readiness Score (20%): process maturity, documentation, hire-readiness signals
- Score is calibrated per company (measures progress against their own baseline, not generic benchmarks)
- Industry benchmarks provided as context, not as the target

### 1.3 The Monday Brief with Next Best Actions
*Inspired by Skarbe's deal-level next-best-actions but elevated to the sales manager level.*

Every Monday, the founder and their sales rep(s) receive:
- **3 priority deals** with specific next actions — not "follow up" but "reference the implementation concern from Tuesday's call and send the case study showing 2-week deployment" (Skarbe-style specificity)
- **1 pipeline alert**: coverage dropping, stage bottleneck, deal gone cold
- **1 coaching nudge**: pattern the AI noticed ("Your rep closes faster when they do a second stakeholder call — suggest it for Deal Y")
- **Health Score update**: "Your score moved from 58 to 62 this week. Pipeline coverage improved, but stage 3 velocity is slowing."
- **Founder involvement flag**: which deals still need the founder vs. which the rep can run solo

This replaces: the Monday standup a fractional VP would lead.

### 1.4 Ranjith's Monthly Review (Hybrid Layer)
- Monthly 45-min pipeline review call
- Review the AI's Weekly Briefs — correct where the AI was wrong, add context
- Strategic guidance: "Based on what I'm seeing, you should do X this month"
- This call is what trains the AI over time

**Deliverable for Pro tier (Phase 1):**
- AI-generated execution plan + OKRs (one-time)
- Weekly pipeline monitoring + Weekly Brief (automated)
- Pipeline dashboard with health metrics (always-on)
- Monthly pipeline review call with Ranjith (12/year)
- Async access to Ranjith via email/Slack for urgent questions

---

## Phase 2: Rep Coaching & Deal Intelligence (Q3-Q4 2026)
*Replaces the "sitting in on calls and coaching reps" function of a fractional VP.*

### 2.1 Deal Intelligence Cards
*Inspired by Skarbe's deal-level intelligence but with strategic context.*

Each deal in the pipeline gets a card with:
- **Deal Score**: Likelihood to close based on stage, age, value, activity patterns
- **Next Best Action**: The one specific thing to do this week (Skarbe-style specificity, not generic reminders)
- **Risk Flag**: What could go wrong (stall, competitor, missing stakeholder)
- **Founder Involvement Needed?**: Yes/No — "This deal needs your credibility on the next call" vs. "Your rep can handle this solo"
- **Win/loss pattern matching**: "Deals like this closed 35% of the time. Here's what winners did differently."

### 2.2 Deal Coaching
For each open deal, the system provides:
- **Deal score**: likelihood to close based on stage, age, value, activity patterns
- **Next action suggestion**: "Schedule a discovery call with the technical buyer" / "Send a proposal — this deal has been in negotiation for 3 weeks"
- **Risk flags**: "No activity in 14 days" / "Close date has been pushed twice" / "Deal value increased without stage advancement — verify"
- **Win/loss pattern matching**: "Deals like this (same stage, similar value, same industry) closed 35% of the time. Here's what the winners did differently."

### 2.3 Pre-Call Briefs
Before scheduled meetings (pulled from CRM/calendar):
- Deal context summary: history, stakeholders, previous interactions
- Suggested talking points based on deal stage and common objections at that stage
- Competitive intel if known (from previous deals or manual input)
- Recommended next step to push for on the call

### 2.4 Post-Activity Prompts
After a deal moves stage or an activity is logged:
- Prompt the rep to update notes, close date, next steps
- Suggest follow-up actions based on the new stage
- Flag if the deal is now off-track vs. the typical winning pattern

### 2.5 Rep Performance Dashboard
- Activity metrics: calls, emails, meetings per week
- Conversion rates by stage (compared to team average and benchmarks)
- Deal velocity: average time in each stage
- Coaching suggestions: "Your rep's demo-to-proposal conversion is 40% vs. benchmark of 55% — suggest focusing on stronger qualification before demos"

### 2.6 Performance Mapping on Autopilot
*Inspired by Husaca's Performance Mapping diagnostic, but automated and continuous.*

**Onboarding diagnostic** (one-time, when they sign up):
- Team composition questionnaire
- Pipeline import + historical analysis
- Win/loss pattern analysis from CRM data
- ICP clarity assessment (are you chasing the right accounts?)
- Competitive positioning review
- Current process maturity score
- Output: "State of Your Sales Operation" report — similar to Husaca's Performance Mapping but generated in hours, not weeks

**Ongoing re-assessment** (monthly):
- Auto re-runs as new data flows in
- Trend lines: "Your ICP fit improved from 45% to 68% as you focused on mid-market"
- Structural flags: "Your funnel has a 70% drop-off between demo and proposal — your biggest leverage point"
- Feeds into the Health Score

**What this replaces:** The diagnostic and coaching a fractional VP provides in weekly 1:1s. Husaca charges €5-7K/month for manual performance mapping. fromThoughts does it continuously as part of the €15K/year package.

---

## Phase 3: Hiring Readiness & Team Scaling (Q1 2027)
*Replaces the "when and who to hire" advisory function of a fractional VP.*

### 3.1 Hire-Readiness Scorecard
Based on pipeline data and execution metrics, the system scores whether the company is ready to hire:
- Pipeline generation capacity (enough for 2 reps?)
- Process documentation level (is the playbook transferable?)
- Win rate stability (is the sales motion repeatable?)
- Revenue per rep benchmark (can the economics support another hire?)
- Founder time in sales (what % of deals still need founder involvement?)

Output: "You're ready to hire" / "Not yet — here's what to fix first" with specific actions.

### 3.2 Hire Profile Recommendation
Based on the company's stage, deal complexity, and current gaps:
- Recommended role: SDR, AE, or sales manager
- Experience level and profile (builder vs. scaler)
- Compensation benchmarking for NL/EU market
- Interview questions tailored to the company's specific needs
- Onboarding plan: first 30/60/90 days tied to the existing execution plan

### 3.3 New Hire Onboarding System
When a new rep joins:
- Auto-generated onboarding brief: ICP, sales process, key accounts, pipeline state
- "Founder DNA" transfer: the founder's patterns, preferences, and judgment encoded into coaching prompts
- Ramped coaching: more prescriptive guidance in weeks 1-4, gradually loosening as the rep proves competence
- Progress tracking: is the new hire ramping on schedule?

**What this replaces:** The hiring advisory and onboarding oversight a fractional VP provides.

---

## Phase 4: Continuous Intelligence & Expansion (2027+)
*The full "revenue operating system" vision.*

### 4.1 Conversational AI Interface
- Founder or rep can ask questions: "Should I follow up with Acme Corp?" / "What's my forecast for Q3?" / "Is my pipeline healthy?"
- AI responds with context-aware answers drawing on their specific data, plan, and patterns
- Replaces the ad-hoc "quick question" calls to a fractional VP

### 4.2 Forecast Intelligence
- AI-generated revenue forecast updated weekly based on pipeline state
- Scenario modeling: "If you close these 3 deals and add 5 new opportunities, you'll hit target"
- Board-ready reporting: simple slides/PDFs the founder can share with investors

### 4.3 Multi-Rep Management
- Team-level dashboards and comparisons
- Automated territory/account assignment suggestions
- Team meeting agenda generator based on pipeline state

### 4.4 Integration Expansion
- Salesforce
- Task management: Notion, Asana, ClickUp (push OKRs and weekly tasks)
- Calendar integration for pre-call briefs
- Slack/Teams for notifications and async coaching

### 4.5 European Localization
- Dutch, German, French, Swedish language support
- Market-specific benchmarks by country
- Localized compensation data for hiring recommendations

---

## Pro Tier Evolution Summary

| Phase | What the founder gets | What the rep gets | Ranjith's time |
|-------|----------------------|-------------------|----------------|
| **Phase 0** (now) | Execution plan + OKRs | Nothing | Manual follow-up |
| **Phase 1** (Q2 2026) | Weekly Brief + pipeline dashboard + monthly call | Weekly priorities email | ~2-3 hrs/client/month |
| **Phase 2** (Q3-Q4 2026) | All above + deal intelligence + rep performance | Pre-call briefs + deal coaching + post-activity prompts | ~1-2 hrs/client/month |
| **Phase 3** (Q1 2027) | All above + hire-readiness + onboarding system | Onboarding plan + ramped coaching | ~1 hr/client/month |
| **Phase 4** (2027+) | Full revenue operating system | Continuous AI coaching | Strategic only |

**Key metric:** Ranjith's time per client should decrease from ~3 hrs/month (Phase 1) to ~1 hr/month (Phase 3) as the AI absorbs operational work. This enables scaling from 15-20 clients to 50+ without proportional time increase.

---

## Build Priority (What to Build First)

1. **CRM read integration** — foundation for everything else
2. **Weekly Brief** — strongest retention mechanism, can be partially manual at first
3. **Pipeline dashboard** — visual proof of value, always visible
4. **Deal coaching** — replaces the most time-intensive fractional VP function
5. **Hire-readiness scorecard** — unique differentiator, no competitor has this
6. **Pre-call briefs** — high daily-use value for reps
7. **Everything else** — build based on demand from first 10 clients
