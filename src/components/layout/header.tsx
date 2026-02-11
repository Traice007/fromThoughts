"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown, MessageCircle } from "lucide-react";

export function Header() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-gray-200 text-gray-900"
          : "bg-slate-950/90 backdrop-blur-md border-slate-700/50 text-white"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-baseline text-2xl">
            <span
              className={`font-[family-name:var(--font-playfair)] italic font-normal transition-colors duration-300 ${
                scrolled ? "text-gray-600" : "text-white"
              }`}
            >
              from
            </span>
            <span className={`font-bold transition-colors duration-300 ${scrolled ? "text-[#1a1a1a]" : "text-white"}`}>Thoughts</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <Link
              href="/#features"
              className={`transition-colors ${
                scrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"
              }`}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className={`transition-colors ${
                scrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"
              }`}
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className={`transition-colors ${
                scrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                scrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="/lets-talk"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                scrolled
                  ? "border-amber-500/50 text-amber-600 hover:bg-amber-500/10 hover:border-amber-500"
                  : "border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400"
              }`}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Let&apos;s Talk
            </Link>

            {status === "loading" ? (
              <div className={`h-10 w-24 animate-pulse rounded-lg ${scrolled ? "bg-gray-200" : "bg-gray-700"}`} />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    scrolled ? "hover:bg-gray-100" : "hover:bg-gray-800"
                  }`}
                >
                  <div className="h-8 w-8 bg-amber-500/10 rounded-full flex items-center justify-center">
                    <User className={`h-4 w-4 ${scrolled ? "text-amber-600" : "text-amber-400"}`} />
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate">
                    {session.user?.name || session.user?.email}
                  </span>
                  <ChevronDown className={`h-4 w-4 ${scrolled ? "text-gray-400" : "text-gray-400"}`} />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-20 py-1 ${
                      scrolled
                        ? "bg-white border border-gray-200"
                        : "bg-gray-800 border border-gray-700"
                    }`}>
                      <Link
                        href="/dashboard"
                        className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                          scrolled ? "text-gray-600 hover:bg-gray-100" : "text-gray-300 hover:bg-gray-700"
                        }`}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors w-full text-left text-red-400 ${
                          scrolled ? "hover:bg-gray-100" : "hover:bg-gray-700"
                        }`}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className={`transition-colors ${
                    scrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Sign in
                </Link>
                <Link
                  href="/forecast"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all shadow-lg bg-amber-500 text-white hover:bg-amber-600"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 space-y-4 border-t ${scrolled ? "border-gray-200" : "border-gray-800"}`}>
            <Link
              href="/#features"
              className={`block transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className={`block transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className={`block transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`block transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/lets-talk"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium w-fit transition-all ${
                scrolled
                  ? "border-amber-500/50 text-amber-600 hover:bg-amber-500/10 hover:border-amber-500"
                  : "border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Let&apos;s Talk
            </Link>

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className={`block transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="block w-full text-left text-red-400 hover:text-red-300 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className={`block transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/forecast"
                  className="block w-full text-center rounded-lg px-4 py-2 text-sm font-medium transition-all shadow-lg bg-amber-500 text-white hover:bg-amber-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
