"use client";

import React, { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-100">
          {/* Left: Brand & Newsletter (Cols 1-5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00A3FF] flex items-center justify-center text-white font-bold text-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                PropFlow
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Stay Connected with PropFlow
            </p>

            {/* Newsletter Input */}
            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-4 pr-12 py-3 rounded-full bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00A3FF] transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-full bg-[#00A3FF] hover:bg-[#0090E0] text-white text-xs font-bold transition-all flex items-center justify-center shadow-sm"
                aria-label="Subscribe"
              >
                {subscribed ? "✓" : "→"}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-600 font-medium">
                Thank you for subscribing to PropFlow updates!
              </p>
            )}
          </div>

          {/* Right Columns (Cols 6-12) */}
          <div className="md:col-span-7 grid grid-cols-3 gap-8 text-xs sm:text-sm">
            {/* Column 1 */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                Company
              </h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#" className="hover:text-[#00A3FF] transition-colors">About</a></li>
                <li><a href="#features" className="hover:text-[#00A3FF] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#00A3FF] transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                Explore
              </h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#metrics" className="hover:text-[#00A3FF] transition-colors">Key Metrics</a></li>
                <li><a href="#features" className="hover:text-[#00A3FF] transition-colors">Executive Panel</a></li>
                <li><a href="#faq" className="hover:text-[#00A3FF] transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                Contact
              </h4>
              <ul className="space-y-2 text-slate-500">
                <li>+1 (555) 349-2104</li>
                <li className="text-[#00A3FF] font-medium truncate">support@propflow.ai</li>
                <li className="flex items-center gap-2 pt-1 text-slate-400">
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-[#00A3FF] hover:text-white transition-colors cursor-pointer">
                    𝕏
                  </span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-[#00A3FF] hover:text-white transition-colors cursor-pointer">
                    in
                  </span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-[#00A3FF] hover:text-white transition-colors cursor-pointer">
                    ⌥
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © Copyright {new Date().getFullYear()} PropFlow. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
