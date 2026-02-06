# Gap Analysis: Market Research vs. Current Product (Jan 2025)

## What the research envisions vs. what exists

The market research describes a **"guided growth execution platform"** — a virtual sales and marketing manager that provides continuous, operational guidance. What's built is closer to an **AI-powered OKR generator** — a one-shot tool that takes inputs, runs them through an LLM, and produces a static report.

## Core Capabilities Comparison

| Capability | Research Vision | What's Built | Gap |
|---|---|---|---|
| 1. Revenue Target Decomposition | Convert goals into pipeline, conversion, and activity requirements | Converts goals into OKRs with key results | Missing: weekly/monthly activity-level breakdown (e.g., "you need 12 outbound calls/day") |
| 2. Execution Guidance | Recommend focus areas based on real performance data | Recommendations based on user-entered data + static benchmarks | Missing: no live data connection. Guidance is one-time, not continuous |
| 3. Integrated Task Direction | Push insights into task management tools (Notion, Asana, ClickUp) | Push deals into CRM (HubSpot, Pipedrive) | Missing entirely: no task tool integration. CRM sync creates deals, not tasks |
| 4. Metric Steering & Alerts | Highlight leading indicators, warn when drifting off course | Basic OKR progress tracking in dashboard | Missing: no alerts, no automated monitoring, no "you're behind" notifications |
| 5. Founder-Level Explanations | Explain why certain actions matter, trade-offs, timing | AI-generated rationale on OKRs | Partially built, but static — no ongoing contextual advice |

## 3 Biggest Product Gaps

### 1. Report generator, not an operating system

The research talks about a product that acts as a continuous virtual manager. What's built is a one-time forecast-to-OKR pipeline. A founder uses it once, gets their OKRs, and the dashboard shows OKRs but doesn't actively guide day-to-day execution. The research's core insight — "existing tools provide data but not direction" — applies to the current product.

What's missing: recurring check-ins, weekly priority recalculation, progress-driven re-recommendations, a feedback loop that reads CRM data and adjusts guidance.

### 2. No task management integration

The research specifically calls out connecting CRM insights to task management tools (Notion, Asana, ClickUp) and mentions buyers use these tools. The current product only integrates with CRMs to push deal records. It doesn't create tasks, assign priorities, or connect to where founders actually execute their work.

This is the biggest differentiator in the research — the bridge between "know what to do" and "actually do it" — and it's completely absent.

### 3. No live data / feedback loop

CRM integrations are write-only (push a deal). They don't read pipeline data, track deal progression, or pull real performance metrics. The product can't steer because it can't see where you are. The research talks about "real performance data" but the product only uses self-reported numbers entered once during the forecast form.

## Pricing Mismatch

Market research assumes €10,000/year ACV for a "service as a software" product. Current pricing:
- Trial: $1,700 one-time (90 days)
- Pro: $8,720/year
- Enterprise: Custom

Pro tier roughly aligns with the research ACV, but the Trial tier at $1,700 for a one-shot OKR report is expensive for what amounts to a single AI-generated document. That price makes more sense for the continuous execution platform described in the research.

## Market Research Gaps

### 1. TAM numbers feel generous
The claim of 300,000 B2B companies globally in the €500K-€2M range lacks sourcing. The 5% SOM penetration (4,500 customers in 3-5 years) is aggressive for an early-stage company selling a €10K product. Requires a serious sales operation.

### 2. Competitive analysis is too abstract
The doc describes competitor categories but doesn't name specific products. Need to map: Clari, Gong, RevenueCat, Lattice (OKRs), Workboard, Gtmhub/Quantive, Pecan AI, and ChatGPT + spreadsheets. The "fractional VP" alternative also deserves more analysis — at €10K/year, competing with consultants charging €2-5K/month with hands-on help.

### 3. No go-to-market strategy
The research identifies the market but doesn't address how to reach founders. For a €10K ACV product targeting small companies: content marketing, partnerships with accelerators, CRM marketplace listings, founder communities.

### 4. "Service as Software" positioning needs delivery
Compelling framing, but the current product doesn't deliver on it. A true "service as software" would feel like having a fractional VP of Sales on retainer — proactive, continuous, context-aware.

### 5. European focus vs. USD pricing
Research targets Europe initially, but the product prices in USD.

## Suggested Roadmap

### Phase 1 — Make it sticky (retention)
- Add CRM read integration — pull live pipeline data from HubSpot/Pipedrive
- Build a weekly digest/check-in that recalculates priorities based on actual pipeline movement
- Add email/notification alerts when metrics drift from targets

### Phase 2 — Make it actionable (task direction)
- Integrate with one task tool (Notion API or Linear)
- Auto-generate weekly task lists from OKRs + current performance data
- Assign priorities and ownership suggestions

### Phase 3 — Make it intelligent (continuous guidance)
- Build the feedback loop: CRM data in → AI analysis → updated recommendations → tasks out
- Add "founder-level explanations" as an ongoing conversational interface
- Hiring readiness indicators (when to optimize vs. hire)

### Phase 4 — Expand integrations and market
- Salesforce integration (opens US market)
- Asana/ClickUp/Monday integrations
- European localization (EUR pricing, GDPR positioning as feature)

## Bottom Line

The market research identifies a real problem and a compelling market position. There's a significant gap between the vision (continuous execution guidance platform) and the current product (one-shot AI OKR report). The core risk is that the product is priced and positioned for the vision but delivers the MVP. The most critical next step is closing the loop — making the product ongoing rather than one-time — because that's what justifies the ACV and creates retention.

---

# ICP Deep Dive & Go-To-Market Research (Feb 2025)

## Ideal Customer Profile

### Who They Are

**Profile:** B2B founders/CEOs, 3-10 employees, EUR 300K-EUR 1.5M annual revenue, based in the Netherlands (primary) and EU (secondary). They are at or approaching the point of hiring their first commercial/sales person.

**Most common verticals** for B2B startups at this stage in the Netherlands:
- SaaS/software (horizontal and vertical)
- Fintech & payments
- Healthtech & medtech
- Climate/energy tech
- Logistics & supply chain
- Martech & content platforms
- Audit/accounting automation
- Agritech

### Their Pain Points

1. **The founder is the bottleneck** -- They're the only person who can sell, but they also need to build product, manage the team, and run the company. Every sales call they take is time away from everything else.

2. **No documented sales process** -- Everything is in the founder's head: which messaging works, what objections come up, what the sales cycle looks like, who the ideal customer is. None of it is written down.

3. **The first sales hire problem** -- Most first sales hires don't work out (per Jason Lemkin at SaaStr). Founders hire too early, hire from big companies where brand sold itself, or hand off without a playbook. The new hire fails, costing 6-12 months and EUR 50K-EUR 100K.

4. **Knowledge transfer is the core challenge** -- Even when a founder does hire, they struggle to transfer their intuitive understanding of the customer, the product, and the market. A founder knows *why* a certain pitch works, but can't articulate it in a way that's teachable.

5. **Can't afford a VP of Sales** -- At EUR 300K-EUR 1.5M revenue, a EUR 150K-EUR 250K Head of Sales is 10-50% of total revenue. A fractional VP at EUR 60K-EUR 100K is more realistic but still significant, and they're not full-time.

6. **Fear of losing control** -- Handing sales to someone else feels risky. The founder worries the new hire will say the wrong things, misposition the product, or lose deals the founder would have won.

### Psychographic Profile

- **Motivated by:** Building something meaningful, proving product-market fit, hitting growth milestones that unlock next funding round or self-sustainability
- **Keeps them up at night:** "Am I growing fast enough? Should I hire a salesperson now or wait? What if they don't work out? I can't keep doing all the selling myself."
- **How they buy tools:** Peer recommendations from other founders, LinkedIn content from people they trust, trying the product themselves before committing. Skeptical of flashy marketing -- they want to see it work.
- **Tech stack:** Typically HubSpot or Pipedrive for CRM (sometimes Salesforce, rarely at this stage), Notion/Linear for project management, Slack for comms, Google Workspace

### The Knowledge Transfer Angle

This is where FounderVision's positioning gets strongest. The research shows:

- **Document before you hire** -- Experts universally agree you need a sales playbook before making your first hire, but most founders don't have one.
- **A sales assistant should come first** -- Some advisors recommend hiring a "process-oriented sales assistant" who shadows the founder and codifies what they do into a playbook.
- **FounderVision IS that codification step** -- It forces the founder to externalize their strategy (targets, market, competition, gaps) and produces a structured, transferable document.
- **The positioning:** "Build the revenue playbook your first hire can execute on -- before you spend EUR 150K finding out they can't figure it out alone."

Common failure modes when transitioning from founder-led sales:
- Hiring someone from a big company who relied on brand, not skill
- Hiring before the process is documented
- Handing off completely instead of transitioning gradually (shadow -> co-sell -> coach)
- Hiring one rep instead of two (can't compare/learn)

---

## Where to Find Them -- Netherlands

### Communities & Networks

| Community | Focus | Notes |
|---|---|---|
| Dutch Startup Association | Connects experienced & early-stage entrepreneurs, events, webinars | ~9,800 LinkedIn followers |
| StartupAmsterdam | Broad ecosystem support | 16K+ LinkedIn followers, iamsterdam.com |
| FoundersMesh | Founder-focused meetups and networking nights | Amsterdam-based |
| Hackers & Founders Amsterdam | Largest tech entrepreneur community in NL, monthly meetups | Amsterdam |
| Sessions Community | B2B sales/marketing founders, interactive roundtables | Amsterdam |
| Techleap Community | Curated, invitation-only network for scaling founders | techleap.nl (requires $2M+ revenue or significant funding) |

### Accelerators & Incubators (relevant stage)

| Program | City | Focus |
|---|---|---|
| Antler Netherlands | Amsterdam | Co-founder matching, early funding (EUR 100K-EUR 2M) |
| Rockstart | Amsterdam | 300+ investments, energy/agrifood/climate |
| ACE Venture Lab | Amsterdam | Validation, funding intros |
| Startupbootcamp | Amsterdam | Commerce, fintech, cybersecurity verticals |
| YES!Delft | Delft/Rotterdam | Deep tech, enterprise IT, logistics |
| UtrechtInc | Utrecht | Digital services, SaaS |
| High Tech Campus | Eindhoven | Deep tech, B2B SaaS, industrial IT |

### Dutch VC Firms (early-stage B2B SaaS)

Why VCs matter for GTM: Their portfolio companies are the ICP. A partnership or introduction from a VC to their portfolio founders is a warm channel.

| Firm | Thesis | Ticket |
|---|---|---|
| Newion | Specialist B2B SaaS, early-stage | Early-stage |
| HenQ | B2B software startups | EUR 500K-EUR 5M |
| Peak Capital | Marketplace, platform, SaaS (Amsterdam, Berlin, Stockholm) | Seed to Series A |
| Curiosity VC | AI-first B2B software | Pre-seed to Series A |
| Dutch Founders Fund | Vertical SaaS, B2B marketplaces | EUR 250K-EUR 3M |
| Shamrock Ventures | NL-only, pre-seed, mission-driven | Pre-seed |

### Events & Conferences

| Event | When | What |
|---|---|---|
| SaaSiest Amsterdam | October (annually) | Top B2B SaaS event, 600+ attendees |
| Amsterdam SaaS Week | October (around SaaSiest) | Week-long B2B SaaS festival |
| SaaS Summit Benelux | September 2026 | 750+ SaaS founders & C-level |
| TNW Conference | June (annually) | 10,000+ attendees, startup + investor focus |
| State of Dutch Tech | Annual (Techleap) | 400 key ecosystem figures, invite-only |

### Podcasts & Media

| Resource | Description |
|---|---|
| The Scale Lab (Techleap) | Dutch scaling journeys, hosted by Constantijn van Oranje |
| Dutch Startup Podcast | Interviews with Dutch founders |
| Start to Scale | Founder stories from Dutch ecosystem |
| Silicon Canals | Leading Benelux startup media |
| Innovators Can Laugh | European startup founder interviews |
| Failory Newsletter | Startup lessons, 40K+ subscribers |

### Online Communities (Global, relevant to Dutch founders)

| Community | Access | Notes |
|---|---|---|
| MicroConf Connect (Slack) | Invite-only, max 1,000 members | SaaS founders, curated |
| SaaStock | Members-only, requires $100K+ ARR | Peer groups, events, deals |
| SaaStr | Open, 600K+ members | Founded by Jason Lemkin |
| SaaS Alliance (Slack) | Invite-only, ~1,000 members | Live chat for SaaS professionals |

---

## First Engagement Strategies

### GTM Motion

At EUR 1,500-EUR 15,000 ACV, the recommended approach is a **hybrid PLG + founder-led sales** motion:

1. **Starter (EUR 1,500)** -- Product-led, low-friction entry. Let founders try it, see value, self-serve purchase. This is the land.
2. **Pro (EUR 15,000)** -- Sales-assisted expansion. Once a founder sees the roadmap output, a conversation about ongoing tracking and CRM integration justifies the upgrade.

### Outbound Approaches (Netherlands)

1. **LinkedIn** -- Dutch founders are heavy LinkedIn users. Share content about founder-led sales challenges, knowledge transfer, first sales hire mistakes. Build authority, then DM with value.
2. **Warm intros through accelerator/VC networks** -- Get introduced to portfolio companies through Antler, Rockstart, Newion, HenQ.
3. **Community presence** -- Show up at FoundersMesh, Hackers & Founders, Dutch Startup Association events. Be the person who understands founder sales challenges.

### Content That Resonates

- "The EUR 150K mistake: why your first sales hire fails (and how to prevent it)"
- "How to build a sales playbook before your first hire"
- "Founder-led sales: when to stop and how to transition"
- Frameworks, templates, checklists -- founders want actionable tools, not theory

### Lead Magnets

- Free revenue roadmap template (PDF)
- "Sales playbook for founders" checklist
- Benchmark report: "How Dutch B2B startups scale from EUR 500K to EUR 2M"
- Free limited version of the forecast tool

### Positioning Against Alternatives

| Alternative | Cost | FounderVision advantage |
|---|---|---|
| Head of Sales | EUR 150K-EUR 250K/yr | 90% cheaper, available immediately, no hiring risk |
| Fractional VP | EUR 60K-EUR 100K/yr | 75-85% cheaper, always available, structured output |
| Sales Consultant | EUR 40K-EUR 70K/yr | Cheaper, AI-powered consistency, ongoing tracking |
| DIY (spreadsheets) | Free | Professional framework, benchmarks, saves 50+ hours |

### Building Social Proof Early

- Offer 5-10 founders a free roadmap in exchange for a testimonial/case study
- Partner with 1-2 accelerators to run a "revenue planning workshop" for their cohort
- Publish founder interviews (content + relationship building)

### Partnership & Channel Strategies

- **Accelerator partnerships** -- Offer FounderVision as part of accelerator program toolkits (Antler, Rockstart, Startupbootcamp)
- **VC portfolio value-add** -- Position with VCs like Newion, HenQ, Peak Capital as a tool they can offer their portfolio companies
- **CRM marketplace** -- List on HubSpot and Pipedrive marketplaces for organic discovery
- **Referral program** -- Founder-to-founder referrals with incentives (discount or extended access)

---

## European Secondary Markets

### Priority Markets (English-friendly, strong B2B ecosystems)

1. **Nordics** -- Stockholm, Helsinki, Copenhagen. Strong B2B SaaS culture, English widely used in business.
2. **DACH** -- Berlin, Munich, Zurich. Large market but may need German-language content eventually.
3. **Wider Benelux** -- Brussels, Antwerp. Close proximity, shared business culture with NL.

### Key European Programs & Events

| Resource | Type | Notes |
|---|---|---|
| Seedcamp | Accelerator | Pan-European, early-stage |
| Techstars | Accelerator | Multiple European locations |
| Antler | Accelerator | Amsterdam, Stockholm, Berlin, and more |
| SaaSiest (Stockholm) | Conference | Largest European B2B SaaS community |
| SaaStock (Dublin) | Conference | B2B SaaS, requires $100K+ ARR for membership |
| EU-Startups Podcast | Media | Pan-European founder interviews |

### European Considerations

- **GDPR as selling point** -- "Your revenue data stays in Europe" is a differentiator vs. US tools
- **Language** -- English works for NL, Nordics, and initial DACH outreach. French, Spanish, Italian markets need localization.
- **Pricing sensitivity** -- European founders at this stage are more cost-conscious than US counterparts. The Starter at EUR 1,500 is a good entry point.
- **Dutch business culture** -- Direct, pragmatic, value transparency. No-nonsense messaging resonates better than hype.

---

---

# Design Partner Program: Finding First 5-7 Founders (Feb 2025)

## Goal

Find 5-7 Dutch B2B founders to co-build FounderVision with. They get free access and direct founder attention; we get real feedback, validated use cases, and first case studies.

## Program Structure

### What we offer them

- Free access to FounderVision for 6 months (no Starter fee)
- Direct access to Ranjith as the founder -- essentially a free fractional revenue advisor
- Their input shapes the product -- features built around their real needs
- After 6 months, locked-in discount (30-40% off Pro) for the first year

### What they commit to

- 6 months of active use
- Weekly 30-min calls for month 1-2, biweekly for month 3-6 (~16 calls total)
- Honest feedback on what works and what doesn't
- Participate in a case study / testimonial at the end
- A simple one-page agreement to formalize the arrangement

### Why this structure

- SaaStr recommends 3-5 design partners max. Going to 5-7 accounts for inevitable drop-off.
- Free access during design phase is standard practice. The value exchange is their time and feedback for free product access and founder attention.
- Transitioning from weekly to biweekly after month 2 reduces total commitment from 24 to ~16 calls -- more realistic for busy founders.
- The locked-in discount after 6 months creates a natural conversion path to paying customer.

## Where to Find Them

### Tier 1: Personal network + warm intros (target: 3-4 partners)

These have the highest conversion rate. Warm intros convert at 2x the rate of cold outreach.

1. **Own LinkedIn network** -- Ranjith has worked at 4 startups. Former colleagues, founders met along the way, people from those ecosystems. Use LinkedIn Sales Navigator to surface 2nd-degree connections matching the ICP (B2B, 3-10 employees, Netherlands).

2. **Investor networks** -- If connected to anyone at Newion, HenQ, Peak Capital, or Dutch Founders Fund, ask for introductions to 2-3 portfolio companies that fit the profile. VCs love offering value-add to their portfolio companies.

3. **Accelerator alumni** -- Reach out to program managers at Antler, Rockstart, or Startupbootcamp. Ask to present FounderVision to their current cohort or alumni network. Position it as a "revenue planning workshop" -- provide value first, access follows.

### Tier 2: Community presence (target: 2-3 partners)

Show up where founders are. Talk about the problem (founder-led sales, knowledge transfer), not the product. Follow up with founders who resonate.

4. **FoundersMesh meetups** -- Founder-focused networking nights in Amsterdam. Attend, be genuine, build relationships.

5. **The Amsterdam Startup Meetup** -- Annual gathering of founders, investors, ecosystem members. Great for meeting 5-10 relevant founders in one evening. 2026 edition being planned.

6. **Hackers & Founders Amsterdam** -- Monthly meetups, biggest tech entrepreneur community in NL. The Hacker Building co-working space.

7. **Sessions Community** -- Specifically B2B sales/marketing focused roundtables. The ICP is literally in the room.

8. **StartupCouncil.org Amsterdam** -- Founders & Investors MasterMinds Network for entrepreneurs and VCs.

9. **Founders Running Club** -- Weekly running + networking meetups. Relaxed setting, no pitch pressure. Good for building genuine connections.

### Tier 3: Targeted LinkedIn outreach (supplement if needed)

Use only if Tier 1 and 2 don't fill all spots.

10. **LinkedIn search + personalized outreach** -- Search for Dutch B2B founders, 3-10 employees, recently raised seed funding. Send short (<300 character) messages. Keep it conversational, not salesy.

Example outreach message:
> "Hi [name], I'm building FounderVision -- an AI tool that helps B2B founders create a revenue playbook before their first sales hire. Looking for 5 Dutch founders to co-build with. Free access for 6 months, biweekly calls for feedback. Interested?"

Tips for LinkedIn outreach:
- Messages under 300 characters get 19% more responses
- Outreach tied to recent activity (post they shared, event attended) boosts response rates by 32%
- Follow-up messages spaced 2-5 business days apart improve conversions by 49%
- Outreach from a Founder/C-level title makes recipients feel valued

## Selection Criteria

Not every interested founder is the right design partner. Look for:

- **Active pain** -- They're currently struggling with founder-led sales or about to make their first sales hire
- **Engaged** -- They show up to calls, give real feedback, not just "looks good"
- **Representative of ICP** -- B2B, 3-10 employees, EUR 300K-EUR 1.5M revenue
- **Different verticals** -- Aim for variety (e.g., one SaaS, one healthtech, one fintech) to validate the product works across sectors
- **Bonus: well-connected** -- A well-connected founder becomes a referral channel later

## Timeline

| Week | Action |
|---|---|
| 1-2 | Map personal network, identify warm intro paths, draft outreach messages |
| 3-4 | Send warm intro requests + attend 1-2 meetups/events |
| 5-6 | Follow up, have intro calls with interested founders |
| 7-8 | Select 5-7 partners, sign simple agreements, kick off program |

## After the 6 Months

- Convert design partners to paid Pro customers at the locked-in discount
- Publish 3-5 case studies with real metrics ("how [Company X] built their first sales playbook")
- Ask for warm referrals to other founders in their network
- Use testimonials on the website and in sales materials
- Design partners who don't convert are still valuable for feedback and validation

---

# Targeting Window: When to Reach ICP Companies (Feb 2025)

## The Question

Should we target companies *before* they raise money, assuming that post-fundraise companies already have a sales/revenue lead?

## The Answer: Target the Post-Seed, Pre-First-Hire Window

Pre-fundraise isn't the best moment. Post-Series A is too late. The sweet spot is the window between "just raised seed" and "hasn't made the first sales hire yet" -- typically a 3-6 month window.

### Why Pre-Fundraise Is Often Too Early

- Companies still finding product-market fit
- May not have enough revenue to justify even EUR 1,500
- The pain of "I need a sales process" hasn't hit yet because they're still figuring out *what* to sell
- Budget is tight -- every euro goes to product/engineering

### Why Post-Seed (EUR 500K-EUR 2M Raised) Is the Sweet Spot

- Raising money doesn't mean they have sales figured out. Many seed-stage companies raise on product/tech strength, not commercial traction.
- The money often *triggers* the need to figure out sales -- investors say "great product, now go sell it," and the founder realizes they have no playbook.
- The first EUR 1-2M round is often the most painful moment for founder-led sales. Pre-raise, the founder can get away with selling ad hoc. Post-raise, there's suddenly pressure to hit targets, report pipeline metrics, and scale revenue.
- They need structure but haven't hired anyone yet -- the money just arrived and recruiting takes 3-6 months.

### Why Series A (EUR 2M+) Is Too Late

- They've typically already hired or are hiring a VP of Sales
- Budget and stage means they'll invest in a person, not a tool
- The founder has (hopefully) already learned the lessons FounderVision teaches

## Targeting by Stage

| Stage | Situation | Fit for FounderVision |
|---|---|---|
| Pre-revenue / bootstrapped | Still finding PMF, no money for tools | Too early |
| EUR 100K-500K revenue, no funding | Founder selling, things are working but messy | Moderate -- pain is building but budget is tight |
| **Just raised seed (EUR 500K-EUR 2M)** | **Has money, needs to professionalize sales, hasn't hired yet** | **Best fit -- they have budget AND urgency** |
| 6-12 months post-seed | Hiring or has hired first sales person | Good fit -- needs playbook for the new hire |
| Series A (EUR 2M+) | Has or is hiring VP of Sales | Too late -- they'll hire a person instead |

## How to Identify Companies in the Window

Companies currently *posting* sales/BD job listings are a strong signal. It means:
- They've decided they need commercial help (pain is real)
- They haven't filled the role yet (window is still open)
- They're likely 0-3 months into the hiring process

**The outreach message:** "Build your revenue playbook first, so your new hire can execute on day one" -- this is timely and relevant because they're literally in the middle of solving this problem.

## Where to Find Them

1. **LinkedIn Jobs** -- Search "sales manager" or "business development," filter by company size 1-10, location Netherlands
2. **LinkedIn Sales Navigator** -- Filter companies by 1-10 employees, B2B, Netherlands, check which have open sales roles
3. **Crunchbase / Dealroom** -- Filter by Netherlands, seed stage, recent funding (last 6 months), then cross-reference with LinkedIn for open sales roles
4. **Indeed.nl** -- Search sales/BD roles, manually check company size on LinkedIn
5. **VC portfolio pages** -- Check recent investments by Newion, HenQ, Peak Capital, Dutch Founders Fund, Shamrock Ventures -- their newest portfolio companies are often in this exact window

## Key Insight

The companies posting sales job listings right now are not competitors to FounderVision -- they're the ideal prospects. The hire and the tool are complementary: FounderVision helps the founder *prepare* for the hire, and gives the new hire a structured playbook to execute on.

---

# Value Proposition Analysis (Feb 2025)

Using the Value Proposition Canvas (Osterwalder Framework) applied to FounderVision.

## Customer Profile

### Customer Jobs

**Functional Jobs:**
1. Hit revenue targets and grow from EUR 300K-EUR 1.5M to the next stage
2. Build a repeatable sales process that doesn't depend on the founder being in every deal
3. Document sales knowledge so it can be transferred to a first hire
4. Plan and prioritize commercial activities each week with limited time
5. Decide *when* to hire their first salesperson and *what profile* to look for

**Social Jobs:**
6. Look competent and in control when reporting to investors or co-founders on commercial progress
7. Be seen as a strategic founder, not just someone "winging it" on sales
8. Have credible data and frameworks when discussing growth with advisors or board

**Emotional Jobs:**
9. Feel confident they're doing the right commercial activities (not wasting effort)
10. Reduce the anxiety of "am I growing fast enough?"
11. Feel less alone in making critical sales/hiring decisions

### Customer Pains

1. **No structured sales process** -- Everything is intuition and improvisation. What works is in the founder's head but not documented anywhere.
2. **Time scarcity** -- The founder splits time between product, hiring, fundraising, and sales. Sales gets squeezed.
3. **First hire failure risk** -- EUR 150K-EUR 250K for a Head of Sales who has a high probability of failing. Even a fractional VP at EUR 60K-EUR 100K is a major commitment with uncertain outcomes.
4. **Knowledge is trapped** -- The founder can sell but can't teach what they do. When they try to hand off, the new person struggles.
5. **No benchmarks** -- No idea if their conversion rates, sales cycle, or pipeline coverage are good or bad compared to peers.
6. **Analysis paralysis** -- Too many things to work on, no framework to decide what matters most this week.
7. **Expensive alternatives** -- Consultants (EUR 40K-EUR 70K), fractional VPs (EUR 60K-EUR 100K), and full-time hires (EUR 150K-EUR 250K) are all significant costs at this revenue stage.
8. **Reporting pressure** -- Investors and boards want structured revenue plans, not "I think we're doing okay."

### Customer Gains

1. A clear, structured revenue roadmap they can execute on weekly
2. Confidence they're focused on the right activities
3. A documented playbook they can hand to their first hire on day one
4. Visibility into whether they're on track or falling behind
5. Data-backed benchmarks against similar companies
6. Credible materials for investor/board updates
7. Knowing when they're ready to hire (and what to hire for)
8. Saving EUR 50K-EUR 200K by avoiding a premature or failed hire

---

## Value Map

### Products & Services

| Product | What it does |
|---|---|
| Revenue Roadmap Generator (Starter) | AI-powered tool that converts founder inputs (revenue targets, market, competition) into a structured execution plan with strategic objectives |
| Dashboard & Tracking (Pro) | Ongoing progress tracking against roadmap objectives |
| CRM Integrations (Pro) | HubSpot/Pipedrive connectivity for deal and pipeline data |
| Export (PDF/CSV) | Shareable documents for investors, team, and new hires |

### Pain Relievers

| Pain | How FounderVision relieves it |
|---|---|
| No structured sales process | Forces the founder to externalize their strategy into a documented roadmap with clear objectives and key results |
| Knowledge is trapped | The roadmap output is a transferable document -- a starting point for onboarding a first hire |
| Expensive alternatives | EUR 1,500 one-time (Starter) or EUR 15,000/year (Pro) vs. EUR 60K-EUR 250K for human alternatives |
| No benchmarks | Industry benchmark comparisons built into the roadmap generation |
| Analysis paralysis | AI-powered gap analysis identifies where to focus based on the founder's specific situation |
| Reporting pressure | Professional PDF exports create investor-ready revenue plans |

### Gain Creators

| Gain | How FounderVision creates it |
|---|---|
| Clear roadmap | Structured objectives with measurable key results, generated from the founder's actual data |
| Confidence in focus | Gap analysis and recommendations prioritize what matters most |
| Hire-ready playbook | The roadmap becomes the foundation document for a first sales hire |
| Benchmark visibility | Comparisons against industry peers show where the founder stands |
| Investor-ready materials | Professional exports for board meetings and investor updates |
| Cost savings | 75-90% cheaper than human alternatives |

---

## Fit Analysis: Where It's Strong vs. Where There Are Gaps

### Strong Fit (pain reliever matches a real pain)

- **"I have no structured plan"** --> FounderVision creates one. Clear value.
- **"Alternatives are too expensive"** --> FounderVision is 75-90% cheaper. Clear value.
- **"I need something to show investors"** --> PDF exports with benchmarks. Clear value.
- **"I don't know how I compare"** --> Industry benchmarks. Clear value.

### Weak Fit (pain exists but product doesn't fully solve it)

- **"I need to know what to do THIS WEEK"** --> The roadmap is strategic, not operational. It tells you the destination but not the weekly steps. *Gap: no weekly action planning.*
- **"I need to track if I'm on track"** --> Dashboard exists but doesn't pull live CRM data to show real-time progress. *Gap: CRM read integration missing.*
- **"I need to transfer knowledge to my first hire"** --> The roadmap is a starting point, but it's not a full sales playbook (no scripts, objection handling, process documentation). *Gap: not a complete handoff document.*
- **"I feel alone making these decisions"** --> The product generates a report but doesn't provide ongoing guidance or coaching. *Gap: no continuous interaction.*

### No Fit (pain exists but product doesn't address it at all)

- **"I need accountability and someone to push me"** --> The product is passive. No check-ins, no nudges, no "you're behind" alerts. *Not addressed.*
- **"I need help with the actual selling"** --> FounderVision plans, it doesn't execute. It won't make calls, write emails, or close deals. *Not addressed (and probably shouldn't be).*

---

## Competitive Value Proposition Comparison

| Dimension | Head of Sales | Fractional VP | Sales Consultant | DIY (Spreadsheets + ChatGPT) | FounderVision |
|---|---|---|---|---|---|
| Cost/year | EUR 150K-250K | EUR 60K-100K | EUR 40K-70K | Free | EUR 1,500-15,000 |
| Available immediately | No (3-6mo to recruit) | 2-4 weeks | 2-4 weeks | Yes | Yes |
| Hands-on execution | Yes | Partially | No | No | No |
| Structured framework | Depends on person | Usually yes | Usually yes | No | Yes |
| AI-powered insights | No | No | No | Partially | Yes |
| Industry benchmarks | Limited | Some | Some | No | Yes |
| Transferable output | Depends | Sometimes | Sometimes | Rarely | Yes (PDF/export) |
| Ongoing coaching | Yes | Yes | Time-limited | No | No (gap) |
| Risk | High (hiring risk) | Medium | Medium | Low | Low |
| Scalable | No | No | No | No | Yes |

---

## Recommended Value Proposition Statements

Based on this analysis, three options ranked by strength:

**Option 1 (Knowledge Transfer angle -- strongest differentiation):**
> "Build the revenue playbook your first sales hire can execute on -- before you spend EUR 150K finding out they can't figure it out alone."

**Option 2 (Cost displacement angle -- clearest ROI):**
> "Get a structured revenue execution plan for EUR 1,500 -- what used to require a EUR 60,000 consultant or a EUR 150,000 hire."

**Option 3 (Founder empowerment angle -- emotional resonance):**
> "Stop guessing what to focus on. FounderVision turns your revenue targets into a clear, actionable roadmap -- so you can scale beyond founder-led sales with confidence."

---

## What Needs to Be True for EUR 15,000/Year to Be Justified

The Starter at EUR 1,500 has a clear value proposition as a one-time strategic exercise. The Pro at EUR 15,000/year has a value proposition gap -- there isn't enough *ongoing* value to justify annual pricing yet.

For Pro to be worth EUR 15,000/year, the product needs to deliver weekly value, not just a one-time report. The most critical features to close this gap:

1. **CRM data read** -- Pull live pipeline data so the dashboard shows real progress
2. **Weekly priorities** -- AI-generated "here's what to focus on this week" based on actual pipeline state
3. **Progress alerts** -- "You're behind on Q1 targets" / "3 deals stalled this week"
4. **Evolving playbook** -- The roadmap updates as the founder's situation changes

Without these, Pro is essentially a more expensive version of Starter with tracking bolted on. With them, Pro becomes the "virtual sales manager" that the original market research envisioned.

---

---

# Market Size Estimation (Feb 2025)

## ICP Reminder

B2B companies, 3-10 employees, EUR 300K-EUR 1.5M revenue, in the Netherlands (primary), Nordics and UK (secondary).

## Base Data: Enterprises with Employees by Country

| Country | Total Enterprises | Micro (1-9 employees) | Source |
|---|---|---|---|
| Netherlands | ~2,500,000 | ~1,390,000 | CBS / Statista 2023 |
| Sweden | ~1,168,000 | ~1,050,000 (est.) | HitHorizons / Eurostat |
| Denmark | ~548,000 | ~490,000 (est.) | HitHorizons / Eurostat |
| Finland | ~738,000 | ~665,000 (est.) | HitHorizons / Eurostat |
| Norway | ~689,000 | ~620,000 (est.) | HitHorizons / Eurostat |
| UK | ~5,700,000 | ~1,151,000 | GOV.UK BPE 2025 |

Note: Netherlands and UK figures include large numbers of sole traders / ZZP'ers. Excluding one-person businesses: NL ~450,000 SMEs, UK ~1,400,000 businesses with employees.

## Filtering to ICP

### Filter 1: 3-10 employees

Official statistics use the 0-9 bracket. Roughly 60-70% of micro enterprises are sole traders or have 1-2 employees. The 3-9 employee segment is approximately 30-35% of the micro bracket. Adding the bottom slice of the 10-19 bracket adds a small number.

| Country | Estimated 3-10 employee companies |
|---|---|
| Netherlands | ~50,000 - 65,000 |
| Sweden | ~55,000 - 70,000 |
| Denmark | ~25,000 - 35,000 |
| Finland | ~30,000 - 40,000 |
| Norway | ~30,000 - 40,000 |
| UK | ~150,000 - 200,000 |

### Filter 2: B2B only (~45%)

No official B2B/B2C classification exists. Using sector proxies: professional services, IT/software, wholesale trade, manufacturing, and business services are predominantly B2B (~40-50% of all enterprises). Consumer-facing sectors excluded.

| Country | Estimated B2B, 3-10 employees |
|---|---|
| Netherlands | ~22,000 - 29,000 |
| Sweden | ~25,000 - 32,000 |
| Denmark | ~11,000 - 16,000 |
| Finland | ~14,000 - 18,000 |
| Norway | ~14,000 - 18,000 |
| UK | ~68,000 - 90,000 |

### Filter 3: EUR 300K-EUR 1.5M revenue (~50%)

Companies with 3-10 employees have a wide revenue range. The EUR 300K-EUR 1.5M range captures roughly 40-60% of companies in this employee bracket.

| Country | Estimated ICP companies |
|---|---|
| **Netherlands** | **~11,000 - 15,000** |
| **Sweden** | **~12,000 - 16,000** |
| **Denmark** | **~6,000 - 8,000** |
| **Finland** | **~7,000 - 9,000** |
| **Norway** | **~7,000 - 9,000** |
| **UK** | **~34,000 - 45,000** |

## Summary

| Market | Estimated ICP Size | Notes |
|---|---|---|
| **Netherlands** | **~11,000 - 15,000** | Primary market |
| **Nordics (total)** | **~32,000 - 42,000** | Sweden largest |
| **UK** | **~34,000 - 45,000** | Largest single market, English-speaking |
| **Combined total** | **~77,000 - 102,000** | |

## What This Means

- Netherlands alone (~11K-15K) provides enough ICP companies for significant growth before expanding
- Capturing 1% of Dutch ICP = 110-150 paying customers = EUR 1.65M-2.25M ARR at Pro pricing
- Combined ~80K-100K companies provides a long runway across all three regions
- "In-market" rate at any time is ~5-10%, giving ~4,000-10,000 active potential buyers across all regions

## Caveats

1. These are rough estimates triangulated from CBS, Eurostat, GOV.UK, and HitHorizons data with reasonable filters.
2. B2B filter is a sector-based proxy. Many companies straddle B2B and B2C.
3. Revenue data is the weakest filter. Employee count is well-tracked; revenue by size band requires commercial databases like Dealroom or Bureau van Dijk (Orbis).
4. Not all ICP companies are "ready to buy" -- only those actively struggling with founder-led sales transition.

---

---

# Competitive Landscape Analysis (Feb 2025)

## Summary

No direct competitor does exactly what FounderVision does. The market has tools for teams that already exist, tools that generate content/templates, and expensive human consultants. It doesn't have an AI tool that takes a founder's specific inputs and generates a strategic execution plan at a price point accessible to pre-Series A companies.

## Category 1: OKR / Goal-Setting Tools

These track objectives and key results but don't generate them or provide sales-specific guidance.

| Tool | What it does | Price | Gap vs FounderVision |
|---|---|---|---|
| Profit.co | General OKR tracking | $7-15/user/mo | No AI generation, not sales-focused |
| Perdoo | OKR + strategy alignment | EUR 8-10/user/mo | No revenue-specific playbook |
| Weekdone | Weekly check-ins + OKRs | Free-$29/user/mo | No AI, no sales focus |
| Microsoft Viva Goals | OKRs for Teams users | $2/user/mo | Generic, not founder/sales focused |

**FounderVision differentiator:** FounderVision *generates* the revenue roadmap with AI, not just tracks goals someone else defined.

## Category 2: Revenue Intelligence / Pipeline Tools

Built for existing sales teams, not founder-led sales.

| Tool | What it does | Price | Gap vs FounderVision |
|---|---|---|---|
| Gong | Call recording, revenue AI | ~$1,200/user/year + $5K platform | Enterprise-focused, requires sales team, very expensive |
| Clari | Revenue forecasting, pipeline visibility | ~$1,080/user/year+ | Complex, requires existing pipeline data |
| Outreach | Sales engagement, sequencing | Enterprise pricing | Built for sales teams, not founders |
| Pipedrive | CRM + basic AI suggestions | $14-99/user/mo | CRM first, no strategic planning |

**FounderVision differentiator:** These assume you already have a sales team and pipeline. FounderVision helps founders *before* they have either.

## Category 3: AI Sales Playbook Generators

Closest to what FounderVision does, but focused on content/templates, not strategic planning.

| Tool | What it does | Price | Gap vs FounderVision |
|---|---|---|---|
| Waybook | AI-generated playbook templates | Free tool | Generic templates, no company-specific inputs |
| Flight | Free playbook generator | Free | Creates outreach templates, not strategic roadmaps |
| QuillBot | AI playbook generator | Free | Document generator, no ongoing tracking |
| Artisan | AI-powered outreach playbooks | Unknown | Focused on email personalization, not strategy |
| Genesy AI | Sales automation + playbooks | Unknown | Lead gen focused, not founder strategy |

**FounderVision differentiator:** These generate *content* (scripts, templates, emails). FounderVision generates a *strategic framework* based on the founder's specific situation, revenue targets, and market.

## Category 4: Fractional VP of Sales Services (Human)

Services, not software -- the real competitive alternative for founders who can afford it.

| Service | What it does | Price | Gap vs FounderVision |
|---|---|---|---|
| Vendux | Marketplace for fractional sales leaders | $8K-12K/month | Human, expensive, availability varies |
| Activated Scale | Fractional sales leadership | $8K-12K/month | Same -- human alternative |
| My Sales Division | Fractional VP + AI support | Custom | Hybrid human/AI but expensive |

**FounderVision differentiator:** 90% cheaper, available immediately, structured output vs. consulting conversations.

## Category 5: AI Sales Coaching / Daily Prioritization

These help reps execute but don't help founders plan.

| Tool | What it does | Price | Gap vs FounderVision |
|---|---|---|---|
| Nooks | AI dialer + coaching for reps | Unknown | For sales reps, not founders |
| Second Nature | AI role-play for sales training | Unknown | Training tool, not strategy |
| Claap | Meeting intelligence + coaching | $30/user/mo | Call-focused, not planning |

**FounderVision differentiator:** These coach salespeople on calls. FounderVision helps founders build the plan *before* they have salespeople.

## The Gap in the Market

| Stage | What exists | What's missing |
|---|---|---|
| Have a sales team | Gong, Clari, Outreach, Salesforce | Covered |
| Building outreach sequences | Apollo, Clay, Artisan | Covered |
| Tracking OKRs | Profit.co, Perdoo, Weekdone | Covered |
| **Founder needs to build first revenue strategy** | **Nothing AI-native and affordable** | **FounderVision's opportunity** |

The market has:
- Tools for teams that already exist
- Tools that generate content/templates
- Expensive human consultants

The market doesn't have:
- An AI tool that takes a founder's specific inputs (revenue target, market, competition) and generates a strategic execution plan
- Something priced for pre-Series A companies (EUR 1,500-15,000, not EUR 50,000+ for consultants)
- A product that bridges "founder intuition" to "documented playbook a first hire can execute"

## Competitors to Watch

1. **Waybook / Flight** -- If they add company-specific inputs and strategic depth, they could move closer to FounderVision's space
2. **My Sales Division** -- Hybrid fractional VP + AI model; if they productize the AI piece more, they become competition
3. **Monday CRM's "Sales Advisor"** -- If they expand this AI feature to include strategic planning, not just pipeline coaching

---

## Key Sources

- Pitchdrive: Founder-Led Sales vs. Hiring (pitchdrive.com)
- SaaStr: Transitioning from Founder-Led Sales (saastr.com)
- SaaStr: Design Partner Incentives (saastr.com)
- Primary VC: First Sales Hire Transition (primary.vc)
- First Round Review: 0-$5M Founder-Led Sales (review.firstround.com)
- Founding Sales by Pete Kazanjy (foundingsales.com)
- Unusual Ventures: Design Partner Sales Motion (unusual.vc)
- Horizon Capital: Choosing Design Partners (horizoncap.vc)
- FortyTwo VC: Design Partners Guide (fortytwovc.substack.com)
- Techleap: Dutch Tech Ecosystem (techleap.nl)
- Silicon Canals: Benelux Startup Media (siliconcanals.com)
- StartupAmsterdam: Ecosystem Directory (iamsterdam.com)
- SaaSiest Amsterdam (saasiestamsterdam.com)
- SaaS Summit Benelux (saassummit.io)
- iamsterdam.com: Startup Communities & Events
- Strategyzer: Value Proposition Design (strategyzer.com)
- B2B International: Value Proposition Canvas (b2binternational.com)
- Growth Shuttle: VPC for B2B SaaS (growthshuttle.com)
- Value Inspiration: B2B Value Proposition Strategy (valueinspiration.com)
- Invespcro: SaaS Value Proposition Examples (invespcro.com)
- Membrain: Jobs-to-Be-Done in B2B Sales (membrain.com)
- Strategyn: Jobs-to-be-Done Guide (strategyn.com)
