# 🏢 PropFlow — AI-Powered Real Estate Operating System & CRM

<p align="center">
  <img src="frontend/public/next.svg" alt="PropFlow Banner" width="220" />
</p>

<p align="center">
  <strong>Next-Generation CRM & Intelligence Platform for Modern Real Estate Agencies, Brokers, and Property Developers.</strong>
</p>

<p align="center">
  <a href="#-architecture--project-structure">Architecture</a> •
  <a href="#-frontend-deep-dive">Frontend</a> •
  <a href="#-backend-architecture">Backend</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-security">Security</a>
</p>

---

## 🌟 Overview

**PropFlow** is an enterprise-grade Real Estate Operating System designed to replace fragmented spreadsheets, disconnected WhatsApp chats, and legacy CRMs. It unifies lead capture, automated AI buyer-property matching, site visit logistics, multi-stage deal negotiation, and team commission tracking into a single, cohesive ecosystem.

---

## 🏗️ Architecture & Project Structure

The repository is organized as a monorepo containing distinct `frontend` and `backend` modules:

```text
propflow/
├── .gitignore                      # Root git ignore (node_modules, build artifacts, envs)
├── README.md                       # Comprehensive project documentation
├── backend/                        # Backend microservices, APIs, and AI matching engine
│   └── README.md                   # Backend service architecture & API roadmap
└── frontend/                       # Next.js 16 App Router web application
    ├── app/
    │   ├── dashboard/
    │   │   └── page.tsx            # Full-featured Real Estate CRM & AI Copilot
    │   ├── login/
    │   │   └── page.tsx            # Multi-role authentication & demo switcher
    │   ├── globals.css             # Tailwind v4 theme tokens & custom glassmorphism
    │   ├── layout.tsx              # Root HTML shell & typography (Outfit / Inter)
    │   └── page.tsx                # High-converting luxury marketing landing page
    ├── components/
    │   ├── Navbar.tsx              # Sticky glassmorphic navigation header
    │   ├── Hero.tsx                # Hero section with interactive lead-matching simulator
    │   ├── ProblemSolutionSection.tsx # Old manual chaos vs PropFlow AI comparison
    │   ├── AIIntelligenceSection.tsx # Algorithm breakdown, MatchScore & predictive tools
    │   ├── WorkflowSection.tsx     # 4-stage pipeline visualization
    │   ├── FinalCTASection.tsx     # Conversion-optimized enterprise CTA section
    │   ├── Footer.tsx              # Comprehensive sitemap, metrics & compliance links
    │   └── icons.tsx               # Curated Lucide-style lightweight SVG icons
    ├── public/
    │   └── images/                 # Optimized static assets & avatar photographs
    ├── next.config.ts              # Next.js config with hardened HTTP security headers
    ├── package.json                # Frontend dependencies & npm scripts
    ├── postcss.config.mjs          # PostCSS configuration
    └── tsconfig.json               # TypeScript strict configuration
```

---

## 💻 Frontend Deep Dive

The frontend is built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

### 1. Landing Page (`frontend/app/page.tsx`)
A conversion-optimized, responsive marketing experience designed for real estate founders and agency directors:
- **`Navbar`**: Floating glassmorphic header with navigation anchors, real-time live deal pulse, and quick actions (`Schedule Demo`, `Launch CRM`).
- **`Hero`**: Dynamic headline with value proposition, animated metrics badges, and an interactive **Live Deal Matching Simulator** that demonstrates AI scoring in real-time.
- **`ProblemSolutionSection`**: Side-by-side comparison illustrating the transition from unorganized WhatsApp groups and lost leads to automated pipelines.
- **`AIIntelligenceSection`**: Visual breakdown of the **PropFlow MatchScore™** engine, automatic site-visit route planner, and buyer intent prediction.
- **`WorkflowSection`**: Step-by-step 4-phase visual pipeline:
  1. *Capture & Enrich* (Meta Ads, 99acres, MagicBricks sync)
  2. *Intelligent Match* (Budget, BHK, and locality algorithms)
  3. *Automated Site Visits* (Calendar sync & WhatsApp triggers)
  4. *Deal Closing* (Token payments & automated commission split)
- **`FinalCTASection`**: Enterprise booking panel with 14-day risk-free onboarding guarantee.
- **`Footer`**: Complete resource directory, regulatory compliance links, and platform uptime status.

### 2. Authentication Portal (`frontend/app/login/page.tsx`)
- **Split-Screen Design**: High-impact brand showcase on the left, interactive form on the right.
- **1-Click Demo Account Switcher**:
  - 👑 *Principal Broker* (`broker@propflow.ai`)
  - 💼 *Senior Agent* (`agent@propflow.ai`)
  - 🏗️ *Builder Partner* (`builder@propflow.ai`)
- **Interactive Controls**: Password visibility toggle, credentials autofill, "Remember Me" persistence, and error-handling states.

### 3. Enterprise CRM & Operations Dashboard (`frontend/app/dashboard/page.tsx`)
A full-fledged command center for brokers and agents with 7 interactive modules:
- 📊 **Executive Overview**: Key business telemetry (Active Pipeline, Total Closed GMV, Conversion Velocity, Team Efficiency), urgent task queues, and upcoming visits.
- 🎯 **Leads Command Center**:
  - Live filtering by search query, intent level (*High, Medium, Low*), and status (*New, Contacted, Visit Scheduled, Negotiation, Closed*).
  - MatchScore pill indicators and matched inventory suggestions.
  - **Quick Action Drawer**: Instant WhatsApp trigger, click-to-call, note logging, and visit scheduling.
  - **Add Lead Modal**: Complete form with budget range, BHK preference, and agent assignment.
- 🏙️ **Inventory & Properties**:
  - Property catalog displaying developer name, price per sq.ft., unit inventory status (*Available, Filling Fast, Ready Possession*), and matching prospective buyers.
  - **Add Property Modal**: Listing creation with unit counts, location, and pricing details.
- 📅 **Site Visits Dispatcher**:
  - Calendar agenda tracking upcoming physical inspections, assigned agents, buyer contact details, and status updates (*Confirmed, Pending, Completed*).
- 🤝 **Deal Negotiation Room**:
  - Real-time deal pipeline visualizing Buyer Bids vs. Builder Counter-Offers, agreed final price, and automated brokerage commission calculations.
- 👥 **Team Leaderboard**:
  - Agent roster with active deal counters, closed revenue tally, monthly quota progress, and performance badges.
- 🤖 **AI Copilot**:
  - Conversational AI assistant capable of answering questions like *"Show me all high-intent buyers looking in Bandra under ₹5 Cr"* and generating personalized WhatsApp pitches.

---

## ⚙️ Backend Architecture (Roadmap & Services)

The `backend/` directory is architected to house the core microservices and API gateways:

```text
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                           │
│           (Next.js App / Web Dashboard / Mobile)            │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / REST / WebSocket
┌──────────────────────────────▼──────────────────────────────┐
│                    API Gateway / Auth                       │
│             (JWT, RBAC: Admin, Agent, Builder)              │
└──────┬───────────────────────┬───────────────────────┬──────┘
       │                       │                       │
┌──────▼──────┐         ┌──────▼──────┐         ┌──────▼──────┐
│ Lead Ingest │         │ AI Matching │         │ Logistics & │
│  & Webhooks │         │   Engine    │         │ Comm Engine │
│ (Meta, Ads) │         │(Embeddings) │         │ (WhatsApp)  │
└──────┬──────┘         └──────┬──────┘         └──────┬──────┘
       │                       │                       │
┌──────▼───────────────────────▼───────────────────────▼──────┐
│             Database & Cache (PostgreSQL + Redis)            │
└─────────────────────────────────────────────────────────────┘
```

### Core Backend Capabilities:
1. **Lead Webhook Ingestion**: Ingests leads in real-time from Meta Ads (Facebook/Instagram), Google Ads, 99acres, MagicBricks, and website enquiry forms.
2. **AI MatchScore Engine**: Vector-based semantic similarity and multi-parameter ranking (Budget overlap, BHK requirement, location proximity, possession timeline).
3. **WhatsApp Business API**: Automated follow-up messages, site visit confirmation reminders, and brochure PDF delivery.
4. **Commission & Deal Ledger**: Secure calculation of developer payouts, split brokerage, and GST tax invoice generation.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node `v20+` recommended)
- **npm**: `v9.0.0` or higher
- **Git**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/syntaxcoder13/propflow.git
   cd propflow
   ```

2. **Navigate to the frontend**:
   ```bash
   cd frontend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the local development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📦 Available Scripts (`frontend/package.json`)

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server with `--webpack` fallback support |
| `npm run build` | Compiles optimized production bundle and generates static routes |
| `npm run start` | Runs the compiled production build locally |
| `npm run lint` | Runs ESLint 9 checks to enforce code quality |

---

## 🌐 Deployment Guide (Vercel)

PropFlow is optimized for deployment on **Vercel**:

1. Push your repository to GitHub (`main` branch).
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New Project**.
3. Import the `syntaxcoder13/propflow` repository.
4. In **Project Settings**:
   - **Root Directory**: Set to `frontend` *(Essential because frontend is in a subfolder)*.
   - **Framework Preset**: `Next.js`
   - **Build & Development Settings**: Keep toggles **OFF** (use Vercel defaults).
5. Click **Deploy**.

---

## 🛡️ Security & Performance Hardening

The application includes enterprise-grade HTTP security headers configured in `frontend/next.config.ts`:

- **Clickjacking Protection**: `X-Frame-Options: SAMEORIGIN`
- **MIME-Sniffing Prevention**: `X-Content-Type-Options: nosniff`
- **Referrer Privacy**: `Referrer-Policy: strict-origin-when-cross-origin`
- **Hardware Permission Policy**: `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- **Strict Transport Security**: `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- **Server Fingerprint Concealment**: `poweredByHeader: false` (hides `x-powered-by: Next.js`)

---

## 📄 License

PropFlow is proprietary software. All rights reserved. © 2026 PropFlow AI Inc.
