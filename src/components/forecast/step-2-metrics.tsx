"use client";

import { useState, useEffect } from "react";
import { Users, TrendingUp, ArrowRight, DollarSign, Clock, Calculator } from "lucide-react";
import type { MetricsStepData } from "@/types/forecast";

interface Step2MetricsProps {
  data: MetricsStepData;
  onNext: (data: MetricsStepData) => void;
  onBack: () => void;
}

export function Step2Metrics({ data, onNext, onBack }: Step2MetricsProps) {
  const [formData, setFormData] = useState<MetricsStepData>(data);

  // Auto-calculate conversion rates when funnel volumes change
  useEffect(() => {
    const mqls = formData.monthlyInboundLeads;
    const sqls = formData.marketingQualifiedAccounts;
    const opportunities = formData.salesQualifiedLeads;

    const updates: Partial<MetricsStepData> = {};

    // MQL → SQL rate
    if (mqls && sqls && mqls > 0) {
      const rate = Math.round((sqls / mqls) * 100 * 10) / 10;
      if (rate !== formData.leadToMqaRate) {
        updates.leadToMqaRate = rate;
      }
    }

    // SQL → Opportunity rate
    if (sqls && opportunities && sqls > 0) {
      const rate = Math.round((opportunities / sqls) * 100 * 10) / 10;
      if (rate !== formData.mqaToSqlRate) {
        updates.mqaToSqlRate = rate;
      }
    }

    if (Object.keys(updates).length > 0) {
      setFormData(prev => ({ ...prev, ...updates }));
    }
  }, [formData.monthlyInboundLeads, formData.marketingQualifiedAccounts, formData.salesQualifiedLeads]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  // Check if rates are auto-calculated
  const isRateAutoCalculated = (rateType: 'mqlToSql' | 'sqlToOpp'): boolean => {
    if (rateType === 'mqlToSql') {
      return !!(formData.monthlyInboundLeads && formData.marketingQualifiedAccounts);
    }
    return !!(formData.marketingQualifiedAccounts && formData.salesQualifiedLeads);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Leading & Lagging Metrics</h2>
        <p className="mt-2 text-gray-600">
          Share your current funnel metrics so we can identify gaps and opportunities
        </p>
      </div>

      <div className="space-y-8">
        {/* Funnel Metrics */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-amber-600" />
            Funnel Volume (Monthly)
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                MQLs per Month
              </label>
              <input
                type="number"
                value={formData.monthlyInboundLeads || ""}
                onChange={(e) => setFormData({ ...formData, monthlyInboundLeads: parseInt(e.target.value) || undefined })}
                placeholder="e.g., 500"
                className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all placeholder:text-gray-400"
              />
              <p className="mt-2 text-xs text-gray-500 font-medium">Marketing Qualified Leads</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                SQLs per Month
              </label>
              <input
                type="number"
                value={formData.marketingQualifiedAccounts || ""}
                onChange={(e) => setFormData({ ...formData, marketingQualifiedAccounts: parseInt(e.target.value) || undefined })}
                placeholder="e.g., 100"
                className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all placeholder:text-gray-400"
              />
              <p className="mt-2 text-xs text-gray-500 font-medium">Sales Qualified Leads</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sales Opportunities
              </label>
              <input
                type="number"
                value={formData.salesQualifiedLeads || ""}
                onChange={(e) => setFormData({ ...formData, salesQualifiedLeads: parseInt(e.target.value) || undefined })}
                placeholder="e.g., 30"
                className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all placeholder:text-gray-400"
              />
              <p className="mt-2 text-xs text-gray-500 font-medium">Active pipeline opportunities</p>
            </div>
          </div>
        </div>

        {/* Conversion Rates */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-amber-600" />
            Conversion Rates
            {(isRateAutoCalculated('mqlToSql') || isRateAutoCalculated('sqlToOpp')) && (
              <span className="text-xs font-medium text-amber-600 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                <Calculator className="h-3 w-3" />
                Auto-calculated
              </span>
            )}
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                MQL → SQL Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={formData.leadToMqaRate || ""}
                  onChange={(e) => setFormData({ ...formData, leadToMqaRate: parseFloat(e.target.value) || undefined })}
                  placeholder="e.g., 20"
                  readOnly={isRateAutoCalculated('mqlToSql')}
                  className={`w-full px-4 py-4 text-lg font-medium border-2 rounded-xl transition-all placeholder:text-gray-400 ${
                    isRateAutoCalculated('mqlToSql')
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'text-gray-900 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white'
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
              </div>
              {isRateAutoCalculated('mqlToSql') && (
                <p className="mt-2 text-xs text-amber-600 font-medium">Calculated from funnel</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                SQL → Opportunity Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={formData.mqaToSqlRate || ""}
                  onChange={(e) => setFormData({ ...formData, mqaToSqlRate: parseFloat(e.target.value) || undefined })}
                  placeholder="e.g., 30"
                  readOnly={isRateAutoCalculated('sqlToOpp')}
                  className={`w-full px-4 py-4 text-lg font-medium border-2 rounded-xl transition-all placeholder:text-gray-400 ${
                    isRateAutoCalculated('sqlToOpp')
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'text-gray-900 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white'
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
              </div>
              {isRateAutoCalculated('sqlToOpp') && (
                <p className="mt-2 text-xs text-amber-600 font-medium">Calculated from funnel</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Opportunity → Close Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={formData.sqlToCloseRate || ""}
                  onChange={(e) => setFormData({ ...formData, sqlToCloseRate: parseFloat(e.target.value) || undefined })}
                  placeholder="e.g., 25"
                  className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all placeholder:text-gray-400"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
              </div>
              <p className="mt-2 text-xs text-gray-500 font-medium">Connect HubSpot or Pipedrive to auto-fill</p>
            </div>
          </div>
        </div>

        {/* Deal Metrics */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-amber-600" />
            Deal Metrics
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Average Deal Size
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  type="number"
                  value={formData.averageDealSize || ""}
                  onChange={(e) => setFormData({ ...formData, averageDealSize: parseFloat(e.target.value) || undefined })}
                  placeholder="e.g., 25000"
                  className="w-full pl-10 pr-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all placeholder:text-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <Clock className="h-4 w-4 text-amber-600" />
                Sales Cycle Length (days)
              </label>
              <input
                type="number"
                value={formData.salesCycleLength || ""}
                onChange={(e) => setFormData({ ...formData, salesCycleLength: parseInt(e.target.value) || undefined })}
                placeholder="e.g., 45"
                className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Visual Funnel Preview */}
      {(formData.monthlyInboundLeads || formData.marketingQualifiedAccounts || formData.salesQualifiedLeads) && (
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h3 className="font-semibold text-gray-900 mb-4">Your Funnel Preview</h3>
          <div className="flex items-center justify-center gap-4 text-sm">
            {formData.monthlyInboundLeads && (
              <>
                <div className="text-center bg-white/60 rounded-lg p-3 min-w-[80px]">
                  <p className="text-2xl font-bold text-amber-600">{formData.monthlyInboundLeads}</p>
                  <p className="text-gray-600 font-medium">MQLs</p>
                </div>
                <ArrowRight className="h-5 w-5 text-amber-400" />
              </>
            )}
            {formData.marketingQualifiedAccounts && (
              <>
                <div className="text-center bg-white/60 rounded-lg p-3 min-w-[80px]">
                  <p className="text-2xl font-bold text-amber-600">{formData.marketingQualifiedAccounts}</p>
                  <p className="text-gray-600 font-medium">SQLs</p>
                </div>
                <ArrowRight className="h-5 w-5 text-amber-400" />
              </>
            )}
            {formData.salesQualifiedLeads && (
              <div className="text-center bg-white/60 rounded-lg p-3 min-w-[80px]">
                <p className="text-2xl font-bold text-amber-600">{formData.salesQualifiedLeads}</p>
                <p className="text-gray-600 font-medium">Opportunities</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/25 hover:shadow-xl"
        >
          Continue to Market Info →
        </button>
      </div>
    </form>
  );
}
