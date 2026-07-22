# ParcelOne Merchant Portal — UX Architecture
**Platform:** Merchant Portal (Merchant Dashboard)
**Version:** 2.0 | July 2026
**Launch Market:** Dallas–Fort Worth Metroplex — Phase 1: Frisco / Collin County North Corridor
**Currency:** USD ($) | **Time Zone:** Central Time (CT)
**Status:** Strategy Draft
**Parent:** ParcelOne → Platforms → 01 — Merchant Portal

---

> **Document purpose**
> Master UX strategy for the ParcelOne Merchant Portal, grounded in a real launch market: **Frisco, Texas and the Collin County North Corridor**. Use in Notion for team alignment; use Lovable prompts at the end to generate designs.

---

# TABLE OF CONTENTS

1. [Launch Market Context](#launch-market-context)
2. [What Is the Merchant Portal?](#what-is-the-merchant-portal)
3. [Use Cases](#use-cases)
4. [Jobs To Be Done (JTBD)](#jobs-to-be-done-jtbd)
5. [Personas](#personas)
6. [Core Workflows](#core-workflows)
7. [UX Architecture](#ux-architecture)
8. [Section-by-Section Feature Spec](#section-by-section-feature-spec)
9. [Detailed User Flows](#detailed-user-flows)
10. [Screen Inventory](#screen-inventory)
11. [Design Principles](#design-principles)
12. [Edge Cases & Exception States](#edge-cases--exception-states)
13. [Lovable Design Prompts](#lovable-design-prompts)
14. [Notion Setup Guide](#notion-setup-guide)

---

# LAUNCH MARKET CONTEXT

## Why the Merchant Portal Launches in Frisco, TX

The Merchant Portal is not designed for a generic city — it is designed for **merchants on the Preston Road and Legacy Drive corridors in Collin County**, where drone delivery is already culturally familiar but merchant tooling is fragmented.

| Factor | DFW / Frisco reality | Portal implication |
|---|---|---|
| **Market maturity** | 150,000+ Walmart drone deliveries in DFW; Wing at Stonebriar Centre | Merchants expect aerial delivery; portal must feel operational, not demo |
| **Merchant density** | Preston Rd: pharmacies, QSR, fast casual within 2-mile clusters | Multi-merchant dock sharing; queue management critical |
| **Traffic pain** | Preston Rd + DNT lunch peaks: 20–35 min for 4-mile road trips | Portal must prove time savings (17 min median aerial) |
| **Weather** | Spring gust fronts 25+ mph; summer 100°F+; T-storms Mar–May | Weather holds visible in portal; not hidden failures |
| **Housing mix** | Newman Village (SFH) + Frisco Square (apartments) | Same merchant serves yard drop + hub delivery types |
| **Income** | DFW median HH $86,568; Frisco retail $25,441/capita | Merchants will pay $5.85/delivery if portal proves ROI |

## Phase 1 Launch Partners (Portal Users)

| Merchant | Address | Portal use |
|---|---|---|
| **Westlake Pharmacy — Frisco** | 12200 Preston Rd, Frisco, TX 75033 | Primary case study merchant |
| **Westlake Pharmacy — Plano** | 8200 Preston Rd, Plano, TX 75024 | Multi-location (Priya, James) |
| **Tacoria** | 4840 Legacy Dr, Frisco, TX 75034 | Lunch rush QSR (Marcus) |
| **GreenBowl Salads** | 8720 Preston Rd, Frisco, TX 75033 | Secondary merchant |

**Pickup infrastructure:**
- Westlake Frisco: **Preston Bay 2** (dock at rear parking, 12200 Preston Rd)
- Tacoria: **Legacy Bay 1** (4840 Legacy Dr, shared strip dock)
- Westlake Plano: **Plano Bay 1** (8200 Preston Rd)

## Phase 1 Portal Metrics (Targets)

| Metric | Target | Notes |
|---|---|---|
| Pack-to-scan time | Under 90 sec | Beat DoorDash handoff at Tacoria |
| Portal DAU (fulfillment staff) | 85% on-shift | Dana at Westlake |
| Failed delivery resolution in-portal | 90% without support call | Marcus self-serve |
| Median delivery time (Westlake) | 17 min | 1.5–2.5 mi avg to Newman Village, Phillips Creek |
| Avg fee displayed in portal | $5.49–$5.85 | USD, per delivery |
| Monthly subscription shown | $149/location | Billing section |

---

# WHAT IS THE MERCHANT PORTAL?

## One-Line Definition

The ParcelOne Merchant Portal is the **operational command center** where Preston Road pharmacies, Legacy Drive restaurants, and Collin County retailers request, fulfill, track, and resolve aerial drone deliveries — without understanding aviation.

## The Problem It Solves (DFW Context)

Westlake Pharmacy on Preston Rd competes with CVS and Walgreens delivery. Tacoria on Legacy Dr competes with DoorDash (35–50 min quoted in NTX). When Preston Rd is gridlocked at noon, road couriers slip to 40+ minutes. Merchants need:

- Instant eligibility: can this order fly to Newman Village or does it need hub/road?
- Pack-and-scan faster than handing a bag to a DoorDash driver
- Live map: where is the drone relative to Phillips Creek Ranch?
- Failed delivery fix when a customer leaves patio furniture in the drop zone
- Proof of delivery for pharmacy disputes (Texas Board of Pharmacy chain-of-custody expectations)
- Monthly USD billing that matches delivery count

## What It Is NOT

| Not This | Why |
|---|---|
| Wing merchant app | Wing serves Walmart; ParcelOne serves independent Preston Rd merchants |
| DoorDash tablet | DoorDash is road-only; no capsule, no weather hold, no hub |
| Drone flight control | Operations Supervisors at Frisco ops center fly missions |
| POS replacement | Orders sync from **Square** (Westlake) or **Toast** (Tacoria) |

## Strategic Position

```
Customer orders on Westlake Pharmacy app (Square Online)
         │
         ▼
Eligibility: 75034, 1.2 lbs, wind 14 mph → DRONE ELIGIBLE
         │
         ▼
MERCHANT PORTAL (12200 Preston Rd, Frisco)
         │
         ▼
Preston Bay 2 → Drone → Newman Village backyard OR Frisco Square hub
         │
         ▼
Square order marked Delivered + proof photo archived
```

---

# USE CASES

## Primary Use Cases

### UC-01: Prescription Rush During Preston Rd Lunch Traffic
**Actor:** Dana (Westlake Pharmacy)
**Trigger:** Order #WL-92847 at 12:04 PM CT — amoxicillin, 1.8 mi to Newman Village
**Outcome:** Packed in 78 sec, drone pickup 12:08 PM, delivered 12:25 PM (17 min) while Preston Rd queue builds

### UC-02: Tacoria Lunch Rush Monitoring
**Actor:** Marcus (Tacoria, Legacy Dr)
**Trigger:** 11:45 AM CT — 8 orders in queue, 3 in flight toward Legacy business park + Frisco Square
**Outcome:** Clears queue by 1:15 PM; 1 failure resolved (hub locker full → reroute)

### UC-03: Failed Drop Zone — Phillips Creek Ranch
**Actor:** Marcus
**Trigger:** Order #WL-92812 — patio set placed in drop zone after order placed
**Outcome:** Reviews photo, re-dispatches 10 AM next day, SMS to customer with zone diagram

### UC-04: Pharmacy Dispute — Proof of Delivery
**Actor:** Marcus / Priya
**Trigger:** Customer claims OTC order not received (Chase Oaks area)
**Outcome:** GPS 33.1291° N, 96.8388° W + photo + customer "Received" tap at 4:52 PM CT

### UC-05: Monthly ROI Review — Two Locations
**Actor:** Priya (Westlake owner — Frisco + Plano)
**Trigger:** June 2026 billing: $1,842 delivery fees + $298 subscription
**Outcome:** 94.1% on-time, $5.62 avg cost, expands cold-chain SKUs

### UC-06: Wind Hold — Spring Cold Front
**Actor:** Marcus
**Trigger:** NWS gust alert 28 mph — portal banner "Weather Hold until ~2:30 PM CT"
**Outcome:** 5 orders queued; customers notified; resumes at 2:28 PM

### UC-07: Low Capsule Stock Before Weekend
**Actor:** Marcus
**Trigger:** 3 capsules left before Saturday rush
**Outcome:** Orders 25-pack ($89), scans 6 returned capsules from hub

### UC-08: Early Close — July 4th
**Actor:** Marcus
**Trigger:** Westlake closes 2 PM CT
**Outcome:** Pauses service; 2 in-flight complete; 4 queued held for July 5

---

# JOBS TO BE DONE (JTBD)

## Functional Jobs

| # | When I... | I want to... | So I can... | Persona |
|---|---|---|---|---|
| F1 | get a Square order from a 75034 address | see instantly if it can fly to Newman Village | start packing without calling anyone | Dana |
| F2 | pack a prescription during lunch rush | scan capsule and bay in under 90 seconds | beat the Preston Rd traffic window | Dana |
| F3 | run Tacoria at noon on Legacy Dr | see all drone orders on one board | catch failures before Yelp reviews | Marcus |
| F4 | see "Failed" on a Phillips Creek order | know why and re-dispatch in one flow | not lose a $85 pharmacy ticket | Marcus |
| F5 | customer calls "where's my drone?" | pull ETA from Live Map in 5 seconds | sound credible on the phone | Marcus |
| F6 | NWS issues gust advisory | pause cleanly and tell customers when we resume | avoid failed flights and wasted capsules | Marcus |
| F7 | review June invoice ($1,842) | match fees to 312 delivery line items | justify spend vs. DoorDash commissions | Priya |
| F8 | capsules down to 3 on Friday | reorder before Saturday Preston Rd rush | not turn away drone-eligible orders | Marcus |
| F9 | Texas pharmacy board asks for proof | export timestamped delivery record | stay compliant on controlled-adjacent OTC | Priya |
| F10 | hire new Frisco counter staff | give Fulfillment role only | they pack without seeing billing | Marcus |

## Emotional Jobs

| # | When I... | I want to feel... | Persona |
|---|---|---|---|
| E1 | scan capsule at Preston Bay 2 | confident it reaches Newman Village | Dana |
| E2 | watch Live Map during gust hold | in control, not blindsided | Marcus |
| E3 | explain drone delivery to older customer | credible ("we've done 300+ in Frisco") | Dana |
| E4 | see $5.85 fee vs. 22% DoorDash cut | that aerial is economically fair | Priya |

## Social Jobs

| # | When I... | I want to... | Persona |
|---|---|---|---|
| S1 | compete with Walgreens on Preston | offer faster delivery | Priya |
| S2 | train new hire in 15 min | use portal that makes them competent | Marcus |
| S3 | report to Westlake ownership | show Frisco outperforming Plano on speed | James |

---

# PERSONAS

---

## Persona 1: Dana — Fulfillment Associate

| Attribute | Detail |
|---|---|
| **Employer** | Westlake Pharmacy — 12200 Preston Rd, Frisco, TX 75033 |
| **Role** | Pharmacy technician / counter staff |
| **Age** | 24 |
| **Commute** | Lives in Little Elm, drives Preston Rd daily |
| **Tech** | Square POS daily; iPad at compounding station |
| **Portal access** | Fulfillment only |
| **Shift** | 9 AM–6 PM CT, Mon–Sat |
| **Quote** | *"When Preston is backed up to Main Street, the drone still gets there in fifteen minutes. I just scan the box."* |

### Goals
- Pack Rx + OTC into capsule without breaking cold-chain (insulin pens)
- Know Medium vs. Small capsule for typical Westlake orders
- See Preston Bay 2 status: drone coming or waiting

### Frustrations
- Older customers ask "is that the Google drone?" — she needs simple answers
- Wind hold messages confuse customers who call the store
- Scared of losing $89 capsule batch if she scans wrong

### Portal behaviors
- 9:02 AM: opens Fulfillment queue on store iPad
- 12:00–1:30 PM CT: 15–25 pack-and-scan cycles
- Never opens Analytics or Billing

---

## Persona 2: Marcus — Store Manager

| Attribute | Detail |
|---|---|
| **Employer** | Tacoria — 4840 Legacy Dr, Frisco, TX 75034 |
| **Role** | General manager (also covers Westlake relief shifts) |
| **Age** | 38 |
| **Tech** | Toast POS, DoorDash tablet, ParcelOne on desktop + phone |
| **Portal access** | Manager |
| **Quote** | *"DoorDash says 40 minutes when Legacy is a parking lot. Our drone says 18. That's the whole pitch."* |

### Goals
- Zero failed deliveries during 11:30 AM–1:30 PM CT peak
- Resolve Phillips Creek / Newman Village failures without ParcelOne support
- Keep Legacy Bay 1 queue under 5 orders

### Frustrations
- Spring gust fronts pause service with no resume ETA
- Hub deliveries to Frisco Square when locker full
- Toast sync delay shows stale order status

### Portal behaviors
- Dashboard at open (10:30 AM CT)
- Live Map pinned during lunch
- Failed Deliveries 2–4x/week in March (wind season)

---

## Persona 3: Priya — Business Owner

| Attribute | Detail |
|---|---|
| **Employer** | Westlake Pharmacy (owns Frisco + Plano locations) |
| **Role** | Owner / pharmacist-in-charge |
| **Age** | 45 |
| **Locations** | 12200 Preston Rd Frisco + 8200 Preston Rd Plano |
| **Tech** | Square Dashboard, QuickBooks, ParcelOne Admin |
| **Quote** | *"Frisco does 210 drone deliveries a month. Plano does 98. Show me why."* |

### Goals
- Frisco ROI positive by Q3 2026
- Compare $5.62 avg aerial vs. $9.40 estimated road courier
- Expand drone-eligible OTC catalog

---

## Persona 4: James — Regional Ops Coordinator

| Attribute | Detail |
|---|---|
| **Employer** | Westlake Pharmacy (expanding to McKinney Q4 2026) |
| **Role** | Regional ops — 2 active, 1 onboarding location |
| **Portal** | Multi-location switcher: Frisco | Plano | McKinney (pending) |
| **Quote** | *"Plano Bay 1 had 6.2% failures last week. Frisco had 2.8%. I need to know why before we open McKinney."* |

---

## Persona Access Matrix

| Section | Dana | Marcus | Priya | James |
|---|---|---|---|---|
| Dashboard | Simplified | Full | Summary | Multi-loc |
| Pack & Scan | ✅ | ✅ | ❌ | ❌ |
| Live Map | View | Full | View | All locs |
| Failed Deliveries | ❌ | ✅ | ✅ | ✅ |
| Billing (USD) | ❌ | ❌ | ✅ | ✅ |
| Settings / Pause | ❌ | ✅ | ✅ | ✅ |

---

# CORE WORKFLOWS

## Workflow 1: Pack & Scan — Westlake Pharmacy (Happy Path)

```
12:04 PM CT — Order #WL-92847 syncs from Square
  Customer: Sarah M., 8621 Newman Village Dr, Frisco 75034
  Items: Amoxicillin 500mg (30 ct), Hydrocortisone 1% cream
  Weight: 1.2 lbs | Distance: 1.8 mi | Wind: 12 mph | ELIGIBLE

Step 1: Dana taps order in Fulfillment queue (wait: 2 min)
Step 2: Order summary — Capsule: MEDIUM (visual)
Step 3: Scans Capsule #TX-4471
Step 4: Packs, seals, checks cold-chain N/A, taps "Sealed & Ready"
Step 5: Walks to Preston Bay 2 (40 ft from counter)
Step 6: Scans bay QR — "Handoff complete. Drone ETA: 3 min"

12:08 PM — Drone pickup
12:25 PM — Delivered Newman Village (17 min total)
12:26 PM — Square auto-updated. Fee: $5.49

SUCCESS: 82 seconds pack-to-scan. Preston Rd drive would be ~22 min at noon.
```

---

## Workflow 2: Lunch Rush — Tacoria Legacy Dr

```
11:45 AM CT — Marcus opens Dashboard
  Queue: 8 | In flight: 3 | Needs attention: 1 | Completed today: 14

Needs attention: #TAC-8812 — Hub locker full at Frisco Square
  Action: Reroute to road fallback (DoorDash Drive integration)
  Resolved in 45 seconds

11:52 AM — Gust advisory 22 mph (yellow). No hold yet.
12:30 PM — 6 in flight, all green on Live Map
1:15 PM — Queue cleared

SUCCESS: Zero customer complaints. 1 hub exception handled in-portal.
```

---

## Workflow 3: Failed Delivery — Phillips Creek Ranch

```
Order #WL-92812 — Failed 6:18 PM CT
Reason: Drop zone obstructed (patio furniture)
Photo: Captured at 33.1182° N, 96.8511° W

Marcus actions:
  → Re-dispatch tomorrow 10:00–11:00 AM CT
  → SMS: "Hi James, we couldn't deliver — please clear the area shown in your drop zone map."
  → Capsule #TX-4398 returning to Preston dock (ETA 15 min)

Next day 10:22 AM — Delivered successfully
```

---

## Workflow 4: Weather Hold — Spring Cold Front

```
1:45 PM CT — Portal banner (amber):
  "Weather Hold — Wind gusts 28 mph. NWS advisory until ~3:30 PM CT"
  Affected: 5 queued, 2 in-flight (will complete)

Marcus reviews held orders → customers auto-notified with resume estimate

3:28 PM CT — Hold lifted. Queue processes in order.
```

---

# UX ARCHITECTURE

## Navigation

**Desktop:** Left sidebar | **Tablet (Preston counter):** Bottom nav + full-screen Pack & Scan

```
┌──────────────────────────────────────────────────────────────┐
│ ParcelOne  │ Westlake Pharmacy — Frisco  │ 🟢 Operational CT │
│            │ 12200 Preston Rd            │ 🔔 2  │ Marcus ▾  │
├────────────┬─────────────────────────────────────────────────┤
│ ● Home     │                                                 │
│ ○ Orders   │              MAIN CONTENT                       │
│ ○ Fulfill  │                                                 │
│ ○ Deliver  │                                                 │
│ ○ Capsules │                                                 │
│ ○ Analytics│                                                 │
│ ○ Billing  │                                                 │
│ ○ Settings │                                                 │
└────────────┴─────────────────────────────────────────────────┘
```

## Information Architecture

```
Merchant Portal
├── Home
│   ├── Snapshot (queue, in-flight, completed, attention)
│   ├── Weather banner (DFW NWS integration)
│   └── Preston Bay 2 status
├── Orders
│   ├── Filters + Square sync status
│   └── Delivery type: Yard / Hub / Road
├── Fulfillment
│   ├── Pack & Scan (full-screen)
│   ├── Queue (priority sorted)
│   └── Preston Bay 2 / Legacy Bay 1 status
├── Deliveries
│   ├── Live Map (Collin County)
│   ├── Failed + Proof of Delivery
│   └── History (search by ZIP: 75033, 75034...)
├── Capsules (TX-#### inventory)
├── Analytics (USD, CT timezone)
├── Billing (USD invoices)
└── Settings
    ├── Delivery hours (CT)
    ├── Pause service
    ├── Square integration
    └── Eligibility (8 lb max, geofence)
```

---

# SECTION-BY-SECTION FEATURE SPEC

## Home — DFW-Specific

| Feature | Frisco example |
|---|---|
| Service status | 🟢 Operational — Collin County |
| Weather banner | "Gusts 22 mph — monitoring" (amber) |
| Bay status | Preston Bay 2: Drone en route (2 min) |
| Needs attention | #WL-92812 Phillips Creek — zone blocked |
| Metric: completed today | 22 (Westlake Frisco) |

## Orders — DFW-Specific

| Feature | Detail |
|---|---|
| Eligibility reason | "Road only — 75025 outside Phase 1 geofence" |
| Hub badge | "Frisco Square Hub — Locker delivery" |
| ZIP filter | 75033, 75034, 75024, 75070 |
| Square sync | Green = live; yellow = 30s delay |

## Fulfillment — DFW-Specific

| Feature | Detail |
|---|---|
| Bay selector | Preston Bay 2 (Westlake) / Legacy Bay 1 (Tacoria) |
| Capsule sizes | S: 1 Rx bottle; M: 2-3 items; L: bulk OTC |
| Cold-chain | Insulin flag → temp confirm step |
| Walk time | "40 ft to Preston Bay 2" |

## Deliveries — Live Map

- Map center: Frisco 33.1507° N, 96.8236° W
- Layers: drone positions, geofence boundary, hub pins (Frisco Square)
- Wind overlay (optional): gust direction arrow

## Analytics — USD / CT

| KPI | Westlake Frisco (30d example) |
|---|---|
| Deliveries | 312 |
| On-time | 94.1% |
| Avg time | 17.2 min |
| Avg cost | $5.62 |
| Failures | 2.9% (weather 48%, zone 31%, other 21%) |
| Revenue protected | $4,280 est. (Rx orders delivered on time) |

## Billing — USD

| Line item | Example |
|---|---|
| Subscription | $149.00/mo |
| Deliveries (312 × $5.49 avg) | $1,712.88 |
| Capsule replenishment | $89.00 |
| **Total June 2026** | **$1,950.88** |

---

# DETAILED USER FLOWS

## Order Lifecycle (Collin County)

```
Square order (75034)
  → Geofence check (Phase 1: PASS)
  → Weight 1.2 lbs (PASS, max 8 lbs)
  → Wind 14 mph (PASS, max 25 gust)
  → DRONE ELIGIBLE
  → Pack & Scan → Preston Bay 2
  → In flight → Newman Village yard drop
  → Proof archived → Square delivered
```

## Pack & Scan Screens (7 steps)

```
1. Queue → 2. Order summary → 3. Scan TX capsule → 4. Pack & seal
→ 5. Go to Preston Bay 2 → 6. Scan bay → 7. Success (drone ETA)
```

---

# SCREEN INVENTORY

| # | Screen | Priority | DFW sample data |
|---|---|---|---|
| 1 | Dashboard Home | P0 | Westlake Frisco, 12:04 PM CT |
| 2 | Needs Attention | P0 | Phillips Creek failure |
| 3 | Orders List | P0 | Mix 75033/75034 |
| 4–11 | Pack & Scan flow | P0 | #WL-92847, TX-4471, Preston Bay 2 |
| 12 | Pickup Bay Status | P1 | Preston Bay 2 + Legacy Bay 1 |
| 13 | Live Map | P0 | Collin County geofence |
| 14 | Delivery Detail | P0 | Newman Village route |
| 15 | Failed Delivery | P0 | Phillips Creek photo |
| 16 | Resolution Modal | P0 | Re-dispatch CT times |
| 17 | Proof of Delivery | P1 | GPS 33.1234, 96.8456 |
| 18 | Weather Hold banner | P0 | NWS gust 28 mph |
| 19 | Capsule Inventory | P1 | 4 left — reorder |
| 20 | Analytics | P1 | $5.62 avg, 312 deliveries |
| 21 | Billing | P2 | $1,950.88 June |
| 22 | Pause Service | P1 | July 4 early close |
| 23 | Location switcher | P1 | Frisco / Plano |
| 24 | Login | P0 | merchant.parcelone.com |

**Total: ~24 screens (case study: 20–25)**

---

# DESIGN PRINCIPLES

| Principle | DFW application |
|---|---|
| Operations first | Show gust hold before weekly chart |
| Aviation invisible | "In flight — 4 min" not "hovering at 70 ft" |
| CT everywhere | Timestamps in Central Time |
| USD everywhere | $5.49 not abstract "credits" |
| Texas suburban context | Drop zone wizard shows pool, trampoline, patio |
| Preston Rd urgency | Lunch peak UI is fastest, largest targets |

## Visual Direction

> **Full spec:** See `ParcelOne-Visual-Design-Direction.md` for complete Lovable instructions.

| Attribute | Direction |
|---|---|
| Aesthetic | Futuristic dark UI — 2040 command center (Blade Runner 2049, Tron Legacy, Vision Pro spatial) |
| **NOT** | Traditional light SaaS (Stripe, Shopify, Toast, Bootstrap admin) |
| Background | Deep space `#0A0E17` with glass cards, faint hex grid at 3% opacity |
| Accents | Electric cyan `#00F0FF` (primary), violet `#7C3AED` (secondary), mint `#00FF9D` (success) |
| Typography | Orbitron (headings), Exo 2 (body), JetBrains Mono (order IDs, data) |
| Layout | Floating 64px icon nav rail — not traditional sidebar; oversized metric typography |
| Effects | Subtle glow on active states only — no heavy glitch/Matrix effects |
| Sample merchant | Westlake Pharmacy, 12200 Preston Rd |
| Map style | Dark desaturated tiles, cyan drone paths, pulse halos on markers |
| Usability rule | Futuristic surface, familiar workflows — Pack & Scan stays large and clear |

---

# EDGE CASES & EXCEPTION STATES

| Scenario | Merchant sees | DFW example |
|---|---|---|
| Gust hold | Amber banner + resume ETA | Mar 15 cold front, 28 mph |
| Outside geofence | "Road only — outside Phase 1" | Allen TX 75002 |
| Over 8 lbs | "Road only — 9.2 lbs exceeds limit" | Bulk Costco pickup |
| Hub locker full | "Frisco Square hub at capacity" | Lunch peak |
| T-storm | Red "Network paused — lightning 8 mi" | Apr 22 cell |
| Heat advisory | "Battery efficiency reduced — +2 min ETA" | Aug 3, 104°F |
| Insulin cold-chain | Extra confirm step | Westlake Rx |
| ZIP 75024 Plano | Eligible if within 4 mi of Plano Bay 1 | Westlake Plano |

---

# LOVABLE DESIGN PROMPTS

> Run Prompt 0 first. All sample data uses **Westlake Pharmacy, Frisco, TX** unless noted.

---

## PROMPT 0: Global Design System

> **Use the full Master Prompt from `ParcelOne-Visual-Design-Direction.md` (Section 1).**
> Abbreviated version below — paste the full file version into Lovable for best results.

```
Create "ParcelOne Merchant Portal" — a FUTURISTIC DARK UI for drone logistics merchants 
in Frisco, Texas. NOT a traditional light SaaS dashboard. Feels like a 2040 command center.

AESTHETIC: Blade Runner 2049 UI × Tron Legacy × Vision Pro spatial — calm, cinematic, usable.
NOT: Stripe, Shopify, Toast, Bootstrap, light mode B2B.

COLORS:
- BG: #0A0E17 | Surface: #111827 glass (blur 12px) | Elevated: #1A2332
- Primary: #00F0FF cyan glow | Secondary: #7C3AED violet | Success: #00FF9D mint
- Warning: #FFB020 amber | Error: #FF3B5C coral
- Text: #F0F4FF primary, #8B9BB4 secondary

FONTS: Orbitron (headings/metrics), Exo 2 (body), JetBrains Mono (order IDs #WL-92847)
Labels: Rajdhani uppercase, 0.1em letter-spacing ("IN FLIGHT", "NEEDS ATTENTION")

LAYOUT: Floating 64px icon nav rail (not sidebar). Glass cards with cyan gradient borders.
Oversized metric typography. Faint hex grid background at 3% opacity.
Glow only on active/interactive elements — not everything.

MERCHANT: Westlake Pharmacy, 12200 Preston Rd, Frisco TX 75033. USD. CT timezone.
NAV: Home, Orders, Fulfillment, Deliveries, Capsules, Analytics, Billing, Settings.
Status pill: "OPERATIONAL" with mint glow pulse.

Build the global dark shell first.
```

---

## PROMPT 1: Dashboard Home

```
Design Dashboard Home for ParcelOne Merchant Portal.

MERCHANT: Westlake Pharmacy, 12200 Preston Rd, Frisco, TX 75033
USER: Marcus, store manager
TIME: Tuesday 11:47 AM CT (lunch rush approaching)
STATUS: Operational (green pill)

METRICS ROW:
- In Queue: 6
- In Flight: 4  
- Completed Today: 22
- Needs Attention: 1 (red)

NEEDS ATTENTION CARD:
Order #WL-92812 — Failed 10 min ago
"Drop zone obstructed — Phillips Creek Ranch"
[Resolve] button

IN-FLIGHT LIST:
#WL-92851 → Newman Village — ETA 4 min
#WL-92849 → Frisco Square Hub — ETA 8 min
#WL-92848 → Chase Oaks — ETA 6 min
#WL-92845 → Newman Village — ETA 11 min

FULFILLMENT QUEUE (top 5):
#WL-92847 Amoxicillin + cream — Medium capsule — Wait 2 min — [Pack]
#WL-92846 Insulin pen — Small + cold-chain — Wait 5 min — [Pack]

BANNER: "4 capsules remaining — reorder soon" [Order Capsules $89]

QUICK ACTIONS: [Pack Next Order] [View Live Map] [Pause Service]

Realistic, calm, operational. Central Time. USD.
```

---

## PROMPT 2: Pack & Scan (7 screens)

```
Design Pack & Scan workflow for Westlake Pharmacy fulfillment staff (Dana) 
on iPad at 12200 Preston Rd, Frisco TX.

ORDER: #WL-92847
Customer: Sarah M., 8621 Newman Village Dr, Frisco 75034
Items: Amoxicillin 500mg (30 ct), Hydrocortisone cream 1%
Capsule: MEDIUM | 1.8 mi | Drone eligible

7 SCREENS (full-screen, progress bar, large tap targets):

1. ORDER SUMMARY — items, Medium capsule visual, "Start Packing"
2. SCAN CAPSULE — camera viewfinder, "Scan TX capsule barcode"
3. PACK & SEAL — checklist: items packed, sealed, label up
4. GO TO BAY — "Walk to Preston Bay 2 — 40 ft left of counter", bay available
5. SCAN BAY — QR scan viewfinder  
6. SUCCESS — "Handoff complete! Drone ETA: 3 min" + clock 12:08 PM CT
7. (Optional) PACK NEXT — returns to queue

Include cold-chain variant note for insulin orders.
Tablet 768px. No aviation jargon.
```

---

## PROMPT 3: Orders List

```
Design Orders list for Westlake Pharmacy Merchant Portal.

TABS: All | Drone Eligible | In Progress | Completed | Failed
DATE: Today, June 12, 2026 CT
SEARCH: "Search order #, customer, ZIP..."

12 ROWS sample data — Frisco/Plano addresses:
#WL-92847 | Sarah M. | 75034 | Drone | In Flight | M | 12 min ago
#WL-92846 | James T. | 75034 | Drone | Eligible | S | 3 min ago  
#WL-92840 | Maria L. | 75025 | Road | Road only | — | "Outside geofence"
#WL-92838 | Kevin P. | 75034 | Drone | Hub | M | Frisco Square locker
#WL-92812 | James T. | 75034 | Drone | Failed | M | Phillips Creek

Drawer on click: timeline, Square sync status, capsule TX-####, masked address.
```

---

## PROMPT 4: Live Map — Collin County

```
Design Live Map for ParcelOne Merchant Portal.

MERCHANT: Westlake Pharmacy, Frisco TX (center map near 33.1507, -96.8236)
4 DRONES in flight over Collin County:
- Drone 1 → Newman Village (green, ETA 4 min) Order #WL-92851
- Drone 2 → Frisco Square hub (green, ETA 8 min)
- Drone 3 → Phillips Creek Ranch (amber, delayed wind, ETA 14 min)
- Drone 4 → Plano 75024 (green, ETA 6 min) from Preston Bay Plano

Show: light map with Preston Rd, Dallas North Tollway visible
Geofence: subtle teal boundary around Frisco/Plano/McKinney Phase 1 area
Hub pin: Frisco Square (locker icon)
Store pin: 12200 Preston Rd

Left panel: in-flight list. Click drone → popup with order details.
"Updated 5s ago" timestamp CT.
Uber Fleet style, not military.
```

---

## PROMPT 5: Failed Delivery + Resolution

```
Design Failed Delivery screen for Order #WL-92812.

MERCHANT: Westlake Pharmacy
CUSTOMER: James T., Phillips Creek Ranch, Frisco 75034
FAILED: Yesterday 6:18 PM CT
REASON: Drop zone obstructed — patio furniture in marked area

LEFT: Timeline (Packed 6:02 → Pickup 6:06 → In flight → Hold 6:15 → Failed 6:18)
Photo evidence: backyard with patio set in drop zone (placeholder image)
GPS: 33.1182° N, 96.8511° W

RIGHT: Capsule TX-4398 — sealed, returning to Preston dock
ACTIONS:
1. Re-dispatch Drone (primary) — time picker CT timezone, default tomorrow 10 AM
2. Switch to Road Delivery  
3. Contact Customer — SMS template about clearing drop zone
4. Cancel & Refund (red outline)

Empathetic, actionable. Central Time. USD.
```

---

## PROMPT 6: Weather Hold State

```
Design Dashboard Home WITH active weather hold for Frisco TX.

AMBER BANNER (full width):
"Weather Hold — Wind gusts 28 mph. NWS advisory until ~3:30 PM CT"
"5 deliveries queued. 2 in-flight will complete."

Metrics: In Queue (5, held) | In Flight (2) | Paused badge on service status
Held orders list with customer ZIP 75033/75034
"Resume estimated 3:30 PM CT" countdown

Button: [View Held Orders] [Notify All Customers]

Realistic North Texas spring cold front scenario.
```

---

## PROMPT 7: Analytics (USD)

```
Design Analytics for Westlake Pharmacy — Frisco location.

DATE RANGE: Last 30 days (May 13 – June 12, 2026 CT)

KPIs:
- Deliveries: 312
- On-Time: 94.1% (↑ 2.3%)
- Avg Time: 17.2 min (↓ 1.1 min)
- Failure Rate: 2.9% (↓ 0.6%)
- Avg Cost: $5.62/delivery

Charts: daily volume bar chart; delivery time line chart
Failure breakdown: Weather 48% | Drop zone 31% | Technical 12% | Other 9%
Cost card: Total delivery fees $1,712.88 + subscription $149.00

Compare toggle: Frisco vs Plano location (for multi-location owner)
Export CSV button. USD only.
```

---

## PROMPT 8: Billing (USD)

```
Design Billing page for Westlake Pharmacy owner (Priya).

CURRENT PERIOD: June 1–30, 2026

Summary:
Platform subscription (Frisco): $149.00
Deliveries: 312 × $5.49 avg = $1,712.88
Capsule replenishment (25-pack): $89.00
Total due: $1,950.88

Line item table (sortable): Date CT, Order #, ZIP, Distance, Fee
Example rows from 75033, 75034 addresses

Invoice history: May 2026 $1,842.10, April 2026 $1,654.20
Payment: Visa •••• 4242

Clean invoice UI. USD. Texas business (no state income tax note not needed).
```

---

## PROMPT 9: Location Switcher (Multi-Location)

```
Design location switcher for Westlake Pharmacy regional ops.

DROPDOWN in top nav:
● Westlake Pharmacy — Frisco (12200 Preston Rd) — Operational — 4 in flight
○ Westlake Pharmacy — Plano (8200 Preston Rd) — Operational — 2 in flight  
○ Westlake Pharmacy — McKinney (Coming Q4 2026) — Onboarding

Card view on login for James (regional coordinator):
3 location cards with status, today's deliveries, failure rate
Frisco: 22 today, 2.8% fail | Plano: 11 today, 6.2% fail
```

---

# NOTION SETUP GUIDE

## Page Structure

```
01 — Merchant Portal
├── Launch Market (DFW / Frisco)
├── UX Architecture (this doc)
├── Personas (Dana, Marcus, Priya, James)
├── JTBD Database
├── Workflows Database
├── Screen Inventory (24 screens)
├── Lovable Prompts
└── Design Progress
```

## Databases

| Database | Sample row |
|---|---|
| Screens | Pack & Scan Step 3, P0, Dana, Not Started |
| Workflows | Phillips Creek failure, Marcus, P0 |
| Launch Partners | Westlake Pharmacy, 12200 Preston Rd, Pharmacy |
| DFW Scenarios | Gust hold Mar 15, Weather, P0 |

## Build Order (Lovable)

| Week | Screens | Prompt |
|---|---|---|
| 1 | Design system + Dashboard | 0, 1 |
| 2 | Pack & Scan | 2 |
| 3 | Orders + Live Map | 3, 4 |
| 4 | Failed + Weather hold | 5, 6 |
| 5 | Analytics + Billing + Multi-loc | 7, 8, 9 |

---

# LAUNCH MARKET QUICK REFERENCE CARD

| Item | Value |
|---|---|
| Metro | Dallas–Fort Worth, TX |
| Phase 1 anchor | Frisco, TX |
| Currency | USD ($) |
| Timezone | CT |
| Service radius | 4 miles from dock |
| Max payload | 8 lbs |
| Wind no-fly | Gusts over 25 mph |
| Primary ZIPs | 75033, 75034, 75024, 75070 |
| Hero merchant | Westlake Pharmacy, 12200 Preston Rd |
| Hero QSR | Tacoria, 4840 Legacy Dr |
| Hub pilot | The Meridian at Frisco Square |
| Median delivery | 17 min |
| Avg fee | $5.49–$5.85 |

---

*End of Merchant Portal UX Architecture v2.0 — DFW Launch Edition*
