import type { Metadata } from "next";
import { Sparkles, Clock, Shield, Users } from "lucide-react";
import { ContactSalesForm } from "@/components/contact-sales/contact-sales-form";

export const metadata: Metadata = {
  title: "Let's Talk | FounderVision",
  description: "Get in touch with our team to discuss how FounderVision can help your organization hit its revenue targets.",
};

export default function ContactSalesPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative py-8 sm:py-12 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Content */}
            <div className="text-center lg:text-left lg:py-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm font-medium mb-6 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Let&apos;s Talk
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight text-white">
                Tell Us About Your Growth Goals
              </h1>
              <p className="text-base sm:text-lg text-white/90 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8">
                Share a bit about your team and we&apos;ll get back to you within 24 hours to discuss how FounderVision can help.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 items-center lg:items-start">
                <span className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-white/90">Response within 24 hours</span>
                </span>
                <span className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-white/90">No commitment required</span>
                </span>
                <span className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-white/90">Custom solutions available</span>
                </span>
              </div>
            </div>

            {/* Right: Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-6 sm:p-8">
                <ContactSalesForm />
              </div>
              <p className="text-xs text-white/70 text-center mt-4">
                We respect your privacy and will never share your information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
