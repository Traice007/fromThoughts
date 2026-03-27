# fromThoughts - Project Context

## Deployment workflow
- **ALWAYS deploy to preview first**: `vercel` (no --prod flag)
- Share the preview URL with the user for review
- **Only deploy to production when the user explicitly approves**: `vercel --prod`
- Vercel is on the free Hobby plan — unlimited deploys, batch production deploys to keep history clean

## What this product is
fromThoughts is an AI-powered Revenue Operations platform for B2B founders (€300K-€1.5M ARR) who need to translate revenue targets into actionable execution without hiring a VP of Commercial.

## Tech stack
- Next.js 16 (App Router), React 19, TypeScript 5
- PostgreSQL + Prisma ORM
- AI: OpenAI / Groq (llama-3.3-70b-versatile)
- Auth: NextAuth v5 (credentials + email verification)
- CRM integrations: HubSpot, Pipedrive (OAuth 2.0) — currently "Coming Soon", capturing user preference for prioritization
- Email: Resend
- Payments: Stripe (configured, not fully implemented)
- Styling: TailwindCSS v4
- Deployed on Vercel (Hobby/free plan)

## Pricing (EUR, European market focus)
- Foundation: €20,000/year (€1,667/month equivalent) — platform only
- Growth: €36,000/year (€3,000/month equivalent) — platform + dedicated revenue strategist
- Enterprise: Custom
- Annual commitment, no setup fees
- 30-day satisfaction guarantee
- Outbound sales / BD is the primary revenue channel — lower conversion, higher margin

## Current product state
- Landing page: value prop focused on strategy-to-execution, gap analysis mockup, "Who This Is For" ICP section
- Core flow: forecast form → AI generates execution plan with OKRs + gap analysis + recommendations
- CRM integrations: Coming Soon with preference capture (results page + dashboard/integrations)
- Task management integrations: On the Roadmap with preference capture (dashboard/integrations)
- Dashboard: Overview, Forecasts, OKRs, Integrations, Billing, Settings

## Market research vision vs current state (Jan 2025 analysis)
The market research (docs/market-research.pdf) envisions a **guided growth execution platform** — a continuous virtual sales & marketing manager. The current product is an **AI OKR generator** — a one-shot tool that produces a static report.

### Key gaps identified
1. **Report generator vs operating system** — No recurring check-ins, no feedback loop, no continuous guidance
2. **No task management integration** — Research calls for Notion/Asana/ClickUp integration; only CRM deal-push exists
3. **No live data / feedback loop** — CRM integrations are write-only; product can't read pipeline data to steer
4. **Pricing mismatch** — $1,700 trial is expensive for a one-shot report; price fits the vision but not the current product

### Agreed roadmap direction
- Phase 1: CRM read integration + weekly digests + alerts (retention)
- Phase 2: Task tool integration + auto-generated weekly task lists (execution)
- Phase 3: Continuous AI feedback loop + conversational guidance + hiring readiness (intelligence)
- Phase 4: Salesforce + more task tools + European localization (expansion)

### Design partner learnings (Hans van den Elsen / Vevigo, 2026-03-27)
- **No CRM integration needed short-term** — Hans uses ERPNext → migrating to Odoo end 2026. Build on product usage first.
- **"Paste into Claude" is a core use case** — founders paste individual lead messages into Claude for response advice. fromThoughts needs deal-specific, contextual AI coaching on live situations.
- **Visibility is solved, intelligence is not** — Hans built his own Grafana dashboard for deal visibility. The gap is the AI layer: "what are my 3 priorities this week" and "does my pipeline cover my target."
- **Core ask is always the same** — "How do I get from X ARR to 2X ARR in 12 months?" This must be answerable from the forecast flow.

### Market research gaps to address
- TAM/SAM/SOM numbers need sourcing (300K companies claim)
- Competitive analysis needs specific competitor names (Clari, Gong, Quantive, etc.)
- No go-to-market strategy defined
- "Service as Software" positioning not yet delivered in product
- European focus vs USD pricing inconsistency

## Full analysis
See docs/product/gap-analysis.md for the complete comparison.
