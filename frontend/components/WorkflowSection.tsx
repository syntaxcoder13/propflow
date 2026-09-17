"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles } from "./icons";

const STEPS = [
  {
    step: "01",
    phase: "LEAD INGEST",
    title: "Rahul Mehta",
    tag: "HIGH INTENT BUYER",
    tagColor: "bg-rose-50 text-rose-600 border-rose-200",
    summary: "Inquired through portal with explicit criteria and verified loan eligibility.",
    details: [
      { label: "Budget Bracket", val: "$850K — $950K" },
      { label: "Requirement", val: "2 BHK • Ready to move" },
      { label: "Preferred Area", val: "Dombivli East (Station Access)" },
      { label: "Timeline", val: "< 30 Days (Pre-Approved Loan)" },
    ],
    highlight: "Auto-enriched via WhatsApp Bot with zero manual spreadsheet entry.",
  },
  {
    step: "02",
    phase: "AI PROPERTY MATCH",
    title: "94% Vector Match",
    tag: "INSTANT RECOMMENDATION",
    tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    summary: "High-Rise Tower B, Unit 804 matched against 185 agency inventory listings.",
    details: [
      { label: "Matched Unit", val: "2 BHK Luxury Apt • 720 Carpet" },
      { label: "Listing Price", val: "$890,000 (Within Budget)" },
      { label: "Location", val: "Dombivli East (3 mins to station)" },
      { label: "Key Fit", val: "West-facing balcony, covered car park" },
    ],
    highlight: "Matching algorithm scores 24 distinct client-property parameters.",
  },
  {
    step: "03",
    phase: "SITE VISIT",
    title: "Visit Confirmed",
    tag: "CALENDAR SYNCED",
    tagColor: "bg-sky-50 text-[#00A3FF] border-sky-200",
    summary: "Automated WhatsApp scheduling coordinated broker and buyer calendars.",
    details: [
      { label: "Scheduled Slot", val: "Sunday • 11:30 AM" },
      { label: "Host Broker", val: "Vikram Sharma (Senior Associate)" },
      { label: "Directions Sent", val: "Google Maps Pin sent on WhatsApp" },
      { label: "Reminder", val: "Auto-reminder scheduled 2 hrs prior" },
    ],
    highlight: "Zero overlap with other broker appointments.",
  },
  {
    step: "04",
    phase: "AI FOLLOW-UP",
    title: "Smart Follow-Up",
    tag: "AUTOMATED DRAFTING",
    tagColor: "bg-purple-50 text-purple-600 border-purple-200",
    summary: "Post-visit feedback triggers customized cost sheet and floorplan delivery.",
    details: [
      { label: "Client Sentiment", val: "9/10 Positive on Layout & Sunlight" },
      { label: "Client Concern", val: "Minor negotiation on floor rise charges" },
      { label: "AI Action", val: 'Drafted: "Send customized cost-sheet & waiver pitch"' },
      { label: "Channel", val: "1-Click WhatsApp Direct Send" },
    ],
    highlight: "Brokers close 3.8x faster when follow-ups are sent within 2 hours.",
  },
  {
    step: "05",
    phase: "NEGOTIATION",
    title: "Counter-Offer Mapped",
    tag: "DEAL PIPELINE",
    tagColor: "bg-amber-50 text-amber-600 border-amber-200",
    summary: "PropFlow tracks bidder vs builder spread and protects broker commission.",
    details: [
      { label: "Buyer Bid", val: "$870,000" },
      { label: "Developer Counter", val: "$885,000 (Includes Stamp Duty)" },
      { label: "Final Agreed", val: "$880,000" },
      { label: "Brokerage", val: "2.0% ($17,600 fee secured)" },
    ],
    highlight: "Built-in margin guard ensures no unauthorized discounts.",
  },
  {
    step: "06",
    phase: "CLOSED",
    title: "Deal Completed",
    tag: "AGREEMENT REGISTERED",
    tagColor: "bg-emerald-100 text-emerald-700 border-emerald-300",
    summary: "Sale agreement executed, token received, and ledger updated.",
    details: [
      { label: "Unit Allocated", val: "Tower B, Unit 804" },
      { label: "Deal Total", val: "$880,000" },
      { label: "Commission", val: "$17,600 (Credited)" },
      { label: "Client Status", val: "Auto-enrolled in Referral AI Loop" },
    ],
    highlight: "Cycle completed in 11 days (Industry average: 34 days).",
  },
];

export function WorkflowSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(1);
  const activeStep = STEPS[activeStepIndex];

  return (
    <section id="workflow" className="py-20 md:py-32 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Centered Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 mb-5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#00A3FF]" />
          <span>04 // CRM Workflow</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 max-w-3xl mx-auto leading-tight">
          From First Contact to Closed Deal
        </h2>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-base text-slate-600 mb-14">
          One continuous pipeline connecting lead capture, AI match precision, site walkthroughs,
          negotiation, and commission payout.
        </p>

        {/* Stepper Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {STEPS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                activeStepIndex === idx
                  ? "bg-[#00A3FF] border-[#00A3FF] text-white shadow-md cyan-glow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xl font-bold">{item.step}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    activeStepIndex === idx ? "bg-white" : "bg-slate-300"
                  }`}
                />
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase truncate">
                {item.phase}
              </span>
            </button>
          ))}
        </div>

        {/* Active Stage Detailed Card */}
        <div className="rounded-3xl bg-[#F8FAFC] border border-slate-200 p-6 sm:p-10 shadow-sm text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Context (Cols 1-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-[#00A3FF]">{activeStep.step}</span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {activeStep.phase}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">{activeStep.title}</h3>
                </div>
                <span
                  className={`ml-auto hidden sm:inline-block px-3 py-1 rounded-full border text-xs font-bold ${activeStep.tagColor}`}
                >
                  {activeStep.tag}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {activeStep.summary}
              </p>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-2xl border border-slate-200 text-xs">
                {activeStep.details.map((d, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-400 text-[11px] mb-0.5">{d.label}</div>
                    <div className="text-slate-900 font-bold text-sm">{d.val}</div>
                  </div>
                ))}
              </div>

              {/* System Highlight */}
              <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl text-xs text-slate-700 flex items-center gap-2">
                <Sparkles size={16} className="text-[#00A3FF] flex-shrink-0" />
                <span>
                  <strong className="text-[#00A3FF]">SYSTEM HIGHLIGHT: </strong>
                  {activeStep.highlight}
                </span>
              </div>
            </div>

            {/* Right Visual Image (Cols 8-12) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm space-y-4">
                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500 font-medium">Stage Snapshot</span>
                  <span className="text-emerald-600 font-bold">Status: Active</span>
                </div>

                <div className="relative h-44 w-full rounded-xl overflow-hidden border border-slate-100">
                  <Image
                    src="/images/light-villa.jpg"
                    alt="Workflow property asset"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="bg-white/90 text-slate-900 font-bold px-2.5 py-1 rounded-full">
                      Tower B #804
                    </span>
                    <span className="bg-[#00A3FF] px-2.5 py-1 rounded-full font-bold">
                      {activeStep.phase}
                    </span>
                  </div>
                </div>

                {/* Step navigation buttons */}
                <div className="flex items-center justify-between pt-1 text-xs font-semibold">
                  <button
                    type="button"
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-3.5 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-30"
                  >
                    ← Previous
                  </button>

                  <span className="text-slate-400">
                    {activeStepIndex + 1} of {STEPS.length}
                  </span>

                  <button
                    type="button"
                    disabled={activeStepIndex === STEPS.length - 1}
                    onClick={() =>
                      setActiveStepIndex((prev) => Math.min(STEPS.length - 1, prev + 1))
                    }
                    className="px-4 py-2 rounded-full bg-[#00A3FF] text-white hover:bg-[#0090E0] disabled:opacity-30 shadow-xs"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
