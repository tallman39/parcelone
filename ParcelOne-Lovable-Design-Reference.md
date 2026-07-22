# ParcelOne Merchant Portal — Lovable Design Reference
**Canonical UI | Based on Lovable v1 output | Lock all future prompts to this**

---

> **Rule for all Lovable prompts:** Extend this design. Do not redesign. Match colors, layout, typography feel, and 3-panel command center pattern exactly.

---

# 1. DESIGN IDENTITY

| Attribute | Value |
|-----------|-------|
| **Product name in UI** | PARCELONE — Merchant Command |
| **Theme** | Dark tactical logistics command center |
| **Mood** | Futuristic, operational, premium — NOT consumer, NOT light SaaS |
| **Accent color** | Safety orange (~#FF6B00 / #E85D04) — active states, CTAs, selected items, map markers |
| **Background** | Near-black / charcoal (#0D0D0D – #1A1A1A) |
| **Surface cards** | Dark grey panels with thin 1px borders, subtle inner depth |
| **Text primary** | Off-white (#F5F5F5) |
| **Text secondary** | Muted grey (#888 – #AAA) |
| **Success / nominal** | Green dot + "NETWORK NOMINAL" |
| **Warning / fault** | Red for FAULTS count and error states |
| **Typography** | Clean condensed sans-serif, technical/sci-fi feel — uppercase labels with letter-spacing |

---

# 2. GLOBAL LAYOUT SHELL

## Top Header Bar (full width)
```
[PARCELONE] Merchant Command          [IN FLIGHT 02] [LOADING 02] [FAULTS 01] [● NETWORK NOMINAL]
Westlake Pharmacy · 12200 Preston Rd, Frisco TX 75033                    [🔔] [⚙] [M. Reyes ▾]
```

- Left: Brand + merchant name + address (small, muted)
- Center-right: Status pills with counts — IN FLIGHT, LOADING, FAULTS, NETWORK NOMINAL (green)
- Right: Notifications, settings, user avatar + name

## 3-Panel Command Center (Home — primary view)

```
┌─────────────────┬──────────────────────────────┬─────────────────┐
│  FLEET          │         MAP                  │  MISSION DETAIL │
│  Active devices │    Network overview          │  Selected unit  │
│                 │                              │                 │
│  [Search]       │    Dark map + orange routes  │  DRN-01 header │
│  ALL|DRONE|BAY  │    Drone markers (orange)    │  Metrics row    │
│                 │    Selected drone card       │  MANIFEST list  │
│  Device cards   │    on map overlay            │  Action buttons │
│  (scrollable)   │                              │                 │
│                 │                              │                 │
│  CORRIDOR       │    [+][-] zoom               │  [RECALL] [TRACK]│
│  CONDITIONS     │                              │                 │
└─────────────────┴──────────────────────────────┴─────────────────┘
```

---

# 3. LEFT PANEL — FLEET

**Header:** `FLEET` + "Active devices" + signal icon

**Controls:**
- Search bar (dark input)
- Filter tabs: `ALL` | `DRONE` | `BAY`

**Device card structure (Bay):**
```
[BAY-01]  Loading                    [●]
Preston Rd Dock · Bay 2
Capacity 3/5
```

**Device card structure (Drone):**
```
[DRN-01]  In Flight                  [●]
Newman Village · ETA 4m 12s
[Battery 71%] [2 caps] [2.4 kg]
```

**Selection state:** Orange left border or full card orange outline + orange icon glow

**Footer — CORRIDOR CONDITIONS:**
- Wind: 7 kts NW
- Uplink: -42 dBm

**Sample fleet data:**
| ID | Type | Status | Detail |
|----|------|--------|--------|
| BAY-01 | Bay | Loading | Preston Rd Dock · 3/5 capacity |
| BAY-02 | Bay | Idle | Legacy Dr Dock |
| DRN-01 | Drone | In Flight | Newman Village · ETA 4m 12s · 71% · 2 caps |
| DRN-02 | Drone | In Flight | Frisco Square Hub · ETA 8m |
| DRN-03 | Drone | Returning | Preston Dock · 89% |
| DRN-04 | Drone | Loading | Bay-01 · 2 caps queued |
| DRN-05 | Drone | Charging | Relay DNT-3 · 34% |
| DRN-06 | Drone | Fault | Phillips Creek · drop zone fail |

---

# 4. CENTER PANEL — MAP

**Style:** Dark monochromatic map — streets/buildings as thin grey outlines on black

**Overlays (top-left telemetry):**
```
33.1507° N, 96.8236° W
Alt ceil: 400 ft AGL
Corridor: Preston · Frisco Phase 1
```

**Map elements:**
- Store pin: Westlake Pharmacy (12200 Preston Rd)
- Hub pin: Frisco Square
- Flight paths: Dotted/dashed **orange** lines
- Active drones: Glowing **orange** circular markers with drone icon
- Selected drone: Brighter orange halo + floating detail card on map

**Floating detail card (selected drone on map):**
```
DRN-01 · In Flight
Newman Village · ETA 4m 12s
Battery 71% · 2 capsules
```

**Controls:** `+` / `-` zoom bottom-right

---

# 5. RIGHT PANEL — MISSION DETAIL

**Header:**
```
MISSION DETAIL
DRN-01 · Autonomous Delivery Unit
[IN FLIGHT]                    Newman Village · ETA 4m 12s
```

**Metrics row (4 modules):**
| Battery | Capsules | Payload | Wind |
|---------|----------|---------|------|
| 71% ▓▓▓░ | 2 | 2.4 kg | 6 kts |

**MANIFEST section:**
```
MANIFEST — 2 parcels assigned

#WL-92847 · In Flight
Newman Village · Sarah M.
Capsule #TX-4471 · Size M · 1.2 kg

#WL-92851 · In Flight  
Chase Oaks · Kevin P.
Capsule #TX-4488 · Size S · 0.8 kg
```

**Parcel row fields:** Order #, status chip, destination, customer initial, capsule ID, size, weight

**Action buttons (bottom):**
- `[RECALL TO BASE]` — ghost, orange outline
- `[TRACK LIVE]` — solid orange fill, dark text

**When BAY selected instead of drone:**
- Header: BAY-01 · Preston Rd Dock
- Shows capsules queued for loading (not in-flight manifest)
- Action: `[LOAD NEXT CAPSULE]` primary orange

**When nothing selected:**
- Empty state: "Select a device from the fleet to view mission details"

---

# 6. INTERACTION MODEL (preserve exactly)

1. Page loads → fleet list populated, DRN-01 selected by default (or first active)
2. Click drone in left list → center map highlights route + marker, right shows manifest
3. Click bay in left list → right shows queued capsules waiting to load
4. Click parcel in manifest → optional expand for order detail (future)
5. Header status counts update from fleet state

---

# 7. STATUS SYSTEM

| Status | Color | Usage |
|--------|-------|-------|
| In Flight | Orange | Drone active, map marker |
| Loading | Orange/amber | Bay or drone at dock |
| Idle | Grey | Available bay/drone |
| Returning | Muted orange | Drone en route to dock |
| Charging | Grey + green battery | At relay dock |
| Fault | Red | Failed delivery, needs attention |
| Network Nominal | Green dot | Header status |
| Delivered | Green/mint | Completed parcels |

---

# 8. COMPONENTS TO REUSE

| Component | Spec |
|-----------|------|
| Status pill | Dark bg, uppercase label, count number, optional colored dot |
| Device card | Dark panel, icon left, title + status, meta row, orange border when selected |
| Metric module | Small box, label top, value large, optional mini progress bar |
| Manifest row | Order # monospace, status chip, destination, capsule meta |
| Primary button | Solid orange, dark text, uppercase |
| Secondary button | Ghost, orange 1px border |
| Search input | Dark fill, thin border, no heavy radius |
| Filter tabs | ALL / DRONE / BAY — active tab orange underline or fill |

---

# 9. MERCHANT & DATA CONSTANTS

| Constant | Value |
|----------|-------|
| Merchant | Westlake Pharmacy |
| Address | 12200 Preston Rd, Frisco, TX 75033 |
| User | M. Reyes (Marcus) |
| Currency | USD ($) |
| Timezone | CT |
| Order prefix | #WL- |
| Capsule prefix | #TX- |
| Drone prefix | DRN- |
| Bay prefix | BAY- |
| Destinations | Newman Village, Phillips Creek Ranch, Frisco Square Hub, Chase Oaks, Plano 75024 |

---

# 10. SCREENS TO BUILD NEXT (same design system)

| # | Screen | How it fits |
|---|--------|-------------|
| 1 | Command Center Home | ✅ DONE (Lovable v1) |
| 2 | Pack & Scan overlay | Full-screen modal/slide-over from BAY selection |
| 3 | Failed delivery detail | Right panel expand OR slide-over when FAULT selected |
| 4 | Orders table view | Secondary nav page — same header + dark table |
| 5 | Analytics | Secondary nav — dark charts, orange accents |
| 6 | Weather hold state | Header banner + fleet cards show HELD status |

---

# 11. DO NOT CHANGE

- 3-panel command layout on Home
- Orange accent (not cyan, not teal)
- Dark map center panel
- Fleet list left / Mission detail right
- "Merchant Command" sub-branding
- Uppercase section labels (FLEET, MISSION DETAIL, MANIFEST)
- Header status pills (IN FLIGHT, LOADING, FAULTS, NETWORK NOMINAL)

---

*Reference screenshot saved in project assets — use as visual source of truth for all future Lovable prompts.*
