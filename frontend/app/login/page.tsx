"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GoogleIcon,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "@/components/icons";

export default function LoginPage() {
  const router = useRouter();
  const [authState, setAuthState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleGoogleSignIn = () => {
    setAuthState("loading");
    setErrorMessage("");

    // Simulate authentication transition
    setTimeout(() => {
      try {
        setAuthState("success");
        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
      } catch {
        setAuthState("error");
        setErrorMessage("Unable to connect with Google authentication service. Please try again.");
      }
    }, 1100);
  };

  const handleRetry = () => {
    setAuthState("idle");
    setErrorMessage("");
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFBFC] text-[#0F172A] flex flex-col justify-between relative overflow-hidden selection:bg-[#00A3FF] selection:text-white ambient-wave-bg">
      {/* Background Subtle Light Grid Texture */}
      <div className="pointer-events-none absolute inset-0 light-grid opacity-60 z-0" aria-hidden="true" />

      {/* Top Header */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none"
          aria-label="PropFlow Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#00A3FF] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
            PropFlow
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#00A3FF] transition-colors py-1.5 px-3 rounded-full hover:bg-slate-100/80 border border-transparent hover:border-slate-200"
        >
          <span>Back to Home</span>
          <ArrowRight size={13} />
        </Link>
      </header>

      {/* Centered Minimalist Sign In Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-12 my-auto flex flex-col items-center">
        
        {/* Sign In Card */}
        <div className="w-full rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xl card-light-shadow relative">
          
          {/* Subtle Top Cyan Accent Bar */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent" />

          {/* Card Header */}
          <div className="space-y-2 mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
              Sign in to PropFlow
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Access your real estate CRM dashboard and AI workspace
            </p>
          </div>

          {/* Authentication Actions */}
          <div className="space-y-4">
            
            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={authState === "loading" || authState === "success"}
              className={`w-full relative group flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                authState === "loading"
                  ? "bg-slate-100 text-slate-500 border border-slate-200 cursor-wait"
                  : authState === "success"
                  ? "bg-emerald-600 text-white border border-emerald-600 shadow-md"
                  : "bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF]"
              }`}
              aria-label="Continue with Google"
            >
              {authState === "loading" ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-[#00A3FF]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-slate-700 font-medium tracking-wide">
                    Connecting to Google...
                  </span>
                </>
              ) : authState === "success" ? (
                <>
                  <CheckCircle2 size={19} className="text-white" />
                  <span className="font-semibold tracking-wide">Authenticated. Redirecting...</span>
                </>
              ) : (
                <>
                  <GoogleIcon size={19} />
                  <span className="font-semibold text-slate-800">
                    Continue with Google
                  </span>
                </>
              )}
            </button>

            {/* Error State Banner */}
            {authState === "error" && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
                <AlertCircle size={16} className="text-rose-600 mt-0.5 shrink-0" />
                <div className="flex-1 space-y-1">
                  <p className="font-semibold">Unable to sign in.</p>
                  <p className="text-rose-600">{errorMessage || "Please try again or contact support."}</p>
                </div>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="text-rose-700 underline font-semibold hover:text-rose-900 shrink-0"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Legal / Policy Note */}
            <div className="pt-2 text-center">
              <p className="text-[12px] text-slate-400 leading-relaxed">
                By continuing, you agree to PropFlow&apos;s{" "}
                <a
                  href="#"
                  className="text-slate-600 hover:text-[#00A3FF] underline underline-offset-2 transition-colors"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-slate-600 hover:text-[#00A3FF] underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

          </div>

          {/* Switcher: New user link */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>New to PropFlow?</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[#00A3FF] hover:text-[#0090E0] font-semibold transition-colors group focus-visible:outline-none focus-visible:underline"
            >
              <span>Get Started</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Security Verification Badge */}
          <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <ShieldCheck size={14} className="text-[#00A3FF]" />
            <span>256-Bit SSL Encrypted Session</span>
          </div>

        </div>

      </div>

      {/* Bottom Subtle Footer */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 border-t border-slate-200/80">
        <div>
          © {new Date().getFullYear()} PropFlow Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <Link href="/" className="hover:text-[#00A3FF] transition-colors">Home</Link>
          <span>•</span>
          <span className="hover:text-[#00A3FF] transition-colors cursor-pointer">Security Overview</span>
          <span>•</span>
          <span className="hover:text-[#00A3FF] transition-colors cursor-pointer">Support</span>
        </div>
      </footer>
    </main>
  );
}
