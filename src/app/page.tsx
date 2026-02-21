import Link from "next/link";
import {
  Target,
  Zap,
  ArrowRight,
  CheckCircle,
  Euro,
  Users,
  BarChart3,
  RefreshCw,
  TrendingUp,
  Download,
  ChevronRight,
  PieChart,
  Building2,
  UserCircle,
  Gauge,
  Globe,
  AlertTriangle,
  TrendingDown,
  Shield,
  X,
  Minus,
  Bot,
  UserCheck,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-8">
            <Shield className="h-4 w-4" />
            For B2B Founders at €300K–€1.5M Annual Revenue
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight text-white">
            You Can&apos;t Scale If{" "}
            <span className="text-amber-400">
              Every Deal Needs <span className="text-6xl sm:text-7xl lg:text-8xl">YOU</span>
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Your sales instincts are what got you here. fromThoughts turns them into a sales mechanism your team can execute on, so you stop being the bottleneck in every deal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/forecast"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all shadow-lg text-lg"
            >
              Build Your Revenue Execution Plan
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-800 hover:border-slate-500 transition-all"
            >
              See How It Works
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-amber-500" />
              30-day money-back guarantee
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-amber-500" />
              Ready in under 10 minutes
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-amber-500" />
              Export as PDF to share
            </span>
          </div>
        </div>
      </section>

      {/* Value Anchors */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">90% cheaper</div>
              <div className="text-sm text-slate-400 mt-1">vs. a Head of Sales</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">&lt; 10 min</div>
              <div className="text-sm text-slate-400 mt-1">To build your sales mechanism</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">Day 1</div>
              <div className="text-sm text-slate-400 mt-1">Your new hire has a sales mechanism</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-4">
              The Challenge
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Why First Sales Hires Fail</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Most founders hand off sales without a documented sales mechanism. The new hire
              struggles, costs €150K+, and fails within a year.
            </p>
          </div>

          {/* Product Mockup - Gap Analysis */}
          <div className="flex justify-center mb-16">
            <div className="relative w-full max-w-[800px]">
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-block px-4 py-1 bg-white rounded-md text-xs text-gray-400 border border-gray-200">
                      fromthoughts.com/results
                    </div>
                  </div>
                </div>
                {/* Dashboard content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                      <PieChart className="h-4 w-4 text-amber-400" />
                    </div>
                    <h3 className="font-bold text-gray-900">Gap Analysis</h3>
                    <span className="ml-auto text-xs text-gray-400">SaaS &middot; €1.2M ARR &rarr; €2.4M target</span>
                  </div>

                  {/* Revenue gap bar */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Revenue Gap</span>
                      <span className="text-sm font-bold text-gray-900">€1.2M to close</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[50%] bg-gradient-to-r from-slate-700 to-slate-500 rounded-full" />
                    </div>
                    <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                      <span>Current: €1.2M</span>
                      <span>Target: €2.4M</span>
                    </div>
                  </div>

                  {/* Metric comparison grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Lead-to-MQA", value: "18%", benchmark: "24%", status: "below" },
                      { label: "MQA-to-SQL", value: "32%", benchmark: "28%", status: "above" },
                      { label: "SQL-to-Close", value: "15%", benchmark: "22%", status: "below" },
                      { label: "Avg Deal Size", value: "€14K", benchmark: "€18K", status: "below" },
                    ].map((metric) => (
                      <div key={metric.label} className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                        <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {metric.status === "below" ? (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          ) : (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          )}
                          <span className={`text-xs font-medium ${metric.status === "below" ? "text-red-600" : "text-green-700"}`}>
                            {metric.status === "below" ? "Below" : "Above"} benchmark ({metric.benchmark})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Top recommendation */}
                  <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-amber-900">Top Priority: Improve SQL-to-Close Rate</div>
                      <div className="text-xs text-amber-700 mt-1">
                        Closing 22% instead of 15% at your current pipeline volume would add €420K in annual revenue. The single highest-impact lever.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Knowledge Trapped in Your Head</h3>
              <p className="text-gray-600 leading-relaxed">
                You know why your pitch works, which objections matter, and who your best customers are. But none of it is written down, so no one else can do it.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">No Sales Mechanism to Hand Over</h3>
              <p className="text-gray-600 leading-relaxed">
                You hire someone smart, give them access to the CRM, and expect them to figure it out. They can&apos;t, because there&apos;s nothing to follow.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold mb-3">The €150K Mistake</h3>
              <p className="text-gray-600 leading-relaxed">
                A senior sales hire costs €150K–€250K/year. Most fail within 12 months at early-stage companies, not because they&apos;re bad, but because there&apos;s no foundation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6">
                <TrendingDown className="h-7 w-7 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">No Visibility Into Why You&apos;re Losing</h3>
              <p className="text-gray-600 leading-relaxed">
                You close deals, you lose deals, but you never step back far enough to see the pattern. Which deal types close fastest? Where are you consistently losing? Without that view, every week is improvisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Not Just Use AI? — Comparison Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4 border border-amber-500/30">
              The Difference
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              Why Not Just Use ChatGPT?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              You can ask ChatGPT to write you a sales plan. But it doesn&apos;t know what to leave out.
              <span className="text-slate-300 font-medium"> The value is in the curation, not the generation.</span>
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Generic AI */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center mb-6">
                <Bot className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Generic AI</h3>
              <p className="text-sm text-slate-500 mb-6">ChatGPT, Claude, Gemini</p>
              <div className="space-y-4">
                {[
                  { label: "Knows your stage", status: "no" },
                  { label: "Opinionated framework", status: "no" },
                  { label: "Stage-specific benchmarks", status: "no" },
                  { label: "Structured execution plan", status: "partial" },
                  { label: "Continuous follow-up", status: "no" },
                  { label: "Handoff-ready for first hire", status: "no" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.status === "no" ? (
                      <X className="h-4 w-4 text-slate-600 flex-shrink-0" />
                    ) : (
                      <Minus className="h-4 w-4 text-slate-600 flex-shrink-0" />
                    )}
                    <span className="text-sm text-slate-400">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-xs text-slate-500 leading-relaxed">
                  You get answers to what you ask, but you don&apos;t know what you don&apos;t know.
                </p>
              </div>
            </div>

            {/* Hiring VP Sales */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center mb-6">
                <UserCheck className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">VP of Sales Hire</h3>
              <p className="text-sm text-slate-500 mb-6">Fractional or full-time</p>
              <div className="space-y-4">
                {[
                  { label: "Knows your stage", status: "partial" },
                  { label: "Opinionated framework", status: "yes" },
                  { label: "Stage-specific benchmarks", status: "partial" },
                  { label: "Structured execution plan", status: "partial" },
                  { label: "Continuous follow-up", status: "yes" },
                  { label: "Handoff-ready for first hire", status: "partial" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.status === "yes" ? (
                      <CheckCircle className="h-4 w-4 text-slate-500 flex-shrink-0" />
                    ) : (
                      <Minus className="h-4 w-4 text-slate-600 flex-shrink-0" />
                    )}
                    <span className="text-sm text-slate-400">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-xs text-slate-500 leading-relaxed">
                  The right person can transform your business, but 70% of first sales hires at this stage fail within 12 months.
                </p>
              </div>
            </div>

            {/* fromThoughts */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-amber-500 text-slate-900 text-xs font-bold rounded-full">
                  Built for this
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                <span className="font-[family-name:var(--font-playfair)] italic font-normal text-slate-500">from</span>
                <span className="font-bold text-slate-900">Thoughts</span>
              </h3>
              <p className="text-sm text-slate-500 mb-6">Curated sales mechanism</p>
              <div className="space-y-4">
                {[
                  "Knows your stage",
                  "Opinionated framework",
                  "Stage-specific benchmarks",
                  "Structured execution plan",
                  "Continuous follow-up",
                  "Handoff-ready for first hire",
                ].map((label) => (
                  <div key={label} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-600 leading-relaxed">
                  10+ years of B2B commercial experience, structured for your stage, your numbers, your market.
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-4">
            Continuous pipeline monitoring, weekly briefs, and ICP sharpening are included in the Growth plan. Foundation includes the platform and weekly structure without the advisory layer.
          </p>
        </div>
      </section>

      {/* Built For You — Merged Who + When */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-4">
              Built For You
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Does This Sound Like You?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              <span className="font-[family-name:var(--font-playfair)] italic font-normal">from</span><span className="font-bold text-gray-900">Thoughts</span> is purpose-built for one specific stage of growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Building2,
                title: "B2B company doing €300K–€1.5M in revenue",
                description: "SaaS, tech-enabled services, or B2B platform preparing for the next growth phase.",
              },
              {
                icon: UserCircle,
                title: "You're still closing every deal yourself",
                description: "Your product knowledge and relationships drive revenue, but that doesn't scale.",
              },
              {
                icon: Gauge,
                title: "You've made your first hire but the deals still run through you",
                description: "You've started building a team, but without clear direction and a documented process, every deal still runs through you.",
              },
              {
                icon: Globe,
                title: "Deliberate about your next hire",
                description: "You'd rather build a structured sales mechanism first than hire a VP of Sales and hope they figure it out.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Timing — inline with the section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-wide mb-8">
              The right moment to start
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Just raised seed funding",
                  description: "Runway and pressure to professionalize sales, but haven't hired yet",
                },
                {
                  title: "3–6 months from first sales hire",
                  description: "Planning to hire but want a documented process to hand over",
                },
                {
                  title: "You've made your first hire and need to manage them",
                  description: "Know exactly where to point them each week, and see whether it's working",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200/60">
                  <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4 border border-amber-500/30">
              4 Steps
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4 items-start">
            {[
              {
                title: "Set Your Target",
                description: "Where you are and where you want to be",
                icon: Euro,
              },
              {
                title: "Add Your Numbers",
                description: "Current funnel metrics and deal sizes",
                icon: BarChart3,
              },
              {
                title: "Get Your Plan",
                description: "AI-powered priorities based on industry benchmarks",
                icon: Zap,
              },
              {
                title: "Start Executing",
                description: "Export as PDF or CSV and take action",
                icon: Download,
              },
            ].map((item, index) => (
              <div key={item.title} className="relative text-center">
                {/* Connector arrow between steps */}
                {index < 3 && (
                  <div className="hidden md:flex absolute top-10 left-[60%] w-[80%] items-center">
                    <div className="flex-1 h-0.5 bg-slate-700" />
                    <ChevronRight className="h-4 w-4 text-slate-600 -ml-1" />
                  </div>
                )}

                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-9 w-9 text-amber-400" />
                </div>

                <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-4">
              Features
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">What&apos;s Inside</h2>
            <p className="text-xl text-gray-600">
              Turn a revenue target into a plan your team can act on
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                  <Target className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold">Structured Sales Mechanism</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Revenue roadmap with clear objectives and key results",
                  "Documented strategy your first hire can follow",
                  "Priority ranking so they know what to focus on first",
                  "Timeframes aligned to your growth targets",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold">Know Exactly What&apos;s Missing</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "See the gap between where you are and where you need to be",
                  "Conversion rate gaps at each funnel stage",
                  "Pipeline coverage requirements quantified",
                  "Recommendations ranked by impact on your revenue target",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold">CRM Integration</h3>
                <span className="ml-auto text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">Coming Soon</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Direct sync to HubSpot and Pipedrive",
                  "Push execution plans as deals and notes",
                  "Salesforce support on the roadmap",
                  "Currently: export as PDF or CSV to share with your team",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold">Benchmark-Backed Guidance</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Your metrics compared against top-performing companies at your stage",
                  "Industry-specific benchmarks for conversion, deal size, and cycle time",
                  "See where you're ahead and where you're falling behind",
                  "Targets calibrated to your stage, not generic industry averages",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get - Product Showcase */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-200 text-slate-700 text-sm font-medium mb-4">
              Your Deliverable
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">What You&apos;ll Get</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete revenue execution plan you can hand to your first hire on day one
            </p>
          </div>

          {/* Product Mockup with Callouts */}
          <div className="relative">
            {/* Main Product Window */}
            <div className="relative max-w-4xl mx-auto">
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-block px-4 py-1 bg-white rounded-md text-xs text-gray-400 border border-gray-200">
                      Your Revenue Execution Plan
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Revenue Execution Plan</h3>
                      <p className="text-sm text-gray-500 mt-1">SaaS Company • €800K → €1.5M target</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Ready to Execute
                      </span>
                    </div>
                  </div>

                  {/* Strategic Objectives */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="h-5 w-5 text-slate-700" />
                      <h4 className="font-semibold text-gray-900">Strategic Objectives</h4>
                      <span className="text-xs text-gray-400 ml-auto">Prioritized by impact</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { priority: "1", title: "Improve SQL-to-Close Rate", target: "15% → 22%", impact: "High" },
                        { priority: "2", title: "Increase Average Deal Size", target: "€14K → €18K", impact: "High" },
                        { priority: "3", title: "Accelerate Sales Cycle", target: "45 → 30 days", impact: "Medium" },
                      ].map((obj) => (
                        <div key={obj.priority} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-amber-400 text-sm">
                            {obj.priority}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{obj.title}</p>
                            <p className="text-sm text-gray-500">Target: {obj.target}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${obj.impact === "High" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
                            {obj.impact} Impact
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Results Preview */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-4 w-4 text-slate-600" />
                        <span className="text-sm font-medium text-gray-700">Key Results</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                      <p className="text-xs text-gray-500">Measurable targets defined</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium text-gray-700">Action Items</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                      <p className="text-xs text-gray-500">Specific next steps</p>
                    </div>
                  </div>

                  {/* Export Options */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">Export your plan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600">PDF</span>
                      <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600">CSV</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Callout Cards */}
            <div className="hidden lg:block absolute -left-4 top-1/4 transform -translate-x-full">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <CheckCircle className="h-3.5 w-3.5 text-slate-700" />
                  </div>
                  <span className="text-xs font-semibold text-gray-900">Prioritized</span>
                </div>
                <p className="text-xs text-gray-500">Know exactly what to focus on first based on your biggest gaps</p>
              </div>
            </div>

            <div className="hidden lg:block absolute -right-4 top-1/3 transform translate-x-full">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <Users className="h-3.5 w-3.5 text-slate-700" />
                  </div>
                  <span className="text-xs font-semibold text-gray-900">Handoff-Ready</span>
                </div>
                <p className="text-xs text-gray-500">Give your first sales hire a sales mechanism they can execute from day one</p>
              </div>
            </div>

            <div className="hidden lg:block absolute -right-4 bottom-1/4 transform translate-x-full">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <TrendingUp className="h-3.5 w-3.5 text-slate-700" />
                  </div>
                  <span className="text-xs font-semibold text-gray-900">Benchmark-Backed</span>
                </div>
                <p className="text-xs text-gray-500">Targets based on what top performers achieve at your stage</p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-slate-700 font-medium hover:text-amber-600 transition-colors"
            >
              View pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What Happens Next — Bridge Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
              You&apos;re Not On Your Own
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Happens After You Get Your Plan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              This isn&apos;t a report that sits in a folder. Every plan comes with ongoing intelligence from fromThoughts, so you always know what to do next.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-400 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pipeline Review</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                fromThoughts reviews your live pipeline, flags what&apos;s stalling before it goes cold, and surfaces where your pattern of losses is.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-400 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">ICP Sharpening</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Over time, fromThoughts identifies which types of deals you&apos;re winning and losing, and adjusts where you and your team should be spending time.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-400 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Weekly Direction</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every week, you and your team know exactly where to focus. Not based on gut feel, but on what your pipeline data is actually saying.
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            You don&apos;t just get a report. fromThoughts learns your business and tells you what to do next.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Build the Sales Mechanism Your Team Can Execute
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Turn what&apos;s in your head into a sales mechanism your team can follow and your pipeline can show progress against. In under 10 minutes.
          </p>
          <Link
            href="/forecast"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all shadow-lg text-lg"
          >
            Build Your Revenue Execution Plan
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
