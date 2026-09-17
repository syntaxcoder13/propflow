"use client";

import React from "react";
import { XCircle, CheckCircle2 } from "./icons";

export function ProblemSolutionSection() {
  const problemPoints = [
    { title: "Manual Portal Searching", desc: "Hours wasted manually browsing 99acres & Housing.com for listings." },
    { title: "Duplicate Inventory", desc: "Scattered data leading to conflicting prices and double agent listings." },
    { title: "Lost WhatsApp Buyers", desc: "High-intent buyer leads buried under unorganized WhatsApp chats." },
    { title: "Untracked Site Visits", desc: "No-shows and lost commissions from missing follow-up reminders." },
  ];

  const solutionPoints = [
    { title: "Playwright Stealth Scraper", desc: "Automated extraction with stealth evasions and currency/area normalization." },
    { title: "Prisma Deduplication", desc: "Atomic database upserts keyed on external IDs to prevent duplicate rows." },
    { title: "MatchScore™ Vector AI", desc: "Weighted algorithm pairing buyers to properties with 98.4% accuracy." },
    { title: "Automated Logistics", desc: "WhatsApp location pins, calendar invites, and live deal state tracking." },
  ];

  return (
    <section id="scraper-service" className="py-24 md:py-28 bg-[#FAF7F2] text-[#111111] border-b border-[#EAE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FDEEE6] border border-[#FF5C1C]/20 text-[#FF5C1C] text-xs font-semibold uppercase tracking-wider mb-4">
            Problem vs. Solution
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#111111] tracking-tight leading-tight">
            Leads Are Everywhere. Properties Are Everywhere.<br />
            <span className="relative inline-block z-10 mx-1">
              <span className="absolute -top-3 -left-3 w-16 h-16 md:w-20 md:h-20 bg-[#FF5C1C] rounded-full -z-10 opacity-90" aria-hidden="true" />
              <span className="relative z-10 text-[#111111]">But Your Business Shouldn't Be.</span>
            </span>
          </h2>

          <p className="mt-6 text-[#7A7A7A] font-sans text-base sm:text-lg max-w-2xl mx-auto">
            PropFlow replaces unorganized manual chaos with an automated Playwright real estate scraper and an AI-driven CRM command center.
          </p>
        </div>

        {/* 2-Column Comparison Cards with Deep rounded-3xl borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Old Manual Chaos */}
          <div className="rounded-3xl bg-white border border-[#EAE3D8] p-7 sm:p-9 shadow-sm">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                ✕
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#111111]">Unorganized Manual Chaos</h3>
                <p className="text-xs text-[#7A7A7A] font-sans">The traditional agency struggle</p>
              </div>
            </div>

            <div className="space-y-4 font-sans">
              {problemPoints.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D8]/70">
                  <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#111111]">{item.title}</h4>
                    <p className="text-xs text-[#7A7A7A] mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PropFlow Automated Engine */}
          <div className="rounded-3xl bg-[#FDEEE6] border border-[#FF5C1C]/25 p-7 sm:p-9 shadow-sm">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#FF5C1C] text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#111111]">PropFlow Automated Engine</h3>
                <p className="text-xs text-[#FF5C1C] font-sans font-semibold">Playwright Scraper + AI Telemetry</p>
              </div>
            </div>

            <div className="space-y-4 font-sans">
              {solutionPoints.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#FF5C1C]/20 shadow-xs">
                  <CheckCircle2 size={18} className="text-[#FF5C1C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#111111]">{item.title}</h4>
                    <p className="text-xs text-[#7A7A7A] mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
