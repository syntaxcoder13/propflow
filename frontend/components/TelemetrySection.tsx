"use client";

import React from 'react';
import { AccentHeading } from './AccentHeading';
import { BadgePill } from './BadgePill';

export function TelemetrySection() {
  const metrics = [
    { label: 'MATCH PRECISION', value: '98.4%', desc: 'AI MatchScore vector accuracy' },
    { label: 'SCRAPE VELOCITY', value: '450+', desc: 'Listings processed per minute' },
    { label: 'SITE VISIT CONVERSION', value: '3.4x', desc: 'Faster lead-to-visit ratio' },
    { label: 'ACTIVE PIPELINE GMV', value: '₹420 Cr', desc: 'Tracked deal ledger volume' },
  ];

  return (
    <section id="ai-matching" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <BadgePill variant="dark" icon={<span className="w-2 h-2 rounded-full bg-[#FF5C1C]" />}>
            AI TELEMETRY & OPERATIONS
          </BadgePill>
          <AccentHeading
            text="High-Yield Telemetry Engine"
            focalWord="Telemetry"
            tag="h2"
            className="text-3xl sm:text-5xl font-bold text-white max-w-3xl mt-4 leading-tight"
            discPosition="-top-2 -left-2"
            discSize="w-12 h-12 md:w-16 md:h-16"
          />
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl font-sans">
            Real-time scraped portal aggregation, predictive buyer matching scores, and automated logistics.
          </p>
        </div>

        {/* 4 Telemetry Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#1B1B1B] border border-white/10 p-6 flex flex-col justify-between hover:border-[#FF5C1C]/40 transition-colors"
            >
              <span className="text-[10px] font-bold tracking-widest text-[#FF5C1C] uppercase mb-4 block">
                {m.label}
              </span>
              <div>
                <span className="font-serif text-4xl sm:text-5xl font-bold text-white block mb-2">
                  {m.value}
                </span>
                <p className="text-xs text-gray-400 font-sans">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-[#1B1B1B] border border-white/10 p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#FF5C1C] uppercase tracking-wider block mb-2">
                AUTOMATED SCRAPER SERVICE
              </span>
              <h3 className="font-serif text-2xl font-semibold text-white mb-4">
                Stealth Playwright Ingestion
              </h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed mb-6">
                Scrapes property portals using Playwright stealth evasions (user-agent rotation, window.chrome mocks, anti-bot evasions). Normalizes prices, carpet area, BHK, and amenities, then upserts into PostgreSQL without duplicates.
              </p>
            </div>
            <div className="bg-[#121212] p-4 rounded-2xl border border-white/5 text-xs font-mono text-gray-400">
              <span className="text-[#FF5C1C]">&gt;</span> PropFlowScraperService.runScrapeJob(portalUrl)<br />
              <span className="text-green-400">✓ Extracted:</span> 2 BHK Luxury Flat (Dombivli East)<br />
              <span className="text-green-400">✓ Price Parsed:</span> ₹65,00,000 INR<br />
              <span className="text-green-400">✓ DB Status:</span> Upserted (100% Deduplicated)
            </div>
          </div>

          <div className="rounded-3xl bg-[#1B1B1B] border border-white/10 p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#FF5C1C] uppercase tracking-wider block mb-2">
                PROSPECT MATCHSCORE™
              </span>
              <h3 className="font-serif text-2xl font-semibold text-white mb-4">
                Vector Weighted Buyer Match
              </h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed mb-6">
                Calculates explainable 0–100% MatchScores by evaluating budget interval tolerance ($\pm 15\%$), BHK requirements, commute radius, and possession timeline.
              </p>
            </div>
            <div className="bg-[#121212] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block">Powai Penthouse Match</span>
                <span className="text-sm font-bold text-white">Buyer: Rahul Sharma</span>
              </div>
              <div className="w-14 h-14 rounded-full bg-[#FF5C1C] flex items-center justify-center font-bold text-white text-base shadow-lg">
                96%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
