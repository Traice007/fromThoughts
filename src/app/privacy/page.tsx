import type { Metadata } from "next";
import { Shield, Lock, Eye, Database, Mail, Globe } from "lucide-react";

export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  title: "Privacy Policy | fromThoughts",
  description: "Privacy Policy for fromThoughts - How we collect, use, and protect your data",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-secondary">Last updated: January 14, 2026</p>
        </div>

        {/* Quick Summary */}
        <div className="bg-muted rounded-xl p-6 mb-12">
          <h2 className="font-semibold mb-4">Privacy at a Glance</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Your data is encrypted</p>
                <p className="text-secondary">In transit and at rest</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Eye className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">We never sell your data</p>
                <p className="text-secondary">Your info stays yours</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Delete anytime</p>
                <p className="text-secondary">Full control over your data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
              Introduction
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed">
                fromThoughts (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you use our revenue forecasting and OKR generation service. By using fromThoughts, you agree
                to the collection and use of information in accordance with this policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
              Information We Collect
            </h2>
            <div className="pl-10 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">2.1 Information You Provide Directly</h3>
                <ul className="space-y-2 text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Contact Information:</strong> Email address and company name when you generate a forecast</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Business Metrics:</strong> Revenue data, funnel metrics, conversion rates, deal sizes, and market information you input into our forecasting tool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>CRM Authorization:</strong> If you choose to connect HubSpot or Pipedrive, we receive OAuth tokens to access your CRM on your behalf</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">2.2 Automatically Collected Information</h3>
                <ul className="space-y-2 text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Usage Data:</strong> Pages visited, features used, time spent, and interactions with our service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Analytics:</strong> Aggregated and anonymized statistics via Google Analytics to improve our service</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
              How We Use Your Information
            </h2>
            <div className="pl-10">
              <p className="text-secondary mb-4">We use the information we collect to:</p>
              <ul className="space-y-2 text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Generate personalized OKRs and strategic recommendations based on your business data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Compare your metrics against industry benchmarks from our database of 10,000+ companies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Send you your forecast results and relevant service updates via email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Sync your OKRs to your CRM platforms (only with your explicit authorization)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Improve our algorithms, develop new features, and enhance user experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Respond to your inquiries and provide customer support</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
              Data Sharing and Disclosure
            </h2>
            <div className="pl-10">
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-4">
                <p className="font-medium text-accent">We do not sell your personal information. Ever.</p>
              </div>
              <p className="text-secondary mb-4">We may share your information only in these limited circumstances:</p>
              <ul className="space-y-2 text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Service Providers:</strong> Third-party vendors who assist in operating our service (cloud hosting, email delivery, analytics) under strict confidentiality agreements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>CRM Platforms:</strong> HubSpot and Pipedrive, only when you explicitly authorize the OAuth connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Legal Requirements:</strong> When required by law, subpoena, or to protect our rights and safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (you will be notified)</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">5</span>
              Data Security
            </h2>
            <div className="pl-10">
              <p className="text-secondary mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <Lock className="h-5 w-5 text-primary mb-2" />
                  <p className="font-medium text-sm">Encryption</p>
                  <p className="text-secondary text-sm">TLS 1.3 in transit, AES-256 at rest</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <Shield className="h-5 w-5 text-primary mb-2" />
                  <p className="font-medium text-sm">Access Controls</p>
                  <p className="text-secondary text-sm">Role-based access, MFA required</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <Database className="h-5 w-5 text-primary mb-2" />
                  <p className="font-medium text-sm">Secure Infrastructure</p>
                  <p className="text-secondary text-sm">SOC 2 compliant cloud providers</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <Eye className="h-5 w-5 text-primary mb-2" />
                  <p className="font-medium text-sm">Monitoring</p>
                  <p className="text-secondary text-sm">24/7 security monitoring and alerts</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">6</span>
              Data Retention
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed">
                We retain your forecast data for as long as your account is active or as needed to provide services.
                Forecasts and OKRs are retained for 24 months to allow you to reference historical data.
                You may request deletion of your data at any time by emailing{" "}
                <a href="mailto:privacy@fromthoughts.com" className="text-primary hover:underline">privacy@fromthoughts.com</a>.
                We will process deletion requests within 30 days.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">7</span>
              Your Rights
            </h2>
            <div className="pl-10">
              <p className="text-secondary mb-4">Depending on your location, you may have the following rights:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "Access", desc: "Request a copy of your data" },
                  { title: "Correction", desc: "Update inaccurate information" },
                  { title: "Deletion", desc: "Request removal of your data" },
                  { title: "Portability", desc: "Export your data in a standard format" },
                  { title: "Objection", desc: "Object to certain processing" },
                  { title: "Withdraw Consent", desc: "Revoke permissions at any time" },
                ].map((right) => (
                  <div key={right.title} className="flex items-start gap-2 text-secondary">
                    <span className="text-accent">✓</span>
                    <span><strong>{right.title}:</strong> {right.desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-secondary mt-4">
                To exercise these rights, contact us at{" "}
                <a href="mailto:privacy@fromthoughts.com" className="text-primary hover:underline">privacy@fromthoughts.com</a>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">8</span>
              Cookies and Tracking
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience and analyze usage:
              </p>
              <ul className="space-y-2 text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Essential Cookies:</strong> Required for the service to function (session management, security)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Analytics Cookies:</strong> Help us understand how you use our service (Google Analytics)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Preference Cookies:</strong> Remember your settings and preferences</span>
                </li>
              </ul>
              <p className="text-secondary mt-4">
                You can control cookies through your browser settings. Note that disabling certain cookies may affect functionality.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">9</span>
              International Data Transfers
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence.
                We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by
                relevant data protection authorities.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">10</span>
              Changes to This Policy
            </h2>
            <div className="pl-10">
              <p className="text-secondary leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of material changes by
                posting the new policy on this page, updating the &quot;Last updated&quot; date, and sending an email
                to registered users when required by law.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">11</span>
              Contact Us
            </h2>
            <div className="pl-10">
              <p className="text-secondary mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-muted rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:privacy@fromthoughts.com" className="text-primary hover:underline">privacy@fromthoughts.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-secondary">fromThoughts Inc.</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
