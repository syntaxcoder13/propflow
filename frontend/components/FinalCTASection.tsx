"use client";

import React, { useState } from "react";

export function FinalCTASection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Welcome! Workspace launched for ${email}.`);
    }
  };

  return (
    /* ========================================================= */
    /* 05. FULL-WIDTH CALL-TO-ACTION BANNER                      */
    /* ========================================================= */
    <section id="cta" className="w-full bg-[#FF5C1C] text-white py-24 px-6">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Tag Pill */}
        <div className="inline-flex items-center gap-2 bg-black/15 text-white/90 px-4 py-1.5 rounded-full text-xs font-medium mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          05 // Start Managing Your Agency
        </div>

        {/* Headline */}
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-3xl">
          Your Next Deal Shouldn&apos;t Get Lost In A Spreadsheet
        </h2>

        {/* Input & Button Container */}
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your agency email..."
            className="w-full px-6 py-4 rounded-full bg-white text-[#111111] placeholder:text-neutral-400 text-sm focus:outline-none shadow-sm"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#111111] hover:bg-black text-white px-8 py-4 rounded-full text-sm font-semibold whitespace-nowrap flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <span>Start for Free Today</span>
            <span className="text-xs">↗</span>
          </button>
        </form>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-white/80 font-medium">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Free 14–Day Trial
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            No Credit Card Required
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Instant Setup
          </span>
        </div>
      </div>
    </section>
  );
}
