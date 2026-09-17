"use client";

import React from "react";
import { ArrowUpRight, CheckCircle2 } from "./icons";

export function FinalCTASection() {
  return (
    <section id="cta" className="py-20 md:py-32 bg-[#FAFBFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Soft Pastel Cyan/Mint Gradient Banner Card */}
        <div className="rounded-[2.5rem] bg-gradient-to-r from-[#E0F2FE] via-[#F0FDFA] to-[#E0F2FE] border border-sky-200/80 p-8 sm:p-16 text-center shadow-sm relative overflow-hidden">
          {/* Ambient blur circle */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00A3FF]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-200 text-xs font-semibold text-slate-800 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00A3FF]" />
              <span>05 // Start Managing Your Agency</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Your Next Deal Shouldn&apos;t Get Lost In A Spreadsheet
            </h2>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Empower your agents with predictive match scoring, automated WhatsApp follow-ups,
              and centralized site visit management.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => alert("Welcome! Your PropFlow workspace is ready to launch.")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#00A3FF] hover:bg-[#0090E0] text-white font-bold text-base transition-all cyan-glow hover:scale-[1.02] shadow-md"
              >
                <span>Start for Free Today</span>
                <ArrowUpRight size={18} />
              </button>
            </div>

            {/* Benefits Checklist */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" /> Free 14-Day Trial
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" /> No Credit Card Required
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" /> Instant Setup
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
