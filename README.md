# DinePulse AI - Full-Stack SaaS Restaurant Operations & Dining Platform

> **Team Name**: DinePulse Innovations  
> **Tech Stack**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Recharts, Lucide Icons, Gemini AI API (@google/genai)  
> **Hosted Link**: `http://localhost:3000` (Local Dev) / Public Deployment Ready  

---

## 🌟 Executive Summary

**DinePulse AI** is a full-stack SaaS platform built to solve real-world restaurant operational inefficiencies:
1. **Unpredictable Item Availability**: Real-time live status toggling across Customer Menu, Kitchen KDS, and Manager Dashboard.
2. **Kitchen & Service Communication Delays**: Live KDS ticket stream with prep timers and status progression (`Pending` -> `Preparing` -> `Ready` -> `Served`).
3. **Table & Queue Bottlenecks**: Interactive floor layout manager and live waitlist tracking.
4. **Manual Billing & Split Payments**: Instant itemized split bill calculator, tip engine, and PDF receipt generator.
5. **Stock Outages & Waste**: AI-driven ingredient demand forecasting and manager Resto-Copilot powered by **Gemini AI**.

---

## 🚀 Completed User Stories & Ranking System

| Rank Tier | User Story | Implementation & Features | Status |
|---|---|---|---|
| **Bronze** | **User Story 1**: Modern UX/UI | Glassmorphic dark design system, responsive mobile & desktop views, fluid animations, typography (Inter/Plus Jakarta Sans). | ✅ Completed |
| **Silver** | **User Story 2**: Auth System | Email + Password registration with 6-digit OTP verification code modal + Google OAuth 1-click login simulation & RBAC. | ✅ Completed |
| **Silver** | **User Story 3**: Digital Workflows | Customer QR Digital Menu, live item availability, smart table reservations, live KDS order tracking, split billing & PDF receipts. | ✅ Completed |
| **Gold** | **User Story 4**: Restaurant Ops Hub | Manager Operations Dashboard featuring Interactive Table Floor Map, Real-time Inventory & Threshold Alerts, Staff Roster, CRM, and Sales Analytics. | ✅ Completed |
| **Platinum**| **User Story 5**: AI Intelligence | **Gemini AI API Integration** for AI Dish Recommender, Inventory & Demand Forecasting, Dynamic Happy Hour Pricing, and Manager Resto-Copilot Assistant. | ✅ Completed |
| **Bonus** | **Bonus Innovation** | Interactive **Role Switcher Bar** for 1-click judging, Table QR Code Simulator, and fallback rule engine for offline AI capability. | ✅ Completed |

---

## 🛠️ Quick Start Guide

### Prerequisites
- Node.js 18.x or 20.x installed.

### Installation
```bash
# Navigate to project directory
cd C:\Users\puvva\.gemini\antigravity-ide\scratch\dinepulse-saas

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤖 AI Features (Powered by Gemini API)

- **AI Dish Recommender**: Recommends personalized dish pairings based on customer dietary preferences and kitchen prep load.
- **Predictive Inventory Waste Engine**: Calculates ingredient depletion speed and alerts managers before key items run out.
- **DinePulse Resto-Copilot**: Conversational AI assistant allowing managers to inquire about shift optimization, waste reduction, and off-peak discount strategies.

---

## 💡 Role-Based Access Demo Guide

Use the top **Role Switcher Bar** to immediately experience:
1. **Customer (QR Dining)**: Browse menu, filter vegan/gluten-free items, place table order, track prep time, split bill.
2. **Kitchen KDS**: View incoming ticket cards, advance prep state, toggle dish stock ("Sold Out" / "In Stock").
3. **Waitstaff POS**: View active tables, serve ready orders, collect payments.
4. **Manager Dashboard**: View floor plan map, restock low stock items, check staff roster, run AI Resto-Copilot queries.
