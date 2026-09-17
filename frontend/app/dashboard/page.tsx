"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  Search,
  Bell,
  Sparkles,
  TrendingUp,
  MapPin,
  Calendar,
  Plus,
  UserPlus,
  LogOut,
  CheckCircle2,
  Briefcase,
  X,
  MessageSquare,
  DollarSign,
} from "@/components/icons";

// ==========================================
// DATA TYPES
// ==========================================
export type TabType = "overview" | "leads" | "properties" | "visits" | "deals" | "team" | "ai-copilot";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  bhk: string;
  location: string;
  budget: string;
  intent: "High" | "Medium" | "Low";
  matchScore: number;
  matchedProperty: string;
  status: "New" | "Contacted" | "Site Visit Scheduled" | "Negotiation" | "Closed";
  agent: string;
  lastActive: string;
}

export interface Property {
  id: string;
  title: string;
  developer: string;
  location: string;
  type: string;
  price: string;
  unitsAvailable: number;
  status: "Available" | "Filling Fast" | "Ready Possession";
  imageBg: string;
  matchCount: number;
}

export interface SiteVisit {
  id: string;
  leadName: string;
  propertyTitle: string;
  location: string;
  dateTime: string;
  agent: string;
  status: "Confirmed" | "Pending Confirmation" | "Completed";
}

export interface Deal {
  id: string;
  leadName: string;
  propertyTitle: string;
  buyerBid: string;
  builderCounter: string;
  agreedPrice: string;
  commission: string;
  stage: "Offer Placed" | "In Negotiation" | "Token Received" | "Closed Deal";
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Agency Admin" | "Senior Broker" | "Field Agent" | "Property Consultant";
  status: "Active" | "Invited";
  dealsClosed: number;
  activeLeads: number;
  avatar: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIntentFilter, setSelectedIntentFilter] = useState<string>("All");
  
  // Modals state
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Form states
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadBhk, setNewLeadBhk] = useState("2 BHK");
  const [newLeadLocation, setNewLeadLocation] = useState("Dombivli East");
  const [newLeadBudget, setNewLeadBudget] = useState("₹80L - ₹95L");
  const [newLeadIntent, setNewLeadIntent] = useState<"High" | "Medium" | "Low">("High");

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Senior Broker");

  // CRM Data State
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "LD-101",
      name: "Rahul Mehta",
      phone: "+91 98201 44321",
      email: "rahul.mehta@gmail.com",
      bhk: "2 BHK Luxury",
      location: "Dombivli East",
      budget: "₹85L - ₹95L",
      intent: "High",
      matchScore: 94,
      matchedProperty: "Lodha Palava Lakeshore Greens",
      status: "Site Visit Scheduled",
      agent: "Aarav Sharma",
      lastActive: "10 mins ago",
    },
    {
      id: "LD-102",
      name: "Pooja Sharma",
      phone: "+91 98190 23145",
      email: "pooja.s@techcorp.in",
      bhk: "3 BHK Premium",
      location: "Thane West",
      budget: "₹1.40 Cr - ₹1.65 Cr",
      intent: "High",
      matchScore: 96,
      matchedProperty: "Raymond Realty TenX Habitat",
      status: "Negotiation",
      agent: "Vikram Malhotra",
      lastActive: "1 hour ago",
    },
    {
      id: "LD-103",
      name: "Amitabh Sen",
      phone: "+91 98402 11984",
      email: "amitabh.sen@consult.com",
      bhk: "4 BHK Sea View",
      location: "Worli, Mumbai",
      budget: "₹5.50 Cr - ₹6.20 Cr",
      intent: "Medium",
      matchScore: 89,
      matchedProperty: "Lodha World View",
      status: "Contacted",
      agent: "Ananya Iyer",
      lastActive: "3 hours ago",
    },
    {
      id: "LD-104",
      name: "Sneha Kapadia",
      phone: "+91 97234 56123",
      email: "sneha.k@designstudio.org",
      bhk: "1 BHK Compact",
      location: "Kalyan West",
      budget: "₹45L - ₹52L",
      intent: "High",
      matchScore: 91,
      matchedProperty: "Godrej Riviera Heights",
      status: "New",
      agent: "Aarav Sharma",
      lastActive: "Just now",
    },
    {
      id: "LD-105",
      name: "Rohan Varma",
      phone: "+91 99304 88712",
      email: "rohan.varma@fintech.co",
      bhk: "3 BHK Deck Residence",
      location: "Bandra West",
      budget: "₹3.80 Cr - ₹4.50 Cr",
      intent: "Medium",
      matchScore: 87,
      matchedProperty: "Rustomjee Seasons",
      status: "Contacted",
      agent: "Vikram Malhotra",
      lastActive: "Yesterday",
    },
  ]);

  const [properties] = useState<Property[]>([
    {
      id: "PROP-01",
      title: "Lodha Palava Lakeshore Greens",
      developer: "Lodha Group",
      location: "Dombivli East, MMR",
      type: "1, 2 & 3 BHK",
      price: "₹52L - ₹1.15 Cr",
      unitsAvailable: 14,
      status: "Filling Fast",
      imageBg: "from-sky-700 to-indigo-900",
      matchCount: 18,
    },
    {
      id: "PROP-02",
      title: "Raymond Realty TenX Habitat",
      developer: "Raymond Realty",
      location: "Pokhran Rd 2, Thane West",
      type: "2 & 3 BHK Highrise",
      price: "₹1.25 Cr - ₹1.95 Cr",
      unitsAvailable: 8,
      status: "Available",
      imageBg: "from-emerald-700 to-teal-900",
      matchCount: 24,
    },
    {
      id: "PROP-03",
      title: "Godrej Riviera Luxury Towers",
      developer: "Godrej Properties",
      location: "Kalyan-Bhiwandi Rd",
      type: "1 & 2 BHK Modern",
      price: "₹45L - ₹78L",
      unitsAvailable: 22,
      status: "Ready Possession",
      imageBg: "from-blue-700 to-slate-900",
      matchCount: 31,
    },
    {
      id: "PROP-04",
      title: "Rustomjee Seasons Elite",
      developer: "Rustomjee",
      location: "Bandra East (BKC Annexe)",
      type: "3 & 4 BHK Luxury Deck",
      price: "₹3.80 Cr - ₹7.20 Cr",
      unitsAvailable: 5,
      status: "Filling Fast",
      imageBg: "from-amber-700 to-slate-900",
      matchCount: 12,
    },
  ]);

  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([
    {
      id: "VIS-1",
      leadName: "Rahul Mehta",
      propertyTitle: "Lodha Palava Lakeshore Greens",
      location: "Dombivli East",
      dateTime: "Saturday • 11:30 AM",
      agent: "Aarav Sharma",
      status: "Confirmed",
    },
    {
      id: "VIS-2",
      leadName: "Sneha Kapadia",
      propertyTitle: "Godrej Riviera Heights",
      location: "Kalyan West",
      dateTime: "Sunday • 3:00 PM",
      agent: "Aarav Sharma",
      status: "Pending Confirmation",
    },
    {
      id: "VIS-3",
      leadName: "Pooja Sharma",
      propertyTitle: "Raymond Realty TenX",
      location: "Thane West",
      dateTime: "Yesterday • 4:30 PM",
      agent: "Vikram Malhotra",
      status: "Completed",
    },
  ]);

  const [deals] = useState<Deal[]>([
    {
      id: "DL-901",
      leadName: "Pooja Sharma",
      propertyTitle: "Raymond Realty TenX Habitat (Unit 1402)",
      buyerBid: "₹1.48 Cr",
      builderCounter: "₹1.52 Cr (Stamp Duty 50% waiver)",
      agreedPrice: "₹1.50 Cr",
      commission: "2.0% (₹3,00,000)",
      stage: "In Negotiation",
    },
    {
      id: "DL-902",
      leadName: "Kunal Singhania",
      propertyTitle: "Lodha World One (Unit 2201)",
      buyerBid: "₹5.80 Cr",
      builderCounter: "₹5.90 Cr",
      agreedPrice: "₹5.85 Cr",
      commission: "2.0% (₹11,70,000)",
      stage: "Token Received",
    },
  ]);

  const [team, setTeam] = useState<TeamMember[]>([
    {
      id: "TM-1",
      name: "Aarav Sharma",
      email: "aarav@propflow.ai",
      role: "Senior Broker",
      status: "Active",
      dealsClosed: 14,
      activeLeads: 28,
      avatar: "AS",
    },
    {
      id: "TM-2",
      name: "Vikram Malhotra",
      email: "vikram@propflow.ai",
      role: "Senior Broker",
      status: "Active",
      dealsClosed: 19,
      activeLeads: 34,
      avatar: "VM",
    },
    {
      id: "TM-3",
      name: "Ananya Iyer",
      email: "ananya@propflow.ai",
      role: "Property Consultant",
      status: "Active",
      dealsClosed: 11,
      activeLeads: 22,
      avatar: "AI",
    },
    {
      id: "TM-4",
      name: "Rohan Deshmukh",
      email: "rohan.d@partneragency.com",
      role: "Field Agent",
      status: "Invited",
      dealsClosed: 0,
      activeLeads: 0,
      avatar: "RD",
    },
  ]);

  // Show temporary toast feedback
  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg(null);
    }, 4000);
  };

  // Add Lead Handler
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone) return;

    const newCreatedLead: Lead = {
      id: `LD-${Math.floor(100 + Math.random() * 900)}`,
      name: newLeadName,
      phone: newLeadPhone,
      email: newLeadEmail || `${newLeadName.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
      bhk: newLeadBhk,
      location: newLeadLocation,
      budget: newLeadBudget,
      intent: newLeadIntent,
      matchScore: Math.floor(85 + Math.random() * 12),
      matchedProperty: "Lodha Palava Lakeshore Greens",
      status: "New",
      agent: "Aarav Sharma",
      lastActive: "Just now",
    };

    setLeads([newCreatedLead, ...leads]);
    setIsAddLeadOpen(false);
    setNewLeadName("");
    setNewLeadPhone("");
    setNewLeadEmail("");
    showToast(`Lead "${newCreatedLead.name}" added successfully with instant AI matching!`);
  };

  // Invite Team Member Handler
  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    const newMember: TeamMember = {
      id: `TM-${Math.floor(10 + Math.random() * 90)}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      status: "Invited",
      dealsClosed: 0,
      activeLeads: 0,
      avatar: inviteName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    };

    setTeam([...team, newMember]);
    setIsInviteModalOpen(false);
    setInviteEmail("");
    setInviteName("");
    showToast(`Invitation sent to ${inviteEmail} for role: ${inviteRole}`);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.bhk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.matchedProperty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIntent = selectedIntentFilter === "All" || l.intent === selectedIntentFilter;
    return matchesSearch && matchesIntent;
  });

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#0F172A] flex font-sans ambient-wave-bg antialiased selection:bg-[#00A3FF] selection:text-white">
      
      {/* Toast Notification Banner */}
      {notificationMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 animate-slideUp">
          <CheckCircle2 size={18} className="text-[#00A3FF] shrink-0" />
          <span className="text-sm font-medium">{notificationMsg}</span>
          <button
            onClick={() => setNotificationMsg(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ============================================================
          SIDEBAR NAVIGATION
         ============================================================ */}
      <aside className="w-64 border-r border-slate-200/90 bg-white/95 backdrop-blur-md flex flex-col justify-between hidden md:flex shrink-0 z-30">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#00A3FF] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900">PropFlow</span>
                <span className="text-[10px] block font-mono text-[#00A3FF] font-semibold">CRM WORKSPACE</span>
              </div>
            </Link>
          </div>

          {/* Nav List */}
          <nav className="p-4 space-y-1.5 text-sm font-medium" aria-label="Dashboard Navigation">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "overview"
                  ? "bg-[#00A3FF] text-white font-semibold shadow-sm cyan-glow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <TrendingUp size={18} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "leads"
                  ? "bg-[#00A3FF] text-white font-semibold shadow-sm cyan-glow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users size={18} />
                <span>Leads & Buyers</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === "leads" ? "bg-white/20 text-white" : "bg-sky-100 text-[#00A3FF]"
              }`}>
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("properties")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "properties"
                  ? "bg-[#00A3FF] text-white font-semibold shadow-sm cyan-glow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 size={18} />
                <span>Properties</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600">
                {properties.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("visits")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "visits"
                  ? "bg-[#00A3FF] text-white font-semibold shadow-sm cyan-glow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar size={18} />
                <span>Site Visits</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                {siteVisits.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("deals")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "deals"
                  ? "bg-[#00A3FF] text-white font-semibold shadow-sm cyan-glow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <Briefcase size={18} />
              <span>Deal Pipeline</span>
            </button>

            <button
              onClick={() => setActiveTab("team")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "team"
                  ? "bg-[#00A3FF] text-white font-semibold shadow-sm cyan-glow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <UserPlus size={18} />
                <span>Team & Invites</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">
                {team.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("ai-copilot")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "ai-copilot"
                  ? "bg-[#00A3FF] text-white font-semibold shadow-sm cyan-glow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <Sparkles size={18} className="text-amber-500" />
              <span>AI Match Engine</span>
            </button>
          </nav>
        </div>

        {/* User Account & Sign Out */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              AS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Aarav Sharma</p>
              <p className="text-[11px] text-slate-500 truncate">Senior Broker • Admin</p>
            </div>
          </div>

          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* ============================================================
          MAIN CONTENT AREA
         ============================================================ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top App Bar */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads, BHK, locations, properties..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00A3FF] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
            >
              <UserPlus size={15} />
              <span>Invite Team</span>
            </button>

            <button
              onClick={() => setIsAddLeadOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00A3FF] hover:bg-[#0090E0] text-white text-xs font-bold transition-all shadow-sm cyan-glow-sm hover:scale-[1.02]"
            >
              <Plus size={15} />
              <span>Add Lead</span>
            </button>

            {/* Notification Icon */}
            <div className="relative p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer">
              <Bell size={17} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00A3FF]" />
            </div>
          </div>
        </header>

        {/* Mobile Navigation Pills */}
        <div className="flex md:hidden overflow-x-auto gap-2 p-3 bg-white border-b border-slate-200 text-xs font-medium shrink-0">
          {(["overview", "leads", "properties", "visits", "deals", "team", "ai-copilot"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full capitalize shrink-0 ${
                activeTab === tab ? "bg-[#00A3FF] text-white font-bold" : "bg-slate-100 text-slate-600"
              }`}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Main Dashboard Body */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* ============================================================
              TAB: OVERVIEW
             ============================================================ */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Executive Welcome Greeting */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
                    Welcome back, Aarav 👋
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Here is what is happening across your PropFlow Real Estate Agency pipeline today.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    PropFlow AI Telemetry Active
                  </span>
                </div>
              </div>

              {/* KPI Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                {/* Metric 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm card-hover-lift">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Total Active Leads</span>
                    <div className="p-2 rounded-xl bg-sky-50 text-[#00A3FF]">
                      <Users size={16} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{leads.length}</div>
                    <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                      <TrendingUp size={13} /> +18% from last week
                    </div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm card-hover-lift">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Active Deal Pipeline</span>
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <DollarSign size={16} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">₹7.35 Cr</div>
                    <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                      <TrendingUp size={13} /> 2 deals in final negotiation
                    </div>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm card-hover-lift">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Scheduled Site Visits</span>
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                      <Calendar size={16} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{siteVisits.length}</div>
                    <div className="text-xs text-amber-700 font-semibold flex items-center gap-1 mt-1">
                      Upcoming this weekend
                    </div>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm card-hover-lift">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Team Members</span>
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                      <UserPlus size={16} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{team.length} Brokers</div>
                    <div className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-1">
                      4 active territories
                    </div>
                  </div>
                </div>

              </div>

              {/* Split Content: High Priority Leads + Upcoming Site Visits */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* High Priority Leads (Cols 1-7) */}
                <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200/90 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-[#00A3FF]" />
                      <h3 className="text-base font-bold text-slate-900">AI Priority Matched Leads</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("leads")}
                      className="text-xs font-semibold text-[#00A3FF] hover:underline"
                    >
                      View All Leads →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {leads.slice(0, 3).map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-[#00A3FF]/40 hover:bg-sky-50/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{lead.name}</span>
                            <span className="px-2 py-0.5 rounded-full bg-sky-100 text-[#00A3FF] text-[10px] font-bold">
                              {lead.matchScore}% Match
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {lead.bhk} • {lead.location} • <span className="font-semibold text-slate-700">{lead.budget}</span>
                          </p>
                          <p className="text-[11px] text-[#00A3FF] font-medium flex items-center gap-1">
                            <Building2 size={12} /> {lead.matchedProperty}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {lead.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Site Visits (Cols 8-12) */}
                <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/90 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-amber-500" />
                      <h3 className="text-base font-bold text-slate-900">Upcoming Site Visits</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("visits")}
                      className="text-xs font-semibold text-[#00A3FF] hover:underline"
                    >
                      Calendar →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {siteVisits.map((vis) => (
                      <div
                        key={vis.id}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">{vis.leadName}</span>
                          <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                            vis.status === "Confirmed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}>
                            {vis.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium truncate">
                          {vis.propertyTitle} ({vis.location})
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                          <span>🕒 {vis.dateTime}</span>
                          <span>Assigned: {vis.agent}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ============================================================
              TAB: LEADS MANAGEMENT
             ============================================================ */}
          {activeTab === "leads" && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header & Filter Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Leads & Client Intelligence</h2>
                  <p className="text-xs text-slate-500">Track buyer requirements, intent scoring, and automated matches</p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Intent Filter */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    {["All", "High", "Medium"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setSelectedIntentFilter(filter)}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          selectedIntentFilter === filter
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {filter === "All" ? "All Intents" : `${filter} Intent`}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsAddLeadOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00A3FF] hover:bg-[#0090E0] text-white text-xs font-bold transition-all shadow-sm cyan-glow-sm"
                  >
                    <Plus size={15} />
                    <span>New Lead</span>
                  </button>
                </div>
              </div>

              {/* Leads Table Container */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase font-bold tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Lead Name</th>
                        <th className="py-3.5 px-4">Requirement</th>
                        <th className="py-3.5 px-4">Budget</th>
                        <th className="py-3.5 px-4">AI Match</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Assigned Broker</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                      {filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-sky-50/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{lead.name}</div>
                            <div className="text-xs text-slate-400">{lead.phone}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div>{lead.bhk}</div>
                            <div className="text-xs text-slate-500">{lead.location}</div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">{lead.budget}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-[#00A3FF]">{lead.matchScore}%</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-[#00A3FF] font-semibold">
                                {lead.intent} Intent
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 truncate max-w-xs">{lead.matchedProperty}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{lead.agent}</td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                showToast(`WhatsApp message template copied for ${lead.name}`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors inline-flex items-center gap-1 mr-2"
                            >
                              <MessageSquare size={13} />
                              <span>WhatsApp</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================
              TAB: PROPERTIES INVENTORY
             ============================================================ */}
          {activeTab === "properties" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Property Listings & Inventory</h2>
                  <p className="text-xs text-slate-500">Live builder inventory mapped with automated buyer matching</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {properties.map((prop) => (
                  <div
                    key={prop.id}
                    className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm card-hover-lift flex flex-col justify-between"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold text-[#00A3FF] uppercase tracking-wider">{prop.developer}</span>
                          <h3 className="text-lg font-bold text-slate-900 mt-0.5">{prop.title}</h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin size={13} /> {prop.location}
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-[#00A3FF] border border-sky-200">
                          {prop.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-100 text-xs">
                        <div>
                          <span className="text-slate-400 block">Configurations</span>
                          <span className="font-bold text-slate-800">{prop.type}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Price Range</span>
                          <span className="font-bold text-slate-800">{prop.price}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Units Available</span>
                          <span className="font-bold text-emerald-600">{prop.unitsAvailable} Units</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        ✨ <span className="font-bold text-slate-800">{prop.matchCount} High-Intent Buyers</span> matched
                      </span>
                      <button
                        onClick={() => {
                          setActiveTab("leads");
                          setSearchQuery(prop.title.split(" ")[0]);
                        }}
                        className="font-bold text-[#00A3FF] hover:underline"
                      >
                        View Matched Leads →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================
              TAB: SITE VISITS
             ============================================================ */}
          {activeTab === "visits" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Site Visits & Follow-Up Calendar</h2>
                  <p className="text-xs text-slate-500">Scheduled client walkthroughs, builder slots, and visit logs</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {siteVisits.map((vis) => (
                  <div
                    key={vis.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400 font-semibold">{vis.id}</span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                        vis.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : vis.status === "Pending Confirmation"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {vis.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900">{vis.leadName}</h3>
                      <p className="text-xs text-[#00A3FF] font-semibold mt-0.5">{vis.propertyTitle}</p>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin size={13} /> {vis.location}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                      <div className="font-semibold text-slate-800">🗓️ {vis.dateTime}</div>
                      <div className="text-slate-500">Lead Broker: {vis.agent}</div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          setSiteVisits((prev) =>
                            prev.map((v) => (v.id === vis.id ? { ...v, status: "Confirmed" } : v))
                          );
                          showToast(`Visit for ${vis.leadName} confirmed.`);
                        }}
                        className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
                      >
                        Confirm Slot
                      </button>
                      <button
                        onClick={() => showToast(`Automated WhatsApp reminder sent to ${vis.leadName}.`)}
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                        title="Send WhatsApp Reminder"
                      >
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================
              TAB: DEALS & NEGOTIATION
             ============================================================ */}
          {activeTab === "deals" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Deal Pipeline & Commission Guard</h2>
                <p className="text-xs text-slate-500">Real-time buyer vs builder spread mapping and brokerage protection</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {deals.map((dl) => (
                  <div
                    key={dl.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-5"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#00A3FF]">{dl.id}</span>
                        <h3 className="text-base font-bold text-slate-900">{dl.leadName}</h3>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {dl.stage}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-semibold">{dl.propertyTitle}</p>

                    <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                      <div>
                        <span className="text-slate-400 block">Buyer Bid</span>
                        <span className="font-bold text-slate-900 text-sm">{dl.buyerBid}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Developer Counter</span>
                        <span className="font-bold text-slate-900 text-sm">{dl.builderCounter}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-slate-400 block">Target Agreed Price</span>
                        <span className="font-extrabold text-emerald-600 text-sm">{dl.agreedPrice}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-slate-400 block">Secured Brokerage</span>
                        <span className="font-extrabold text-[#00A3FF] text-sm">{dl.commission}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================
              TAB: TEAM & INVITES
             ============================================================ */}
          {activeTab === "team" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Team Management & Invites</h2>
                  <p className="text-xs text-slate-500">Invite brokers, assign agency territories, and manage permissions</p>
                </div>

                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00A3FF] hover:bg-[#0090E0] text-white text-xs font-bold transition-all shadow-sm cyan-glow-sm"
                >
                  <UserPlus size={15} />
                  <span>Invite New Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
                          {member.avatar}
                        </div>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                          member.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {member.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                        <p className="text-xs text-[#00A3FF] font-semibold">{member.role}</p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{member.email}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Deals Closed</span>
                        <span className="font-bold text-slate-800">{member.dealsClosed}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Active Leads</span>
                        <span className="font-bold text-slate-800">{member.activeLeads}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================
              TAB: AI COPILOT & MATCH ENGINE
             ============================================================ */}
          {activeTab === "ai-copilot" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold tracking-wider">
                  <Sparkles size={16} />
                  <span>PROPFLOW AUTONOMOUS MATCH ENGINE</span>
                </div>

                <div className="max-w-2xl space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold">Ask AI Copilot for Instant Broker Intelligence</h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Search your entire inventory and database with natural language queries to instantly find matching high-intent buyers.
                  </p>
                </div>

                {/* Command Bar */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    "Find buyers for 2 BHK in Dombivli under ₹95L",
                    "Show leads with 90%+ match score",
                    "Generate WhatsApp follow-up for Rahul Mehta",
                    "List deals ready for token agreement",
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        showToast(`Running AI Query: "${prompt}"`);
                        setActiveTab("leads");
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all text-left flex items-center gap-2"
                    >
                      <span>⚡ {prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ============================================================
          MODAL: ADD NEW LEAD
         ============================================================ */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-50 text-[#00A3FF]">
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Add New Lead</h3>
                  <p className="text-xs text-slate-500">Instant AI qualification and property matching</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddLeadOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Kunal Singhania"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00A3FF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00A3FF]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    placeholder="kunal@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00A3FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">BHK Preference</label>
                  <select
                    value={newLeadBhk}
                    onChange={(e) => setNewLeadBhk(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#00A3FF]"
                  >
                    <option>1 BHK Compact</option>
                    <option>2 BHK Luxury</option>
                    <option>3 BHK Premium</option>
                    <option>4 BHK Sea View</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Intent Level</label>
                  <select
                    value={newLeadIntent}
                    onChange={(e) => setNewLeadIntent(e.target.value as "High" | "Medium" | "Low")}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#00A3FF]"
                  >
                    <option value="High">🔥 High Intent</option>
                    <option value="Medium">⚡ Medium Intent</option>
                    <option value="Low">🌱 Low / Exploring</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Preferred Location</label>
                  <input
                    type="text"
                    value={newLeadLocation}
                    onChange={(e) => setNewLeadLocation(e.target.value)}
                    placeholder="e.g. Thane West"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#00A3FF]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Budget Range</label>
                  <input
                    type="text"
                    value={newLeadBudget}
                    onChange={(e) => setNewLeadBudget(e.target.value)}
                    placeholder="e.g. ₹85L - ₹95L"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#00A3FF]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00A3FF] hover:bg-[#0090E0] text-white font-bold transition-all shadow-sm cyan-glow-sm"
                >
                  Save & AI Match Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: INVITE TEAM MEMBER
         ============================================================ */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-50 text-[#00A3FF]">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Invite Team Member</h3>
                  <p className="text-xs text-slate-500">Add brokers & agents to your PropFlow CRM</p>
                </div>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleInviteMember} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Priya Nambiar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00A3FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="priya@agency.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00A3FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Role & Permissions</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as TeamMember["role"])}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#00A3FF]"
                >
                  <option value="Senior Broker">Senior Broker (Full pipeline + deals)</option>
                  <option value="Field Agent">Field Agent (Site visits + leads)</option>
                  <option value="Property Consultant">Property Consultant</option>
                  <option value="Agency Admin">Agency Admin (Full access)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00A3FF] hover:bg-[#0090E0] text-white font-bold transition-all shadow-sm cyan-glow-sm"
                >
                  Send Invite Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          DRAWER / MODAL: LEAD DETAILS & AI INSIGHTS
         ============================================================ */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#00A3FF] font-bold text-sm flex items-center justify-center">
                  {selectedLead.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedLead.name}</h3>
                  <p className="text-xs text-slate-500">{selectedLead.phone} • {selectedLead.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Match Highlight */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A3FF]">AI Property Match</span>
                <span className="text-xs font-extrabold text-[#00A3FF]">{selectedLead.matchScore}% Match Score</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{selectedLead.matchedProperty}</p>
              <p className="text-xs text-slate-600">
                Matches budget ({selectedLead.budget}) and {selectedLead.bhk} preference in {selectedLead.location}.
              </p>
            </div>

            {/* Lead Meta */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block">Lead Status</span>
                <span className="font-bold text-slate-800">{selectedLead.status}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block">Assigned Broker</span>
                <span className="font-bold text-slate-800">{selectedLead.agent}</span>
              </div>
            </div>

            {/* AI Next Best Action */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
              <Sparkles size={16} className="text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold block">AI Recommended Next Step</span>
                <span>Send WhatsApp brochure and schedule physical site visit for Saturday.</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  showToast(`WhatsApp message opened for ${selectedLead.name}`);
                  setSelectedLead(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <MessageSquare size={15} />
                <span>Send WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  showToast(`Site visit drafted for ${selectedLead.name}`);
                  setSelectedLead(null);
                  setActiveTab("visits");
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#00A3FF] hover:bg-[#0090E0] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar size={15} />
                <span>Schedule Visit</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
