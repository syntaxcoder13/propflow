"use client";

import React, { useState } from "react";
import { Search, Send } from "./icons";

const PRESET_QUERIES = [
  {
    id: "query1",
    label: "High-Intent 2 BHK Buyers",
    query: "Show high-intent 2 BHK buyers in Dombivli under $1,000,000.",
    stats: [
      { num: "18", label: "Matching Buyers" },
      { num: "7", label: "Matching Units" },
      { num: "94%", label: "Match Precision" },
    ],
    summary:
      "Filtered 420 active buyers against current agency inventory. 18 contacts have verified loan eligibility, ready budgets, and urgent 30-day timelines.",
    topLead: {
      name: "Rahul Mehta",
      budget: "$850K — $950K",
      intent: "High Intent (Urgent)",
      bestMatch: "High-Rise Tower B, Unit 804",
      action: "Schedule site visit for Sunday 11:30 AM",
    },
  },
  {
    id: "query2",
    label: "Deals Needing Attention",
    query: "Which deals need attention today?",
    stats: [
      { num: "3", label: "Urgent Follow-ups" },
      { num: "2", label: "Active Negotiations" },
      { num: "1", label: "Site Visit Scheduled" },
    ],
    summary:
      "Identified 3 high-priority deals approaching milestone deadlines. Action required to prevent buyer momentum drop.",
    topLead: {
      name: "Amit Desai & Associates",
      budget: "$1.45M Commercial",
      intent: "Counter-Offer Pending",
      bestMatch: "Downtown Executive Suite #402",
      action: "Approve $1.38M counter-offer before 5:00 PM",
    },
  },
  {
    id: "query3",
    label: "AI WhatsApp Script",
    query: "Draft a personalized follow-up for Rahul Mehta on Dombivli East 2 BHK.",
    stats: [
      { num: "96%", label: "Predicted Open Rate" },
      { num: "2 BHK", label: "Target Unit" },
      { num: "Instant", label: "1-Click Send" },
    ],
    summary:
      "Generated conversational WhatsApp pitch highlighting unit 804's west-facing balcony and ready possession timeline.",
    topLead: {
      name: "AI WhatsApp Script Draft",
      budget: "$890,000",
      intent: "Ready to Dispatch",
      bestMatch: "High-Rise Tower B, Dombivli East",
      action: '"Hi Rahul, the west-facing 2 BHK you viewed is reserved for your visit Sunday at 11:30 AM."',
    },
  },
];

export function AIIntelligenceSection() {
  const [selectedId, setSelectedId] = useState("query1");
  const activePreset =
    PRESET_QUERIES.find((q) => q.id === selectedId) || PRESET_QUERIES[0];

  return (
    <section id="ai-intelligence" className="py-20 md:py-32 bg-[#F8FAFC] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Centered Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 mb-5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#00A3FF]" />
          <span>03 // AI Intelligence Engine</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 max-w-3xl mx-auto leading-tight">
          Your CRM Should Think With You
        </h2>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-base text-slate-600 mb-16">
          PropFlow turns complex property listings and client interactions into actionable matches,
          predictive valuations, and instant next best actions.
        </p>

        {/* Tablet Frame Mockup with Interactive Command Palette */}
        <div className="max-w-4xl mx-auto relative">
          <div className="rounded-[2.5rem] bg-slate-900 p-3 sm:p-4 shadow-[0_30px_90px_-20px_rgba(0,163,255,0.25)] border-4 border-slate-800">
            <div className="rounded-[2rem] bg-white border border-slate-200 overflow-hidden text-left p-6 sm:p-10 relative">
              {/* Tablet Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00A3FF] flex items-center justify-center text-white font-bold text-sm">
                    P
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-base">PropFlow AI Engine</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 font-semibold px-2 py-0.5 rounded-full ml-2">
                      Active Telemetry
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {PRESET_QUERIES.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setSelectedId(q.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        selectedId === q.id
                          ? "bg-[#00A3FF] text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Natural Language Prompt Bar */}
              <div className="mb-6">
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 shadow-sm">
                  <Search size={18} className="text-[#00A3FF] flex-shrink-0" />
                  <input
                    type="text"
                    readOnly
                    value={activePreset.query}
                    className="w-full bg-transparent text-sm text-slate-800 font-semibold outline-none cursor-default"
                  />
                  <span className="text-xs font-bold text-[#00A3FF] bg-sky-50 px-2.5 py-1 rounded-lg">
                    ⌘ K
                  </span>
                </div>
              </div>

              {/* AI Calculation Results Box */}
              <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-6">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  {activePreset.stats.map((st, i) => (
                    <div key={i} className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">
                      <div className="text-2xl font-extrabold text-slate-900">{st.num}</div>
                      <div className="text-xs font-medium text-slate-500">{st.label}</div>
                    </div>
                  ))}
                </div>

                {/* Synthesis Paragraph */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-100">
                  {activePreset.summary}
                </p>

                {/* Top Actionable Card */}
                <div className="p-4 rounded-xl bg-white border border-[#00A3FF]/40 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-[#00A3FF]">
                      TOP ACTIONABLE RESULT
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {activePreset.topLead.intent}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Lead / Contact:</span>
                      <span className="text-slate-900 font-bold">{activePreset.topLead.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Budget / Value:</span>
                      <span className="text-[#00A3FF] font-bold">{activePreset.topLead.budget}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Matched Listing:</span>
                      <span className="text-slate-900 font-medium">{activePreset.topLead.bestMatch}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="text-slate-700">
                      <strong className="text-[#00A3FF]">Recommended Action: </strong>
                      {activePreset.topLead.action}
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-full bg-[#00A3FF] hover:bg-[#0090E0] text-white font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Send size={13} />
                      <span>Execute Action</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
