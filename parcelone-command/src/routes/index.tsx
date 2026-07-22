import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { TopBar, StatChip } from "@/components/TopBar";
import { useWeatherHold, setWeatherHold } from "@/lib/weather-hold";




import {
  Activity,
  AlertTriangle,
  Bell,
  Boxes,
  ChevronRight,
  CircleDot,
  Cpu,
  Gauge,
  MapPin,
  Package,
  
  Radio,
  Search,
  Settings,
  Signal,
  Store,
  Wind,
  Zap,
} from "lucide-react";

// Abstract drone glyph — quad-rotor viewed from above: crossed arms with
// four rotor discs and a central sensor pip. Uses currentColor so it
// inherits text color like a Lucide icon.
function DroneGlyph({ className = "", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {/* rotor arms */}
      <path d="M6 6L18 18M18 6L6 18" />
      {/* rotor discs */}
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      {/* central body */}
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const Route = createFileRoute("/")({
  validateSearch: z.object({ select: z.string().optional() }),
  component: CommandCenter,
});


// ---------- Types & mock data ----------

type DeviceStatus = "in-flight" | "returning" | "loading" | "charging" | "idle" | "fault" | "held";
type Kind = "drone" | "bay";
type LatLng = [number, number];

type Device = {
  id: string;
  kind: Kind;
  status: DeviceStatus;
  destination?: string;
  eta?: string;
  capsules: number;
  battery?: number;
  payloadKg?: number;
  windKts?: number;
  pos: LatLng;
  routeTo?: LatLng;
  heading?: number; // degrees
};

type Parcel = {
  order: string;
  area: string;
  capsule: string;
  size: "S" | "M" | "L";
  weightKg: number;
  status: "queued" | "packing" | "loaded" | "in-flight" | "delivered" | "failed";
  note?: string;
};

// Real Frisco, TX coordinates
const STORE: { pos: LatLng; label: string } = {
  pos: [33.1230, -96.8020], // 12200 Preston Rd, Frisco, TX
  label: "Westlake Pharmacy",
};

const ZONES: { name: string; pos: LatLng }[] = [
  { name: "Newman Village", pos: [33.1465, -96.7820] },
  { name: "Phillips Creek Ranch", pos: [33.1520, -96.8600] },
  { name: "Frisco Square Hub", pos: [33.1508, -96.8236] },
  { name: "Stonebrook", pos: [33.1360, -96.8580] },
  { name: "The Grove", pos: [33.1180, -96.7500] },
];

const zone = (n: string) => ZONES.find((z) => z.name === n)!.pos;

const DEVICES: Device[] = [
  { id: "BAY-01", kind: "bay", status: "loading", capsules: 3, pos: [33.1231, -96.8018], destination: "Preston Rd Dock · 3/5", windKts: 6 },
  { id: "BAY-02", kind: "bay", status: "idle", capsules: 1, pos: [33.1229, -96.8022], destination: "Loading dock B" },
  {
    id: "DRN-01", kind: "drone", status: "in-flight", destination: "Newman Village", eta: "4m 12s",
    capsules: 2, battery: 71, payloadKg: 2.4, windKts: 6,
    pos: [33.1360, -96.7910], routeTo: zone("Newman Village"), heading: 40,
  },
  {
    id: "DRN-02", kind: "drone", status: "in-flight", destination: "Phillips Creek Ranch", eta: "6m 40s",
    capsules: 1, battery: 63, payloadKg: 1.1, windKts: 8,
    pos: [33.1400, -96.8340], routeTo: zone("Phillips Creek Ranch"), heading: 310,
  },
  {
    id: "DRN-03", kind: "drone", status: "returning", destination: "Home dock", eta: "1m 55s",
    capsules: 0, battery: 42, payloadKg: 0, windKts: 5,
    pos: [33.1370, -96.8180], routeTo: STORE.pos, heading: 210,
  },
  {
    id: "DRN-04", kind: "drone", status: "loading", destination: "Frisco Square Hub", eta: "queued",
    capsules: 3, battery: 96, payloadKg: 3.2, windKts: 0,
    pos: [33.1232, -96.8017],
  },
  {
    id: "DRN-05", kind: "drone", status: "charging", capsules: 0, battery: 28,
    pos: [33.1228, -96.8024], payloadKg: 0, windKts: 0,
  },
  {
    id: "DRN-06", kind: "drone", status: "fault", destination: "Newman Village", capsules: 1, battery: 55,
    pos: [33.1330, -96.7960], routeTo: zone("Newman Village"), heading: 45, payloadKg: 1.8, windKts: 11,
  },
];

const PARCELS: Record<string, Parcel[]> = {
  "BAY-01": [
    { order: "#WL-92846", area: "Insulin pen (cold chain)", capsule: "#TX-4492", size: "S", weightKg: 0.6, status: "queued", note: "COLD CHAIN" },
    { order: "#WL-92848", area: "OTC bundle", capsule: "#TX-4501", size: "M", weightKg: 1.4, status: "queued" },
  ],
  "BAY-02": [
    { order: "#WL-92860", area: "The Grove", capsule: "#TX-4510", size: "M", weightKg: 1.6, status: "packing" },
  ],
  "DRN-01": [
    { order: "#WL-92840", area: "Newman Village", capsule: "#TX-4460", size: "M", weightKg: 1.4, status: "in-flight" },
    { order: "#WL-92841", area: "Newman Village", capsule: "#TX-4461", size: "S", weightKg: 1.0, status: "in-flight" },
  ],
  "DRN-02": [
    { order: "#WL-92839", area: "Phillips Creek Ranch", capsule: "#TX-4455", size: "S", weightKg: 1.1, status: "in-flight" },
  ],
  "DRN-03": [],
  "DRN-04": [
    { order: "#WL-92844", area: "Frisco Square Hub", capsule: "#TX-4482", size: "M", weightKg: 1.2, status: "loaded" },
    { order: "#WL-92845", area: "Frisco Square Hub", capsule: "#TX-4483", size: "M", weightKg: 1.0, status: "loaded" },
    { order: "#WL-92849", area: "Frisco Square Hub", capsule: "#TX-4491", size: "L", weightKg: 1.0, status: "packing" },
  ],
  "DRN-05": [],
  "DRN-06": [
    { order: "#WL-92812", area: "Newman Village", capsule: "#TX-4402", size: "M", weightKg: 1.8, status: "failed", note: "Drop zone obstructed — return to base" },
  ],
};

const STATUS_META: Record<DeviceStatus, { label: string; dot: string; text: string; bg: string }> = {
  "in-flight": { label: "IN FLIGHT", dot: "bg-[color:var(--color-flight)]", text: "text-[color:var(--color-flight)]", bg: "bg-[color:var(--color-flight)]/10" },
  "returning": { label: "RETURNING", dot: "bg-signal", text: "text-signal", bg: "bg-[color:var(--color-signal)]/10" },
  "loading": { label: "LOADING", dot: "bg-signal", text: "text-signal", bg: "bg-[color:var(--color-signal)]/10" },
  "charging": { label: "CHARGING", dot: "bg-[color:var(--color-idle)]", text: "text-[color:var(--color-idle)]", bg: "bg-[color:var(--color-idle)]/10" },
  "idle": { label: "IDLE", dot: "bg-[color:var(--color-idle)]", text: "text-[color:var(--color-idle)]", bg: "bg-[color:var(--color-idle)]/10" },
  "fault": { label: "FAULT", dot: "bg-[color:var(--color-alert)]", text: "text-[color:var(--color-alert)]", bg: "bg-[color:var(--color-alert)]/10" },
  "held": { label: "HELD", dot: "bg-[color:#f0a04b]", text: "text-[color:#f0a04b]", bg: "bg-[color:#f0a04b]/10" },
};

const STATUS_COLOR: Record<DeviceStatus, string> = {
  "in-flight": "#3B82F6",
  "returning": "#60a5fa",
  "loading": "#3B82F6",
  "charging": "#8a8a8a",
  "idle": "#8a8a8a",
  "fault": "#ff5a5f",
  "held": "#6b6b6b",
};

// Devices held during a weather event (map markers turn grey, chips amber)
const WEATHER_HELD_IDS = new Set(["DRN-03", "DRN-04", "DRN-05", "BAY-01"]);


// ---------- Component ----------

function CommandCenter() {
  const search = Route.useSearch();
  const [selectedId, setSelectedId] = useState<string>(search.select ?? "DRN-01");
  const [filter, setFilter] = useState<"drone" | "bay">("drone");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (search.select) setSelectedId(search.select);
  }, [search.select]);


  // Live jitter to make drones feel alive
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1500);
    return () => clearInterval(t);
  }, []);

  const weatherHold = useWeatherHold();

  // Base devices — override status when weather hold active
  const baseDevices = useMemo<Device[]>(() => {
    if (!weatherHold) return DEVICES;
    return DEVICES.map((d) =>
      WEATHER_HELD_IDS.has(d.id) ? { ...d, status: "held" as DeviceStatus, eta: "held" } : d
    );
  }, [weatherHold]);

  const liveDevices = useMemo<Device[]>(() => {
    return baseDevices.map((d) => {
      if (d.status !== "in-flight" && d.status !== "returning") return d;
      if (!d.routeTo) return d;
      // step 3% closer to destination each tick, then reset
      const progress = ((tick * 3) % 90) / 100;
      const [sLat, sLng] = d.pos;
      const [eLat, eLng] = d.routeTo;
      return { ...d, pos: [sLat + (eLat - sLat) * progress, sLng + (eLng - sLng) * progress] as LatLng };
    });
  }, [tick, baseDevices]);

  const filtered = liveDevices.filter((d) => d.kind === filter);
  const selected = liveDevices.find((d) => d.id === selectedId);
  const parcels = selectedId ? PARCELS[selectedId] ?? [] : [];

  const counts = useMemo(() => ({
    inFlight: baseDevices.filter((d) => d.status === "in-flight").length,
    loading: baseDevices.filter((d) => d.status === "loading").length,
    fault: baseDevices.filter((d) => d.status === "fault").length,
    fleet: baseDevices.filter((d) => d.kind === "drone").length,
  }), [baseDevices]);

  const [packScanOpen, setPackScanOpen] = useState(false);

  return (
    <div className="flex h-screen min-h-screen flex-col overflow-hidden bg-background pl-16 text-foreground">
      <TopBar activeTab="command" counts={counts} weatherHold={weatherHold} heldCount={5} />
      {weatherHold && <WeatherHoldBanner />}
      <div className={`relative flex-1 min-h-0 transition-opacity ${packScanOpen ? "opacity-40 pointer-events-none" : ""}`}>
        <MapPanel devices={liveDevices} selectedId={selectedId} onSelect={setSelectedId} weatherHold={weatherHold} />
        <div className="pointer-events-none absolute inset-0 z-[500] flex gap-3 p-3">
          <div className="pointer-events-auto flex h-full w-[340px] max-w-full flex-col shadow-2xl">
            <FleetPanel devices={filtered} selectedId={selectedId} onSelect={setSelectedId} filter={filter} setFilter={setFilter} weatherHold={weatherHold} counts={counts} heldCount={5} />

          </div>
          {selected && (
            <div className="pointer-events-auto ml-auto flex w-[380px] max-w-full max-h-full flex-col self-start">
              <DetailPanel selected={selected} parcels={parcels} onPackScan={() => setPackScanOpen(true)} weatherHold={weatherHold} onClose={() => setSelectedId("")} />
            </div>

          )}
        </div>
      </div>

      {packScanOpen && <PackScanOverlay onClose={() => setPackScanOpen(false)} />}
    </div>
  );
}

// ---------- Weather hold banner ----------

function WeatherHoldBanner() {
  return (
    <div
      className="relative border-b px-4 py-3"
      style={{
        borderColor: "#f0a04b66",
        background:
          "linear-gradient(90deg, rgba(240,160,75,0.14) 0%, rgba(240,160,75,0.05) 100%)",
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 border animate-[weatherPulse_2.4s_ease-in-out_infinite]"
        style={{ borderColor: "#f0a04b44" }}
      />
      <div className="relative flex flex-wrap items-center gap-4">
        <div className="flex items-start gap-3">
          <div
            className="grid h-9 w-9 place-items-center rounded-md"
            style={{ background: "#f0a04b22", boxShadow: "0 0 18px #f0a04b55" }}
          >
            <AlertTriangle className="h-5 w-5" style={{ color: "#f0a04b" }} />
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.22em]" style={{ color: "#f0a04b" }}>
              WEATHER HOLD — WIND GUSTS 28 MPH — NWS ADVISORY UNTIL ~3:30 PM CT
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              <span className="text-foreground">05</span> deliveries queued ·{" "}
              <span className="text-foreground">02</span> in-flight will complete · Resume estimated{" "}
              <span className="text-foreground">3:30 PM CT</span>
            </div>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            className="rounded-md px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.2em] transition hover:opacity-90"
            style={{ background: "#f0a04b", color: "#1a1207" }}
          >
            VIEW HELD ORDERS
          </button>
          <button
            className="rounded-md border bg-transparent px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] transition hover:bg-[color:#f0a04b]/10"
            style={{ borderColor: "#f0a04b88", color: "#f0a04b" }}
          >
            NOTIFY ALL CUSTOMERS
          </button>
          <button
            onClick={() => setWeatherHold(false)}
            className="rounded-md border border-border bg-panel px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
          >
            DISMISS
          </button>
        </div>
      </div>
      <style>{`
        @keyframes weatherPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}


// ---------- (TopBar/StatChip live in src/components/TopBar.tsx) ----------



// ---------- Left: Fleet panel ----------

function FleetPanel({
  devices, selectedId, onSelect, filter, setFilter, weatherHold = false, counts, heldCount = 5,
}: {
  devices: Device[];
  selectedId: string;
  onSelect: (id: string) => void;
  filter: "drone" | "bay";
  setFilter: (f: "drone" | "bay") => void;
  weatherHold?: boolean;
  counts: { inFlight: number; loading: number; fault: number };
  heldCount?: number;
}) {
  const StackedStat = ({ label, value, dot }: { label: string; value: number; dot: string }) => (
    <div className="flex-1">
      <div className="flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <span className="eyebrow-mono">{label}</span>
      </div>
      <div className="mt-2 font-sans text-3xl font-medium leading-none tracking-tight tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
    </div>
  );
  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-panel/80 backdrop-blur-md">

      <div className="flex items-center justify-between border-b border-border px-5 py-5">
        <div>
          <div className="eyebrow-mono">Fleet / Live</div>
          <div className="mt-1 text-lg font-medium tracking-tight">Active devices</div>
        </div>
        <div className="relative flex h-2 w-2" aria-label="Live">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
        </div>
      </div>

      <div className="flex items-stretch gap-4 border-b border-border px-5 py-5">
        <StackedStat label="FLIGHT" value={counts.inFlight} dot="bg-[color:var(--color-flight)]" />
        <div className="w-px bg-border/60" />
        {weatherHold ? (
          <StackedStat label="HELD" value={heldCount} dot="bg-[#f0a04b]" />
        ) : (
          <StackedStat label="LOAD" value={counts.loading} dot="bg-signal" />
        )}
        <div className="w-px bg-border/60" />
        <StackedStat label="FAULT" value={counts.fault} dot={counts.fault ? "bg-[color:var(--color-alert)]" : "bg-muted-foreground/40"} />
      </div>



      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background/40 px-2.5 py-2">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input placeholder="Search DRN-…" className="w-full bg-transparent font-mono text-xs outline-none placeholder:text-muted-foreground/60" />
        </div>
      </div>

      <div className="flex gap-1 border-b border-border px-3 py-2.5">
        {(["drone", "bay"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 rounded-md px-2 py-2 font-mono text-[10px] tracking-[0.22em] transition ${
              filter === f ? "bg-signal/15 text-signal ring-1 ring-signal/40" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        {devices.map((d) => (
          <DeviceRow key={d.id} device={d} selected={d.id === selectedId} onClick={() => onSelect(d.id)} />
        ))}
      </div>

      <div className="border-t border-border px-5 py-4">
        <div className="eyebrow-mono mb-2">Corridor conditions</div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground"><Wind className="h-3.5 w-3.5" /> Wind</span>
          <span className="font-mono tabular-nums" style={weatherHold ? { color: "#f0a04b" } : undefined}>
            {weatherHold ? "28 kts NW" : "7 kts NW"}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground"><Signal className="h-3.5 w-3.5" /> Uplink</span>
          <span className="font-mono tabular-nums text-[color:var(--color-success)]">-42 dBm</span>
        </div>
      </div>
    </aside>
  );
}

function DeviceRow({ device, selected, onClick }: { device: Device; selected: boolean; onClick: () => void }) {
  const meta = STATUS_META[device.status];
  const isDrone = device.kind === "drone";
  const isPriority = device.status === "fault" || device.status === "in-flight";
  return (
    <button
      onClick={onClick}
      className={`group relative mb-2 w-full overflow-hidden rounded-md border px-4 py-4 text-left transition ${
        selected
          ? "border-signal/50 bg-signal/8"
          : "border-transparent bg-background/20 hover:border-border hover:bg-background/50"
      }`}
    >
      {/* Priority accent bar */}
      <span
        aria-hidden
        className={`absolute inset-y-3 left-0 w-[3px] rounded-r ${
          device.status === "fault"
            ? "bg-[color:var(--color-alert)]"
            : device.status === "in-flight"
            ? "bg-[color:var(--color-flight)]"
            : selected
            ? "bg-signal"
            : "bg-transparent"
        }`}
      />

      <div className="flex items-start gap-3.5 pl-2.5">
        <div className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-md ${selected ? "bg-signal/25" : "bg-muted/60"}`}>
          {isDrone ? <DroneGlyph className="h-5 w-5" /> : <Boxes className="h-5 w-5" />}
        </div>

        <div className="min-w-0 flex-1">
          {/* Primary: ID */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-[15px] font-semibold tracking-wider text-foreground">
              {device.id}
            </span>
            <span className={`shrink-0 font-mono text-[10px] tracking-widest ${meta.text} ${isPriority ? "font-semibold" : ""}`}>
              <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${meta.dot} ${isPriority ? "pulse-dot" : ""} align-middle`} />
              {meta.label}
            </span>
          </div>

          {/* Secondary: destination */}
          <div className="mt-1.5 truncate text-[13px] text-muted-foreground">
            {device.destination ?? (isDrone ? "Awaiting dispatch" : "Standby")}
          </div>

          {/* Tertiary: telemetry — bigger numbers, tiny labels above */}
          <div className="mt-3 flex items-end gap-5">
            {isDrone ? (
              <>
                <div>
                  <div className="eyebrow-mono text-[9px]">BATT</div>
                  <div className="mt-0.5 font-sans text-base font-medium tabular-nums leading-none">{device.battery ?? 0}<span className="text-[10px] text-muted-foreground">%</span></div>
                </div>
                <div>
                  <div className="eyebrow-mono text-[9px]">CAPS</div>
                  <div className="mt-0.5 font-sans text-base font-medium tabular-nums leading-none">{device.capsules}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="eyebrow-mono text-[9px]">ETA</div>
                  <div className="mt-0.5 font-mono text-sm text-foreground/90 tabular-nums leading-none">{device.eta ?? "—"}</div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="eyebrow-mono text-[9px]">CAPSULES</div>
                  <div className="mt-0.5 font-sans text-base font-medium tabular-nums leading-none">{device.capsules}</div>
                </div>
                {typeof device.payloadKg === "number" && (
                  <div>
                    <div className="eyebrow-mono text-[9px]">PAYLOAD</div>
                    <div className="mt-0.5 font-sans text-base font-medium tabular-nums leading-none">{device.payloadKg.toFixed(1)}<span className="text-[10px] text-muted-foreground"> kg</span></div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}


// ---------- Center: Real Leaflet map ----------

function MapPanel({ devices, selectedId, onSelect, weatherHold = false }: { devices: Device[]; selectedId: string; onSelect: (id: string) => void; weatherHold?: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const LRef = useRef<any>(null);

  const selected = devices.find((d) => d.id === selectedId);

  // Init map once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;
      LRef.current = L;

      const map = L.map(containerRef.current, {
        center: STORE.pos,
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      // Dark tile layer (CartoDB Dark Matter — free, no key required)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.control.attribution({ position: "bottomleft", prefix: false })
        .addAttribution('&copy; OpenStreetMap &copy; CARTO')
        .addTo(map);

      // Store marker — persistent
      const storeIcon = L.divIcon({
        className: "",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        html: `
          <div style="position:relative;width:40px;height:40px;">
            <div style="position:absolute;inset:0;border-radius:10px;background:rgba(59,130,246,0.20);border:1px solid rgba(59,130,246,0.75);box-shadow:0 0 22px rgba(59,130,246,0.55),inset 0 0 12px rgba(59,130,246,0.25);display:grid;place-items:center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-2.5-2.4a2.7 2.7 0 0 1-5 0A2.7 2.7 0 0 1 10 12a2.7 2.7 0 0 1-2.5-2.4A2.7 2.7 0 0 1 5 12a2 2 0 0 1-2-2V7"/></svg>
            </div>
            <div style="position:absolute;top:100%;left:50%;transform:translateX(-50%);margin-top:4px;white-space:nowrap;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.18em;color:#3B82F6;">HOME · WLK</div>
          </div>`,
      });
      L.marker(STORE.pos, { icon: storeIcon, interactive: false }).addTo(map);

      // Range rings
      [1000, 2500, 4500].forEach((r) =>
        L.circle(STORE.pos, {
          radius: r,
          color: "#3B82F6",
          weight: 0.6,
          opacity: 0.22,
          fillOpacity: 0,
          interactive: false,
        }).addTo(map)
      );

      // Zone markers
      ZONES.forEach((z) => {
        L.circleMarker(z.pos, {
          radius: 4,
          color: "#9aa4b2",
          weight: 1,
          fillColor: "#9aa4b2",
          fillOpacity: 0.55,
        }).bindTooltip(z.name.toUpperCase(), {
          permanent: true,
          direction: "top",
          offset: [0, -6],
          className: "p1-zone-tip",
        }).addTo(map);
      });


      // Layer for drones + routes (re-rendered each tick)
      layerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;

      // Force reflow after mount
      setTimeout(() => map.invalidateSize(), 100);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Redraw drones/routes on device change
  useEffect(() => {
    const L = LRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!L || !map || !layer) return;

    layer.clearLayers();

    devices.forEach((d) => {
      if (d.kind !== "drone") return;
      const isSel = d.id === selectedId;
      const color = STATUS_COLOR[d.status];

      // Route line
      if (d.routeTo && (d.status === "in-flight" || d.status === "returning" || d.status === "fault")) {
        L.polyline([d.pos, d.routeTo], {
          color,
          weight: isSel ? 2.5 : 1.5,
          opacity: isSel ? 0.9 : 0.45,
          dashArray: "6 8",
        }).addTo(layer);
      }

      const pulse = d.status === "in-flight" || d.status === "fault" ? "p1-pulse" : "";
      const size = isSel ? 32 : 26;
      const icon = L.divIcon({
        className: "",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        html: `
          <div style="position:relative;width:${size}px;height:${size}px;">
            ${pulse ? `<span class="p1-pulse-ring" style="--ring:${color}"></span>` : ""}
            <div style="position:relative;width:${size}px;height:${size}px;border-radius:9999px;background:color-mix(in oklab, ${color} 22%, transparent);border:1.5px solid ${color};display:grid;place-items:center;box-shadow:${isSel ? `0 0 0 2px ${color}, 0 0 22px ${color}88` : `0 0 10px ${color}66`};transition:all .2s;">
              <svg xmlns="http://www.w3.org/2000/svg" width="${isSel ? 16 : 14}" height="${isSel ? 16 : 14}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(${d.heading ?? 0}deg);">
                <circle cx="5" cy="5" r="2.2"/>
                <circle cx="19" cy="5" r="2.2"/>
                <circle cx="5" cy="19" r="2.2"/>
                <circle cx="19" cy="19" r="2.2"/>
                <line x1="6.6" y1="6.6" x2="10" y2="10"/>
                <line x1="17.4" y1="6.6" x2="14" y2="10"/>
                <line x1="6.6" y1="17.4" x2="10" y2="14"/>
                <line x1="17.4" y1="17.4" x2="14" y2="14"/>
                <rect x="9.5" y="9.5" width="5" height="5" rx="1"/>
              </svg>
            </div>
            <div style="position:absolute;top:100%;left:50%;transform:translateX(-50%);margin-top:2px;white-space:nowrap;font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:600;letter-spacing:0.14em;color:${color};text-shadow:0 0 6px rgba(0,0,0,0.9);">${d.id}</div>
          </div>`,
      });

      L.marker(d.pos, { icon, riseOnHover: true })
        .on("click", () => onSelect(d.id))
        .addTo(layer);
    });
  }, [devices, selectedId, onSelect]);

  // Pan/zoom to selected
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selected) return;
    map.flyTo(selected.pos, Math.max(map.getZoom(), 14), { duration: 0.6 });
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="relative flex h-full min-h-0 flex-col overflow-hidden bg-background">


      <div className="relative flex-1">
        <div ref={containerRef} className="absolute inset-0" />

        {/* HUD overlays */}
        <div className="pointer-events-none absolute left-3 top-3 z-[400] flex flex-col gap-1 rounded-md border border-border/60 bg-panel/70 px-2.5 py-1.5 font-mono text-[10px] tracking-widest text-muted-foreground backdrop-blur">
          <span className="text-foreground">FRISCO · TX</span>
          <span>33.1230° N · 96.8020° W</span>
          <span>ALT CEIL · 120 m AGL</span>
          <span>CORRIDOR · FRISCO-N7</span>
        </div>
        <div className="pointer-events-none absolute right-3 top-3 z-[400] flex flex-col gap-1.5">
          <div className="flex items-center gap-2 rounded-md border border-border/60 bg-panel/70 px-2.5 py-1.5 font-mono text-[10px] tracking-widest text-muted-foreground backdrop-blur">
            <Activity className="h-3 w-3 text-signal" />
            <span>TELEMETRY · 20 Hz</span>
          </div>
          {weatherHold && (
            <div
              className="flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[10px] tracking-widest backdrop-blur"
              style={{ borderColor: "#f0a04b66", background: "rgba(240,160,75,0.10)", color: "#f0a04b" }}
            >
              <Wind className="h-3 w-3" />
              <span>NW · 28 kts</span>
              <span style={{ transform: "rotate(135deg)", display: "inline-block" }}>↑</span>
            </div>
          )}
        </div>

        {selected && (
          <div className="pointer-events-none absolute bottom-3 left-3 z-[400] max-w-[280px] rounded-md border border-signal/40 bg-panel/85 p-3 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-signal">{selected.id}</span>
              <span className={`font-mono text-[9px] tracking-widest ${STATUS_META[selected.status].text}`}>
                {STATUS_META[selected.status].label}
              </span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{selected.destination ?? "Idle at home dock"}</div>
            {selected.eta && (
              <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                <span>ETA {selected.eta}</span>
                {typeof selected.battery === "number" && <span>BAT {selected.battery}%</span>}
                {typeof selected.windKts === "number" && <span>WIND {selected.windKts} kts</span>}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map styling overrides */}
      <style>{`
        .leaflet-container { background: #0a0a0a; font-family: var(--font-mono); }
        .leaflet-control-zoom a {
          background: color-mix(in oklab, var(--color-panel) 90%, transparent) !important;
          color: var(--color-foreground) !important;
          border: 1px solid var(--color-border) !important;
          backdrop-filter: blur(6px);
        }
        .leaflet-control-zoom a:hover { background: var(--color-panel-elevated) !important; }
        .leaflet-control-attribution {
          background: rgba(20,26,40,0.6) !important;
          color: var(--color-muted-foreground) !important;
          font-family: var(--font-mono) !important;
          font-size: 9px !important;
          letter-spacing: 0.08em;
        }
        .leaflet-control-attribution a { color: var(--color-muted-foreground) !important; }
        .p1-zone-tip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: #9aa4b2 !important;
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 9px !important;
          letter-spacing: 0.18em;
          font-weight: 500;
          text-shadow: 0 0 6px rgba(0,0,0,0.9);
        }
        .p1-zone-tip::before { display: none !important; }

        .p1-pulse-ring {
          position: absolute; inset: -6px; border-radius: 9999px;
          background: var(--ring); opacity: 0.35;
          animation: p1-ping 1.8s cubic-bezier(0,0,0.2,1) infinite;
        }
        @keyframes p1-ping {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function Legend({ color }: { color: string }) {
  return <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />;
}

// ---------- Right: Detail panel ----------

function DetailPanel({ selected, parcels, onPackScan, weatherHold = false, onClose }: { selected: Device | undefined; parcels: Parcel[]; onPackScan: () => void; weatherHold?: boolean; onClose?: () => void }) {
  if (!selected) return null;

  const isDrone = selected.kind === "drone";
  const isFault = selected.status === "fault";
  const isHeld = selected.status === "held";
  const isBay01 = selected.id === "BAY-01";
  const meta = STATUS_META[selected.status];



  return (
    <aside key={selected.id} className="detail-appear panel flex min-h-0 max-h-full flex-col overflow-hidden shadow-2xl backdrop-blur-md">
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="label-eyebrow">{isDrone ? "Mission Detail" : "Bay Detail"}</div>
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 font-mono text-[10px] tracking-widest ${meta.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot} ${meta.dot.includes("flight") || meta.dot.includes("alert") ? "pulse-dot" : ""}`} />
              {meta.label}
            </span>
            {onClose && (
              <button
                onClick={onClose}
                aria-label="Close detail"
                className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <div className="mt-1.5 flex items-baseline gap-2">
          <h2 className="font-mono text-xl font-semibold tracking-wider">{selected.id}</h2>
          <span className="text-xs text-muted-foreground">{isDrone ? "Autonomous Delivery Unit" : isBay01 ? "Preston Rd Dock · Loading" : "Loading Bay"}</span>
        </div>
        {selected.destination && !isBay01 && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{selected.destination}</span>
            {selected.eta && <span className="ml-auto font-mono">ETA {selected.eta}</span>}
          </div>
        )}
      </div>

      {isFault && (
        <div className="border-b border-[color:var(--color-alert)]/40 bg-[color:var(--color-alert)]/10 p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 text-[color:var(--color-alert)]" />
            <div>
              <div className="text-xs font-semibold text-[color:var(--color-alert)]">Delivery failed — #WL-92812</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">Drop zone obstructed. Capsule returning for merchant reassignment.</div>
            </div>
          </div>
        </div>
      )}

      {isHeld && (
        <div className="border-b p-4" style={{ borderColor: "#f0a04b55", background: "rgba(240,160,75,0.08)" }}>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" style={{ color: "#f0a04b" }} />
            <div className="flex-1">
              <div className="text-xs font-semibold" style={{ color: "#f0a04b" }}>
                Weather hold — high wind gusts
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">
                Delivery paused due to high winds. Will resume when gusts drop below 25 mph.
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-mono text-[9px] tracking-[0.22em] text-muted-foreground">
              ESTIMATED RESUME
            </div>
            <ResumeCountdown />
          </div>
        </div>
      )}

      {isDrone && (
        <div className="grid grid-cols-4 gap-2 border-b border-border p-3">
          <TelemetryCell icon={<Zap className="h-3 w-3" />} label="BATTERY" value={`${selected.battery ?? 0}%`} bar={selected.battery} />
          <TelemetryCell icon={<Package className="h-3 w-3" />} label="CAPSULES" value={String(selected.capsules)} />
          <TelemetryCell icon={<Gauge className="h-3 w-3" />} label="PAYLOAD" value={`${(selected.payloadKg ?? 0).toFixed(1)} kg`} />
          <TelemetryCell icon={<Wind className="h-3 w-3" />} label="WIND" value={`${selected.windKts ?? 0} kts`} />
        </div>
      )}

      {isBay01 && (
        <div className="grid grid-cols-4 gap-2 border-b border-border p-3">
          <TelemetryCell icon={<Boxes className="h-3 w-3" />} label="CAPACITY" value="3/5" />
          <TelemetryCell icon={<Package className="h-3 w-3" />} label="QUEUED" value="2" />
          <TelemetryCell icon={<DroneGlyph className="h-3.5 w-3.5" />} label="NEXT DRONE" value="3m" />
          <TelemetryCell icon={<Wind className="h-3 w-3" />} label="WIND" value="6 kts" />
        </div>
      )}


      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div>
          <div className="label-eyebrow">{isDrone ? "Manifest" : isBay01 ? "Queued for Loading" : "Queue"}</div>
          <div className="text-xs text-muted-foreground">
            {parcels.length} parcel{parcels.length === 1 ? "" : "s"} · {isDrone ? "assigned to this unit" : "waiting to load onto next drone"}
          </div>
        </div>
        {!isDrone && !isBay01 && (
          <button className="btn-primary btn-primary-glow bg-signal px-2.5 py-1.5 font-mono text-[10px] font-semibold tracking-widest text-signal-foreground transition hover:opacity-90">
            + ASSIGN CAPSULE
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {parcels.length === 0 ? (
          <div className="grid h-full place-items-center p-6 text-center">
            <div>
              <CircleDot className="mx-auto h-5 w-5 text-muted-foreground" />
              <div className="mt-2 text-xs text-muted-foreground">No parcels on this unit</div>
            </div>
          </div>
        ) : (
          parcels.map((p) => <ParcelRow key={p.order} parcel={p} />)
        )}
      </div>

      <div className="border-t border-border p-3">
        {isHeld && isDrone ? (
          <div className="flex gap-2">
            <button
              className="flex-1 rounded-md border bg-transparent px-3 py-2 font-mono text-[10px] tracking-widest transition hover:opacity-90"
              style={{ borderColor: "#f0a04b88", color: "#f0a04b" }}
            >
              NOTIFY CUSTOMER
            </button>
            <button className="flex-1 rounded-md border border-border bg-panel px-3 py-2 font-mono text-[10px] tracking-widest text-muted-foreground transition hover:text-foreground">
              SWITCH TO ROAD
            </button>
          </div>
        ) : isDrone ? (
          <div className="flex gap-2">
            <button className="flex-1 rounded-md border border-border bg-panel px-3 py-2 font-mono text-[10px] tracking-widest text-muted-foreground transition hover:text-foreground">
              RECALL TO BASE
            </button>
            <button className="flex-1 btn-primary btn-primary-glow bg-signal px-3 py-2 font-mono text-[10px] font-semibold tracking-widest text-signal-foreground transition hover:opacity-90">
              TRACK LIVE
            </button>
          </div>
        ) : isBay01 ? (
          <div className="flex gap-2">
            <button className="flex-1 rounded-md border border-border bg-panel px-3 py-2 font-mono text-[10px] tracking-widest text-muted-foreground transition hover:text-foreground">
              VIEW BAY STATUS
            </button>
            <button
              onClick={onPackScan}
              disabled={weatherHold}
              className="flex-1 btn-primary btn-primary-glow bg-signal px-3 py-2 font-mono text-[10px] font-semibold tracking-widest text-signal-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              PACK &amp; SCAN
            </button>
          </div>

        ) : (
          <div className="flex gap-2">
            <button className="flex-1 rounded-md border border-border bg-panel px-3 py-2 font-mono text-[10px] tracking-widest text-muted-foreground transition hover:text-foreground">
              SCAN CAPSULE
            </button>
            <button className="flex-1 btn-primary btn-primary-glow bg-signal px-3 py-2 font-mono text-[10px] font-semibold tracking-widest text-signal-foreground transition hover:opacity-90">
              DISPATCH DRONE
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

function ResumeCountdown() {
  // Target 45 minutes out from mount; live mm:ss countdown
  const targetRef = useRef<number>(Date.now() + 45 * 60 * 1000);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const remaining = Math.max(0, targetRef.current - now);
  const mm = Math.floor(remaining / 60000);
  const ss = Math.floor((remaining % 60000) / 1000);
  return (
    <div className="mt-1 flex items-baseline gap-3">
      <div className="font-mono text-3xl font-semibold tracking-wider" style={{ color: "#f0a04b" }}>
        {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
      </div>
      <div className="font-mono text-[10px] tracking-widest text-muted-foreground">→ 3:30 PM CT</div>
    </div>
  );
}

function TelemetryCell({ icon, label, value, bar }: { icon: React.ReactNode; label: string; value: string; bar?: number }) {
  return (
    <div className="rounded-md border border-border bg-background/40 p-2">
      <div className="flex items-center gap-1 text-muted-foreground">
        {icon}
        <span className="font-mono text-[9px] tracking-widest">{label}</span>
      </div>
      <div className="mt-1 font-mono text-sm font-semibold">{value}</div>
      {typeof bar === "number" && (
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${bar}%`,
              backgroundColor: bar < 35 ? "var(--color-alert)" : bar < 60 ? "var(--color-flight)" : "var(--color-success)",
            }}
          />
        </div>
      )}
    </div>
  );
}

function ParcelRow({ parcel }: { parcel: Parcel }) {
  const statusTone: Record<Parcel["status"], string> = {
    queued: "text-muted-foreground bg-muted/50",
    packing: "text-signal bg-[color:var(--color-signal)]/12",
    loaded: "text-[color:var(--color-success)] bg-[color:var(--color-success)]/12",
    "in-flight": "text-[color:var(--color-flight)] bg-[color:var(--color-flight)]/12",
    delivered: "text-[color:var(--color-success)] bg-[color:var(--color-success)]/12",
    failed: "text-[color:var(--color-alert)] bg-[color:var(--color-alert)]/12",
  };

  return (
    <div className="group mb-1.5 rounded-md border border-transparent bg-background/30 p-2.5 transition hover:border-border">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-semibold">{parcel.order}</span>
        <span className={`rounded px-1.5 py-0.5 font-mono text-[9px] tracking-widest ${statusTone[parcel.status]}`}>
          {parcel.status.toUpperCase()}
        </span>
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <MapPin className="h-2.5 w-2.5" />
        <span className="truncate">{parcel.area}</span>
      </div>
      <div className="mt-1.5 flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
        <span className="rounded border border-border px-1.5 py-0.5">CAP {parcel.capsule}</span>
        <span>SIZE {parcel.size}</span>
        <span>{parcel.weightKg.toFixed(1)} kg</span>
        <ChevronRight className="ml-auto h-3 w-3 opacity-40 transition group-hover:opacity-100" />
      </div>
      {parcel.note && parcel.note === "COLD CHAIN" && (
        <div className="mt-1.5 inline-flex items-center gap-1 rounded border border-signal/40 bg-signal/10 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-signal">
          <CircleDot className="h-2.5 w-2.5" />
          COLD CHAIN
        </div>
      )}
      {parcel.note && parcel.note !== "COLD CHAIN" && (
        <div className="mt-1.5 flex items-start gap-1.5 rounded border border-[color:var(--color-alert)]/30 bg-[color:var(--color-alert)]/8 p-1.5 text-[10px] text-[color:var(--color-alert)]">
          <AlertTriangle className="h-3 w-3 flex-shrink-0" />
          <span>{parcel.note}</span>
        </div>
      )}
    </div>
  );
}

// ---------- Pack & Scan Overlay ----------

function PackScanOverlay({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [checks, setChecks] = useState({ items: false, sealed: false, label: false });
  const [confirmCancel, setConfirmCancel] = useState(false);
  const allChecked = checks.items && checks.sealed && checks.label;

  const totalSteps = 6;

  const tryCancel = () => setConfirmCancel(true);
  const back = () => setStep((s) => Math.max(1, s - 1));
  const next = () => setStep((s) => Math.min(totalSteps, s + 1));

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={tryCancel} />

      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-border/70 bg-panel shadow-2xl shadow-black/40">
        {/* Header: progress + close */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            {step > 1 && step < 6 && (
              <button onClick={back} className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground transition hover:text-foreground">
                <ChevronRight className="h-4 w-4 rotate-180" />
              </button>
            )}
            <div>
              <div className="label-eyebrow">Step {step} of {totalSteps}</div>
              <div className="text-sm font-semibold">Pack &amp; Scan</div>
            </div>
          </div>
          <button onClick={tryCancel} className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition hover:text-foreground">
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] w-full bg-border">
          <div className="h-full bg-signal transition-all" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-8">
          {step === 1 && <StepOrderQueue onStart={next} />}
          {step === 2 && <StepScanCapsule onDone={next} />}
          {step === 3 && (
            <StepPackSeal
              checks={checks}
              setChecks={setChecks}
              allChecked={allChecked}
              onDone={next}
            />
          )}
          {step === 4 && <StepPlaceAtBay onDone={next} />}
          {step === 5 && <StepConfirmHandoff onDone={next} />}
          {step === 6 && (
            <StepSuccess
              onPackNext={() => { setStep(1); setChecks({ items: false, sealed: false, label: false }); }}
              onBack={onClose}
            />
          )}
        </div>
      </div>

      {confirmCancel && (
        <div className="absolute inset-0 z-[1100] grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-lg border border-signal/40 bg-panel p-5">
            <div className="label-eyebrow">Confirm</div>
            <div className="mt-1 text-sm">Cancel this pack &amp; scan session? Progress will be lost.</div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setConfirmCancel(false)}
                className="flex-1 rounded-md border border-signal/50 bg-transparent px-3 py-2 font-mono text-[10px] font-semibold tracking-widest text-signal transition hover:bg-signal/10"
              >
                KEEP PACKING
              </button>
              <button
                onClick={() => { setConfirmCancel(false); onClose(); }}
                className="flex-1 btn-primary btn-primary-glow bg-signal px-3 py-2 font-mono text-[10px] font-semibold tracking-widest text-signal-foreground transition hover:opacity-90"
              >
                CANCEL SESSION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepOrderQueue({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <div className="label-eyebrow">Next in queue</div>
      <h3 className="mt-1 font-mono text-2xl font-semibold tracking-wider">#WL-92847</h3>

      <div className="mt-6 rounded-lg border border-border bg-background/40 p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm font-semibold">#WL-92847</span>
          <span className="rounded border border-signal/40 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-widest text-signal">
            DRONE ELIGIBLE
          </span>
        </div>
        <div className="mt-3 text-base">Sarah M.</div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> Newman Village, Frisco 75034
        </div>

        <div className="my-4 h-px bg-border" />

        <div className="label-eyebrow">Items</div>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• Amoxicillin 500mg (30 ct)</li>
          <li>• Hydrocortisone cream 1%</li>
        </ul>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <MiniStat label="CAPSULE" value="SIZE M" />
          <MiniStat label="WEIGHT" value="1.2 kg" />
          <MiniStat label="DISTANCE" value="1.8 mi" />
        </div>
      </div>

      <button
        onClick={onStart}
        className="mt-8 w-full btn-primary btn-primary-glow bg-signal px-4 py-4 font-mono text-sm font-semibold tracking-widest text-signal-foreground transition hover:opacity-90"
      >
        START PACKING
      </button>
    </div>
  );
}

function StepScanCapsule({ onDone }: { onDone: () => void }) {
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setScanned(true), 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div>
      <div className="label-eyebrow">Scan capsule barcode</div>
      <h3 className="mt-1 text-xl font-semibold">Align the barcode inside the frame</h3>

      <div className="mt-6 grid place-items-center">
        <div className="relative h-64 w-64 rounded-lg bg-background/80">
          {/* Corner brackets */}
          <ScanBrackets />
          {/* Scan line */}
          {!scanned && (
            <div className="absolute inset-x-4 top-4 h-px bg-signal/80 animate-[scan_1.6s_linear_infinite]" />
          )}
          {scanned && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[color:var(--color-success)]/15 ring-2 ring-[color:var(--color-success)]">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[color:var(--color-success)]"><path d="M5 12l5 5L20 7" /></svg>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center font-mono text-sm">
        {scanned ? (
          <span className="text-signal">#TX-4471 <span className="text-[color:var(--color-success)]">CONFIRMED</span></span>
        ) : (
          <span className="text-muted-foreground">SCANNING…</span>
        )}
      </div>

      <div className="mt-4 text-center">
        <button className="font-mono text-xs tracking-widest text-signal underline-offset-4 hover:underline">
          Enter capsule ID manually
        </button>
      </div>

      <button
        onClick={onDone}
        disabled={!scanned}
        className="mt-8 w-full btn-primary btn-primary-glow bg-signal px-4 py-4 font-mono text-sm font-semibold tracking-widest text-signal-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        CONTINUE
      </button>

      <style>{`@keyframes scan { 0% { transform: translateY(0); } 50% { transform: translateY(220px); } 100% { transform: translateY(0); } }`}</style>
    </div>
  );
}

function StepPackSeal({
  checks, setChecks, allChecked, onDone,
}: {
  checks: { items: boolean; sealed: boolean; label: boolean };
  setChecks: (c: { items: boolean; sealed: boolean; label: boolean }) => void;
  allChecked: boolean;
  onDone: () => void;
}) {
  const rows: { key: keyof typeof checks; label: string }[] = [
    { key: "items", label: "All items packed" },
    { key: "sealed", label: "Capsule sealed" },
    { key: "label", label: "Label facing up" },
  ];
  return (
    <div>
      <div className="label-eyebrow">Pack &amp; seal</div>
      <h3 className="mt-1 text-xl font-semibold">Confirm each step before dispatch</h3>

      <div className="mt-6 space-y-3">
        {rows.map((r) => {
          const on = checks[r.key];
          return (
            <button
              key={r.key}
              onClick={() => setChecks({ ...checks, [r.key]: !on })}
              className={`flex w-full items-center gap-4 rounded-lg border p-5 text-left transition ${
                on ? "border-signal/50 bg-signal/8" : "border-border bg-background/40 hover:border-signal/40"
              }`}
            >
              <div className={`grid h-8 w-8 place-items-center rounded-md border-2 ${on ? "border-signal bg-signal" : "border-border"}`}>
                {on && (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-signal-foreground"><path d="M5 12l5 5L20 7" /></svg>
                )}
              </div>
              <span className="text-base font-medium">{r.label}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={onDone}
        disabled={!allChecked}
        className="mt-8 w-full btn-primary btn-primary-glow bg-signal px-4 py-4 font-mono text-sm font-semibold tracking-widest text-signal-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        SEALED &amp; READY
      </button>
    </div>
  );
}

function StepPlaceAtBay({ onDone }: { onDone: () => void }) {
  return (
    <div>
      <div className="label-eyebrow">Place capsule</div>
      <h3 className="mt-1 text-xl font-semibold">PLACE CAPSULE IN BAY-01 · SLOT 4</h3>

      <div className="mt-6 rounded-lg border border-border bg-background/50 p-6">
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((n) => {
            const filled = n <= 3;
            const target = n === 4;
            return (
              <div
                key={n}
                className={`grid aspect-square place-items-center rounded-md border-2 ${
                  target
                    ? "border-signal/80 bg-signal/10"
                    : filled
                    ? "border-signal/40 bg-signal/5"
                    : "border-border bg-background/50"
                }`}
              >
                <div className="text-center">
                  <div className="font-mono text-[9px] tracking-widest text-muted-foreground">SLOT</div>
                  <div className={`font-mono text-lg font-semibold ${target ? "text-signal" : filled ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                    {n}
                  </div>
                  {filled && !target && <div className="mt-1 font-mono text-[8px] text-muted-foreground">FILLED</div>}
                  {target && <div className="mt-1 font-mono text-[8px] text-signal">→ HERE</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-md border border-border bg-background/40 px-4 py-3 font-mono text-xs tracking-widest">
        <span className="flex items-center gap-2 text-muted-foreground">
          <DroneGlyph className="h-5 w-5 text-signal" /> DRONE ETA
        </span>
        <span className="text-signal">3 MIN</span>
      </div>

      <button
        onClick={onDone}
        className="mt-8 w-full btn-primary btn-primary-glow bg-signal px-4 py-4 font-mono text-sm font-semibold tracking-widest text-signal-foreground transition hover:opacity-90"
      >
        I&apos;M AT THE BAY
      </button>
    </div>
  );
}

function StepConfirmHandoff({ onDone }: { onDone: () => void }) {
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setScanned(true), 1800);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!scanned) return;
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [scanned, onDone]);

  return (
    <div>
      <div className="label-eyebrow">Confirm handoff</div>
      <h3 className="mt-1 text-xl font-semibold">Scan the bay QR to confirm</h3>

      <div className="mt-6 grid place-items-center">
        <div className={`relative h-64 w-64 rounded-lg bg-background/80 ${scanned ? "" : ""}`}>
          <ScanBrackets />
          {/* fake QR pattern */}
          <div className="absolute inset-8 grid grid-cols-8 grid-rows-8 gap-0.5 opacity-70">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className={((i * 13) % 3 === 0 || (i % 5 === 0)) ? "bg-signal/70" : "bg-transparent"} />
            ))}
          </div>
          {scanned && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-signal/20 ring-2 ring-signal">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-signal"><path d="M5 12l5 5L20 7" /></svg>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center font-mono text-xs tracking-widest text-muted-foreground">
        {scanned ? <span className="text-signal">HANDOFF VERIFIED</span> : "AWAITING SCAN…"}
      </div>

      <style>{`@keyframes pulse-orange { 0% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--signal) 60%, transparent); } 100% { box-shadow: 0 0 0 40px color-mix(in oklab, var(--signal) 0%, transparent); } }`}</style>
    </div>
  );
}

function StepSuccess({ onPackNext, onBack }: { onPackNext: () => void; onBack: () => void }) {
  return (
    <div className="text-center">
      <div className="mx-auto mt-4 grid h-24 w-24 place-items-center rounded-full bg-signal/10 ring-1 ring-signal/70">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-signal"><path d="M5 12l5 5L20 7" /></svg>
      </div>

      <div className="label-eyebrow mt-6">Complete</div>
      <h3 className="mt-1 font-mono text-2xl font-semibold tracking-wider">HANDOFF COMPLETE</h3>

      <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-3">
        <MiniStat label="DRONE ETA" value="3 MIN" />
        <MiniStat label="TIMESTAMP" value="12:08 PM CT" />
      </div>

      <div className="mt-6 rounded-md border border-border bg-background/40 px-4 py-3 font-mono text-xs tracking-widest text-muted-foreground">
        Order <span className="text-signal">#WL-92847</span> moved to <span className="text-signal">AWAITING PICKUP</span>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onPackNext}
          className="flex-1 btn-primary btn-primary-glow bg-signal px-4 py-4 font-mono text-sm font-semibold tracking-widest text-signal-foreground transition hover:opacity-90"
        >
          PACK NEXT ORDER
        </button>
        <button
          onClick={onBack}
          className="flex-1 rounded-md border border-signal/50 bg-transparent px-4 py-4 font-mono text-sm font-semibold tracking-widest text-signal transition hover:bg-signal/10"
        >
          BACK TO COMMAND
        </button>
      </div>
    </div>
  );
}

function ScanBrackets() {
  const c = "absolute h-8 w-8 border-signal";
  return (
    <>
      <div className={`${c} left-2 top-2 border-l-2 border-t-2`} />
      <div className={`${c} right-2 top-2 border-r-2 border-t-2`} />
      <div className={`${c} bottom-2 left-2 border-b-2 border-l-2`} />
      <div className={`${c} bottom-2 right-2 border-b-2 border-r-2`} />
    </>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background/50 px-3 py-2 text-left">
      <div className="font-mono text-[9px] tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-mono text-sm font-semibold">{value}</div>
    </div>
  );
}
