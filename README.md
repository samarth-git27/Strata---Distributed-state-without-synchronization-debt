# Strata | Deterministic Distributed State Engine

> **Deterministic distributed state log and real-time synchronization engine for mission-critical software systems.**

Strata eliminates distributed race conditions, cache invalidation chaos, and silent split-brains across multi-region clusters by compiling a causal vector log down to Linux eBPF and WebAssembly micro-kernels.

---

## 1. Product Concept & Brand Positioning

- **Product:** Strata (Strata Runtime / Strata Engine)
- **Tagline:** Deterministic distributed state engine for mission-critical software.
- **One-line positioning:** Strata replaces the fragile 5-tier synchronization middleware stack (Postgres + Redis pub/sub + Kafka buffer + WebSocket cluster + client CRDTs) with a singular, causal-ordered state log where every mutation is a deterministic state transition function.
- **Primary Audience:** Staff+ engineers, infrastructure architects, and distributed systems leads building real-time collaborative workspaces, financial telemetry rails, spatial canvases, and autonomous robotics swarms.
- **Core Advantage:** Causal Vector Quorums (CVQ) formally proven in TLA+, zero-copy memory-mapped Linux eBPF socket filters, sub-4ms multi-region convergence, and cycle-exact time-travel snapshot replay.
- **Brand Personality:** Architectural, rigorous, calm, confident, Swiss-editorial precision meets modern systems engineering.

---

## 2. Visual & Design System

- **Zero-AI-Slop Discipline:**
  - Zero generic purple gradients or floating blobs.
  - Zero pill enclosures for static metadata (clean unboxed text with `·` separators).
  - Single-elevation card depth with crisp hairline borders (`rgba(255, 255, 255, 0.08)`).
  - Zero mechanical code-comment headers (`// 01 ARCHITECTURE` banned; clean human editorial titling used).
  - Top Bar Contract: strictly one row with 3 zones (wordmark brand, 4–5 single-line nav links, 1 primary action button).
- **Typography:** Plus Jakarta Sans for geometric precision, JetBrains Mono for tabular telemetry and code snippets.
- **Color System:** Monochromatic obsidian `#090A0F` canvas (60%), structural carbon `#0D0F17` surfaces (30%), and high-intent electric cobalt `#2563EB` and emerald `#10B981` accents (10%).

---

## 3. Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 (with `@layer base`, custom hairline borders, and refined layout utilities)
- **Icons:** Lucide React
- **Animation & Micro-interactions:** CSS transitions, smooth compositor transforms, and Motion
- **Image Generation:** Bespoke architectural imagery generated via Google AI Studio (`strata_datacenter_node`, `strata_team_engineering`, `strata_architecture_monolith`)

---

## 4. Architecture & 5-Page Structure

```text
/                    — Overview: Quick CLI copy, interactive topological consensus simulator (SVG mesh canvas), problem narrative, asymmetric bento primitives, latency spectrum comparison (p50/p95/p99.9), Jepsen proof
/features            — Architecture: 4 core pillars (CVQ, eBPF bus, time-travel, Wasm core), interactive Causal DAG Graph visualizer, datacenter node chassis, technical comparison matrix
/pricing             — Pricing: 3 transparent tiers, monthly/annual toggle (20% discount), live capacity & memory footprint calculator, full side-by-side specification matrix, technical FAQ
/about               — Philosophy: Origin story ($4M phantom fill disaster), interactive incident chronology diagram, 4 core principles, research team, public invariants
/contact             — Contact: Validated engineering consultation form with quick architecture presets, PGP keys, office hours, Zürich & SF lab addresses
```

---

## 5. Setup & Development Instructions

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
The application runs locally on `http://localhost:3000`.

### Production Build & Typecheck
```bash
npm run build
```
