"use client";

import React from 'react';
import { AccentHeading } from './AccentHeading';
import { BadgePill } from './BadgePill';
import { EditorialButton } from './EditorialButton';

export function HeroSection() {
  const showcaseProperties = [
    {
      title: 'Penthouse at Powai Lake',
      location: 'Mumbai, MH',
      price: '₹3.2 Cr',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      tag: 'Featured',
    },
    {
      title: 'Architectural Villa in Alibaug',
      location: 'Coastal Maharashtra',
      price: '₹6.5 Cr',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      tag: 'Exclusive',
    },
    {
      title: 'Sky Residence at Worli',
      location: 'South Mumbai',
      price: '₹12.8 Cr',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      tag: 'High Yield',
    },
    {
      title: 'Grade-A Financial District Suite',
      location: 'New York, NY',
      price: '$8,500/mo',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      tag: 'Commercial',
    },
  ];

  return (
    <section className="relative bg-[#121212] text-white pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Ambient Disc */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF5C1C]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Tagline Badge */}
        <div className="flex justify-center mb-6">
          <BadgePill variant="dark" icon={<span className="w-2 h-2 rounded-full bg-[#FF5C1C] animate-pulse" />}>
            EDITORIAL REAL ESTATE PLATFORM
          </BadgePill>
        </div>

        {/* Hero Editorial Heading */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <AccentHeading
            text="Discover High-Value Properties"
            focalWord="High-Value"
            tag="h1"
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
            discPosition="-top-3 -left-2"
            discSize="w-14 h-14 md:w-20 md:h-20"
          />
          <p className="mt-6 text-lg sm:text-xl text-gray-300 font-sans max-w-2xl mx-auto font-normal leading-relaxed">
            Curated portfolio intelligence, automated AI property matching, and architectural luxury for modern agencies, brokers, and developers.
          </p>
        </div>

        {/* Call To Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <EditorialButton asAnchor href="#listings" variant="primary" size="lg">
            Explore Listings &rarr;
          </EditorialButton>
          <EditorialButton asAnchor href="#ai-matching" variant="dark" size="lg">
            AI Telemetry Demo
          </EditorialButton>
        </div>

        {/* Horizontal Showcase Ribbon */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#FF5C1C]">
              Featured Residences Ribbon
            </span>
            <span className="text-xs text-gray-400">Scroll to inspect curated properties &rarr;</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseProperties.map((prop, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-[#1B1B1B] border border-white/10 p-3 transition-all duration-300 hover:-translate-y-2 hover:border-[#FF5C1C]/40 hover:shadow-2xl"
              >
                <div className="relative h-56 w-full rounded-xl overflow-hidden mb-3">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-[#121212]/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/10">
                      {prop.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span className="bg-[#FF5C1C] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {prop.price}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-white line-clamp-1 group-hover:text-[#FF5C1C] transition-colors">
                    {prop.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-sans mt-0.5">{prop.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
