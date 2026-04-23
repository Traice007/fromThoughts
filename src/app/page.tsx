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
  Gauge,
  AlertTriangle,
  TrendingDown,
  Shield,
  X,
  Minus,
  Bot,
  UserCheck,
  ArrowDown,
  Calendar,
  LineChart,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-white text-sm font-medium mb-8">
            <Shield className="h-4 w-4" />
            For B2B Founders with 1–3 Sales Reps
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight text-white">
            <span className="text-amber-400">You know the strategy.</span>{" "}
            Your team doesn&apos;t know what to do on Monday.
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            fromThoughts turns your revenue target into a sales mechanism your team can execute on.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/forecast"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all shadow-lg text-lg"
            >
              See If Your Pipeline Covers Your Target
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
              30-day satisfaction guarantee
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-amber-500" />
              Annual commitment. No setup fees.
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-amber-500" />
              Works with HubSpot &amp; Pipedrive
            </span>
          </div>
        </div>
      </section>

      {/* Value Anchors */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">3 actions</div>
              <div className="text-sm text-slate-400 mt-1">Every Monday for your team</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">Week-over-week</div>
              <div className="text-sm text-slate-400 mt-1">Pipeline tracking vs. your target</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">90% cheaper</div>
              <div className="text-sm text-slate-400 mt-1">vs. a fractional VP of Sales</div>
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
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">You&apos;ve Hired the Team. Now What?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Most founders hire their first reps and expect revenue to follow. It doesn&apos;t — because strategy without weekly execution direction isn&apos;t enough.
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
              <h3 className="text-xl font-bold mb-3">Your Strategy Doesn&apos;t Reach the Team</h3>
              <p className="text-gray-600 leading-relaxed">
                You know your ICP, your best deal profile, and which objections matter. But your reps can&apos;t read your mind — so every week they improvise instead of executing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pipeline Reviews Without Direction</h3>
              <p className="text-gray-600 leading-relaxed">
                You review the pipeline together and something feels off. But you leave the meeting without clear priorities — and next week looks exactly the same.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold mb-3">No Link Between Target and Today</h3>
              <p className="text-gray-600 leading-relaxed">
                You have a revenue target for the year. Your team has deals in the CRM. But the connection between the two — what the pipeline actually needs to hit that number — is never calculated.
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

      {/* The Chain — How fromThoughts Works Concretely */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4 border border-amber-500/30">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              From Target to This Week&apos;s Actions
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Every week, fromThoughts reads your CRM and runs this chain automatically.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                step: "1",
                label: "Your revenue target",
                value: "€2M ARR by end of year",
                color: "bg-slate-800 border-slate-700",
                labelColor: "text-slate-400",
                valueColor: "text-white",
              },
              {
                step: "2",
                label: "What your pipeline needs",
                value: "€800K active pipeline at all times — based on your deal size and win rate",
                color: "bg-slate-800 border-slate-700",
                labelColor: "text-slate-400",
                valueColor: "text-white",
              },
              {
                step: "3",
                label: "What you actually have",
                value: "€280K active — and €140K of that hasn't moved in 45+ days",
                color: "bg-red-950/40 border-red-800/50",
                labelColor: "text-slate-400",
                valueColor: "text-red-300",
              },
              {
                step: "4",
                label: "The gap",
                value: "€520K short. At current pace you hit €420K ARR, not €2M.",
                color: "bg-red-950/40 border-red-800/50",
                labelColor: "text-slate-400",
                valueColor: "text-red-300",
              },
              {
                step: "5",
                label: "This week's 3 actions",
                value: null,
                color: "bg-amber-950/30 border-amber-700/50",
                labelColor: "text-amber-400",
                valueColor: "text-white",
                actions: [
                  "Deal X — call today, it dies in 48 hours without contact",
                  "Drop Deal Y — 90 days stalled, no decision maker, move on",
                  "Open 2 new deals in segment Z — your win rate is highest there",
                ],
              },
            ].map((item, index) => (
              <div key={item.step}>
                <div className={`rounded-xl border p-5 ${item.color}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-400 text-sm font-bold">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <div className={`text-xs font-medium uppercase tracking-wide mb-1 ${item.labelColor}`}>
                        {item.label}
                      </div>
                      {item.value && (
                        <div className={`text-base font-medium ${item.valueColor}`}>{item.value}</div>
                      )}
                      {item.actions && (
                        <ul className="space-y-2 mt-1">
                          {item.actions.map((action, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-amber-400 font-bold text-sm mt-0.5">{i + 1}.</span>
                              <span className="text-white text-sm">{action}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                {index < 4 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="h-4 w-4 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 mt-10 text-sm">
            fromThoughts runs this every week. Automatically. From your CRM.
          </p>
        </div>
      </section>

      {/* Why Not Just Use AI? — Comparison Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-4">
              The Difference
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
              Why Not Just Use ChatGPT?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              You can ask ChatGPT to write you a sales plan. But it doesn&apos;t know your pipeline, your numbers, or what happened last week.
              <span className="text-slate-800 font-medium"> The value is in the context, not the generation.</span>
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Generic AI */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center mb-6">
                <Bot className="h-6 w-6 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Generic AI</h3>
              <p className="text-sm text-slate-500 mb-6">ChatGPT, Claude, Gemini</p>
              <div className="space-y-4">
                {[
                  { label: "Reads your live pipeline", status: "no" },
                  { label: "Knows your stage benchmarks", status: "no" },
                  { label: "Weekly direction for your team", status: "no" },
                  { label: "Tracks progress toward your target", status: "no" },
                  { label: "Tells you which deals to drop", status: "partial" },
                  { label: "Connects strategy to execution", status: "no" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.status === "no" ? (
                      <X className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    ) : (
                      <Minus className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    )}
                    <span className="text-sm text-slate-500">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-500 leading-relaxed">
                  You get answers to what you ask, but you don&apos;t know what you don&apos;t know.
                </p>
              </div>
            </div>

            {/* Your CRM */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center mb-6">
                <LineChart className="h-6 w-6 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Your CRM Alone</h3>
              <p className="text-sm text-slate-500 mb-6">HubSpot, Pipedrive, Salesforce</p>
              <div className="space-y-4">
                {[
                  { label: "Reads your live pipeline", status: "yes" },
                  { label: "Knows your stage benchmarks", status: "no" },
                  { label: "Weekly direction for your team", status: "no" },
                  { label: "Tracks progress toward your target", status: "partial" },
                  { label: "Tells you which deals to drop", status: "no" },
                  { label: "Connects strategy to execution", status: "no" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.status === "yes" ? (
                      <CheckCircle className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    ) : item.status === "partial" ? (
                      <Minus className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    )}
                    <span className="text-sm text-slate-500">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your CRM tells you what happened. It doesn&apos;t tell you what to do about it.
                </p>
              </div>
            </div>

            {/* fromThoughts */}
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-amber-500 text-slate-900 text-xs font-bold rounded-full">
                  Built for this
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                <span className="font-[family-name:var(--font-playfair)] italic font-normal text-slate-400">from</span>
                <span className="font-bold text-white">Thoughts</span>
              </h3>
              <p className="text-sm text-slate-400 mb-6">Strategy-to-execution layer</p>
              <div className="space-y-4">
                {[
                  "Reads your live pipeline",
                  "Knows your stage benchmarks",
                  "Weekly direction for your team",
                  "Tracks progress toward your target",
                  "Tells you which deals to drop",
                  "Connects strategy to execution",
                ].map((label) => (
                  <div key={label} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    <span className="text-sm text-slate-200">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-xs text-slate-400 leading-relaxed">
                  10+ years of B2B commercial experience, structured for your stage, your numbers, your market.
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            Continuous pipeline monitoring, weekly briefs, and ICP sharpening are included in the Growth plan. Foundation includes the platform and weekly structure without the advisory layer.
          </p>
        </div>
      </section>

      {/* Built For You */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-200 text-slate-700 text-sm font-medium mb-4">
              Built For You
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Does This Sound Like You?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              <span className="font-[family-name:var(--font-playfair)] italic font-normal">from</span><span className="font-bold text-gray-900">Thoughts</span> is built for one specific stage of growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {[
              {
                icon: Building2,
                title: "B2B company doing €300K–€1.5M in revenue",
                description: "SaaS, tech-enabled services, or B2B platform with a repeatable product and a growing pipeline.",
              },
              {
                icon: Users,
                title: "You have 1–3 sales reps on the team",
                description: "You've made the hire. Now you need to make it work — with clear direction, not gut feel.",
              },
              {
                icon: Gauge,
                title: "You have a CRM but not a system",
                description: "Deals are logged but the pipeline review still ends with \"let's see how next week goes.\"",
              },
              {
                icon: Target,
                title: "You have a revenue target but no line to it",
                description: "You know where you want to go. You don't know if what your team is doing today will get you there.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
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

          {/* Not for you */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">This is not for you if</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                "You don't have a CRM or consistent pipeline data",
                "You're still searching for product-market fit",
                "You already have a Head of Sales managing the team",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <X className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-500">{item}</p>
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
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Get Started in Under 10 Minutes</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4 items-start">
            {[
              {
                title: "Set Your Target",
                description: "Where you are and where you want to be by end of year",
                icon: Euro,
              },
              {
                title: "Add Your Numbers",
                description: "Current funnel metrics, deal sizes, and team setup",
                icon: BarChart3,
              },
              {
                title: "Get Your Analysis",
                description: "Pipeline gap, benchmark comparison, and prioritized actions",
                icon: Zap,
              },
              {
                title: "Execute Every Week",
                description: "Your team knows exactly what to do — updated automatically",
                icon: Calendar,
              },
            ].map((item, index) => (
              <div key={item.title} className="relative text-center">
                {index < 3 && (
                  <div className="hidden md:flex absolute top-10 left-[60%] w-[80%] items-center">
                    <div className="flex-1 h-0.5 bg-slate-700" />
                    <ChevronRight className="h-4 w-4 text-slate-600 -ml-1" />
                  </div>
                )}
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

      {/* Features — What's Inside */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-4">
              Features
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">What&apos;s Inside</h2>
            <p className="text-xl text-gray-600">
              Everything your team needs to go from target to execution — every week
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
                  "Documented strategy your team can follow without you",
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
                  "Pipeline read — automatic weekly gap calculation",
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
              A complete revenue execution plan your team can act on — updated every week
            </p>
          </div>

          {/* Product Mockup with Callouts */}
          <div className="relative">
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
                        <span className="text-sm font-medium text-gray-700">This Week&apos;s Actions</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                      <p className="text-xs text-gray-500">Specific priorities for your team</p>
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
                <p className="text-xs text-gray-500">Know exactly what your team should focus on first, based on your biggest gaps</p>
              </div>
            </div>

            <div className="hidden lg:block absolute -right-4 top-1/3 transform translate-x-full">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <Users className="h-3.5 w-3.5 text-slate-700" />
                  </div>
                  <span className="text-xs font-semibold text-gray-900">Team-Ready</span>
                </div>
                <p className="text-xs text-gray-500">Your reps know what to do on Monday — no translation needed</p>
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

      {/* What Happens Next */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
              Ongoing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Not a Report. A Weekly System.</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every week, fromThoughts updates your picture so you and your team always know where you stand and what to do next.
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
                Over time, fromThoughts identifies which types of deals you&apos;re winning and losing, and adjusts where your team should be spending time.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-400 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Weekly Direction</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every week, you and your team know exactly where to focus. Not based on gut feel — based on what your pipeline data is actually saying.
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            fromThoughts learns your business over time and gets sharper every week.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Stop Managing on Gut Feel.
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Connect your revenue target to what your team does this week — and know every Monday whether you&apos;re on track.
          </p>
          <Link
            href="/forecast"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all shadow-lg text-lg"
          >
            See If Your Pipeline Covers Your Target
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
