"use client";

import React from "react";
import { Sparkles, ArrowRight, Search } from "./icons";

export function AIIntelligenceSection() {
  return (
    <section id="ai-intelligence" className="py-24 md:py-28 bg-[#FAF7F2] text-[#111111] border-b border-[#EAE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDEEE6] text-[#FF5C1C] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#FF5C1C]/20">
            <Sparkles size={14} />
            <span>AI Intelligence & Scraper Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#111111] tracking-tight leading-tight">
            Your CRM Should{" "}
            <span className="relative inline-block z-10 mx-1">
              <span className="absolute -top-3 -left-3 w-16 h-16 md:w-20 md:h-20 bg-[#FF5C1C] rounded-full -z-10 opacity-90" aria-hidden="true" />
              <span className="relative z-10 text-[#111111]">Think</span>
            </span>{" "}
            With You
          </h2>

          <p className="mt-6 text-[#7A7A7A] font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            PropFlow automatically parses scraped property parameters, scores buyer intent vectors, and recommends high-yield matches instantly.
          </p>
        </div>

        {/* Crisp AI Interactive Mockup Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-[#EAE3D8] shadow-md p-6 sm:p-9">
          <div className="flex items-center justify-between pb-6 border-b border-[#EAE3D8] mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FF5C1C] text-white flex items-center justify-center font-bold">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#111111] text-lg">PropFlow MatchScore™ Simulator</h3>
                <p className="text-xs text-[#7A7A7A] font-sans">Real-Time Scraped Inventory & Buyer Vector Scoring</p>
              </div>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-[#FDEEE6] text-[#FF5C1C] text-xs font-bold border border-[#FF5C1C]/20">
              Live Engine Active
            </span>
          </div>

          {/* Search Simulation */}
          <div className="mb-6 relative font-sans">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7A7A]" size={18} />
            <input
              type="text"
              readOnly
              value="Buyer: Rahul Sharma | Budget: ₹60L–₹80L | Locality: Dombivli East | 2 BHK"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D8] text-[#111111] text-xs sm:text-sm font-medium focus:outline-none"
            />
          </div>

          {/* AI Match Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 mb-6 font-sans">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] text-center border border-[#EAE3D8]">
              <span className="text-[11px] font-medium text-[#7A7A7A] block mb-1">Budget Tolerance</span>
              <span className="text-base font-serif font-bold text-[#111111]">±15% Interval</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FDEEE6] text-center border border-[#FF5C1C]/20">
              <span className="text-[11px] font-medium text-[#FF5C1C] block mb-1">Scraped Match</span>
              <span className="text-base font-serif font-bold text-[#FF5C1C]">96% Precision</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] text-center border border-[#EAE3D8]">
              <span className="text-[11px] font-medium text-[#7A7A7A] block mb-1">Database Status</span>
              <span className="text-base font-serif font-bold text-[#111111]">Deduplicated</span>
            </div>
          </div>

          {/* Matched Property Card Preview */}
          <div className="rounded-2xl border border-[#EAE3D8] p-5 bg-[#FAF7F2] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80"
                alt="Matched Property"
                className="w-24 h-24 rounded-2xl object-cover border border-[#EAE3D8]"
              />
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FDEEE6] text-[#FF5C1C] text-[10px] font-bold uppercase mb-1 inline-block">
                  Matched Scraped Inventory
                </span>
                <h4 className="font-serif font-bold text-[#111111] text-base">2 BHK Luxury Flat in Dombivli East</h4>
                <p className="text-xs text-[#7A7A7A] font-sans mt-0.5">₹65 Lacs • 780 SqFt • Semi-Furnished • 99acres Source</p>
              </div>
            </div>
            <a
              href="/dashboard"
              className="w-full md:w-auto px-6 py-3 rounded-full bg-[#FF5C1C] hover:bg-[#E04809] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Schedule WhatsApp Visit</span>
              <span className="w-5 h-5 rounded-full bg-white text-[#FF5C1C] flex items-center justify-center text-xs font-bold">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
