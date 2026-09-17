# ⚙️ PropFlow Backend Architecture & Services

This directory contains the specifications, API architecture, and microservices for the **PropFlow Real Estate Operating System**.

---

## 🏛️ Services Overview

The backend is designed around high-throughput, event-driven microservices:

### 1. 🔐 Auth & Identity Service (`/auth`)
- Role-Based Access Control (RBAC): `SUPER_ADMIN`, `PRINCIPAL_BROKER`, `SENIOR_AGENT`, `FIELD_AGENT`, `BUILDER_PARTNER`.
- Secure JWT authentication with refresh token rotation and OAuth2 SSO providers.

### 2. 📥 Lead Ingestion & Webhooks (`/leads`)
- Real-time webhooks for:
  - Meta Lead Ads (Facebook & Instagram)
  - Google Search & Discovery Ads
  - Property Portals: 99acres, MagicBricks, Housing.com
  - Direct Website Landing Page Inquiry forms
- Automated lead deduplication, phone normalization, and enrichment.

### 3. 🧠 AI Matching & Recommendation Engine (`/ai-matching`)
- Vector embeddings computed for property attributes and buyer preferences.
- Multi-variable weighted scoring algorithm:
  - Budget Tolerance Interval ($\pm 15\%$)
  - Spatial match (BHK, carpet area, balcony requirements)
  - Locality & commute distance
  - Possession urgency and developer track record
- Outputs a normalized `MatchScore` (0–100%) with explainable rationale.

### 4. 📅 Site Visit Logistics & Notifications (`/visits`)
- Google Calendar & Outlook integration for broker scheduling.
- Automated WhatsApp Cloud API / SMS triggers:
  - Instant visit confirmation with Google Maps location pin.
  - 2-hour pre-visit automated reminder to reduce client no-shows.
  - Post-visit buyer feedback collection form.

### 5. 🤝 Deal & Commission Ledger (`/deals`)
- Multi-state transaction state machine: `OFFER_PLACED` → `IN_NEGOTIATION` → `TOKEN_RECEIVED` → `REGISTRATION` → `CLOSED`.
- Brokerage split calculations between principal agency and referring field agents.
- Automated GST-compliant brokerage invoices and TDS calculation.

---

## 🛠️ Recommended Tech Stack

- **Runtime**: Node.js (TypeScript) / Python FastAPI
- **Database**: PostgreSQL with Prisma ORM / pgvector for semantic search
- **Cache & Message Broker**: Redis / BullMQ for async background jobs
- **Communication**: WhatsApp Business Cloud API / Twilio SMS / SendGrid Email

---

## 🚦 API Endpoints (Preview)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Authenticate user & issue JWT |
| `GET` | `/api/v1/leads` | List and filter active leads |
| `POST` | `/api/v1/leads` | Create new lead and trigger match scoring |
| `GET` | `/api/v1/properties` | Fetch luxury inventory catalog |
| `POST` | `/api/v1/visits/schedule` | Schedule physical site visit & send WhatsApp pin |
| `GET` | `/api/v1/deals/pipeline` | Retrieve active deal stages & commission metrics |
| `POST` | `/api/v1/ai/query` | Natural language queries for AI Copilot |
