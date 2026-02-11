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
        <h2 className="text-2xl font-bold text-gray-900">Revenue Targets</h2>
        <p className="mt-2 text-gray-600">
          Tell us about your current revenue and where you want to be
        </p>
      </div>

      <div className="space-y-6">
        {/* Current Revenue */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <DollarSign className="inline h-4 w-4 mr-1 text-amber-600" />
            Current Annual Revenue (ARR)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
            <input
              type="number"
              value={formData.currentRevenue || ""}
              onChange={(e) => setFormData({ ...formData, currentRevenue: parseFloat(e.target.value) || 0 })}
              placeholder="1,500,000"
              className="w-full pl-10 pr-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all placeholder:text-gray-400"
            />
          </div>
          {errors.currentRevenue && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.currentRevenue}</p>
          )}
          {formData.currentRevenue > 0 && (
            <p className="mt-2 text-sm text-amber-600 font-medium">
              {formatCurrency(formData.currentRevenue)} ARR
            </p>
          )}
        </div>

        {/* Target Revenue */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Target className="inline h-4 w-4 mr-1 text-amber-600" />
            Target Annual Revenue (ARR)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
            <input
              type="number"
              value={formData.targetRevenue || ""}
              onChange={(e) => setFormData({ ...formData, targetRevenue: parseFloat(e.target.value) || 0 })}
              placeholder="3,000,000"
              className="w-full pl-10 pr-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all placeholder:text-gray-400"
            />
          </div>
          {errors.targetRevenue && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.targetRevenue}</p>
          )}
          {formData.targetRevenue > 0 && (
            <p className="mt-2 text-sm text-amber-600 font-medium">
              {formatCurrency(formData.targetRevenue)} ARR
            </p>
          )}
        </div>

        {/* Time Horizon */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <Calendar className="inline h-4 w-4 mr-1 text-amber-600" />
            Time Horizon
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIME_HORIZONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, timeHorizonMonths: option.value })}
                className={`px-4 py-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                  formData.timeHorizonMonths === option.value
                    ? "border-amber-500 bg-amber-50 text-amber-700 shadow-sm"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-gray-100"
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
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h3 className="font-semibold text-gray-900 mb-4">Growth Summary</h3>

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
            <div className="bg-white/60 rounded-lg p-3">
              <span className="text-gray-600 text-xs font-medium">Growth Multiple</span>
              <p className="text-xl font-bold text-amber-600">{growthMultiple.toFixed(1)}x</p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <span className="text-gray-600 text-xs font-medium">Monthly Rate</span>
              <p className="text-xl font-bold text-amber-600">{growthRate.toFixed(1)}%</p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <span className="text-gray-600 text-xs font-medium">Revenue Gap</span>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(formData.targetRevenue - formData.currentRevenue)}
              </p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <span className="text-gray-600 text-xs font-medium">Timeline</span>
              <p className="text-xl font-bold text-gray-900">{formData.timeHorizonMonths} months</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/25 hover:shadow-xl"
        >
          Continue to Metrics →
        </button>
      </div>
    </form>
  );
}
