import type { Metadata } from "next";
import { FileText, AlertCircle, CreditCard, Scale, Mail, Globe } from "lucide-react";

export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  title: "Terms of Service | fromThoughts",
  description: "Terms of Service for fromThoughts - AI-powered revenue operations platform",
};

export default function TermsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-secondary">Last updated: January 14, 2026</p>
        </div>

        {/* Important Notice */}
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-warning">Please Read Carefully</p>
              <p className="text-secondary text-sm mt-1">
                These Terms of Service constitute a legally binding agreement between you and fromThoughts Inc.
                By using our service, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
              Acceptance of Terms
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed">
                By accessing or using fromThoughts (&quot;Service&quot;), you agree to be bound by these Terms of Service
                (&quot;Terms&quot;). These Terms apply to all visitors, users, and others who access or use the Service.
                If you disagree with any part of these terms, you may not access the Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
              Description of Service
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed mb-4">
                fromThoughts provides a revenue operations platform that offers:
              </p>
              <ul className="space-y-2 text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Revenue forecasting tools based on your business metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Data-driven OKR generation based on industry benchmark data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Gap analysis and strategic recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>CRM integrations with HubSpot and Pipedrive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Export capabilities (PDF, CSV)</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
              User Accounts and Responsibilities
            </h2>
            <div className="pl-10 space-y-4">
              <p className="text-secondary leading-relaxed">
                When using fromThoughts, you agree to:
              </p>
              <ul className="space-y-2 text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Provide accurate, current, and complete information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Use the Service only for lawful business purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Maintain the confidentiality of your account credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Notify us immediately of any unauthorized access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Take responsibility for all activities under your account</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
              Prohibited Uses
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed mb-4">
                You may not use the Service to:
              </p>
              <ul className="space-y-2 text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Violate any applicable laws or regulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Attempt to gain unauthorized access to our systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Reverse engineer, decompile, or disassemble the Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Transmit malware, viruses, or other harmful code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Interfere with or disrupt the Service&apos;s functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Resell or redistribute the Service without authorization</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">5</span>
              Subscription and Payments
            </h2>
            <div className="pl-10 space-y-4">
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">Billing</h3>
                  <p className="text-secondary text-sm">
                    Subscription fees are billed in advance on a monthly or annual basis depending on your chosen plan.
                    You authorize us to charge your payment method for all fees when due.
                  </p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-2">Refund Policy</h3>
                <p className="text-secondary text-sm">
                  We offer a 14-day money-back guarantee for all paid plans. If you&apos;re not satisfied within the first
                  14 days of your subscription, contact us for a full refund. After 14 days, fees are non-refundable.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Cancellation</h3>
                <p className="text-secondary text-sm">
                  You may cancel your subscription at any time. Access continues until the end of your current billing period.
                  No refunds are provided for partial billing periods.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">6</span>
              Intellectual Property
            </h2>
            <div className="pl-10 space-y-4">
              <div>
                <h3 className="font-medium mb-2">Our Intellectual Property</h3>
                <p className="text-secondary text-sm">
                  The Service and its original content, features, and functionality are owned by fromThoughts Inc. and are
                  protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Your Content</h3>
                <p className="text-secondary text-sm">
                  You retain all rights to the data and content you input into the Service. By using the Service, you grant
                  us a limited license to process your data solely for the purpose of providing the Service to you.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">7</span>
              Third-Party Integrations
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed">
                fromThoughts integrates with third-party services including HubSpot and Pipedrive. Your use of these integrations
                is subject to their respective terms of service and privacy policies. We are not responsible for the practices
                of third-party services. When you authorize a CRM connection, you grant us permission to access and modify
                data in that service on your behalf, limited to the functionality described in our Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">8</span>
              Disclaimer of Warranties
            </h2>
            <div className="pl-10">
              <div className="bg-muted rounded-lg p-4 border-l-4 border-warning">
                <p className="text-secondary text-sm leading-relaxed">
                  THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                  OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. THE OKRs
                  AND RECOMMENDATIONS GENERATED ARE SUGGESTIONS BASED ON DATA ANALYSIS AND INDUSTRY BENCHMARKS. WE DO
                  NOT GUARANTEE SPECIFIC BUSINESS OUTCOMES. YOU ARE SOLELY RESPONSIBLE FOR EVALUATING AND IMPLEMENTING
                  ANY RECOMMENDATIONS.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">9</span>
              Limitation of Liability
            </h2>
            <div className="pl-10">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-secondary text-sm leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, VIRTUALVP INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY
                  OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR
                  ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD
                  PARTY ON THE SERVICE; (C) ANY CONTENT OBTAINED FROM THE SERVICE; OR (D) UNAUTHORIZED ACCESS, USE, OR
                  ALTERATION OF YOUR TRANSMISSIONS OR CONTENT. IN NO EVENT SHALL OUR AGGREGATE LIABILITY EXCEED THE AMOUNT
                  YOU PAID US, IF ANY, IN THE PAST SIX MONTHS FOR THE SERVICE.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">10</span>
              Indemnification
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed">
                You agree to indemnify, defend, and hold harmless fromThoughts Inc., its officers, directors, employees, and
                agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable
                attorneys&apos; fees, arising out of or in any way connected with: (a) your access to or use of the Service;
                (b) your violation of these Terms; (c) your violation of any third-party rights; or (d) your content.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">11</span>
              Termination
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed">
                We may terminate or suspend your access to the Service immediately, without prior notice or liability,
                for any reason, including breach of these Terms. Upon termination, your right to use the Service will
                immediately cease. You may also terminate your account at any time by contacting us. All provisions
                of these Terms which should survive termination shall survive, including ownership provisions,
                warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">12</span>
              Governing Law and Dispute Resolution
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware,
                United States, without regard to its conflict of law provisions.
              </p>
              <p className="text-secondary leading-relaxed">
                Any disputes arising out of or relating to these Terms or the Service shall first be attempted to be
                resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through
                binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">13</span>
              Changes to Terms
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of material changes
                by posting the updated Terms on this page and updating the &quot;Last updated&quot; date. Your continued
                use of the Service after changes become effective constitutes acceptance of the revised Terms.
                If you do not agree to the new terms, please stop using the Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">14</span>
              Severability
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed">
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed
                and interpreted to accomplish the objectives of such provision to the greatest extent possible under
                applicable law, and the remaining provisions will continue in full force and effect.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">15</span>
              Contact Us
            </h2>
            <div className="pl-10">
              <p className="text-secondary mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-muted rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:legal@fromthoughts.com" className="text-primary hover:underline">legal@fromthoughts.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-secondary">fromThoughts Inc.</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-secondary text-sm">
            By using fromThoughts, you acknowledge that you have read and understood these Terms of Service
            and agree to be bound by them.
          </p>
        </div>
      </div>
    </div>
  );
}
