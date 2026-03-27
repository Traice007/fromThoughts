"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, User, Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";

function PasswordRequirement({ met, label }: { met: boolean; label: string }) {
  return (
    <li className={`flex items-center gap-1.5 text-xs transition-colors ${met ? "text-green-600" : "text-gray-400"}`}>
      <CheckCircle className={`h-3.5 w-3.5 flex-shrink-0 ${met ? "text-green-600" : "text-gray-300"}`} />
      {label}
    </li>
  );
}

function passwordMeetsRequirements(pw: string) {
  return {
    minLength: pw.length >= 8,
    hasUpper: /[A-Z]/.test(pw),
    hasLower: /[a-z]/.test(pw),
    hasNumber: /[0-9]/.test(pw),
    hasSpecial: /[^A-Za-z0-9]/.test(pw),
  };
}

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const claimForecastId = searchParams.get("claim");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reqs = passwordMeetsRequirements(password);
  const allReqsMet = Object.values(reqs).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!allReqsMet) {
      setError("Password does not meet all requirements.");
      setIsLoading(false);
      return;
    }

    try {
      // Register the user
      const registerRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(registerData.error || "Registration failed");
        setIsLoading(false);
        return;
      }

      // Redirect to verification page
      router.push("/auth/verify");
    } catch {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-secondary">Start tracking your revenue roadmap</p>
        </div>

        <div className="bg-background border border-border rounded-xl p-8 shadow-sm">
          {claimForecastId && (
            <div role="status" className="flex items-center gap-2 p-3 mb-6 bg-green-50 dark:bg-green-950/30 text-green-600 rounded-lg text-sm">
              <CheckCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <p>Your roadmap will be saved to your new account</p>
            </div>
          )}

          {error && (
            <div role="alert" className="flex items-center gap-2 p-3 mb-6 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-lg text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" aria-hidden="true" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Work Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  aria-describedby="passwordRequirements"
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Password requirements */}
              {password.length > 0 && (
                <ul id="passwordRequirements" className="mt-2 space-y-1 pl-1" aria-label="Password requirements">
                  <PasswordRequirement met={reqs.minLength} label="At least 8 characters" />
                  <PasswordRequirement met={reqs.hasUpper} label="One uppercase letter" />
                  <PasswordRequirement met={reqs.hasLower} label="One lowercase letter" />
                  <PasswordRequirement met={reqs.hasNumber} label="One number" />
                  <PasswordRequirement met={reqs.hasSpecial} label="One special character" />
                </ul>
              )}
              {password.length === 0 && (
                <p id="passwordRequirements" className="text-xs text-secondary mt-1">
                  Min. 8 chars, uppercase, lowercase, number &amp; special character
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="text-xs text-secondary text-center mt-4">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
          </p>

          <div className="mt-6 text-center text-sm">
            <span className="text-secondary">Already have an account? </span>
            <Link
              href={`/auth/signin${callbackUrl !== "/dashboard" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Trial info */}
        <div className="mt-6 text-center text-sm text-secondary">
          <p>30 days of full access • 14-day money-back guarantee</p>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <SignUpForm />
    </Suspense>
  );
}
