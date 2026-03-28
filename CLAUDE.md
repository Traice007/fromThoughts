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

---

## Architecture principles (read every session)

These rules exist to prevent silent quality decay. Follow them without exception.

### Security — non-negotiable
- **Every API route that reads or writes user data must verify ownership.** Check that `forecast.userId === session.user.id` (or equivalent) before returning or mutating data. Never trust that a URL parameter belongs to the requesting user.
- **Every API route that modifies data must require authentication.** Call `getCurrentUser()` and return 403 if null.
- **Admin routes** use `ADMIN_EMAIL` env var check — never hardcode email addresses in code.
- **Never expose other users' data.** Dashboard queries must always be scoped with `where: { userId: user.id }`.

### Data integrity
- **Validate on both client AND server.** Client validation is UX. Server validation (Zod) is security. Never rely on only one.
- **Zod `.merge()` drops `.refine()` validators** — always re-apply cross-field validation on the merged schema explicitly.
- **Never call `JSON.parse()` without a try/catch.** AI-generated or external data can always be malformed.
- **Guard against division by zero** in any calculation involving user-supplied numbers (revenue, rates, counts).
- **Numeric fields from users must have `min(1)` or higher** where zero makes no business sense.

### Authentication & sessions
- `getCurrentUser()` is in `src/lib/auth/session.ts` — always use this, never access the session directly.
- Session strategy is JWT (not database). Session contains: `id`, `email`, `name`, `image`, `subscriptionTier`, `isImpersonated`.
- `VerificationToken` model is reused for password reset with a `reset:` prefix on the identifier field.
- Admin impersonation: when `isImpersonated` is true, `getCurrentUser()` returns the target user transparently. All data operations happen as that user.

### API routes
- **Always wrap async handlers in try/catch** and return a meaningful status code (400 for bad input, 401 for unauth, 403 for forbidden, 404 for not found, 500 for unexpected).
- **Fire-and-forget side effects** (emails, alerts) with `void fn()` — never `await` them in the critical path.
- **Polling endpoints** must have a server-side timeout or status check so clients never loop forever.
- **Never double-await AI generation** — check `forecast.status !== "PENDING"` before triggering generation to prevent duplicate OKR creation.

### React & Next.js
- **All hooks must be called before any conditional return** — React rules of hooks, always.
- **Never call `Date.now()` or `Math.random()` during render** — use `useRef` initialised to a neutral value and set it inside a `useEffect`.
- **Never call `setState` synchronously in a `useEffect` body** — use a `key` prop to remount the component when the underlying data changes, or derive state during render instead.
- **Client components that depend on session** use `useSession()` from `next-auth/react`. Server components use `getCurrentUser()` from `src/lib/auth/session.ts`.
- **Header and footer hide on `/dashboard` and `/admin` routes** — do not remove this behaviour.

### Forms & UX
- **Multi-step forms preserve state when going back** — parent component holds all step data in one object and passes slices down as props.
- **Scroll to top on every step transition** — call `scrollIntoView()` on the form container ref.
- **Double-submit prevention** — disable the submit button while `isSubmitting` is true.
- **Conversion rates are clamped to [0, 100]** before display or submission.

### Code quality
- **Run `npx tsc --noEmit` before every commit** — zero TypeScript errors is the baseline.
- **ESLint runs as a pre-commit hook** — fix lint errors rather than bypassing the hook.
- **No `any` casts without a comment explaining why** — prefer proper types or unknown + type guards.
- **No dead imports** — remove unused imports when touching a file.

### Maintenance cadence
- **Monthly security audit** — re-run the ownership-check audit on all API routes that handle user data.
- **Monthly code audit** — check for new `JSON.parse` calls without try/catch, division without zero-guards, and unauthenticated routes.
- **After every new feature** — verify that the new API routes follow the security rules above before deploying to production.
