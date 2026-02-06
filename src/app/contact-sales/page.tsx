import type { Metadata } from "next";
import { Sparkles, Clock, Shield, Users } from "lucide-react";
import { ContactSalesForm } from "@/components/contact-sales/contact-sales-form";

export const metadata: Metadata = {
  title: "Let's Talk | FounderVision",
  description: "Get in touch with our team to discuss how FounderVision can help your organization hit its revenue targets.",
};

export default function ContactSalesPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Header */}
      <section className="relative py-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Enterprise
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight text-white">
              Let&apos;s Talk About Your Growth Goals
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Tell us a bit about your team and we&apos;ll get back to you within 24 hours to discuss how FounderVision can help.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-white/90">Response within 24h</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-white/90">No commitment required</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-white/90">Custom solutions</span>
            </span>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-16 -mt-4">
        <div className="absolute inset-0 bg-gray-50" />

        <div className="relative max-w-xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-8">
            <ContactSalesForm />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              We respect your privacy and will never share your information with third parties.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
