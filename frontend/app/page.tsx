import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ProblemSolutionSection } from "../components/ProblemSolutionSection";
import { AIIntelligenceSection } from "../components/AIIntelligenceSection";
import { WorkflowSection } from "../components/WorkflowSection";
import { FinalCTASection } from "../components/FinalCTASection";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#111111] font-sans selection:bg-[#FF5C1C] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Problem vs Solution Section */}
        <ProblemSolutionSection />

        {/* 4. AI Intelligence Section */}
        <AIIntelligenceSection />

        {/* 5. Workflow Section */}
        <WorkflowSection />

        {/* 6. Final Lead Capture CTA Block */}
        <FinalCTASection />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
