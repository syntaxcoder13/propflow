"use client";

import React from 'react';
import { AccentHeading } from './AccentHeading';
import { BadgePill } from './BadgePill';

export function ValuePropSection() {
  const features = [
    {
      title: 'Architectural Excellence',
      subtitle: 'CURATED PORTFOLIOS',
      description:
        'Every listed property undergoes strict multi-point criteria—verifying structural provenance, natural illumination, and premium locality appreciation.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      tag: '01 / ARCHITECTURE',
    },
    {
      title: 'PropFlow MatchScore™ Engine',
      subtitle: 'PREDICTIVE AI MATCHING',
      description:
        'Our vector-based neural algorithm analyzes buyer budget tolerance, commute radii, BHK specifications, and lifestyle preferences in real-time.',
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
      tag: '02 / TELEMETRY AI',
    },
    {
      title: 'Turnkey Logistics & CRM',
      subtitle: 'AUTOMATED PIPELINES',
      description:
        'Eliminate manual follow-ups. Schedule site visits with automated WhatsApp location pins, multi-tier deal ledgers, and instant commission tracking.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      tag: '03 / LOGISTICS',
    },
  ];

  return (
    <section id="curated-spaces" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#121212]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <BadgePill variant="orange" className="mb-4">
            EXCELLENCE IN LUXURY REAL ESTATE
          </BadgePill>
          <AccentHeading
            text="Curated Spaces That Define Modern Living"
            focalWord="Modern"
            tag="h2"
            className="text-3xl sm:text-5xl font-bold text-[#121212] max-w-3xl leading-tight"
            discPosition="-top-2 -left-2"
            discSize="w-12 h-12 md:w-16 md:h-16"
          />
          <p className="mt-4 text-base sm:text-lg text-[#7A7A7A] max-w-2xl font-sans">
            Combining editorial aesthetic standards with automated operational telemetry for agency leaders and discerning property buyers.
          </p>
        </div>

        {/* Asymmetric 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="editorial-card rounded-3xl bg-white border border-[#EAE5DE] overflow-hidden p-6 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 bg-[#FAF7F2]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[#121212]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                    {item.tag}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#FF5C1C] tracking-widest uppercase block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#121212] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#7A7A7A] font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EAE5DE]/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#121212]">PropFlow Advantage</span>
                <span className="w-8 h-8 rounded-full bg-[#FDEEE6] text-[#FF5C1C] flex items-center justify-center text-sm font-bold">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
