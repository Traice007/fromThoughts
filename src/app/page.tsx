import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Users,
  BarChart3,
  RefreshCw,
} from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Zap className="h-4 w-4" />
            AI-Powered Revenue Operations
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Turn Revenue Targets Into{" "}
            <span className="text-primary">Actionable OKRs</span>
          </h1>

          <p className="text-xl text-secondary max-w-2xl mx-auto mb-10">
            Stop guessing. FounderVision helps growing companies ($1.5M-$3M ARR) bridge the gap
            between revenue goals and operational execution—without hiring a VP of Commercial too early.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/forecast"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors text-lg"
            >
              Generate Your OKRs Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-4 text-secondary hover:text-foreground transition-colors"
            >
              See How It Works
            </a>
          </div>

          <p className="mt-8 text-sm text-secondary">
            No signup required • Results in 30 seconds • Sync to HubSpot or Pipedrive
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Problem We Solve</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Most founders know their revenue targets but struggle to translate them into
              operational actions that actually move the needle.
            </p>
          </div>

          {/* Founder Quote */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-16 bg-background p-8 rounded-2xl border border-border">
            <div className="flex-shrink-0">
              <Image
                src="/images/founder-testimonial.jpg"
                alt="Startup founder"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <blockquote className="text-lg italic text-secondary mb-3">
                &quot;I knew we needed to hit $3M ARR, but I had no idea how to break that down into
                quarterly targets my team could actually execute on.&quot;
              </blockquote>
              <p className="font-medium">— Every founder at $1.5M ARR</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Vague Goals</h3>
              <p className="text-secondary">
                &quot;We need to 2x revenue&quot; doesn&apos;t tell your team what to actually do this quarter.
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-warning" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premature Hiring</h3>
              <p className="text-secondary">
                Hiring a $200K+ VP of Commercial at $1.5M ARR often creates more problems than it solves.
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Metric Blindness</h3>
              <p className="text-secondary">
                Without clear funnel metrics, you can&apos;t identify which levers will actually drive growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-secondary">
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
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step {item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-secondary text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What You Get</h2>
            <p className="text-lg text-secondary">
              Everything you need to execute on your revenue goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background p-8 rounded-xl border border-border">
              <h3 className="text-xl font-semibold mb-4">AI-Generated OKRs</h3>
              <ul className="space-y-3">
                {[
                  "4-6 strategic objectives tailored to your growth stage",
                  "Measurable key results with specific targets",
                  "Priority ranking to focus your efforts",
                  "Timeframes aligned to your revenue timeline",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background p-8 rounded-xl border border-border">
              <h3 className="text-xl font-semibold mb-4">Gap Analysis</h3>
              <ul className="space-y-3">
                {[
                  "Identify what's missing to hit your targets",
                  "Conversion rate gaps at each funnel stage",
                  "Pipeline coverage requirements",
                  "Actionable recommendations prioritized by impact",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background p-8 rounded-xl border border-border">
              <h3 className="text-xl font-semibold mb-4">CRM Integration</h3>
              <ul className="space-y-3">
                {[
                  "One-click sync to HubSpot",
                  "One-click sync to Pipedrive",
                  "Creates deals with forecast data",
                  "Adds notes with full OKR details",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background p-8 rounded-xl border border-border">
              <h3 className="text-xl font-semibold mb-4">Export Options</h3>
              <ul className="space-y-3">
                {[
                  "Download as PDF for presentations",
                  "Export to CSV for spreadsheets",
                  "Share link with your team",
                  "Print-ready formatting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-secondary">
              Choose the plan that fits your growth stage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Trial Tier */}
            <div className="bg-background border border-border rounded-2xl p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Best to Start
              </div>
              <h3 className="text-xl font-bold mb-2">Trial</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$120</span>
                <span className="text-secondary"> / 90 days</span>
              </div>
              <p className="text-secondary text-sm mb-6">
                Perfect for testing the waters and validating your growth strategy
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Up to 10 forecasts",
                  "Data-driven OKRs",
                  "Benchmark comparison",
                  "Gap analysis",
                  "PDF & CSV export",
                  "Email support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/forecast"
                className="block w-full text-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors"
              >
                Start 90-Day Trial
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-background border-2 border-primary rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                For Growing Teams
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$45</span>
                <span className="text-secondary"> / month</span>
              </div>
              <p className="text-secondary text-sm mb-6">
                Continuous revenue ops guidance for scaling companies
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited forecasts",
                  "Data-driven OKRs",
                  "Benchmark comparison",
                  "Gap analysis & recommendations",
                  "PDF & CSV export",
                  "HubSpot integration",
                  "Pipedrive integration",
                  "Priority email support",
                  "Monthly strategy insights",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/forecast"
                className="block w-full text-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-background border border-border rounded-2xl p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                Full Service
              </div>
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <p className="text-secondary text-sm mb-6">
                For companies needing dedicated support and custom integrations
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Pro",
                  "Unlimited team members",
                  "Custom CRM integrations",
                  "Salesforce integration",
                  "API access",
                  "Custom benchmark reports",
                  "Dedicated success manager",
                  "Quarterly strategy reviews",
                  "SLA guarantee",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="mailto:sales@foundervision.io"
                className="block w-full text-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-secondary mt-8">
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Turn Your Revenue Targets Into Action?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join hundreds of founders using FounderVision to bridge the gap between goals and execution.
          </p>
          <Link
            href="/forecast"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-medium hover:bg-white/90 transition-colors text-lg"
          >
            Generate Your OKRs Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
