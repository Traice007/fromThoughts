"use client";

import { useState } from "react";
import { Mail, Building, Sparkles, Loader2 } from "lucide-react";
import type { ContactStepData } from "@/types/forecast";

interface Step4EmailProps {
  data: ContactStepData;
  onSubmit: (data: ContactStepData) => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
}

export function Step4Email({ data, onSubmit, onBack, isSubmitting }: Step4EmailProps) {
  const [formData, setFormData] = useState<ContactStepData>(data);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Generate Your OKRs</h2>
        <p className="mt-2 text-secondary">
          Enter your email to receive OKRs based on data from 10,000+ companies
        </p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Mail className="inline h-4 w-4 mr-1" />
            Work Email *
          </label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@company.com"
            className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Building className="inline h-4 w-4 mr-1" />
            Company Name (optional)
          </label>
          <input
            type="text"
            value={formData.companyName || ""}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value || undefined })}
            placeholder="Acme Inc."
            className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* What you'll get */}
      <div className="bg-muted rounded-lg p-6 max-w-md mx-auto">
        <h3 className="font-semibold mb-3">What you&apos;ll receive:</h3>
        <ul className="space-y-2 text-sm text-secondary">
          <li className="flex items-start gap-2">
            <span className="text-accent">✓</span>
            4-6 data-driven OKRs based on 10,000+ companies in your industry
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">✓</span>
            Gap analysis identifying what&apos;s needed to hit your targets
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">✓</span>
            Actionable recommendations prioritized by impact
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">✓</span>
            Export to PDF or sync directly to your CRM
          </li>
        </ul>
      </div>

      <div className="flex justify-between max-w-md mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate OKRs
            </>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-secondary">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </a>
        . We&apos;ll never share your data.
      </p>
    </form>
  );
}
