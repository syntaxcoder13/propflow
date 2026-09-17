"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "./icons";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3.5 shadow-sm"
          : "bg-transparent border-b border-slate-100 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            aria-label="PropFlow Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#00A3FF] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
              PropFlow
            </span>
          </a>

          {/* Navigation Links with Hover Underline */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600" aria-label="Main Navigation">
            <a
              href="#"
              className="py-1 text-slate-900 font-semibold hover:text-[#00A3FF] hover:underline hover:underline-offset-8 hover:decoration-[#00A3FF] hover:decoration-2 transition-all"
            >
              Home
            </a>
            <a
              href="#problem-solution"
              className="py-1 hover:text-[#00A3FF] hover:underline hover:underline-offset-8 hover:decoration-[#00A3FF] hover:decoration-2 transition-all"
            >
              Why Us
            </a>
            <a
              href="#ai-intelligence"
              className="py-1 hover:text-[#00A3FF] hover:underline hover:underline-offset-8 hover:decoration-[#00A3FF] hover:decoration-2 transition-all"
            >
              AI Intelligence
            </a>
            <a
              href="#workflow"
              className="py-1 hover:text-[#00A3FF] hover:underline hover:underline-offset-8 hover:decoration-[#00A3FF] hover:decoration-2 transition-all"
            >
              Workflow
            </a>
          </nav>

          {/* Actions: LOGIN Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#00A3FF] hover:bg-[#0090E0] text-white text-sm font-semibold transition-all duration-200 cyan-glow-sm hover:scale-[1.02] shadow-sm"
            >
              <span>Login</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden gap-2">
            <a
              href="/login"
              className="text-xs font-semibold bg-[#00A3FF] text-white px-4 py-2 rounded-full shadow-sm"
            >
              Login
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 border border-slate-200"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-6 pt-4 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-slate-700">
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="py-1.5 text-slate-900 font-semibold hover:text-[#00A3FF] hover:underline hover:underline-offset-4 hover:decoration-[#00A3FF]"
            >
              Home
            </a>
            <a
              href="#problem-solution"
              onClick={() => setIsOpen(false)}
              className="py-1.5 hover:text-[#00A3FF] hover:underline hover:underline-offset-4 hover:decoration-[#00A3FF]"
            >
              Why Us
            </a>
            <a
              href="#ai-intelligence"
              onClick={() => setIsOpen(false)}
              className="py-1.5 hover:text-[#00A3FF] hover:underline hover:underline-offset-4 hover:decoration-[#00A3FF]"
            >
              AI Intelligence
            </a>
            <a
              href="#workflow"
              onClick={() => setIsOpen(false)}
              className="py-1.5 hover:text-[#00A3FF] hover:underline hover:underline-offset-4 hover:decoration-[#00A3FF]"
            >
              Workflow
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
