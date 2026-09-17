"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      bhk: "4 BHK Ultra",
      location: "Worli, South Mumbai",
      budget: "₹5.50 Cr - ₹6.20 Cr",
      intent: "Medium",
      matchScore: 88,
      matchedProperty: "Lodha World Towers",
      status: "Contacted",
      agent: "Aarav Sharma",
      lastActive: "3 hours ago",
    },
    {
      id: "LD-104",
      name: "Sneha Kapadia",
      phone: "+91 97699 00812",
      email: "sneha.k@designstudio.io",
      bhk: "1 BHK Compact",
      location: "Kalyan West",
      budget: "₹42L - ₹48L",
      intent: "High",
      matchScore: 91,
      matchedProperty: "Godrej Riviera Heights",
      status: "New",
      agent: "Ananya Iyer",
      lastActive: "5 hours ago",
    },
    {
      id: "LD-105",
      name: "Kunal Singhania",
      phone: "+91 99300 77123",
      email: "kunal@singhaniagroup.com",
      bhk: "3 BHK Sea View",
      location: "Prabhadevi",
      budget: "₹4.80 Cr - ₹5.40 Cr",
      intent: "High",
      matchScore: 97,
      matchedProperty: "Rustomjee Crown",
      status: "Closed",
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
      type: "1, 2 & 3 BHK Smart Homes",
      price: "₹48.5 L - ₹98.0 L",
      unitsAvailable: 24,
      status: "Filling Fast",
      imageBg: "from-[#FF5C1C]/10 to-[#111111]/5",
      matchCount: 14,
    },
    {
      id: "PROP-02",
      title: "Raymond Realty TenX Habitat",
      developer: "Raymond Realty",
      location: "Pokhran Road No. 2, Thane West",
      type: "2 & 3 BHK Premium Residences",
      price: "₹1.15 Cr - ₹1.72 Cr",
      unitsAvailable: 12,
      status: "Available",
      imageBg: "from-amber-500/10 to-stone-900/5",
      matchCount: 19,
    },
    {
      id: "PROP-03",
      title: "Godrej Riviera Heights",
      developer: "Godrej Properties",
      location: "Kalyan Waterfront, Thane",
      type: "1 & 2 BHK Riverside Living",
      price: "₹42.0 L - ₹68.5 L",
      unitsAvailable: 31,
      status: "Ready Possession",
      imageBg: "from-emerald-500/10 to-stone-900/5",
      matchCount: 8,
    },
    {
      id: "PROP-04",
      title: "Lodha World Towers",
      developer: "Lodha Luxury",
      location: "Worli, South Mumbai",
      type: "3, 4 & 5 BHK Duplex Suites",
      price: "₹5.20 Cr - ₹14.50 Cr",
      unitsAvailable: 5,
      status: "Filling Fast",
      imageBg: "from-[#FF5C1C]/20 to-black/10",
      matchCount: 6,
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#111111] flex font-sans antialiased selection:bg-[#FF5C1C] selection:text-white">
      
      {/* Toast Notification Banner */}
      {notificationMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#111111] text-white shadow-2xl border border-[#262626] animate-slideUp">
          <CheckCircle2 size={18} className="text-[#FF5C1C] shrink-0" />
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
          SIDEBAR NAVIGATION (Editorial Design System)
         ============================================================ */}
      <aside className="w-64 border-r border-[#EAE3D8] bg-[#FAF7F2] flex flex-col justify-between hidden md:flex shrink-0 z-30">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#EAE3D8] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-[#FF5C1C] p-1 flex items-center justify-center text-white font-bold shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Image
                  src="/logo.svg"
                  alt="PropFlow Logo"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain filter invert brightness-200"
                />
              </div>
              <div>
                <span className="text-xl font-serif font-bold tracking-tight text-[#111111] leading-none block">PropFlow</span>
                <span className="text-[10px] font-sans font-bold text-[#FF5C1C] tracking-wider block mt-0.5">AGENCY WORKSPACE</span>
              </div>
            </Link>
          </div>

          {/* Nav List */}
          <nav className="p-4 space-y-1.5 text-xs font-medium" aria-label="Dashboard Navigation">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                activeTab === "overview"
                  ? "bg-[#111111] text-white font-bold shadow-xs border-l-4 border-[#FF5C1C]"
                  : "text-[#111111]/70 hover:text-[#111111] hover:bg-[#FDEEE6]/50 font-semibold"
              }`}
            >
              <TrendingUp size={17} className={activeTab === "overview" ? "text-[#FF5C1C]" : ""} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
                activeTab === "leads"
                  ? "bg-[#111111] text-white font-bold shadow-xs border-l-4 border-[#FF5C1C]"
                  : "text-[#111111]/70 hover:text-[#111111] hover:bg-[#FDEEE6]/50 font-semibold"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users size={17} className={activeTab === "leads" ? "text-[#FF5C1C]" : ""} />
                <span>Leads & Buyers</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === "leads" ? "bg-[#FF5C1C] text-white" : "bg-[#FDEEE6] text-[#FF5C1C]"
              }`}>
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("properties")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
                activeTab === "properties"
                  ? "bg-[#111111] text-white font-bold shadow-xs border-l-4 border-[#FF5C1C]"
                  : "text-[#111111]/70 hover:text-[#111111] hover:bg-[#FDEEE6]/50 font-semibold"
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 size={17} className={activeTab === "properties" ? "text-[#FF5C1C]" : ""} />
                <span>Properties</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-[#FAF7F2] border border-[#EAE3D8] text-[#111111]/70">
                {properties.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("visits")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
                activeTab === "visits"
                  ? "bg-[#111111] text-white font-bold shadow-xs border-l-4 border-[#FF5C1C]"
                  : "text-[#111111]/70 hover:text-[#111111] hover:bg-[#FDEEE6]/50 font-semibold"
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar size={17} className={activeTab === "visits" ? "text-[#FF5C1C]" : ""} />
                <span>Site Visits</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-[#FDEEE6] text-[#FF5C1C]">
                {siteVisits.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("deals")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                activeTab === "deals"
                  ? "bg-[#111111] text-white font-bold shadow-xs border-l-4 border-[#FF5C1C]"
                  : "text-[#111111]/70 hover:text-[#111111] hover:bg-[#FDEEE6]/50 font-semibold"
              }`}
            >
              <Briefcase size={17} className={activeTab === "deals" ? "text-[#FF5C1C]" : ""} />
              <span>Deal Pipeline</span>
            </button>

            <button
              onClick={() => setActiveTab("team")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
                activeTab === "team"
                  ? "bg-[#111111] text-white font-bold shadow-xs border-l-4 border-[#FF5C1C]"
                  : "text-[#111111]/70 hover:text-[#111111] hover:bg-[#FDEEE6]/50 font-semibold"
              }`}
            >
              <div className="flex items-center gap-3">
                <UserPlus size={17} className={activeTab === "team" ? "text-[#FF5C1C]" : ""} />
                <span>Team & Invites</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                {team.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("ai-copilot")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                activeTab === "ai-copilot"
                  ? "bg-[#111111] text-white font-bold shadow-xs border-l-4 border-[#FF5C1C]"
                  : "text-[#111111]/70 hover:text-[#111111] hover:bg-[#FDEEE6]/50 font-semibold"
              }`}
            >
              <Sparkles size={17} className="text-[#FF5C1C]" />
              <span>AI Match Engine</span>
            </button>
          </nav>
        </div>

        {/* User Account & Sign Out */}
        <div className="p-4 border-t border-[#EAE3D8] space-y-3">
          <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3D8] flex items-center gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#FF5C1C] text-white font-serif font-bold text-xs flex items-center justify-center">
              AS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#111111] truncate">Aarav Sharma</p>
              <p className="text-[11px] text-slate-500 truncate">Senior Broker • Admin</p>
            </div>
          </div>

          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-xs font-bold text-slate-600 hover:text-[#FF5C1C] hover:bg-[#FDEEE6]/60 transition-colors"
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
        <header className="sticky top-0 z-20 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EAE3D8] px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads, BHK, locations, properties..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-[#EAE3D8] text-xs sm:text-sm text-[#111111] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C1C]/30 focus:border-[#FF5C1C] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#111111] text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FDEEE6] hover:bg-[#FDEEE6]/80 text-[#FF5C1C] text-xs font-bold transition-all border border-[#FF5C1C]/20"
            >
              <UserPlus size={15} />
              <span>Invite Team</span>
            </button>

            <button
              onClick={() => setIsAddLeadOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5C1C] hover:bg-[#E04809] text-white text-xs font-bold transition-all shadow-xs hover:scale-[1.02]"
            >
              <Plus size={15} />
              <span>Add Lead</span>
            </button>

            {/* Notification Icon */}
            <div className="relative p-2.5 rounded-full bg-white border border-[#EAE3D8] text-[#111111] hover:text-[#FF5C1C] cursor-pointer transition-colors shadow-xs">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5C1C]" />
            </div>
          </div>
        </header>

        {/* Mobile Navigation Pills */}
        <div className="flex md:hidden overflow-x-auto gap-2 p-3 bg-[#FAF7F2] border-b border-[#EAE3D8] text-xs font-medium shrink-0">
          {(["overview", "leads", "properties", "visits", "deals", "team", "ai-copilot"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-full capitalize shrink-0 font-bold ${
                activeTab === tab ? "bg-[#FF5C1C] text-white" : "bg-white border border-[#EAE3D8] text-slate-700"
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#EAE3D8]">
                <div>
                  <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-[#111111]">
                    Welcome back, Aarav 👋
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Here is what is happening across your PropFlow Real Estate Agency pipeline today.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FDEEE6] text-[#FF5C1C] border border-[#FF5C1C]/20 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#FF5C1C] animate-pulse" />
                    PropFlow AI Telemetry Active
                  </span>
                </div>
              </div>

              {/* KPI Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                {/* Metric 1 */}
                <div className="p-6 rounded-3xl bg-white border border-[#EAE3D8] shadow-xs hover:border-[#FF5C1C]/40 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <span>Total Active Leads</span>
                    <div className="p-2.5 rounded-2xl bg-[#FDEEE6] text-[#FF5C1C]">
                      <Users size={18} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-serif font-bold text-[#111111]">{leads.length}</div>
                    <div className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-1">
                      <TrendingUp size={13} /> +18% from last week
                    </div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-6 rounded-3xl bg-white border border-[#EAE3D8] shadow-xs hover:border-[#FF5C1C]/40 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <span>Active Deal Pipeline</span>
                    <div className="p-2.5 rounded-2xl bg-[#FDEEE6] text-[#FF5C1C]">
                      <DollarSign size={18} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-serif font-bold text-[#111111]">₹7.35 Cr</div>
                    <div className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-1">
                      <TrendingUp size={13} /> 2 deals in final negotiation
                    </div>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-6 rounded-3xl bg-white border border-[#EAE3D8] shadow-xs hover:border-[#FF5C1C]/40 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <span>Scheduled Site Visits</span>
                    <div className="p-2.5 rounded-2xl bg-[#FDEEE6] text-[#FF5C1C]">
                      <Calendar size={18} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-serif font-bold text-[#111111]">{siteVisits.length}</div>
                    <div className="text-xs text-[#FF5C1C] font-bold flex items-center gap-1 mt-1">
                      Upcoming this weekend
                    </div>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-6 rounded-3xl bg-white border border-[#EAE3D8] shadow-xs hover:border-[#FF5C1C]/40 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <span>Team Members</span>
                    <div className="p-2.5 rounded-2xl bg-[#FDEEE6] text-[#FF5C1C]">
                      <UserPlus size={18} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-serif font-bold text-[#111111]">{team.length} Brokers</div>
                    <div className="text-xs text-slate-500 font-bold flex items-center gap-1 mt-1">
                      4 active territories
                    </div>
                  </div>
                </div>

              </div>

              {/* Split Content: High Priority Leads + Upcoming Site Visits */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* High Priority Leads (Cols 1-7) */}
                <div className="lg:col-span-7 rounded-3xl bg-white border border-[#EAE3D8] p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EAE3D8] pb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-[#FF5C1C]" />
                      <h3 className="text-lg font-serif font-bold text-[#111111]">AI Priority Matched Leads</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("leads")}
                      className="text-xs font-bold text-[#FF5C1C] hover:underline"
                    >
                      View All Leads →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {leads.slice(0, 3).map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D8] hover:border-[#FF5C1C]/50 hover:bg-[#FDEEE6]/30 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-[#111111] text-base">{lead.name}</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FDEEE6] text-[#FF5C1C] text-[10px] font-extrabold border border-[#FF5C1C]/20">
                              {lead.matchScore}% Match
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {lead.bhk} • {lead.location} • <span className="font-bold text-[#111111]">{lead.budget}</span>
                          </p>
                          <p className="text-xs text-[#FF5C1C] font-semibold flex items-center gap-1">
                            <Building2 size={13} /> {lead.matchedProperty}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs px-3 py-1 rounded-full font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {lead.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Site Visits (Cols 8-12) */}
                <div className="lg:col-span-5 rounded-3xl bg-white border border-[#EAE3D8] p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EAE3D8] pb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-[#FF5C1C]" />
                      <h3 className="text-lg font-serif font-bold text-[#111111]">Upcoming Site Visits</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("visits")}
                      className="text-xs font-bold text-[#FF5C1C] hover:underline"
                    >
                      Calendar →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {siteVisits.map((vis) => (
                      <div
                        key={vis.id}
                        className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D8] space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-serif font-bold text-[#111111] text-sm">{vis.leadName}</span>
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            vis.status === "Confirmed"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-[#FDEEE6] text-[#FF5C1C] border border-[#FF5C1C]/20"
                          }`}>
                            {vis.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-semibold truncate">
                          {vis.propertyTitle} ({vis.location})
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-[#EAE3D8]">
                          <span>🗓️ {vis.dateTime}</span>
                          <span>Broker: {vis.agent}</span>
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
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] tracking-tight">Leads & Client Intelligence</h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Track buyer requirements, intent scoring, and automated matches</p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Intent Filter */}
                  <div className="flex items-center gap-1 bg-white border border-[#EAE3D8] p-1 rounded-full text-xs font-bold">
                    {["All", "High", "Medium"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setSelectedIntentFilter(filter)}
                        className={`px-3.5 py-1.5 rounded-full transition-all ${
                          selectedIntentFilter === filter
                            ? "bg-[#111111] text-white shadow-xs"
                            : "text-slate-600 hover:text-[#111111]"
                        }`}
                      >
                        {filter === "All" ? "All Intents" : `${filter} Intent`}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsAddLeadOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF5C1C] hover:bg-[#E04809] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <Plus size={15} />
                    <span>New Lead</span>
                  </button>
                </div>
              </div>

              {/* Leads Table Container */}
              <div className="rounded-3xl bg-white border border-[#EAE3D8] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#111111] text-white text-xs uppercase font-serif tracking-wider">
                      <tr>
                        <th className="py-4 px-5">Lead Name</th>
                        <th className="py-4 px-5">Requirement</th>
                        <th className="py-4 px-5">Budget</th>
                        <th className="py-4 px-5">AI Match</th>
                        <th className="py-4 px-5">Status</th>
                        <th className="py-4 px-5">Assigned Broker</th>
                        <th className="py-4 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE3D8] text-[#111111] font-medium">
                      {filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-[#FDEEE6]/40 transition-colors cursor-pointer"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <td className="py-4 px-5">
                            <div className="font-serif font-bold text-[#111111] text-base">{lead.name}</div>
                            <div className="text-xs text-slate-500">{lead.phone}</div>
                          </td>
                          <td className="py-4 px-5">
                            <div className="font-semibold">{lead.bhk}</div>
                            <div className="text-xs text-slate-500">{lead.location}</div>
                          </td>
                          <td className="py-4 px-5 font-serif font-bold text-[#111111]">{lead.budget}</td>
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-[#FF5C1C] text-sm">{lead.matchScore}%</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FDEEE6] text-[#FF5C1C] font-bold border border-[#FF5C1C]/20">
                                {lead.intent} Intent
                              </span>
                            </div>
                            <div className="text-xs text-slate-600 truncate max-w-xs">{lead.matchedProperty}</div>
                          </td>
                          <td className="py-4 px-5">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-slate-600 font-semibold">{lead.agent}</td>
                          <td className="py-4 px-5 text-right">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                showToast(`WhatsApp message template copied for ${lead.name}`);
                              }}
                              className="px-3 py-1.5 rounded-full bg-[#FF5C1C] hover:bg-[#E04809] text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-xs"
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
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] tracking-tight">Property Listings & Inventory</h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Live builder inventory mapped with automated buyer matching</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {properties.map((prop) => (
                  <div
                    key={prop.id}
                    className="rounded-3xl bg-white border border-[#EAE3D8] overflow-hidden shadow-xs hover:border-[#FF5C1C]/40 transition-all flex flex-col justify-between"
                  >
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold text-[#FF5C1C] uppercase tracking-wider">{prop.developer}</span>
                          <h3 className="text-xl font-serif font-bold text-[#111111] mt-1">{prop.title}</h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin size={14} className="text-[#FF5C1C]" /> {prop.location}
                          </p>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FDEEE6] text-[#FF5C1C] border border-[#FF5C1C]/20">
                          {prop.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#EAE3D8] text-xs">
                        <div>
                          <span className="text-slate-500 block">Configurations</span>
                          <span className="font-bold text-[#111111] text-sm">{prop.type}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Price Range</span>
                          <span className="font-bold text-[#111111] text-sm">{prop.price}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Units Available</span>
                          <span className="font-bold text-emerald-700 text-sm">{prop.unitsAvailable} Units</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#EAE3D8] flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">
                        ✨ <span className="font-bold text-[#111111]">{prop.matchCount} High-Intent Buyers</span> matched
                      </span>
                      <button
                        onClick={() => {
                          setActiveTab("leads");
                          setSearchQuery(prop.title.split(" ")[0]);
                        }}
                        className="font-bold text-[#FF5C1C] hover:underline"
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
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] tracking-tight">Site Visits & Follow-Up Calendar</h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Scheduled client walkthroughs, builder slots, and visit logs</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {siteVisits.map((vis) => (
                  <div
                    key={vis.id}
                    className="p-6 rounded-3xl bg-white border border-[#EAE3D8] shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400 font-bold">{vis.id}</span>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                        vis.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : vis.status === "Pending Confirmation"
                          ? "bg-[#FDEEE6] text-[#FF5C1C] border border-[#FF5C1C]/20"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {vis.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-serif font-bold text-[#111111]">{vis.leadName}</h3>
                      <p className="text-xs text-[#FF5C1C] font-bold mt-0.5">{vis.propertyTitle}</p>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin size={13} /> {vis.location}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D8] text-xs space-y-1">
                      <div className="font-bold text-[#111111]">🗓️ {vis.dateTime}</div>
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
                        className="flex-1 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-bold transition-all"
                      >
                        Confirm Slot
                      </button>
                      <button
                        onClick={() => showToast(`Automated WhatsApp reminder sent to ${vis.leadName}.`)}
                        className="p-2.5 rounded-full bg-[#FDEEE6] text-[#FF5C1C] hover:bg-[#FF5C1C] hover:text-white transition-colors"
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
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] tracking-tight">Deal Pipeline & Commission Guard</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Real-time buyer vs builder spread mapping and brokerage protection</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {deals.map((dl) => (
                  <div
                    key={dl.id}
                    className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D8] shadow-xs space-y-5"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D8]">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#FF5C1C]">{dl.id}</span>
                        <h3 className="text-xl font-serif font-bold text-[#111111]">{dl.leadName}</h3>
                      </div>
                      <span className="text-xs px-3.5 py-1 rounded-full font-bold bg-[#FDEEE6] text-[#FF5C1C] border border-[#FF5C1C]/20">
                        {dl.stage}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-bold">{dl.propertyTitle}</p>

                    <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D8] text-xs">
                      <div>
                        <span className="text-slate-500 block">Buyer Bid</span>
                        <span className="font-serif font-bold text-[#111111] text-base">{dl.buyerBid}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Developer Counter</span>
                        <span className="font-serif font-bold text-[#111111] text-base">{dl.builderCounter}</span>
                      </div>
                      <div className="pt-3 border-t border-[#EAE3D8]">
                        <span className="text-slate-500 block">Target Agreed Price</span>
                        <span className="font-serif font-bold text-emerald-700 text-base">{dl.agreedPrice}</span>
                      </div>
                      <div className="pt-3 border-t border-[#EAE3D8]">
                        <span className="text-slate-500 block">Secured Brokerage</span>
                        <span className="font-serif font-bold text-[#FF5C1C] text-base">{dl.commission}</span>
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
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] tracking-tight">Team Management & Invites</h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Invite brokers, assign agency territories, and manage permissions</p>
                </div>

                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FF5C1C] hover:bg-[#E04809] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <UserPlus size={15} />
                  <span>Invite New Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className="p-6 rounded-3xl bg-white border border-[#EAE3D8] shadow-xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-[#111111] text-white font-serif font-bold text-sm flex items-center justify-center">
                          {member.avatar}
                        </div>
                        <span className={`text-[10px] px-3 py-0.5 rounded-full font-bold ${
                          member.status === "Active"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-[#FDEEE6] text-[#FF5C1C] border border-[#FF5C1C]/20"
                        }`}>
                          {member.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-serif font-bold text-[#111111]">{member.name}</h3>
                        <p className="text-xs text-[#FF5C1C] font-bold">{member.role}</p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{member.email}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#EAE3D8] grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Deals Closed</span>
                        <span className="font-serif font-bold text-[#111111] text-sm">{member.dealsClosed}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Active Leads</span>
                        <span className="font-serif font-bold text-[#111111] text-sm">{member.activeLeads}</span>
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
              <div className="p-8 sm:p-10 rounded-3xl bg-[#111111] text-white space-y-6 shadow-xl relative overflow-hidden border border-[#262626]">
                <div className="flex items-center gap-2 text-[#FF5C1C] text-xs font-mono font-bold tracking-wider">
                  <Sparkles size={16} />
                  <span>PROPFLOW AUTONOMOUS MATCH ENGINE</span>
                </div>

                <div className="max-w-2xl space-y-3">
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">Ask AI Copilot for Instant Broker Intelligence</h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Search your entire inventory and database with natural language queries to instantly find matching high-intent buyers.
                  </p>
                </div>

                {/* Command Bar */}
                <div className="flex flex-wrap gap-2.5 pt-2">
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
                      className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-[#FF5C1C] text-white border border-white/15 text-xs font-semibold transition-all text-left flex items-center gap-2"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-3xl border border-[#EAE3D8] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-scaleUp">
            <button
              onClick={() => setIsAddLeadOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-[#111111]"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-serif font-bold text-[#111111] mb-1">Add New Buyer Lead</h2>
            <p className="text-xs text-slate-500 mb-6">Triggers instant AI MatchScore against scraped inventory.</p>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#EAE3D8] text-[#111111] focus:ring-2 focus:ring-[#FF5C1C]/40 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    placeholder="+91 98201 00000"
                    className="w-full px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#EAE3D8] text-[#111111] focus:ring-2 focus:ring-[#FF5C1C]/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    placeholder="vikram@gmail.com"
                    className="w-full px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#EAE3D8] text-[#111111] focus:ring-2 focus:ring-[#FF5C1C]/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">BHK Preference</label>
                  <select
                    value={newLeadBhk}
                    onChange={(e) => setNewLeadBhk(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#EAE3D8] text-[#111111] focus:outline-none"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK Luxury">4 BHK Luxury</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target Locality</label>
                  <input
                    type="text"
                    value={newLeadLocation}
                    onChange={(e) => setNewLeadLocation(e.target.value)}
                    placeholder="Dombivli East"
                    className="w-full px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#EAE3D8] text-[#111111] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EAE3D8]">
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#FF5C1C] hover:bg-[#E04809] text-white font-bold shadow-xs"
                >
                  Add Lead & Match
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-3xl border border-[#EAE3D8] max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-scaleUp">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-serif font-bold text-[#111111] mb-1">Invite Team Member</h2>
            <p className="text-xs text-slate-500 mb-6">Send invitation link for agency workspace access.</p>

            <form onSubmit={handleInviteMember} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Member Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Rohan Deshmukh"
                  className="w-full px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#EAE3D8] text-[#111111] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="rohan@agency.com"
                  className="w-full px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#EAE3D8] text-[#111111] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Role & Permissions</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as TeamMember["role"])}
                  className="w-full px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#EAE3D8] text-[#111111] focus:outline-none"
                >
                  <option value="Senior Broker">Senior Broker (Full pipeline + deals)</option>
                  <option value="Field Agent">Field Agent (Site visits + leads)</option>
                  <option value="Property Consultant">Property Consultant</option>
                  <option value="Agency Admin">Agency Admin (Full access)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EAE3D8]">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#FF5C1C] hover:bg-[#E04809] text-white font-bold shadow-xs"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-[#EAE3D8] p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D8]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FF5C1C] text-white font-serif font-bold text-sm flex items-center justify-center">
                  {selectedLead.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#111111]">{selectedLead.name}</h3>
                  <p className="text-xs text-slate-500">{selectedLead.phone} • {selectedLead.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Match Highlight */}
            <div className="p-4 rounded-2xl bg-[#FDEEE6] border border-[#FF5C1C]/25 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF5C1C]">AI Property Match</span>
                <span className="text-xs font-extrabold text-[#FF5C1C]">{selectedLead.matchScore}% Match Score</span>
              </div>
              <p className="text-sm font-serif font-bold text-[#111111]">{selectedLead.matchedProperty}</p>
              <p className="text-xs text-slate-600">
                Matches budget ({selectedLead.budget}) and {selectedLead.bhk} preference in {selectedLead.location}.
              </p>
            </div>

            {/* Lead Meta */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D8]">
                <span className="text-slate-400 block">Lead Status</span>
                <span className="font-bold text-[#111111]">{selectedLead.status}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D8]">
                <span className="text-slate-400 block">Assigned Broker</span>
                <span className="font-bold text-[#111111]">{selectedLead.agent}</span>
              </div>
            </div>

            {/* AI Next Best Action */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
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
                className="flex-1 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
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
                className="flex-1 py-3 rounded-full bg-[#FF5C1C] hover:bg-[#E04809] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
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
