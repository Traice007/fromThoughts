"use client";

import { useState } from "react";
import { User, Mail, Globe, Users, MessageSquare, Loader2, CheckCircle, Sparkles } from "lucide-react";

const TEAM_SIZES = [
  { value: "1-5", label: "1-5 people" },
  { value: "6-15", label: "6-15 people" },
  { value: "16-50", label: "16-50 people" },
  { value: "51-200", label: "51-200 people" },
  { value: "200+", label: "200+ people" },
];

interface FormData {
  name: string;
  email: string;
  companyWebsite: string;
  teamSize: string;
  message: string;
}

export function ContactSalesForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyWebsite: "",
    teamSize: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.companyWebsite.trim()) {
      newErrors.companyWebsite = "Company website is required";
    } else if (!/^https?:\/\/.+\..+/.test(formData.companyWebsite) && !/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}/.test(formData.companyWebsite)) {
      newErrors.companyWebsite = "Please enter a valid URL (e.g. company.com)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-6">
          <CheckCircle className="h-8 w-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">We&apos;ll be in touch!</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Thanks for reaching out. A member of our team will get back to you within 24 hours to discuss your goals.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitError && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {submitError}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
          <User className="inline h-4 w-4 mr-1 text-amber-600" />
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Jane Smith"
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all placeholder:text-gray-400"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          <Mail className="inline h-4 w-4 mr-1 text-amber-600" />
          Work Email *
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@company.com"
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all placeholder:text-gray-400"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Company Website */}
      <div>
        <label htmlFor="companyWebsite" className="block text-sm font-semibold text-gray-700 mb-2">
          <Globe className="inline h-4 w-4 mr-1 text-amber-600" />
          Company Website *
        </label>
        <input
          id="companyWebsite"
          type="text"
          value={formData.companyWebsite}
          onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
          placeholder="company.com"
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all placeholder:text-gray-400"
          disabled={isSubmitting}
        />
        {errors.companyWebsite && (
          <p className="mt-1 text-sm text-red-600">{errors.companyWebsite}</p>
        )}
      </div>

      {/* Team Size */}
      <div>
        <label htmlFor="teamSize" className="block text-sm font-semibold text-gray-700 mb-2">
          <Users className="inline h-4 w-4 mr-1 text-amber-600" />
          Team Size
        </label>
        <select
          id="teamSize"
          value={formData.teamSize}
          onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all text-gray-700"
          disabled={isSubmitting}
        >
          <option value="">Select team size</option>
          {TEAM_SIZES.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          <MessageSquare className="inline h-4 w-4 mr-1 text-amber-600" />
          How can we help?
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your goals and what you're looking for..."
          rows={4}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:bg-white transition-all placeholder:text-gray-400 resize-none"
          disabled={isSubmitting}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/25 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Let&apos;s Talk
          </>
        )}
      </button>
    </form>
  );
}
