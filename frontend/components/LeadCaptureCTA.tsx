"use client";

import React, { useState } from 'react';
import { EditorialButton } from './EditorialButton';

export function LeadCaptureCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto rounded-3xl bg-[#FF5C1C] text-white p-8 sm:p-14 lg:p-16 shadow-xl relative overflow-hidden">
        {/* Background Decorative Accent Ring */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full border-4 border-white/10 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="bg-black/20 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest inline-block mb-4">
            EXCLUSIVE ADVISORY & ACCESS
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Let's Find Your Next Asset
          </h2>

          <p className="text-base sm:text-lg text-white/90 font-sans mb-8 leading-relaxed">
            Join 450+ agency founders and high-net-worth investors receiving off-market property alerts and AI telemetry digests.
          </p>

          {submitted ? (
            <div className="bg-[#121212] text-white p-6 rounded-full max-w-md mx-auto font-medium text-sm animate-fade-in shadow-lg">
              🎉 Thank you! Your advisory profile has been submitted.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your executive email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-white text-[#121212] placeholder-gray-400 font-sans text-sm focus:outline-none focus:ring-4 focus:ring-black/20 shadow-sm"
              />
              <EditorialButton type="submit" variant="dark" size="lg" className="w-full sm:w-auto whitespace-nowrap">
                Get Advisory Access &rarr;
              </EditorialButton>
            </form>
          )}

          <p className="text-xs text-white/70 mt-4 font-sans">
            Strict confidentiality assured. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
}
