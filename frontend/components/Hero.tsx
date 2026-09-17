"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "./icons";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"overview" | "analytics">("overview");

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden ambient-wave-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Centered Main Headline */}
        <div className="max-w-4xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] font-sans">
            AI-Powered Real Estate
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
              Intelligence Platform
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8">
          A modern real estate intelligence dashboard combining predictive analytics,
          pipeline CRM, and automated property matching.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16" id="hero-cta">
          <a
            href="#problem-solution"
            className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-sm transition-all hover:border-slate-300"
          >
            Live Demo
          </a>
          <a
            href="#cta"
            className="px-7 py-3 rounded-full bg-[#00A3FF] hover:bg-[#0090E0] text-white font-semibold text-sm transition-all cyan-glow hover:scale-[1.02]"
          >
            Start for Free
          </a>
        </div>

        {/* MAIN EXECUTIVE DASHBOARD MOCKUP */}
        <div className="max-w-5xl mx-auto relative rounded-3xl p-2 sm:p-3 bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-[0_20px_60px_-15px_rgba(0,163,255,0.15)]">
          <div className="rounded-2xl bg-white border border-slate-100 p-5 sm:p-7 text-left">
            {/* Dashboard Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                  P
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Executive Dashboard</h2>
                  <p className="text-xs text-slate-500">Welcome back to PropFlow, here&apos;s what&apos;s happening today</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Search Pill */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-400 w-44">
                  <Search size={14} />
                  <span>Search...</span>
                </div>

                {/* Tabs */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-full text-xs font-medium text-slate-600">
                  <button
                    type="button"
                    onClick={() => setActiveTab("overview")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      activeTab === "overview" ? "bg-[#00A3FF] text-white font-semibold" : "text-slate-600"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("analytics")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      activeTab === "analytics" ? "bg-[#00A3FF] text-white font-semibold" : "text-slate-600"
                    }`}
                  >
                    Analytics
                  </button>
                </div>

                {/* Profile Avatar */}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                    <Image
                      src="/images/michael.jpg"
                      alt="User profile"
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Split Content: Left Metrics Grid & Right Featured Villa Asset */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left: 4 Metric Cards (Cols 1-5) */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-[#00A3FF]/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500">Total Revenue</span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      +12%
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">$428,200</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-[#00A3FF]/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500">Active Listing</span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      +5%
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">213</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-[#00A3FF]/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500">Total Leads</span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      +18%
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">1,240</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-[#00A3FF]/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500">Avg. Sale</span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      +8%
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">$1.2M</div>
                </div>
              </div>

              {/* Right: Featured Villa Architectural Artwork (Cols 6-12) */}
              <div className="lg:col-span-7">
                <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                  <Image
                    src="/images/light-villa.jpg"
                    alt="Modern Luxury Residence"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 600px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Floating AI Match Score Tag */}
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white text-xs font-semibold text-slate-900 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>94% AI Match</span>
                  </div>

                  {/* Bottom Property Info */}
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <h4 className="text-base font-bold drop-shadow-sm">Grand Ocean Villa</h4>
                      <p className="text-xs text-slate-200 drop-shadow-sm">4,500 sq.ft • 5 Beds • Ready Possession</p>
                    </div>
                    <span className="text-base font-extrabold text-white bg-[#00A3FF] px-3 py-1 rounded-full shadow-sm">
                      $2,450,000
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Insights Bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A3FF]" />
                <span className="font-medium text-slate-700">Market Insights:</span>
                <span>Demand up by 24% for luxury units in Q2</span>
              </div>
              <a href="#workflow" className="text-[#00A3FF] font-semibold flex items-center gap-1 hover:underline">
                View Live Pipeline Workflow →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
