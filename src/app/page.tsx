import Link from "next/link";
import Image from "next/image";
import {
  Target,
  Zap,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Users,
  BarChart3,
  RefreshCw,
  Sparkles,
  TrendingUp,
  PieChart,
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
            AI-Powered Revenue Operations
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight text-white">
            Turn your Revenue Strategy Into{" "}
            <span className="text-emerald-200">
              Actionable Items
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
            Stop guessing. FounderVision helps growing companies bridge the gap
            between revenue goals and operational execution—powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/forecast"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 rounded-xl font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow-xl text-lg"
            >
              Generate Your OKRs
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
              No signup required
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-300" />
              Results in 30 seconds
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-300" />
              Sync to your CRM
            </span>
          </div>
        </div>
      </section>

      {/* Trusted By / Social Proof */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="relative max-w-6xl mx-auto">
          <p className="text-center text-sm font-medium text-white/80 mb-8 uppercase tracking-wider">
            Trusted by forward-thinking founders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            <div className="text-2xl font-bold text-white/70">TechStart</div>
            <div className="text-2xl font-bold text-white/70">ScaleUp</div>
            <div className="text-2xl font-bold text-white/70">GrowthLab</div>
            <div className="text-2xl font-bold text-white/70">Venture+</div>
            <div className="text-2xl font-bold text-white/70">NextGen</div>
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

          {/* Featured Images - Playful Stack */}
          <div className="flex justify-center mb-16">
            <div className="relative w-[800px] h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-3xl opacity-15" />

              {/* Left image - rotated slightly */}
              <div className="absolute top-8 left-0 z-10 -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300">
                <Image
                  src="/images/founder-testimonial.jpg"
                  alt="Startup founder"
                  width={300}
                  height={300}
                  className="rounded-2xl object-cover shadow-xl border-4 border-white"
                />
              </div>

              {/* Center image - front and center */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 hover:scale-105 transition-all duration-300">
                <Image
                  src="/images/founder-testimonial-3.jpg"
                  alt="Startup founder"
                  width={320}
                  height={320}
                  className="rounded-2xl object-cover shadow-2xl border-4 border-white"
                />
              </div>

              {/* Right image - rotated opposite */}
              <div className="absolute top-8 right-0 z-10 rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300">
                <Image
                  src="/images/founder-testimonial-2.jpg"
                  alt="Startup founder"
                  width={300}
                  height={300}
                  className="rounded-2xl object-cover shadow-xl border-4 border-white"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg hover:shadow-red-100/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Vague Goals</h3>
              <p className="text-gray-600 leading-relaxed">
                &quot;We need to 2x revenue&quot; doesn&apos;t tell your team what to actually do this quarter.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premature Hiring</h3>
              <p className="text-gray-600 leading-relaxed">
                Hiring a $200K+ VP of Commercial at $1.5M ARR often creates more problems than it solves.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Metric Blindness</h3>
              <p className="text-gray-600 leading-relaxed">
                Without clear funnel metrics, you can&apos;t identify which levers will actually drive growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Dark Gradient Background - same as CTA */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-4 border border-white/30">
              Simple Process
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">How It Works</h2>
            <p className="text-xl text-white/90">
              Get from revenue target to actionable OKRs in under 2 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Enter Revenue Data",
                description: "Current ARR, target ARR, and your timeline",
                icon: DollarSign,
              },
              {
                step: 2,
                title: "Add Funnel Metrics",
                description: "Leads, MQAs, SQLs, and conversion rates",
                icon: TrendingUp,
              },
              {
                step: 3,
                title: "AI Generates OKRs",
                description: "Strategic objectives tailored to your goals",
                icon: Zap,
              },
              {
                step: 4,
                title: "Sync to CRM",
                description: "Push directly to HubSpot or Pipedrive",
                icon: RefreshCw,
              },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center group">
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-white/20" />
                )}
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:bg-white/30 transition-all border border-white/30">
                  <item.icon className="h-9 w-9 text-white" />
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-emerald-600 font-bold text-sm mb-4 shadow-sm">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
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
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">What You Get</h2>
            <p className="text-xl text-gray-600">
              Everything you need to execute on your revenue goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-gradient-to-br from-emerald-50 to-teal-50/50 p-8 rounded-2xl border border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">AI-Generated OKRs</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "4-6 strategic objectives tailored to your growth stage",
                  "Measurable key results with specific targets",
                  "Priority ranking to focus your efforts",
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
                <h3 className="text-xl font-bold">Gap Analysis</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Identify what's missing to hit your targets",
                  "Conversion rate gaps at each funnel stage",
                  "Pipeline coverage requirements",
                  "Actionable recommendations prioritized by impact",
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
              </div>
              <ul className="space-y-3">
                {[
                  "One-click sync to HubSpot",
                  "One-click sync to Pipedrive",
                  "Creates deals with forecast data",
                  "Adds notes with full OKR details",
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
                <h3 className="text-xl font-bold">Export Options</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Download as PDF for presentations",
                  "Export to CSV for spreadsheets",
                  "Share link with your team",
                  "Print-ready formatting",
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
            <p className="text-xl text-gray-600">
              Choose the plan that fits your growth stage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Trial Tier */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                Get Started
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Trial</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">$1700</span>
                <span className="text-gray-600 font-medium"> one-time</span>
              </div>
              <p className="text-gray-700 text-sm mb-8">
                Full access for 90 days to try FounderVision
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited forecasts",
                  "AI-powered OKR generation",
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
                Start Trial
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
                <span className="text-5xl font-bold">$8720</span>
                <span className="text-white/70"> / year</span>
              </div>
              <p className="text-white/80 text-sm mb-8">
                For growing companies serious about hitting targets
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Trial",
                  "OKR progress tracking",
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

              <a
                href="mailto:sales@foundervision.io"
                className="block w-full text-center px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-12">
            We offer a full refund within the first 14 days if you&apos;re not satisfied.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Ready to Turn Your Revenue Targets Into Action?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join hundreds of founders using FounderVision to bridge the gap between goals and execution.
          </p>
          <Link
            href="/forecast"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-xl text-lg"
          >
            Generate Your OKRs Now
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
