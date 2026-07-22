# ParcelOne — Product Strategy & Ecosystem Documentation
**For Notion Import | Version 2.0 | July 2026**
**Launch Market: Dallas–Fort Worth Metroplex (Phase 1: Collin County North Corridor)**

---

> **How to use this document**
> 1. Create a new Notion page called **ParcelOne**
> 2. Use the **Workspace Structure** section below to create child pages and databases
> 3. Copy each section into its corresponding Notion page
> 4. Convert platform tables into Notion databases for filtering and team collaboration

---

# 🌎 LAUNCH MARKET: WHY DALLAS–FORT WORTH?

## Selected Market

| Attribute | Detail |
|---|---|
| **Metro** | Dallas–Fort Worth–Arlington, Texas, USA |
| **Phase 1 launch corridor** | Collin County North Corridor |
| **Anchor city** | Frisco, TX |
| **Adjacent cities (Phase 1)** | Plano, McKinney, The Colony, Little Elm |
| **Currency** | USD ($) |
| **Time zone** | Central Time (CT) |
| **ParcelOne Ops Center** | Hall Office Park area, Frisco (near Dallas North Tollway & Preston Rd) |
| **Target go-live** | April 2026 |
| **Regulatory context** | FAA Part 108 operating permit + North Texas UAS ecosystem (NTX UAS) |

## Why DFW — Not a Random Choice

ParcelOne is positioned as a **2026-ready startup that could actually raise funding and launch**. DFW is the most defensible first market in the United States for aerial last-mile delivery.

### 1. America’s Proven Drone Delivery Incubator
North Texas is not theoretical. As of 2025–2026:
- **150,000+** commercial drone deliveries completed via Walmart partners (Wing, Zipline) since 2021 — **~70% in DFW**
- **25+ active drone hubs** across the metro, stretching from Princeton to Frisco to Mesquite
- **Wing** operates ~18 Walmart-connected hubs plus DoorDash hubs at **Stonebriar Centre (Frisco)** and Hulen Mall (Fort Worth)
- **Zipline Platform 2** launched at Walmart stores in Mesquite and Waxahachie with up to **8 lb payload**
- **1.8 million households** targeted for drone delivery coverage across DFW (Walmart/Wing/Zipline expansion, 2024)
- DFW is described by industry press as an **“early incubator”** for scaled drone delivery

ParcelOne does not need to convince regulators, municipalities, or consumers that drones can deliver here. The market has already seen it.

### 2. Geography That Matches the Product Model
| Delivery type | DFW fit | Real-world proof |
|---|---|---|
| **Suburban backyard drop** | Excellent — large lots in Frisco, McKinney, The Colony | Wing hovers at ~23 ft, tether drop; Flytrex model in NC suburbs |
| **Apartment hub delivery** | Strong — 35,594 multifamily units delivered in DFW in trailing 12 months (Q3 2025) | DroneUp DBX locker model; Frisco/Plano/Allen absorption hotspots |
| **Retail density** | High — Preston Rd, Dallas North Tollway, Stonebriar Centre, Legacy West (Plano) | DoorDash + Wing mall partnerships |
| **Relay dock network** | Feasible along DNT and Preston Rd commercial corridors | Wing’s pad-to-pad network concept |

### 3. Demographics & Economics
| Metric | DFW Metro | Frisco (anchor) | Source basis |
|---|---|---|---|
| Metro population | ~8.3 million | ~248,000 (city est. 2026) | Census / city of Frisco |
| Median household income | $86,568 | Above metro avg. | Matthews RE / Census |
| Retail sales per capita (Frisco) | — | $25,441 | Census QuickFacts 2022 |
| Population growth (Frisco 2020–2025) | — | +18.2% | Census |
| Unemployment (metro) | 4.2% | — | Matthews 2024 |
| Renter households (metro multifamily) | ~1.5M asking rent avg. $1,500/mo | Growing in northern suburbs | Matthews Q1 2026 |

High-income, fast-growing, digitally native households — exactly the profile that orders same-day pharmacy, grocery, and food delivery.

### 4. Real Last-Mile Pain (Why Merchants Will Pay)
- **Preston Road** and **Dallas North Tollway (DNT)** congestion during lunch and dinner peaks
- Suburban sprawl: 4–6 mile trips that take 20–35 minutes by car during rush
- Courier labor shortage and gig driver unpredictability (region added 153,000 residents 2022–2023)
- QSR and pharmacy competition for “under 30 minutes” delivery (DoorDash, Uber Eats already entrenched)

### 5. Weather Reality (Built Into the Product)
DFW weather is a **feature constraint**, not a bug — it makes ParcelOne credible:
| Condition | Typical DFW impact | ParcelOne threshold (Phase 1) |
|---|---|---|
| Wind gusts | 20–35 mph spring fronts; sustained 15+ mph common | No-fly above **25 mph** sustained gusts |
| Thunderstorms | Mar–May, Sep–Oct severe weather | Auto network pause + customer notification |
| Summer heat | 100°F+ Jul–Aug | Capsule cold-chain monitoring; battery derating alerts |
| Winter ice storms | Occasional (Feb 2021 memory) | Full network pause |

### 6. Regulatory & Ecosystem Maturity
- **FAA Part 108** finalized Q1 2026 — BVLOS package delivery under operating permits
- **North Texas** has coordinated UAS industry ecosystem (Wing, Zipline, DroneUp, CAE, Bell Textron, UNT Discovery Park)
- Municipal familiarity: Frisco, Plano, McKinney have hosted public drone demos and retail partnerships
- Texas business environment: no state income tax, strong logistics and corporate relocation pipeline

### 7. Why Frisco Specifically (Not Just “DFW”)
Frisco is ParcelOne’s **Phase 1 geofence center** because:
- Wing + DoorDash already operate at **Stonebriar Centre** — consumers have seen drone delivery
- Highest retail spend per capita in the corridor ($25,441)
- Mix of **single-family** (Newman Village, Phillips Creek Ranch, Trails of West Frisco) and **multifamily** (Frisco Station, The Oliver, The Meridian at Frisco Square)
- Preston Rd corridor merchants: pharmacies, QSR, grocery — ideal ParcelOne partners
- 30 min to DFW employment centers via DNT — dual-income households, time-starved

---

## Phase 1 Service Geography

```
                    ┌─────────────────────────────────────┐
                    │     PHASE 1 SERVICE AREA (COLLIN)    │
                    │         ~42 sq mi geofence           │
                    │      ~14,200 addressable households   │
                    └─────────────────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                             │                             │
   FRISCO (anchor)                  PLANO                      MCKINNEY
   • Preston Rd corridor           • W Parker Rd              • Eldorado Pkwy
   • Stonebriar area              • Legacy West adj.           • Craig Ranch
   • Frisco Square                 • Shops at Legacy          • Adriatica area
   • Newman Village               • Apartment corridors       • Suburban lots
        │                             │                             │
        └─────────────────────────────┴─────────────────────────────┘
                          THE COLONY · LITTLE ELM (partial)
```

### Phase 1 Infrastructure (ParcelOne-Operated)

| Asset type | Count | Example locations |
|---|---|---|
| Merchant pickup docks | 8 | Preston Rd retail corridor, Lebanon Rd QSR row |
| Relay / charging docks | 5 | Along DNT service road, Preston Rd |
| Community hubs (lockers) | 4 | Frisco Square, The Trails at Wade, Plano apartment cluster, McKinney Adriatica Village |
| Active drone fleet | 36 | Operated from Frisco ops center |
| Operations Supervisors | 2 per shift | 1:18 drone ratio (Part 108 compliant) |

### Phase 1 Launch Partners (Fictional Merchants — Real Addresses)

| Partner | Type | Address | Why them |
|---|---|---|---|
| **Westlake Pharmacy** | Pharmacy | 12200 Preston Rd, Frisco, TX 75033 | Prescription + OTC; time-sensitive; 8 lb capsule fit |
| **Westlake Pharmacy — Plano** | Pharmacy (2nd loc.) | 8200 Preston Rd, Plano, TX 75024 | Multi-location pilot for owner persona |
| **Tacoria** | QSR (Mexican fast casual) | 4840 Legacy Dr, Frisco, TX 75034 | Lunch rush; competes with DoorDash 35–45 min |
| **GreenBowl Salads** | Fast casual | 8720 Preston Rd, Frisco, TX 75033 | Health-conscious demographic match |
| **The Meridian at Frisco Square** | Apartment community | 6101 Frisco Square Blvd, Frisco, TX 75034 | 312-unit community hub pilot |
| **Adriatica Village Apartments** | Apartment community | 660 Adriatica Pkwy, McKinney, TX 75072 | Second hub market; Croatian-themed village retail |

---

## Phase 1 Metrics & Targets (USD)

| Metric | Launch target (Month 3) | Benchmark context |
|---|---|---|
| Weekly deliveries | 850 | Wing: 75,000+ in DFW area (Walmart only) |
| Median delivery time | 17 min | Wing/Walmart: under 30 min |
| On-time rate (within 5 min of ETA) | 92% | — |
| Failure rate | Under 4% | Weather + drop zone = top causes |
| Avg merchant fee per delivery | $5.85 | vs. DoorDash commission 15–30% on food |
| Platform subscription | $149/mo per location | — |
| Service radius | 4 miles from dock | Wing: ~6 miles; ParcelOne conservative at launch |
| Max payload | 8 lbs (3.6 kg) | Zipline P2: 8 lbs; Wing: 2.5–5 lbs |
| Addressable Phase 1 households | ~14,200 | Subset of Frisco+Plano+McKinney geofence |

---

# 📁 RECOMMENDED NOTION WORKSPACE STRUCTURE

```
📦 ParcelOne (Root Page)
│
├── 🌎 Launch Market — DFW / Frisco
│   ├── Why DFW
│   ├── Phase 1 Geography & Map
│   ├── Launch Partners
│   └── Metrics & Targets
│
├── 🏠 Home & Overview
│   ├── Vision, Mission & Value Proposition
│   ├── Business Model (USD)
│   ├── Target Users
│   ├── Competitive Advantages
│   └── Delivery Lifecycle
│
├── 🗺️ Ecosystem Map
│   ├── Platform Inventory (Database)
│   ├── Ecosystem Flow Diagram
│   └── Information Flow Table
│
├── 🖥️ Platforms (Parent Page)
│   └── [01–14 platform pages]
│
├── 🎯 UX Strategy
├── 📐 Case Studies (Portfolio)
└── 📋 Reference
```

---

# 🏠 HOME & OVERVIEW

## Vision

**Make the sky the most reliable lane in last-mile logistics.**

Starting in North Texas — where more commercial drone deliveries have already happened than almost anywhere else in America — ParcelOne builds the software layer that makes aerial delivery routine for Preston Road pharmacies, Legacy Drive restaurants, and Frisco Square apartment residents.

## Mission

ParcelOne connects merchants, fulfillment points, autonomous drones, charging infrastructure, and customers across the DFW metro into one coordinated delivery network — making aerial last-mile delivery as routine as ordering DoorDash, but faster on the Preston Rd corridor and immune to DNT traffic.

## Business Model (USD)

| Revenue Stream | Price (Phase 1) | Who Pays |
|---|---|---|
| Per-delivery fee | $4.99–$6.99 (by distance tier, 0–4 mi) | Merchant or passed to customer |
| Platform subscription | $149/month per location | Merchant |
| Community hub lease | $299/month per hub (24-locker unit) | Property manager |
| Capsule replenishment | $89 per 25-pack ($3.56/capsule) | Merchant |

**Strategic choice:** ParcelOne embeds into existing checkout (Square, Shopify) — customers at Westlake Pharmacy or Tacoria never need a separate app for ordering. ParcelOne tracking link sent via SMS.

## Target Users (DFW Phase 1)

| Segment | DFW Example | Primary Need |
|---|---|---|
| Local pharmacy | Westlake Pharmacy, Preston Rd | Prescription/OTC in under 20 min |
| QSR / fast casual | Tacoria, Legacy Dr; GreenBowl, Preston Rd | Beat 35-min DoorDash during lunch |
| Apartment communities | Meridian at Frisco Square, Adriatica Village | Locker pickup — no backyard |
| Suburban homeowners | Newman Village, Phillips Creek Ranch | Backyard tether drop |
| Ecommerce fulfillment | Small DTC brands shipping from Frisco warehouse | Traffic-free last mile to Collin County |

## Core Value Proposition

> **"Deliver in minutes. Not on Preston Road."**

- **Faster** — median **17-minute** delivery within 4-mile Frisco geofence
- **More predictable** — no DNT or Preston Rd traffic delays
- **Lower cost at scale** — $5.85 avg vs. $8–12 equivalent road courier cost (ParcelOne internal estimate)
- **Secure** — tamper-evident capsules; photo-verified drops; hub lockers for apartments

## Why Drone Delivery Is Needed in DFW Today

| Problem | DFW-specific impact |
|---|---|
| Traffic | Preston Rd + DNT corridor: 20–35 min for 4-mile trips at lunch peak |
| Labor | Metro added 153,000 residents 2022–2023; courier turnover remains high |
| Expectations | DFW consumers already trained on drone delivery via Walmart/Wing — bar is rising |
| Multifamily growth | 35,594 new apartment units in trailing 12 months — backyard drop doesn’t work for many |
| Regulatory opening | FAA Part 108 (Q1 2026) + proven NTX UAS ecosystem |

## Competitive Advantages (vs. Wing-Only, DoorDash, Road)

| Advantage | DFW context |
|---|---|
| Hybrid drop model | Backyard in Newman Village + hub at Frisco Square |
| Merchant-native portal | Westlake uses Square — not a separate Wing app |
| Capsule security | Pharmacy chain-of-custody; tamper evidence for OTC |
| Community hub tools | Property manager dashboard for Meridian, Adriatica |
| Multi-merchant network | One ParcelOne dock serves pharmacy + QSR on same Preston corridor |

## Typical Delivery Lifecycle (Frisco Example)

| Step | Stage | Real-world example |
|---|---|---|
| 1 | Order placed | Customer orders amoxicillin from Westlake Pharmacy app; address: Newman Village, Frisco 75034 |
| 2 | Eligibility | 1.2 lbs, 1.8 mi from dock, wind 12 mph → **Drone Eligible** |
| 3 | Fulfillment | Dana packs into Capsule #TX-4471, scans at Preston Rd Pickup Bay 2 |
| 4 | Pickup | Drone retrieves at 12:08 PM CT; relay via Dock DNT-3 |
| 5 | In-flight | Customer tracks on SMS link; Marcus sees on Live Map |
| 6 | Approach | 2-min push: "Clear your backyard drop zone" |
| 7 | Drop | Tether lower to marked zone; hover ~23 ft (Wing-comparable) |
| 8 | Confirmation | Photo + GPS 33.1234° N, 96.8456° W; customer taps Received |
| 9 | Return | Drone to Preston relay dock; capsule cycle continues |
| 10 | Analytics | Westlake dashboard: 19 min total, $5.49 fee, on-time ✓ |

**Median timeline:** 15–20 min (residential Frisco) | 18–26 min (hub delivery, Frisco Square)

---

# 🗺️ ECOSYSTEM MAP

## Platform Inventory

| # | Platform | Category | Primary Users (DFW) |
|---|---|---|---|
| 1 | Merchant Portal | Merchant-facing | Westlake staff, Tacoria managers |
| 2 | Customer Delivery App | Customer-facing | Frisco/Plano homeowners, apartment residents |
| 3 | Operations Control Center | Internal ops | ParcelOne Frisco ops center shift leads |
| 4 | Fleet Operations Console | Internal ops | Fleet managers at Hall Park ops |
| 5 | Mission Supervision Center | Internal ops | FAA Part 108 Operations Supervisors |
| 6 | Dock Management System | Infrastructure | Preston Rd dock technicians |
| 7 | Weather & Route Intelligence | System / Ops | Monitors DFW wind, storm cells, heat |
| 8 | Delivery Capsule Registry | Asset tracking | TX-tagged capsules across Collin County |
| 9 | Secure Drop Confirmation | Cross-platform | Proof for pharmacy disputes |
| 10 | Community Hub Manager | Property / Customer | Meridian, Adriatica property managers |
| 11 | Customer Support Console | Internal ops | ParcelOne support (remote + Frisco ops) |
| 12 | Maintenance & Readiness Portal | Internal ops | Field techs servicing DNT relay docks |
| 13 | Network Analytics Dashboard | Analytics | ParcelOne leadership, merchant owners |
| 14 | Partner Onboarding Portal | Growth / B2B | New Preston Rd merchants, HOAs |

## Ecosystem Flow Diagram

```
PARTNER ONBOARDING (Preston Rd merchant signs up)
         │
         ▼
MERCHANT PORTAL (Westlake Pharmacy, Frisco) ──► CUSTOMER APP / SMS TRACKING
         │                                              ▲
         ▼                                              │
DOCK (12200 Preston Rd, Bay 2) ─────────────────────────┘
         │
    WEATHER INTEL (DFW wind/gust) + FLEET OPS + CAPSULE REGISTRY
         │
         ▼
OPERATIONS CONTROL (Frisco ops center) → MISSION SUPERVISION
         │
         ▼
       DRONE → Newman Village (yard) OR Frisco Square (hub locker)
         │
         ▼
SECURE DROP CONFIRMATION → Merchant Portal + Analytics
```

## Information Flow Table

*(Unchanged structurally — all flows operate within Collin County Phase 1 geofence)*

| From | To | What Flows |
|---|---|---|
| Customer / Merchant App | Merchant Portal | Order #, eligibility, Westlake Square sync |
| Merchant Portal | Dock Management | Capsule ready at Preston Bay 2 |
| Weather & Route Intelligence | Fleet Operations | DFW gust alert, route re-path around cell |
| Drone | Secure Drop Confirmation | Photo, GPS (Collin County), seal status |
| Community Hub Manager | Customer App | Locker #7 code for Meridian resident |

---

# 🖥️ PLATFORMS (DFW-CONTEXTUALIZED)

---

## Platform 01 — Merchant Portal

**Launch partner:** Westlake Pharmacy (Frisco + Plano), Tacoria, GreenBowl
**Case Study Priority:** ⭐⭐⭐ High

### Purpose
Operational command center for Preston Rd merchants — pack, scan, track, resolve drone deliveries without aviation knowledge.

### Typical User Journey (Frisco)
1. Marcus opens portal at 11:45 AM CT — lunch rush: 6 in queue, 4 in flight
2. Order #WL-92847 (amoxicillin + hydrocortisone) syncs from Square — Drone Eligible, 1.8 mi
3. Dana packs Capsule #TX-4471, scans at Preston Bay 2
4. Drone ETA 3 min; delivers to Newman Village in 17 min total
5. Failed order #WL-92812: customer in Phillips Creek Ranch left patio furniture in drop zone — Marcus re-dispatches for 10 AM next day

### Information Architecture

```
Merchant Portal
├── Home
├── Orders
├── Fulfillment (Pack & Scan)
├── Deliveries (Live Map — Collin County)
├── Capsules
├── Analytics
├── Billing (USD)
└── Settings
```

---

## Platform 02 — Customer Delivery App

**Users:** Frisco/Plano homeowners; Meridian & Adriatica residents

### DFW-Specific Features
- Address eligibility for Collin County geofence (ZIPs: 75033, 75034, 75024, 75070, etc.)
- Drop zone wizard with Texas suburban yard examples (no balcony delivery promises)
- Hub locker flow for Frisco Square, Adriatica Village
- Weather hold: "Thunderstorm cell near Preston Rd — delivery rescheduled"

### Typical Journey
Tacoria customer at 4840 Legacy Dr orders lunch → tracks drone along Legacy corridor → capsule lowered to office park drop zone

---

## Platform 03 — Operations Control Center

**Location:** ParcelOne Frisco ops center (Hall Park area)

### DFW-Specific
- Market status: Frisco/Plano/McKinney sub-grids
- Integration with DFW NWS wind alerts
- Lunch peak monitoring: 11:30 AM–1:30 PM CT, 5:30–7:30 PM CT
- Coordination with 2 Operations Supervisors per shift

---

## Platform 04 — Fleet Operations Console

**Phase 1 fleet:** 36 drones, 8 merchant docks, 5 relay docks (DNT corridor)

---

## Platform 05 — Mission Supervision Center

**Regulatory:** FAA Part 108 — Operations Supervisors at Frisco ops center
**Ratio:** 1 supervisor : 18 drones (Phase 1)

### DFW Intervention Example
Mission M-TX-4421: Phillips Creek Ranch — customer drop zone not cleared. Hold at 200 ft. SMS to customer. Release on confirm.

---

## Platform 06 — Dock Management System

| Dock ID | Location | Merchant |
|---|---|---|
| PRESTON-01 | 12200 Preston Rd, Frisco | Westlake Pharmacy |
| PRESTON-02 | 8720 Preston Rd, Frisco | GreenBowl |
| LEGACY-01 | 4840 Legacy Dr, Frisco | Tacoria |
| PLANO-01 | 8200 Preston Rd, Plano | Westlake Pharmacy #2 |
| DNT-RELAY-03 | DNT & Main St service rd | Relay only |

---

## Platform 07 — Weather & Route Intelligence

### DFW Thresholds (Phase 1)
| Parameter | Go | Hold | No-fly |
|---|---|---|---|
| Wind gusts | Under 20 mph | 20–25 mph | Over 25 mph |
| Lightning | None within 10 mi | Cell approaching | Active T-storm |
| Visibility | Over 3 mi | 1–3 mi | Under 1 mi |
| Temperature | 35°F–105°F | 105°F–110°F | Over 110°F |

---

## Platform 08 — Delivery Capsule Registry

Capsules tagged **TX-####** — tracked across Collin County merchant network

---

## Platform 09 — Secure Drop Confirmation

Cross-platform module. Pharmacy-critical: chain-of-custody timestamp for Westlake orders.

---

## Platform 10 — Community Hub Manager

| Hub | Property | Lockers | Residents |
|---|---|---|---|
| HUB-FSQ-01 | The Meridian at Frisco Square | 24 | 312 units |
| HUB-ADV-01 | Adriatica Village Apartments, McKinney | 18 | 280 units |
| HUB-PLN-01 | Plano apartment cluster (Shops at Legacy adj.) | 20 | 245 units |

---

## Platforms 11–14

*(Structure unchanged — all operate on DFW Phase 1 data)*

- **Customer Support Console** — handles Frisco/Plano timezone (CT)
- **Maintenance & Readiness Portal** — services Preston Rd + DNT docks
- **Network Analytics Dashboard** — Collin County performance rollup
- **Partner Onboarding Portal** — eligibility checker for Preston Rd, Legacy Dr addresses

---

# 🎯 UX STRATEGY (DFW-SPECIFIC OPPORTUNITIES)

| Opportunity | DFW relevance |
|---|---|
| Trust & first-time | Many Frisco residents already saw Wing at Stonebriar — but not from *their* pharmacy |
| Weather uncertainty | Spring cold fronts, summer heat — must communicate honestly |
| Apartment hub delivery | 12.2% vacancy, heavy supply in Frisco/Plano — hubs differentiate |
| Drop zone setup | Large Texas suburban lots — but pools, trampolines, patio furniture common |
| Failed delivery recovery | Wind + uncleared zones = top failures in NTX pilots |
| Lunch rush UX | Tacoria 11:45 AM–1:30 PM CT peak — portal must be fast |

## Design Constraints (DFW 2026)

### ✅ DO
- Reference real corridors: Preston Rd, Legacy Dr, DNT
- Use CT timestamps, USD, US phone formats
- Show wind holds (authentic NTX experience)
- Hub delivery for Frisco Square, Adriatica apartments
- 4-mile radius, 8 lb max payload

### ❌ DON'T
- Promise balcony delivery to high-rises in Legacy West towers
- Ignore thunderstorm season (Mar–May)
- Use metric-only or non-USD pricing
- Show sub-5-minute delivery as default in Frisco sprawl

---

# 📐 CASE STUDIES (PORTFOLIO)

| # | Case Study | DFW Hook |
|---|---|---|
| 1 | Customer Delivery Experience | "From Tacoria on Legacy Dr to your backyard in 17 minutes" |
| 2 | Merchant Portal | "Westlake Pharmacy packs a prescription while Preston Rd is gridlocked" |
| 3 | Community Hub Experience | "312 units at Frisco Square — no backyard required" |
| 4 | Mission Supervision Center | "One supervisor, 18 drones, spring gust front rolling in" |
| 5 | Partner Onboarding Portal | "A new Preston Rd merchant goes live in 48 hours" |

**Presentation sequence:** Customer → Community Hub → Merchant Portal → Mission Supervision → Onboarding

---

# 📋 REFERENCE

## Glossary

| Term | Definition |
|---|---|
| Collin County | North Dallas county — Frisco, Plano, McKinney, Allen |
| DNT | Dallas North Tollway — major N-S corridor |
| NTX UAS | North Texas unmanned aircraft systems industry ecosystem |
| Part 108 | FAA BVLOS drone operations rule (2026) |
| Phase 1 geofence | ~42 sq mi initial ParcelOne service area |
| Preston Rd | Primary N-S retail corridor in Frisco |

## Real-World Inspiration (DFW Research)

| Company | DFW presence | ParcelOne differentiation |
|---|---|---|
| Wing | 18 Walmart hubs, Stonebriar DoorDash, 75k+ DFW deliveries | Multi-merchant portal, pharmacy focus, hub manager |
| Zipline | Walmart Mesquite/Waxahachie, 8 lb payload | Collin County suburban focus, capsule model |
| DroneUp | Walmart partner, DBX lockers | Community hub software layer |
| DoorDash + Wing | Stonebriar Centre, Hulen Mall | Merchant-owned experience, not aggregator-only |

## Suggested Notion Databases

| Database | Key properties |
|---|---|
| Launch Partners | Name, Address, City, Type, Status, Dock ID |
| DFW Metrics | Week, Deliveries, On-time %, Failures, Weather holds |
| Platforms | Name, Category, Case Study Priority |
| Screens | Name, Platform, Status, Priority |

---

*End of ParcelOne Notion Documentation v2.0 — DFW Launch Edition*
