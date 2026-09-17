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
          ? "bg-[#111111]/95 backdrop-blur-md border-b border-[#262626] py-3.5 shadow-lg"
          : "bg-[#111111] border-b border-[#262626]/60 py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Door Arch Logo Asset */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            aria-label="PropFlow Home"
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
              <img
                src="/logo.svg"
                alt="PropFlow Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              PropFlow
            </span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300" aria-label="Main Navigation">
            <a
              href="#"
              className="py-1 text-white font-semibold hover:text-[#FF5C1C] transition-colors"
            >
              Home
            </a>
            <a
              href="#scraper-service"
              className="py-1 hover:text-[#FF5C1C] transition-colors"
            >
              Scraper Engine
            </a>
            <a
              href="#ai-intelligence"
              className="py-1 hover:text-[#FF5C1C] transition-colors"
            >
              AI Matching
            </a>
            <a
              href="#workflow"
              className="py-1 hover:text-[#FF5C1C] transition-colors"
            >
              Workflow
            </a>
          </nav>

          {/* Actions: LOGIN Pill Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#FF5C1C] hover:bg-[#E04809] text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:scale-[1.02]"
            >
              <span>Login</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden gap-2">
            <a
              href="/login"
              className="text-xs font-semibold bg-[#FF5C1C] text-white px-4 py-2 rounded-full shadow-sm"
            >
              Login
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white border border-[#262626]"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-[#262626] bg-[#111111]/98 backdrop-blur-xl px-6 pt-4 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-slate-300">
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="py-1.5 text-white font-semibold hover:text-[#FF5C1C]"
            >
              Home
            </a>
            <a
              href="#scraper-service"
              onClick={() => setIsOpen(false)}
              className="py-1.5 hover:text-[#FF5C1C]"
            >
              Scraper Engine
            </a>
            <a
              href="#ai-intelligence"
              onClick={() => setIsOpen(false)}
              className="py-1.5 hover:text-[#FF5C1C]"
            >
              AI Matching
            </a>
            <a
              href="#workflow"
              onClick={() => setIsOpen(false)}
              className="py-1.5 hover:text-[#FF5C1C]"
            >
              Workflow
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
