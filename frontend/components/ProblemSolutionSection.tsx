"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  FileSpreadsheet,
  PhoneCall,
  Compass,
  FileText,
  Calendar,
  CheckCircle2,
} from "./icons";

const CHAOS_ITEMS = [
  {
    icon: <MessageSquare size={16} className="text-emerald-600" />,
    label: "WhatsApp Chats",
    snippet: '"Hi, is the 2 BHK ready to move in Dombivli?"',
    status: "Unsorted inbox",
  },
  {
    icon: <FileSpreadsheet size={16} className="text-green-600" />,
    label: "Excel Spreadsheets",
    snippet: "Leads_2026_Final_v4_DO_NOT_DELETE.xlsx",
    status: "Out of sync",
  },
  {
    icon: <PhoneCall size={16} className="text-amber-600" />,
    label: "Missed Phone Calls",
    snippet: "Missed Call (4) - Dr. Sharma (Dombivli East)",
    status: "High churn risk",
  },
  {
    icon: <Compass size={16} className="text-sky-600" />,
    label: "Portals & Listings",
    snippet: "14 unread inquiries on 99acres & MagicBricks",
    status: "Delayed response",
  },
  {
    icon: <FileText size={16} className="text-purple-600" />,
    label: "Scattered Notes",
    snippet: "Client prefers west-facing with 1 car parking",
    status: "Lost context",
  },
  {
    icon: <Calendar size={16} className="text-rose-600" />,
    label: "Overlapping Visits",
    snippet: "Two site visits booked at same time slot",
    status: "Double booked",
  },
];

export function ProblemSolutionSection() {
  const [unifiedView, setUnifiedView] = useState(true);

  return (
    <section id="problem-solution" className="py-20 md:py-32 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Centered Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 mb-5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#00A3FF]" />
          <span>02 // Problem → Solution</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 max-w-4xl mx-auto leading-tight">
          Leads Are Everywhere. Properties Are Everywhere.
          <br />
          <span className="text-[#00A3FF]">But Your Business Shouldn&apos;t Be.</span>
        </h2>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base text-slate-600 mb-14">
          Agencies lose up to 34% of closed deals due to fragmented spreadsheets and delayed follow-ups.
          PropFlow unites your team in one intelligent workspace.
        </p>

        {/* Main Card */}
        <div className="rounded-3xl bg-[#F8FAFC] border border-slate-200/90 p-6 sm:p-10 shadow-sm text-left">
          {/* Header Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00A3FF]">
                {unifiedView ? "PROPFLOW UNIFIED SYSTEM ACTIVE" : "CURRENT BROKER REALITY"}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                {unifiedView ? "One Intelligent Workspace for Every Deal" : "6 Disconnected Tools Leaking Deals"}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setUnifiedView(!unifiedView)}
              className="px-5 py-2.5 rounded-full font-semibold text-xs transition-all flex items-center gap-2 bg-[#00A3FF] hover:bg-[#0090E0] text-white cyan-glow-sm shadow-sm"
            >
              <span>{unifiedView ? "View Fragmented Chaos" : "Switch to PropFlow Workspace ↗"}</span>
            </button>
          </div>

          {unifiedView ? (
            /* Solution Workspace Grid */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 card-hover-lift">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#00A3FF] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Auto-Ingest Leads</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Portals, WhatsApp inquiries, and website leads auto-funnel into a single active queue.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 card-hover-lift">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">AI Vector Match</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Matches buyer budget, location, and carpet area against entire agency inventory instantly.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 card-hover-lift">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Synced Visits</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Calendar sync eliminates double bookings and automatically sends Google Maps pins to clients.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 card-hover-lift">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Deal Velocity</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    AI drafts personalized WhatsApp follow-ups and protects agency commission margins.
                  </p>
                </div>
              </div>

              {/* Bottom Result Callout */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#00A3FF]" />
                  <span className="font-semibold text-slate-900">Result:</span>
                  <span>Brokers close deals 3.8x faster with zero dropped buyer inquiries.</span>
                </div>
                <span className="font-bold text-[#00A3FF]">100% Agency Data Ownership</span>
              </div>
            </div>
          ) : (
            /* Disconnected Chaos Grid */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CHAOS_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-sm font-bold text-slate-900">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl italic border border-slate-100">
                    {item.snippet}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
