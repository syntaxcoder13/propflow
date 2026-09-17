# 💻 PropFlow Frontend Application

This directory contains the user interface and client application for **PropFlow**, built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## 📂 Directory Layout

```text
frontend/
├── app/
│   ├── dashboard/
│   │   └── page.tsx            # Full CRM operations command center
│   ├── login/
│   │   └── page.tsx            # Auth portal with 1-click role switcher
│   ├── globals.css             # Design tokens, variables & glassmorphic utility classes
│   ├── layout.tsx              # Root HTML wrapper, metadata & font setup
│   └── page.tsx                # Marketing landing page
├── components/
│   ├── Navbar.tsx              # Sticky glassmorphic navigation header
│   ├── Hero.tsx                # Hero section with interactive lead-matching simulator
│   ├── ProblemSolutionSection.tsx # Old vs New comparative breakdown
│   ├── AIIntelligenceSection.tsx # MatchScore algorithm & intelligence modules
│   ├── WorkflowSection.tsx     # 4-stage pipeline visualization
│   ├── FinalCTASection.tsx     # High-conversion demo booking panel
│   ├── Footer.tsx              # Navigation footer with compliance links
│   └── icons.tsx               # Curated SVG icons
├── public/
│   └── images/                 # Optimized static assets & avatar photographs
├── next.config.ts              # Security headers & Next.js config
├── package.json                # Dependencies and dev scripts
└── tsconfig.json               # TypeScript config
```

---

## ⚡ Key Pages & Features

### 1. Landing Page (`app/page.tsx`)
- High-converting luxury UI with dark-tinted glassmorphism and modern typography.
- Interactive **Live Deal Matching Simulator** in the Hero.
- Detailed breakdown of AI intelligence features and operational workflows.

### 2. Authentication (`app/login/page.tsx`)
- Multi-role demo account autofill:
  - Principal Broker (`broker@propflow.ai`)
  - Senior Agent (`agent@propflow.ai`)
  - Builder Partner (`builder@propflow.ai`)
- Show/hide password toggle and "Remember Me" preference.

### 3. CRM Operations Dashboard (`app/dashboard/page.tsx`)
- **Overview**: Real-time sales telemetry, monthly conversion rate, urgent tasks, and upcoming visits.
- **Leads Hub**: Search, filter by intent/status, view MatchScore, add new leads, trigger instant WhatsApp messages or phone calls.
- **Inventory**: Luxury property listings, units remaining, price range, and matching prospects.
- **Site Visits**: Calendar scheduling, agent assignment, and confirmation tracker.
- **Deal Pipeline**: Multi-stage negotiation tracking, buyer bid vs developer counter, and automated commission calculator.
- **Team Leaderboard**: Broker leaderboard with closed deals, quotas, and conversion statistics.
- **AI Copilot**: Natural language assistant for buyer recommendations and automated pitch drafting.

---

## 🛠️ Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Lint code**:
   ```bash
   npm run lint
   ```
