"use client";

import { useState } from "react";
import { Mail, Building, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mb-4 shadow-lg shadow-emerald-500/30">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Generate Your Roadmap</h2>
        <p className="mt-2 text-gray-600">
          Enter your email to receive your revenue roadmap based on data from 10,000+ companies
        </p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="inline h-4 w-4 mr-1 text-emerald-600" />
            Work Email *
          </label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@company.com"
            className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:bg-white transition-all placeholder:text-gray-400"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Building className="inline h-4 w-4 mr-1 text-emerald-600" />
            Company Name (optional)
          </label>
          <input
            type="text"
            value={formData.companyName || ""}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value || undefined })}
            placeholder="Acme Inc."
            className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:bg-white transition-all placeholder:text-gray-400"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* What you'll get */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 max-w-md mx-auto border border-emerald-100">
        <h3 className="font-semibold text-gray-900 mb-4">What you&apos;ll receive:</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">4-6 strategic objectives based on 10,000+ companies in your industry</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Gap analysis identifying what&apos;s needed to hit your targets</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Actionable recommendations prioritized by impact</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Export to PDF or sync directly to your CRM</span>
          </li>
        </ul>
      </div>

      <div className="flex justify-between max-w-md mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          disabled={isSubmitting}
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Roadmap
            </>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-gray-500">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-gray-700 transition-colors">
          Privacy Policy
        </a>
        . We&apos;ll never share your data.
      </p>
    </form>
  );
}
