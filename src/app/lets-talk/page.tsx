import type { Metadata } from "next";
import { Clock, Shield, MessageCircle } from "lucide-react";
import { ContactSalesForm } from "@/components/contact-sales/contact-sales-form";

export const metadata: Metadata = {
  title: "Let's Talk | fromThoughts",
  description: "No demo call required. Tell us where you are in your revenue journey and we'll tell you honestly whether we're the right fit.",
};

export default function ContactSalesPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative py-8 sm:py-12 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Content */}
            <div className="text-center lg:text-left lg:py-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight text-white">
                No demo call.<br />Just a real conversation.
              </h1>
              <p className="text-base sm:text-lg text-white/80 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10">
                Tell us where you are in your revenue journey. We&apos;ll tell you honestly whether we&apos;re the right fit. No pitch, no pressure.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-col gap-4 items-center lg:items-start">
                <span className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="text-white/90">Response within 24 hours</span>
                </span>
                <span className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="text-white/90">No pitch, no pressure</span>
                </span>
                <span className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="text-white/90">30-day guarantee applies</span>
                </span>
              </div>
            </div>

            {/* Right: Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-6 sm:p-8">
                <ContactSalesForm />
              </div>
              <p className="text-xs text-white/50 text-center mt-4">
                We respect your privacy and will never share your information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
