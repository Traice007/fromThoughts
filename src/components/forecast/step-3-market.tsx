"use client";

import { useState } from "react";
import { Building2, Target, Users, Swords } from "lucide-react";
import type { MarketStepData } from "@/types/forecast";

interface Step3MarketProps {
  data: MarketStepData;
  onNext: (data: MarketStepData) => void;
  onBack: () => void;
}

const INDUSTRIES = [
  "Technology / SaaS",
  "Healthcare",
  "Financial Services",
  "Manufacturing",
  "Retail / E-commerce",
  "Professional Services",
  "Education",
  "Real Estate",
  "Media / Entertainment",
  "Other",
];

export function Step3Market({ data, onNext, onBack }: Step3MarketProps) {
  const [formData, setFormData] = useState<MarketStepData>(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Market & ICP Data</h2>
        <p className="mt-2 text-gray-600">
          Optional but helps us generate a more targeted roadmap
        </p>
      </div>

      <div className="space-y-6">
        {/* Industry */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Building2 className="inline h-4 w-4 mr-1 text-amber-600" />
            Industry
          </label>
          <select
            value={formData.industry || ""}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value || undefined })}
            className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all"
          >
            <option value="">Select your industry</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Target Market */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Target className="inline h-4 w-4 mr-1 text-amber-600" />
            Target Market
          </label>
          <textarea
            value={formData.targetMarket || ""}
            onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value || undefined })}
            placeholder="Describe your target market (e.g., Mid-market B2B SaaS companies in North America with 50-500 employees)"
            rows={3}
            className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all resize-none placeholder:text-gray-400"
          />
        </div>

        {/* Ideal Customer Profile */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Users className="inline h-4 w-4 mr-1 text-amber-600" />
            Ideal Customer Profile (ICP)
          </label>
          <textarea
            value={formData.idealCustomerProfile || ""}
            onChange={(e) => setFormData({ ...formData, idealCustomerProfile: e.target.value || undefined })}
            placeholder="Describe your ideal customer (e.g., VP of Sales or CRO at growing SaaS companies, struggling with scaling their sales team)"
            rows={3}
            className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all resize-none placeholder:text-gray-400"
          />
        </div>

        {/* Competitive Position */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Swords className="inline h-4 w-4 mr-1 text-amber-600" />
            Competitive Position
          </label>
          <textarea
            value={formData.competitivePosition || ""}
            onChange={(e) => setFormData({ ...formData, competitivePosition: e.target.value || undefined })}
            placeholder="Describe your competitive landscape and positioning (e.g., We compete with X and Y but differentiate on Z)"
            rows={3}
            className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all resize-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Skip hint */}
      <div className="text-center text-sm text-gray-500">
        <p>These fields are optional. You can skip them if you prefer.</p>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
        >
          ← Back
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onNext({})}
            className="px-6 py-4 text-gray-500 hover:text-gray-700 font-semibold transition-colors"
          >
            Skip
          </button>
          <button
            type="submit"
            className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/25 hover:shadow-xl"
          >
            Continue to Generate →
          </button>
        </div>
      </div>
    </form>
  );
}
