"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle, XCircle, Mail } from "lucide-react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<"loading" | "success" | "error" | "pending">(
    token && email ? "loading" : "pending"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!token || !email) {
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`);
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          // Redirect to signin after 3 seconds
          setTimeout(() => {
            router.push("/auth/signin?verified=true");
          }, 3000);
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Verification failed");
        }
      } catch {
        setStatus("error");
        setErrorMessage("An error occurred during verification");
      }
    };

    verifyEmail();
  }, [token, email, router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md text-center">
        {status === "pending" && (
          <div className="bg-background border border-border rounded-xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Check your email</h1>
            <p className="text-secondary mb-6">
              We&apos;ve sent a verification link to your email address. Click the link to verify your account.
            </p>
            <p className="text-sm text-secondary">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                try signing up again
              </Link>
            </p>
          </div>
        )}

        {status === "loading" && (
          <div className="bg-background border border-border rounded-xl p-8 shadow-sm">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
            <p className="text-secondary">Please wait while we verify your email address.</p>
          </div>
        )}

        {status === "success" && (
          <div className="bg-background border border-border rounded-xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Email verified!</h1>
            <p className="text-secondary mb-6">
              Your email has been verified successfully. You can now sign in to your account.
            </p>
            <Link
              href="/auth/signin"
              className="inline-block w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign in to your account
            </Link>
            <p className="text-sm text-secondary mt-4">
              Redirecting you automatically...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-background border border-border rounded-xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Verification failed</h1>
            <p className="text-secondary mb-6">{errorMessage}</p>
            <div className="space-y-3">
              <Link
                href="/auth/signup"
                className="inline-block w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Sign up again
              </Link>
              <Link
                href="/auth/signin"
                className="inline-block w-full py-3 border border-border font-medium rounded-lg hover:bg-muted transition-colors"
              >
                Back to sign in
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
