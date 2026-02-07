# FromThoughts - Project Context

## Deployment workflow
- **ALWAYS deploy to preview first**: `vercel` (no --prod flag)
- Share the preview URL with the user for review
- **Only deploy to production when the user explicitly approves**: `vercel --prod`
- Vercel is on the free Hobby plan — unlimited deploys, batch production deploys to keep history clean

## What this product is
FromThoughts is an AI-powered Revenue Operations platform for B2B founders (€500K-€2M ARR) who need to translate revenue targets into actionable execution without hiring a VP of Commercial.

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
- Starter: €1,500 one-time (30 days full access)
- Pro: €9,600/year
- Enterprise: Custom
- Credit card required at signup
- 14-day money-back guarantee
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

### Market research gaps to address
- TAM/SAM/SOM numbers need sourcing (300K companies claim)
- Competitive analysis needs specific competitor names (Clari, Gong, Quantive, etc.)
- No go-to-market strategy defined
- "Service as Software" positioning not yet delivered in product
- European focus vs USD pricing inconsistency

## Full analysis
See docs/gap-analysis.md for the complete comparison.
