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
        <h2 className="text-2xl font-bold">Market & ICP Data</h2>
        <p className="mt-2 text-secondary">
          Optional but helps us generate more targeted OKRs
        </p>
      </div>

      <div className="space-y-6">
        {/* Industry */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Building2 className="inline h-4 w-4 mr-1" />
            Industry
          </label>
          <select
            value={formData.industry || ""}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value || undefined })}
            className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background"
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
          <label className="block text-sm font-medium mb-2">
            <Target className="inline h-4 w-4 mr-1" />
            Target Market
          </label>
          <textarea
            value={formData.targetMarket || ""}
            onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value || undefined })}
            placeholder="Describe your target market (e.g., Mid-market B2B SaaS companies in North America with 50-500 employees)"
            rows={3}
            className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>

        {/* Ideal Customer Profile */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Users className="inline h-4 w-4 mr-1" />
            Ideal Customer Profile (ICP)
          </label>
          <textarea
            value={formData.idealCustomerProfile || ""}
            onChange={(e) => setFormData({ ...formData, idealCustomerProfile: e.target.value || undefined })}
            placeholder="Describe your ideal customer (e.g., VP of Sales or CRO at growing SaaS companies, struggling with scaling their sales team)"
            rows={3}
            className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>

        {/* Competitive Position */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Swords className="inline h-4 w-4 mr-1" />
            Competitive Position
          </label>
          <textarea
            value={formData.competitivePosition || ""}
            onChange={(e) => setFormData({ ...formData, competitivePosition: e.target.value || undefined })}
            placeholder="Describe your competitive landscape and positioning (e.g., We compete with X and Y but differentiate on Z)"
            rows={3}
            className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>
      </div>

      {/* Skip hint */}
      <div className="text-center text-sm text-secondary">
        <p>These fields are optional. You can skip them if you prefer.</p>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
        >
          Back
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onNext({})}
            className="px-6 py-3 text-secondary hover:text-foreground transition-colors"
          >
            Skip
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}
