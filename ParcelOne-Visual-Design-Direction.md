# ParcelOne — Visual Design Direction
**For Lovable & Design Team | Version 1.0 | July 2026**
**Aesthetic:** Futuristic Dark UI — Future World

---

> **How to use with Lovable**
> 1. Paste **MASTER PROMPT** (Section 1) as the first message in a new Lovable project
> 2. Then paste individual screen prompts from Merchant Portal UX Architecture
> 3. Every screen prompt should start with: *"Follow the ParcelOne Futuristic Dark design system."*

---

# 1. MASTER PROMPT FOR LOVABLE (Paste This First)

```
You are designing "ParcelOne Merchant Portal" — a futuristic drone logistics dashboard 
for merchants in Frisco, Texas. This is NOT a traditional SaaS UI. It should feel like 
operating a system from 2040.

AESTHETIC DIRECTION:
- Dark, cinematic, future-world interface
- Inspired by: Blade Runner 2049 UI, Tron Legacy, Apple Vision Pro spatial UI, 
  sci-fi command centers — but CLEAN and usable, not cluttered
- NOT inspired by: Stripe, Shopify, generic Bootstrap dashboards, light mode B2B apps

COLOR SYSTEM:
- Background base: #0A0E17 (deep space black-blue)
- Surface/cards: #111827 with 8% white border glow, or glassmorphism 
  (background: rgba(17, 24, 39, 0.7), backdrop-blur: 12px)
- Primary accent: #00F0FF (electric cyan) — CTAs, active states, drone paths on map
- Secondary accent: #7C3AED (violet glow) — highlights, badges, hover states
- Tertiary: #00FF9D (neon mint) — success, delivered, operational
- Warning: #FFB020 (amber pulse) — weather holds, attention needed
- Error: #FF3B5C (hot coral) — failed deliveries
- Text primary: #F0F4FF (cool white, not pure #FFF)
- Text secondary: #8B9BB4 (muted steel blue)
- Text tertiary: #4A5568

TYPOGRAPHY:
- Display / headings: "Orbitron" or "Rajdhani" — geometric, futuristic, wide letter-spacing
- UI / body: "Exo 2" or "Space Grotesk" — modern, slightly technical, highly readable
- Data / metrics / order numbers: "JetBrains Mono" or "IBM Plex Mono" — monospace, terminal feel
- Headings: uppercase or small-caps for section labels (e.g., "IN FLIGHT", "NEEDS ATTENTION")
- Letter-spacing: 0.08em on labels, 0.02em on body

LAYOUT — NON-TRADITIONAL:
- No standard white sidebar. Use a floating vertical nav rail (64px icon-only, expands on hover)
- Cards float on dark canvas with subtle 1px gradient borders (cyan-to-violet at 20% opacity)
- Asymmetric grid allowed — hero metric can be oversized (e.g., "IN FLIGHT: 4" as large typographic element)
- Subtle background: faint hex grid or topographic contour lines at 3% opacity
- Generous negative space — futuristic UI breathes, doesn't cram
- Rounded corners: 12px cards, 8px buttons, 4px chips — slightly soft, not pill-everything

EFFECTS (use sparingly — premium, not gamer):
- Soft glow on active nav item (box-shadow: 0 0 20px rgba(0, 240, 255, 0.3))
- Status dots pulse gently (CSS animation, 2s ease-in-out)
- Hover on cards: border brightens to cyan, subtle lift (translateY -2px)
- NO heavy neon everywhere — glow only on interactive/active elements
- Subtle scan-line or noise texture on background at 2% opacity (optional)

COMPONENTS:
- Status chips: dark fill + colored border glow (not solid bright fills)
  - Operational: mint border glow
  - In Flight: cyan border glow  
  - Failed: coral border glow
  - Weather Hold: amber pulse border
- Buttons primary: cyan gradient (#00F0FF → #00B8D4), dark text, subtle glow
- Buttons secondary: ghost — cyan border, transparent fill
- Tables: no zebra stripes — row hover with faint cyan left border accent (3px)
- Input fields: dark fill #1A2332, cyan focus ring, monospace for order/capsule IDs
- Progress bars (Pack & Scan): thin cyan line with glowing leading edge

MAP (Live Map screen):
- Dark map tiles (Mapbox dark or custom desaturated)
- Drone markers: small cyan chevron/arrow with soft pulse halo
- Routes: dashed cyan lines with animated dash offset (subtle movement)
- Geofence: violet dashed boundary, low opacity fill
- Store pin: mint hexagon icon

DATA VISUALIZATION:
- Charts on dark — grid lines at 10% opacity
- Line charts: cyan stroke with gradient fill fade to transparent
- Bar charts: cyan-to-violet gradient bars
- No 3D charts

MERCHANT CONTEXT (keep in all screens):
- Merchant: Westlake Pharmacy, 12200 Preston Rd, Frisco, TX 75033
- Currency: USD ($). Timezone: CT
- Sample order: #WL-92847, Capsule #TX-4471

ACCESSIBILITY (don't sacrifice):
- Body text minimum 14px, contrast ratio 4.5:1 on dark
- Interactive targets min 44px for tablet Pack & Scan flow
- Color never sole indicator — always pair with icon + label

DO NOT:
- Use white/light backgrounds
- Use Inter, Roboto, Arial as primary fonts
- Look like a 2015 admin template
- Use stock drone clipart
- Overuse lens flare, cyberpunk glitch effects, or Matrix rain
- Sacrifice scan workflow clarity for aesthetics (Pack & Scan stays large, clear)

Build the global layout shell first: dark nav rail, top status bar with "OPERATIONAL" 
mint glow pill, notification bell, merchant name in Orbitron.
```

---

# 2. DESIGN PHILOSOPHY

## The Feeling We're After

| Attribute | Description |
|-----------|-------------|
| **Era** | 2040 operations center — not 2020 SaaS |
| **Mood** | Calm confidence, not chaotic sci-fi |
| **Reference films/UI** | Blade Runner 2049 interfaces, Oblivion cockpit, Minority Report (restrained), Tron Legacy |
| **Reference products** | Linear (dark mode discipline) × Vision Pro spatial layers × flight radar aesthetics |
| **Anti-reference** | Stripe Dashboard, Toast POS, Shopify Admin, Bootstrap |

## Why Dark + Futuristic Works for ParcelOne

Drone delivery *is* a future product. A dark, cinematic portal:
- Signals innovation to merchants (Westlake Pharmacy isn't using another beige POS screen)
- Makes live map and in-flight data feel like a command center
- Creates portfolio differentiation — most UX case studies use light B2B templates
- Matches customer expectation: "this is aerial logistics, not a spreadsheet"

## Balance Rule

> **Futuristic on the surface. Familiar in the workflow.**

Pack & Scan stays step-by-step and obvious. Analytics can be more experimental. Dashboard sits in between.

---

# 3. COLOR PALETTE (Copy to Notion / Figma)

```
┌─────────────────────────────────────────────────────────────┐
│  PARCELONE FUTURE DARK PALETTE                              │
├─────────────────────────────────────────────────────────────┤
│  BG Deep Space      #0A0E17    ████████████████████████   │
│  Surface Glass      #111827    ████████████████████████   │
│  Surface Elevated   #1A2332    ████████████████████████   │
│  Border Subtle      #2D3748    ████████████████████████   │
│                                                             │
│  Accent Cyan        #00F0FF    ████████████████████████   │
│  Accent Violet      #7C3AED    ████████████████████████   │
│  Success Mint       #00FF9D    ████████████████████████   │
│  Warning Amber      #FFB020    ████████████████████████   │
│  Error Coral        #FF3B5C    ████████████████████████   │
│                                                             │
│  Text Primary       #F0F4FF    ████████████████████████   │
│  Text Secondary     #8B9BB4    ████████████████████████   │
│  Text Muted         #4A5568    ████████████████████████   │
└─────────────────────────────────────────────────────────────┘
```

### Status Color Mapping

| Status | Color | Visual treatment |
|--------|-------|------------------|
| Operational | Mint `#00FF9D` | Glowing pill, pulse dot |
| In Flight | Cyan `#00F0FF` | Animated route, glow chip |
| In Queue | Violet `#7C3AED` | Static chip, border glow |
| Delivered | Mint `#00FF9D` | Check icon, fade animation |
| Failed | Coral `#FF3B5C` | Left border accent, alert card |
| Weather Hold | Amber `#FFB020` | Pulsing banner, scan-line overlay |
| Road Only | Muted `#4A5568` | No glow, dimmed row |
| Paused | Coral outline | Strikethrough effect on status |

---

# 4. TYPOGRAPHY

## Font Stack

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Display** | Orbitron | 600–700 | Page titles, hero metrics, "IN FLIGHT" |
| **UI Body** | Exo 2 | 400–500 | Paragraphs, descriptions, button labels |
| **Data / IDs** | JetBrains Mono | 400–500 | Order #WL-92847, Capsule #TX-4471, timestamps |
| **Labels** | Rajdhani | 600 uppercase | Section headers, nav labels, status tags |

### Google Fonts Import (for Lovable/CSS)

```css
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Orbitron:wght@600;700&family=Rajdhani:wght@600;700&display=swap');
```

### Type Scale

| Element | Font | Size | Style |
|---------|------|------|-------|
| Hero metric | Orbitron | 48–64px | "4" in-flight |
| Page title | Orbitron | 28–32px | "COMMAND CENTER" or "Dashboard" |
| Section label | Rajdhani | 12px | UPPERCASE, 0.1em spacing |
| Body | Exo 2 | 14–16px | Normal case |
| Order ID | JetBrains Mono | 14px | #00F0FF color |
| Caption | Exo 2 | 12px | #8B9BB4 |

---

# 5. LAYOUT PATTERNS (Non-Traditional)

## Navigation — Floating Rail (Not Sidebar)

```
┌──┐ ┌────────────────────────────────────────────────────────┐
│ ◆ │ │  WESTLAKE PHARMACY          ◉ OPERATIONAL    🔔  MR  │
│ ◆ │ │  12200 Preston Rd · Frisco                             │
│ ◆ │ ├────────────────────────────────────────────────────────┤
│ ◆ │ │                                                        │
│ ◆ │ │     ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│ ◆ │ │     │ IN QUEUE │  │ IN FLIGHT│  │ COMPLETE │        │
│ ◆ │ │     │    06    │  │    04    │  │    22    │        │
│ ◆ │ │     └──────────┘  └──────────┘  └──────────┘        │
│ ◆ │ │                                                        │
│ ◆ │ │     ┌─ NEEDS ATTENTION ─────────────────────────┐    │
│ ◆ │ │     │  #WL-92812 · DROP ZONE BLOCKED · [RESOLVE]│    │
│ ◆ │ │     └───────────────────────────────────────────┘    │
│ ◆ │ │                                                        │
└──┘ └────────────────────────────────────────────────────────┘
 64px         Main canvas — dark, hex grid at 3% opacity
 icon rail
```

- Nav rail: 64px, icons only, cyan glow on active
- Expand on hover to show Rajdhani labels
- No full-width top navbar — floating status bar instead

## Cards — Glass Panels

```css
/* Reference for Lovable */
.card-future {
  background: rgba(17, 24, 39, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 240, 255, 0.15);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}
```

## Metric Cards — Oversized Typography

Not small KPI boxes. Hero numbers dominate:

```
┌─────────────────────────┐
│  IN FLIGHT              │  ← Rajdhani 12px uppercase
│                         │
│       04                │  ← Orbitron 56px cyan
│                         │
│  ↑ 2 from last hour     │  ← Exo 2 12px muted
└─────────────────────────┘
```

---

# 6. SCREEN-SPECIFIC GUIDANCE

## Dashboard Home
- Dark canvas with faint hex grid
- 4 metric cards in asymmetric 2+2 or 1-large-3-small grid
- "Needs Attention" card: coral left border (4px), subtle red ambient glow
- In-flight list: monospace order IDs in cyan
- Quick actions: primary cyan gradient button "PACK NEXT ORDER"

## Pack & Scan (Tablet)
- Full-screen dark — even darker `#060912` for focus mode
- Progress: thin cyan line across top, glowing dot at current step
- Step labels in Orbitron: "SCAN CAPSULE", "SEAL & CONFIRM"
- Camera viewfinder: rounded rect with animated cyan corner brackets (sci-fi scan frame)
- Success: mint checkmark with radial glow pulse (one-time animation)

## Live Map
- Darkest screen in the app — `#060912` background
- Map: desaturated dark tiles, cyan roads at 20% opacity
- Drones: chevron markers with pulse halo
- Side panel: glass morphism, slides in from left
- ETA in JetBrains Mono, cyan

## Failed Delivery
- Coral accent border on card — not full red screen
- Timeline: vertical line with glowing nodes (mint = done, coral = fail)
- Photo evidence: rounded frame with subtle scan-line overlay on hover
- Resolution buttons: primary cyan, destructive ghost coral border

## Analytics
- Most "data terminal" screen — monospace numbers, cyan charts
- Feels like a mission debrief, not a Google Analytics clone
- Export button: ghost style "DOWNLOAD REPORT"

## Weather Hold Banner
- Full-width amber strip with subtle pulse animation
- Text: "WEATHER HOLD — GUSTS 28 MPH — RESUME ~3:30 PM CT"
- Optional: faint horizontal scan line animation (slow, 4s)

---

# 7. MOTION & ANIMATION

| Element | Animation | Duration |
|---------|-----------|----------|
| Status pulse dot | Opacity 0.5 → 1 → 0.5 | 2s loop |
| Drone on map | Halo scale pulse | 3s loop |
| Route line | Dash offset march | 1.5s loop |
| Card hover | translateY -2px, border brighten | 200ms |
| Page transition | Fade + slight slide up 8px | 300ms |
| Pack & Scan success | Mint radial expand + fade | 600ms once |
| Weather banner | Amber border pulse | 2.5s loop |

**Rule:** If everything animates, nothing feels futuristic. Animate only live/active states.

---

# 8. ICONOGRAPHY

- Style: Thin line icons (1.5px stroke), geometric, not rounded bubbly
- Library suggestion: Phosphor Icons (thin), Lucide (custom stroke), or custom hexagonal frames
- Active nav: icon wrapped in subtle cyan hexagon or circle glow
- No emoji. No filled cartoon icons.

| Concept | Icon approach |
|---------|---------------|
| Home / Command | Hexagon grid |
| Orders | Stacked layers |
| Fulfillment | Box with scan brackets |
| Deliveries / Map | Crosshair or radar sweep |
| Capsules | Cylinder / pod shape |
| Analytics | Ascending signal bars |
| Settings | Gear with angular teeth |
| Drone in flight | Minimal chevron / arrowhead |

---

# 9. LOVABLE PROMPT PREFIX (Add to Every Screen Prompt)

Paste this at the top of any screen-specific prompt:

```
STYLE OVERRIDE — PARCELONE FUTURE DARK:
- Dark UI only (#0A0E17 background). Glass cards. Cyan (#00F0FF) + violet (#7C3AED) accents.
- Fonts: Orbitron headings, Exo 2 body, JetBrains Mono for order IDs and data.
- Futuristic, non-traditional layout — floating nav rail, oversized metrics, glow on active states.
- NOT a traditional light SaaS dashboard. Think 2040 command center.
- Follow the ParcelOne Futuristic Dark design system established in the master prompt.
```

---

# 10. UPDATED PROMPT 0 (Replace in Merchant Portal doc)

Use the **MASTER PROMPT in Section 1** above as your new Prompt 0.

---

# 11. WHAT CHANGED FROM v1 DESIGN DIRECTION

| Before (v1) | After (Future Dark) |
|-------------|---------------------|
| Light background, slate text | Deep space `#0A0E17` |
| Teal accent `#0D6E6E` | Electric cyan `#00F0FF` |
| Inter font | Orbitron + Exo 2 + JetBrains Mono |
| Stripe / Toast reference | Blade Runner 2049 / command center |
| Standard left sidebar | Floating icon nav rail |
| Traditional KPI cards | Oversized typographic metrics |
| Light map | Dark radar-style map |

**Unchanged:** DFW data, Westlake Pharmacy, USD, CT timezone, workflow logic, usability minimums.

---

# 12. NOTION PAGE SETUP

```
📦 ParcelOne
├── 🎨 Visual Design Direction  ◄── This document
│   ├── Master Lovable Prompt
│   ├── Color Palette
│   ├── Typography
│   ├── Layout Patterns
│   └── Motion Guidelines
├── 🖥️ Platforms
│   └── 01 — Merchant Portal
└── ...
```

---

*End of ParcelOne Visual Design Direction*
