import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-slate-300 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#262626] font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#262626]">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4">
              <img src="/logo.svg" alt="PropFlow Logo" className="w-9 h-9 rounded-xl shadow-sm" />
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                PropFlow<span className="text-[#FF5C1C]">.</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 font-sans max-w-sm leading-relaxed mb-6">
              The Next-Generation Real Estate Operating System combining automated property scraping, AI buyer matching, and automated site visit logistics.
            </p>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FDEEE6] border border-[#FF5C1C]/20 text-xs text-[#FF5C1C] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#FF5C1C] animate-pulse" />
              Scraper & CRM Engine: <strong className="text-[#111111]">Active & Operational</strong>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-[#FF5C1C] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#scraper-service" className="hover:text-white transition-colors">
                  Playwright Scraper
                </a>
              </li>
              <li>
                <a href="#ai-intelligence" className="hover:text-white transition-colors">
                  MatchScore™ AI
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-white transition-colors">
                  Pipeline Workflow
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-white transition-colors">
                  CRM Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Microservices */}
          <div>
            <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-[#FF5C1C] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  99acres & Housing Scraper
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  WhatsApp Cloud API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Deal Ledger & Invoicing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Prisma DB Deduplication
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Regulatory */}
          <div>
            <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-[#FF5C1C] mb-4">
              Compliance
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  RERA Compliance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Security Hardening
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} PropFlow Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
