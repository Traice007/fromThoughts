import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Lightbulb,
  Target,
  RefreshCw,
  Linkedin,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | fromThoughts",
  description:
    "I've helped multiple B2B companies build their commercial engine from scratch. Now I'm turning that experience into software, so founders can stop guessing and start executing.",
};

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero — Lead with the problem, not credentials */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

        <div className="relative max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Photo */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative w-72 sm:w-80 lg:w-96">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                  <Image
                    src="/images/hero/ranjith1.jpg"
                    alt="Ranjith Claessens — Founder of fromThoughts"
                    width={400}
                    height={533}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <p className="text-amber-400 text-sm font-medium tracking-wide uppercase mb-4">
                The Founder
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight text-white">
                Ranjith Claessens
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-6">
                I&apos;ve helped multiple B2B companies build their commercial engine
                from scratch, from first pipeline to repeatable revenue. Now
                I&apos;m turning that experience into software.
              </p>
              <p className="text-base text-slate-400 leading-relaxed mb-8">
                Based in Utrecht, working across Europe and Asia. 10+ years of
                figuring out what actually works when a growing company needs
                to go from founder-led sales to a real commercial operation.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <a
                  href="https://linkedin.com/in/ranjithclaessens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <Link
                  href="/lets-talk"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 text-slate-900 text-sm font-medium hover:bg-amber-400 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  Let&apos;s Talk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY — The pattern I kept seeing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
            Why I Built{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-normal text-slate-600">
              from
            </span>
            <span className="font-bold text-slate-900">Thoughts</span>
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              Over the past decade I&apos;ve been the person founders call when
              they need to build a commercial operation. Sometimes as employee
              #2. Sometimes as a fractional leader. Always with the same brief:
              &ldquo;We need revenue, but we don&apos;t know how to get
              there.&rdquo;
            </p>
            <p>
              The pattern was always the same. A founder between €300K and
              €1.5M in revenue, still closing every deal themselves. Smart
              enough to know they need a plan. Stuck because the options are
              either a €150K VP of Sales hire they can&apos;t afford to get
              wrong, or another quarter of gut-feel decisions.
            </p>
            <p>
              I&apos;ve been on both sides of this. I&apos;ve been the
              commercial hire brought in to &ldquo;figure it out,&rdquo; and
              I&apos;ve seen what happens when there&apos;s no strategy to
              execute against. The first hire churns. The pipeline stalls. The
              founder goes back to doing everything themselves.
            </p>
            <p className="text-slate-900 font-medium">
              I built{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-normal text-slate-600">
                from
              </span>
              <span className="font-bold text-slate-900">Thoughts</span>{" "}
              because this problem shouldn&apos;t cost €150K to solve.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT — What fromThoughts actually does */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-normal text-slate-600">
                from
              </span>
              <span className="font-bold text-slate-900">Thoughts</span>{" "}
              Does
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The frameworks I&apos;ve used across multiple companies, packaged into
              software you can use today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Revenue Gap Analysis",
                description:
                  "See exactly where your revenue plan has gaps: pipeline, conversion, capacity, or market positioning. No spreadsheet guessing.",
              },
              {
                icon: Lightbulb,
                title: "Execution Plan",
                description:
                  "Get a structured plan with OKRs, priorities, and recommendations your first commercial hire can actually execute on.",
              },
              {
                icon: RefreshCw,
                title: "Ongoing Support",
                description:
                  "Every plan comes with hands-on follow-up. I personally review your execution progress and help you course-correct as your pipeline evolves.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 border border-slate-200"
              >
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-5">
                  <item.icon className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW — The experience behind it */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              The Experience Behind It
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Nothing in fromThoughts is theoretical. Every framework came
              from a real company with a real revenue problem to solve.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                pattern: "Building from zero",
                insight:
                  "Joined a SaaS startup as the second employee. No pipeline, no process, no documented way of selling. Built the entire commercial operation (sales, marketing, and service) and generated the company's first recurring revenue.",
                lesson: "The gap analysis framework was born here.",
              },
              {
                pattern: "Scaling the team",
                insight:
                  "Led commercial teams of up to 14 people across SaaS, tech, and consultancy. Full P&L responsibility. Learned what breaks when you grow too fast without a documented strategy, and what holds when you have one.",
                lesson: "It's why fromThoughts generates OKRs, not just reports.",
              },
              {
                pattern: "Closing complex deals",
                insight:
                  "Guided enterprise sales cycles with multiple stakeholders, unclear mandates, and competing priorities. Healthcare, education, HR-tech, retail. Different industries, same decision-making friction.",
                lesson:
                  "The execution structure comes from these conversations.",
              },
              {
                pattern: "Working internationally",
                insight:
                  "Operated from Amsterdam, Munich, Paris, Taipei, and Bangkok. Built commercial strategies for EU and ASEAN markets. Learned that the fundamentals of B2B revenue don't change across borders, but the execution details do.",
                lesson:
                  "It's also why fromThoughts is built for European founders first.",
              },
            ].map((item) => (
              <div
                key={item.pattern}
                className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200"
              >
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.pattern}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {item.insight}
                </p>
                <p className="text-sm font-medium text-amber-700">
                  {item.lesson}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              Previously at{" "}
              <span className="text-slate-700 font-medium">Quan</span>
              {" · "}
              <span className="text-slate-700 font-medium">Pera</span>
              {" · "}
              <span className="text-slate-700 font-medium">Kaizo</span>
              {" · "}
              <span className="text-slate-700 font-medium">SendCloud</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Build Your Sales Mechanism?
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
            Stop relying on gut feeling. Get a structured plan built on
            frameworks that have actually worked, at companies just like yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/forecast"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400 transition-all"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/lets-talk"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:border-slate-400 hover:text-white transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
