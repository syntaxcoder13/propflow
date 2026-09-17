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
    tagColor: "bg-rose-950/40 text-rose-300 border-rose-800/40",
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
    tagColor: "bg-emerald-950/40 text-emerald-300 border-emerald-800/40",
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
    tagColor: "bg-[#FDEEE6] text-[#FF5C1C] border-[#FF5C1C]/20",
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
    tagColor: "bg-purple-950/40 text-purple-300 border-purple-800/40",
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
    tagColor: "bg-amber-950/40 text-amber-300 border-amber-800/40",
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
    tagColor: "bg-emerald-900/60 text-emerald-200 border-emerald-700/50",
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
    <section id="workflow" className="py-24 md:py-32 bg-[#111111] text-white border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Centered Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDEEE6] border border-[#FF5C1C]/20 text-xs font-semibold text-[#FF5C1C] mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF5C1C]" />
          <span>04 // CRM Workflow</span>
        </div>

        {/* Section Heading with Editorial Serif & Overlapping Orange Accent Circle behind "Deal" */}
        <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-4 max-w-3xl mx-auto leading-tight">
          From First Contact to{" "}
          <span className="relative inline-block z-10 mx-1">
            <span className="absolute -top-3 -left-3 w-16 h-16 md:w-20 md:h-20 bg-[#FF5C1C] rounded-full -z-10 opacity-90" aria-hidden="true" />
            <span className="relative z-10 text-white">Closed Deal</span>
          </span>
        </h2>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-base text-slate-300 font-sans mb-14 leading-relaxed">
          One continuous pipeline connecting lead capture, AI match precision, site walkthroughs,
          negotiation, and commission payout.
        </p>

        {/* Stepper Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 font-sans">
          {STEPS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                activeStepIndex === idx
                  ? "bg-[#FF5C1C] border-[#FF5C1C] text-white shadow-md"
                  : "bg-[#1B1B1B] border-[#262626] text-slate-300 hover:bg-[#262626]"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xl font-serif font-bold">{item.step}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    activeStepIndex === idx ? "bg-white" : "bg-slate-500"
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
        <div className="rounded-3xl bg-[#1B1B1B] border border-[#262626] p-6 sm:p-10 shadow-md text-left font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Context (Cols 1-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3.5">
                <span className="text-3xl font-serif font-bold text-[#FF5C1C]">{activeStep.step}</span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {activeStep.phase}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white">{activeStep.title}</h3>
                </div>
                <span
                  className={`ml-auto hidden sm:inline-block px-3.5 py-1 rounded-full border text-xs font-bold ${activeStep.tagColor}`}
                >
                  {activeStep.tag}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {activeStep.summary}
              </p>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#111111] p-4 rounded-2xl border border-[#262626] text-xs">
                {activeStep.details.map((d, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#1B1B1B] border border-[#262626]">
                    <div className="text-slate-400 text-[11px] mb-0.5">{d.label}</div>
                    <div className="text-white font-serif font-bold text-sm">{d.val}</div>
                  </div>
                ))}
              </div>

              {/* System Highlight */}
              <div className="p-4 bg-[#FDEEE6] border border-[#FF5C1C]/25 rounded-2xl text-xs text-[#111111] flex items-center gap-2.5">
                <Sparkles size={16} className="text-[#FF5C1C] flex-shrink-0" />
                <span>
                  <strong className="text-[#FF5C1C]">SYSTEM HIGHLIGHT: </strong>
                  {activeStep.highlight}
                </span>
              </div>
            </div>

            {/* Right Visual Image (Cols 8-12) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#111111] border border-[#262626] p-4 shadow-sm space-y-4">
                <div className="flex items-center justify-between text-xs border-b border-[#262626] pb-2.5">
                  <span className="text-slate-400 font-medium">Stage Snapshot</span>
                  <span className="text-[#FF5C1C] font-bold">Status: Active</span>
                </div>

                <div className="relative h-44 w-full rounded-xl overflow-hidden border border-[#262626]">
                  <Image
                    src="/images/light-villa.jpg"
                    alt="Workflow property asset"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="bg-[#111111]/90 text-white font-bold px-2.5 py-1 rounded-full border border-[#262626]">
                      Tower B #804
                    </span>
                    <span className="bg-[#FF5C1C] text-white px-2.5 py-1 rounded-full font-bold">
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
                    className="px-4 py-2 rounded-full bg-[#1B1B1B] text-slate-300 hover:bg-[#262626] disabled:opacity-30 border border-[#262626]"
                  >
                    ← Previous
                  </button>

                  <span className="text-slate-400 font-mono">
                    {activeStepIndex + 1} of {STEPS.length}
                  </span>

                  <button
                    type="button"
                    disabled={activeStepIndex === STEPS.length - 1}
                    onClick={() =>
                      setActiveStepIndex((prev) => Math.min(STEPS.length - 1, prev + 1))
                    }
                    className="px-5 py-2 rounded-full bg-[#FF5C1C] text-white hover:bg-[#E04809] disabled:opacity-30 shadow-xs"
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
