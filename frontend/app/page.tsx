import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSolutionSection } from "@/components/ProblemSolutionSection";
import { AIIntelligenceSection } from "@/components/AIIntelligenceSection";
import { WorkflowSection } from "@/components/WorkflowSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] text-[#0F172A]">
      {/* 1. Header Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 01. Hero Section */}
        <Hero />

        {/* 02. Problem → Solution */}
        <ProblemSolutionSection />

        {/* 03. AI Intelligence */}
        <AIIntelligenceSection />

        {/* 04. CRM Workflow */}
        <WorkflowSection />

        {/* 05. Final CTA */}
        <FinalCTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
