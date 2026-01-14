"use client";

import { useState } from "react";
import { DollarSign, Target, Calendar } from "lucide-react";
import type { RevenueStepData } from "@/types/forecast";
import { formatCurrency, calculateGrowthRate } from "@/lib/utils";
import { GrowthChart } from "./growth-chart";

interface Step1RevenueProps {
  data: RevenueStepData;
  onNext: (data: RevenueStepData) => void;
}

const TIME_HORIZONS = [
  { value: 6, label: "6 months" },
  { value: 12, label: "12 months" },
  { value: 18, label: "18 months" },
  { value: 24, label: "24 months" },
];

export function Step1Revenue({ data, onNext }: Step1RevenueProps) {
  const [formData, setFormData] = useState<RevenueStepData>(data);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentRevenue || formData.currentRevenue <= 0) {
      newErrors.currentRevenue = "Please enter your current revenue";
    }
    if (!formData.targetRevenue || formData.targetRevenue <= 0) {
      newErrors.targetRevenue = "Please enter your target revenue";
    }
    if (formData.targetRevenue && formData.currentRevenue && formData.targetRevenue <= formData.currentRevenue) {
      newErrors.targetRevenue = "Target revenue should be higher than current revenue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData);
    }
  };

  const growthRate = formData.currentRevenue && formData.targetRevenue && formData.timeHorizonMonths
    ? calculateGrowthRate(formData.currentRevenue, formData.targetRevenue, formData.timeHorizonMonths)
    : 0;

  const growthMultiple = formData.targetRevenue && formData.currentRevenue
    ? formData.targetRevenue / formData.currentRevenue
    : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Revenue Targets</h2>
        <p className="mt-2 text-secondary">
          Tell us about your current revenue and where you want to be
        </p>
      </div>

      <div className="space-y-6">
        {/* Current Revenue */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <DollarSign className="inline h-4 w-4 mr-1" />
            Current Annual Revenue (ARR)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">$</span>
            <input
              type="number"
              value={formData.currentRevenue || ""}
              onChange={(e) => setFormData({ ...formData, currentRevenue: parseFloat(e.target.value) || 0 })}
              placeholder="1,500,000"
              className="w-full pl-8 pr-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {errors.currentRevenue && (
            <p className="mt-1 text-sm text-destructive">{errors.currentRevenue}</p>
          )}
          {formData.currentRevenue > 0 && (
            <p className="mt-1 text-sm text-secondary">
              {formatCurrency(formData.currentRevenue)} ARR
            </p>
          )}
        </div>

        {/* Target Revenue */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Target className="inline h-4 w-4 mr-1" />
            Target Annual Revenue (ARR)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">$</span>
            <input
              type="number"
              value={formData.targetRevenue || ""}
              onChange={(e) => setFormData({ ...formData, targetRevenue: parseFloat(e.target.value) || 0 })}
              placeholder="3,000,000"
              className="w-full pl-8 pr-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {errors.targetRevenue && (
            <p className="mt-1 text-sm text-destructive">{errors.targetRevenue}</p>
          )}
          {formData.targetRevenue > 0 && (
            <p className="mt-1 text-sm text-secondary">
              {formatCurrency(formData.targetRevenue)} ARR
            </p>
          )}
        </div>

        {/* Time Horizon */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Calendar className="inline h-4 w-4 mr-1" />
            Time Horizon
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIME_HORIZONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, timeHorizonMonths: option.value })}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  formData.timeHorizonMonths === option.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-secondary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {formData.currentRevenue > 0 && formData.targetRevenue > 0 && (
        <div className="bg-muted rounded-lg p-6">
          <h3 className="font-semibold mb-4">Growth Summary</h3>

          {/* Growth Chart */}
          <div className="mb-6">
            <GrowthChart
              currentRevenue={formData.currentRevenue}
              targetRevenue={formData.targetRevenue}
              months={formData.timeHorizonMonths}
              monthlyGrowthRate={growthRate}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-secondary">Growth Multiple</span>
              <p className="text-lg font-semibold text-primary">{growthMultiple.toFixed(1)}x</p>
            </div>
            <div>
              <span className="text-secondary">Monthly Rate</span>
              <p className="text-lg font-semibold text-primary">{growthRate.toFixed(1)}%</p>
            </div>
            <div>
              <span className="text-secondary">Revenue Gap</span>
              <p className="text-lg font-semibold">
                {formatCurrency(formData.targetRevenue - formData.currentRevenue)}
              </p>
            </div>
            <div>
              <span className="text-secondary">Timeline</span>
              <p className="text-lg font-semibold">{formData.timeHorizonMonths} months</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          Continue to Metrics
        </button>
      </div>
    </form>
  );
}
