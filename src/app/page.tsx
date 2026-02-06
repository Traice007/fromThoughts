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
  Sparkles,
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
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Dark Gradient Background - same as How It Works */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-2xl rotate-12 blur-sm" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-xl -rotate-12 blur-sm" />
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-white/10 rounded-lg rotate-45 blur-sm" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 border border-white/30 text-white text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            For Founders Scaling €500K–€2M
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight text-white">
            Know Exactly What to Focus On{" "}
            <span className="text-emerald-200">
              to Hit Your Revenue Target
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
            FounderVision turns your revenue target into a structured execution
            plan—with prioritized objectives, the right metrics to track, and
            clear guidance on where to focus first.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/forecast"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 rounded-xl font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow-xl text-lg"
            >
              Build Your Execution Plan
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/60 transition-all"
            >
              See How It Works
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-300" />
              14-day money-back guarantee
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-300" />
              Based on 10,000+ companies
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-300" />
              Export as PDF or CSV
            </span>
          </div>
        </div>
      </section>

      {/* Value Anchors */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">10,000+</div>
              <div className="text-sm text-white/70 mt-1">Company benchmarks</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">€200K+</div>
              <div className="text-sm text-white/70 mt-1">Saved vs. first commercial hire</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">&lt; 2 min</div>
              <div className="text-sm text-white/70 mt-1">From revenue target to execution plan</div>
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
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">The Problem We Solve</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Most founders know their revenue targets but struggle to translate them into
              operational actions that actually move the needle.
            </p>
          </div>

          {/* Product Mockup - Gap Analysis */}
          <div className="flex justify-center mb-16">
            <div className="relative w-full max-w-[800px]">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-3xl opacity-15" />
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-block px-4 py-1 bg-white rounded-md text-xs text-gray-400 border border-gray-200">
                      foundervision.io/results
                    </div>
                  </div>
                </div>
                {/* Dashboard content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                      <PieChart className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900">Gap Analysis</h3>
                    <span className="ml-auto text-xs text-gray-400">SaaS &middot; €1.2M ARR &rarr; €2.4M target</span>
                  </div>

                  {/* Revenue gap bar */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Revenue Gap</span>
                      <span className="text-sm font-bold text-gray-900">€1.2M to close</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[50%] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
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
                      <div key={metric.label} className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                        <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {metric.status === "below" ? (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          ) : (
                            <TrendingUp className="h-3 w-3 text-emerald-500" />
                          )}
                          <span className={`text-xs font-medium ${metric.status === "below" ? "text-red-600" : "text-emerald-600"}`}>
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
                        Closing 22% instead of 15% at your current pipeline volume would add €420K in annual revenue—the single highest-impact lever.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg hover:shadow-red-100/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">The Translation Gap</h3>
              <p className="text-gray-600 leading-relaxed">
                &quot;We need to 2x revenue&quot; isn&apos;t a plan. Without breaking targets into funnel requirements and weekly priorities, teams don&apos;t know what to do.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Hiring Before Fixing</h3>
              <p className="text-gray-600 leading-relaxed">
                A €200K+ VP of Commercial won&apos;t fix broken execution fundamentals. Most founders need a structured framework before they need a senior hire.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Wrong Metrics, Wrong Time</h3>
              <p className="text-gray-600 leading-relaxed">
                Tracking everything means focusing on nothing. Without knowing which metrics matter at your stage, you can&apos;t steer growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              Built For You
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Who This Is For</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              FounderVision is purpose-built for one specific stage of growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                {
                  icon: Building2,
                  title: "B2B companies doing €500K–€2M in revenue",
                  description: "SaaS, tech-enabled services, and B2B platforms in their first real growth phase.",
                },
                {
                  icon: UserCircle,
                  title: "Founders still driving commercial decisions",
                  description: "You own the growth strategy but don't have a dedicated RevOps or sales leadership function yet.",
                },
                {
                  icon: Gauge,
                  title: "Teams of 5–25 using a CRM",
                  description: "You're on HubSpot or Pipedrive, but the data isn't translating into clear priorities for the team.",
                },
                {
                  icon: Globe,
                  title: "Capital-efficient and deliberate about hiring",
                  description: "You'd rather build a structured execution framework than hire a €200K VP and hope for the best.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-8">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">This is probably not for you if:</h3>
              <ul className="space-y-3">
                {[
                  "You already have a VP of Sales or dedicated RevOps team",
                  "You're pre-revenue or still searching for product-market fit",
                  "You're a B2C company or not running a sales-driven model",
                  "You're looking for a CRM—we integrate with yours, we don't replace it",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="text-gray-400 mt-0.5">&#x2715;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-4 border border-white/30">
              From Target to Action
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4 items-start">
            {[
              {
                title: "Set Your Target",
                description: "Where you are and where you want to be",
                icon: Euro,
                gradient: "from-emerald-400 to-emerald-600",
              },
              {
                title: "Add Your Numbers",
                description: "Current funnel metrics and deal sizes",
                icon: BarChart3,
                gradient: "from-blue-400 to-blue-600",
              },
              {
                title: "Get Your Plan",
                description: "AI-powered priorities based on 10,000+ benchmarks",
                icon: Zap,
                gradient: "from-violet-400 to-violet-600",
              },
              {
                title: "Start Executing",
                description: "Export as PDF or CSV and take action",
                icon: Download,
                gradient: "from-amber-400 to-amber-600",
              },
            ].map((item, index) => (
              <div key={item.title} className="relative text-center group">
                {/* Connector arrow between steps */}
                {index < 3 && (
                  <div className="hidden md:flex absolute top-10 left-[60%] w-[80%] items-center">
                    <div className="flex-1 h-0.5 bg-white/30" />
                    <ChevronRight className="h-4 w-4 text-white/50 -ml-1" />
                  </div>
                )}

                {/* Icon with colorful gradient */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-5 shadow-lg transition-all group-hover:scale-105`}>
                  <item.icon className="h-9 w-9 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>

                {/* Description */}
                <p className="text-white/80 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
              Features
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">From Strategy to Execution</h2>
            <p className="text-xl text-gray-600">
              Everything you need to turn a revenue target into a plan your team can act on
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-gradient-to-br from-emerald-50 to-teal-50/50 p-8 rounded-2xl border border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Prioritized Execution Plan</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "4-6 strategic objectives decomposed from your revenue target",
                  "Measurable key results with specific targets",
                  "Priority ranking so your team knows what to do first",
                  "Timeframes aligned to your revenue timeline",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-teal-50 to-cyan-50/50 p-8 rounded-2xl border border-teal-100 hover:shadow-xl hover:shadow-teal-100/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-white" />
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
                    <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-cyan-50 to-blue-50/50 p-8 rounded-2xl border border-cyan-100 hover:shadow-xl hover:shadow-cyan-100/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">CRM Integration</h3>
                <span className="ml-auto text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">Coming Soon</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Direct sync to HubSpot and Pipedrive",
                  "Push execution plans as deals and notes",
                  "Salesforce support on the roadmap",
                  "Currently: export as PDF or CSV to share with your team",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50/50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl hover:shadow-blue-100/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Benchmark-Backed Guidance</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Your metrics compared against 10,000+ companies at your stage",
                  "Industry-specific benchmarks for conversion, deal size, and cycle time",
                  "See where you're ahead and where you're falling behind",
                  "Export as PDF or CSV to share with your team",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              Pricing
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-5xl mx-auto">
              Your first Head of Sales costs €150,000–250,000/year in total compensation—plus months of your time recruiting, onboarding, and managing. A fractional VP still runs €60,000–100,000. FounderVision gives you the structured execution framework for a fraction of the cost.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Tier */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                Get Started
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">€1,500</span>
                <span className="text-gray-600 font-medium"> one-time</span>
              </div>
              <p className="text-gray-700 text-sm mb-8">
                30 days of full access to FounderVision
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited forecasts",
                  "AI-powered revenue roadmap",
                  "Industry benchmark comparisons",
                  "Gap analysis & recommendations",
                  "Export to PDF/CSV",
                  "Email support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup"
                className="block w-full text-center px-6 py-4 border-2 border-emerald-500 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="relative bg-gradient-to-b from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-500/25 scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  MOST POPULAR
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                For Growing Teams
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold">€15,000</span>
                <span className="text-white/70"> / year</span>
              </div>
              <p className="text-white/80 text-sm mb-8">
                For growing companies serious about hitting targets
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Starter",
                  "Roadmap progress tracking",
                  "CRM integrations (HubSpot, Pipedrive)",
                  "Team collaboration (coming soon)",
                  "Priority support",
                  "Monthly strategy insights",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-emerald-200 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup"
                className="block w-full text-center px-6 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                Upgrade to Pro
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-4">
                Full Service
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">Custom</span>
              </div>
              <p className="text-gray-700 text-sm mb-8">
                For larger organizations with specific needs
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Pro",
                  "Dedicated account manager",
                  "Custom integrations",
                  "SLA guarantee",
                  "API access",
                  "On-premise deployment option",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact-sales"
                className="block w-full text-center px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-12 text-sm text-gray-600">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span className="font-medium">14-day money-back guarantee on all plans.</span>
            <span className="text-gray-500">No questions asked.</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Stop Planning in the Dark
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Get a structured execution plan built from your revenue data and 10,000+ company benchmarks—in under 2 minutes.
          </p>
          <Link
            href="/forecast"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 rounded-xl font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow-xl shadow-amber-500/25 text-lg"
          >
            Build Your Execution Plan
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
