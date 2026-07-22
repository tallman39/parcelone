import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  CircleDot,
  CloudRain,
  Plug,
  Store,
  Clock,
  PauseCircle,
  Bell,
  Users,
  Palette,
  X,
  AlertTriangle,
  CreditCard,
  Download,
} from "lucide-react";
import { THEMES, useTheme, type ThemeId } from "@/lib/theme";
import { TopBar } from "@/components/TopBar";
import { setWeatherHold, useWeatherHold } from "@/lib/weather-hold";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Settings · ParcelOne Merchant Command" },
      { name: "description", content: "Configure your ParcelOne merchant command deck." },
    ],
  }),
});

type SectionId =
  | "store"
  | "hours"
  | "pause"
  | "notifications"
  | "integrations"
  | "team"
  | "billing"
  | "appearance";

const SECTIONS: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: "store", label: "STORE PROFILE", icon: <Store className="h-3.5 w-3.5" /> },
  { id: "hours", label: "DELIVERY HOURS", icon: <Clock className="h-3.5 w-3.5" /> },
  { id: "pause", label: "PAUSE SERVICE", icon: <PauseCircle className="h-3.5 w-3.5" /> },
  { id: "notifications", label: "NOTIFICATIONS", icon: <Bell className="h-3.5 w-3.5" /> },
  { id: "integrations", label: "INTEGRATIONS", icon: <Plug className="h-3.5 w-3.5" /> },
  { id: "team", label: "TEAM & ROLES", icon: <Users className="h-3.5 w-3.5" /> },
  { id: "billing", label: "BILLING", icon: <CreditCard className="h-3.5 w-3.5" /> },
  { id: "appearance", label: "APPEARANCE", icon: <Palette className="h-3.5 w-3.5" /> },
];

const AMBER = "#f0a04b";
const CORAL = "#ee5a52";

function SettingsPage() {
  const weatherHold = useWeatherHold();
  const [section, setSection] = useState<SectionId>("store");

  return (
    <div className="flex min-h-screen flex-col pl-16">
      <TopBar activeTab="settings" weatherHold={weatherHold} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="mb-6">
          <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">SETTINGS</div>
          <h1 className="mt-1 text-2xl font-semibold uppercase tracking-wide">Settings</h1>
          <div className="mt-1 text-xs text-muted-foreground">
            Westlake Pharmacy · 12200 Preston Rd, Frisco TX 75033
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
          <nav className="flex flex-col gap-1">
            {SECTIONS.map((s) => {
              const active = s.id === section;
              return (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`group flex items-center gap-2.5 rounded-md border-l-2 px-3 py-2 text-left font-mono text-[11px] tracking-[0.18em] transition ${
                    active
                      ? "border-l-signal bg-signal/10 text-signal"
                      : "border-l-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className={active ? "text-signal" : ""}>{s.icon}</span>
                  {s.label}
                </button>
              );
            })}
          </nav>

          <div className="min-w-0">
            {section === "store" && <StoreProfile />}
            {section === "hours" && <DeliveryHours />}
            {section === "pause" && <PauseService />}
            {section === "notifications" && <Notifications />}
            {section === "integrations" && <Integrations />}
            {section === "team" && <Team />}
            {section === "billing" && <Billing />}
            {section === "appearance" && <Appearance />}
          </div>
        </div>
      </main>
    </div>
  );
}

// ---------- Section: Store Profile ----------

function StoreProfile() {
  return (
    <SectionCard title="STORE PROFILE" subtitle="Merchant identity and service envelope">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Store name" value="Westlake Pharmacy" />
        <Field label="Pickup bay" value="BAY-01 · Preston Rd Dock · Bay 2" />
        <Field
          label="Address"
          value="12200 Preston Rd, Frisco, TX 75033"
          className="md:col-span-2"
        />
        <Field label="Service radius" value="4 miles (Phase 1 geofence)" />
        <Field label="Max payload" value="8 lbs" />
        <Field
          label="Primary ZIPs"
          value="75033 · 75034 · 75024 · 75070"
          className="md:col-span-2"
        />
      </div>
      <div className="mt-5 flex justify-end">
        <button className="btn-primary btn-primary-glow bg-signal px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.2em] text-signal-foreground transition hover:opacity-90">
          SAVE CHANGES
        </button>
      </div>
    </SectionCard>
  );
}

// ---------- Section: Delivery Hours ----------

const DAYS = [
  { day: "MON", on: true, open: "8:00 AM", close: "9:00 PM" },
  { day: "TUE", on: true, open: "8:00 AM", close: "9:00 PM" },
  { day: "WED", on: true, open: "8:00 AM", close: "9:00 PM" },
  { day: "THU", on: true, open: "8:00 AM", close: "9:00 PM" },
  { day: "FRI", on: true, open: "8:00 AM", close: "9:00 PM" },
  { day: "SAT", on: true, open: "9:00 AM", close: "6:00 PM" },
  { day: "SUN", on: false, open: "—", close: "—" },
];

function DeliveryHours() {
  const [days, setDays] = useState(DAYS);
  return (
    <SectionCard title="DELIVERY HOURS" subtitle="All times CT · autonomous window">
      <div className="overflow-hidden rounded-md border border-border">
        {days.map((d, i) => (
          <div
            key={d.day}
            className={`grid grid-cols-[80px_60px_1fr_1fr_40px] items-center gap-3 px-4 py-3 ${
              i < days.length - 1 ? "border-b border-border/60" : ""
            }`}
          >
            <div className="font-mono text-xs tracking-wider">{d.day}</div>
            <Toggle
              on={d.on}
              onChange={(v) =>
                setDays((prev) => prev.map((x, j) => (j === i ? { ...x, on: v } : x)))
              }
            />
            <div className="font-mono text-sm text-muted-foreground">{d.on ? d.open : "—"}</div>
            <div className="font-mono text-sm text-muted-foreground">{d.on ? d.close : "—"}</div>
            <div className="font-mono text-[9px] tracking-widest text-muted-foreground">CT</div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ---------- Section: Pause Service ----------

function PauseService() {
  const weatherHold = useWeatherHold();
  const [modalOpen, setModalOpen] = useState(false);
  const paused = weatherHold;

  return (
    <SectionCard title="PAUSE SERVICE" subtitle="Halt intake without losing in-flight missions">
      <div
        className={`rounded-lg border p-5 ${
          paused
            ? "border-transparent"
            : "border-[color:var(--color-success)]/40 bg-[color:var(--color-success)]/5"
        }`}
        style={
          paused
            ? { borderColor: `${AMBER}66`, background: `${AMBER}0f` }
            : undefined
        }
      >
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-full"
            style={
              paused
                ? { background: `${AMBER}22`, boxShadow: `0 0 20px ${AMBER}55` }
                : { background: "color-mix(in oklab, var(--color-success) 20%, transparent)" }
            }
          >
            {paused ? (
              <CloudRain className="h-5 w-5" style={{ color: AMBER }} />
            ) : (
              <CircleDot className="h-5 w-5 text-[color:var(--color-success)]" />
            )}
          </span>
          <div>
            <div
              className="font-mono text-[10px] tracking-[0.22em]"
              style={{ color: paused ? AMBER : undefined }}
            >
              {paused ? "PAUSED · WEATHER HOLD" : "● OPERATIONAL"}
            </div>
            <div className="text-sm">
              {paused
                ? "Wind gusts 28 mph — auto-resume when gusts drop below 25 mph"
                : "Accepting drone delivery requests"}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {paused ? (
            <button
              onClick={() => setWeatherHold(false)}
              className="rounded-md px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.2em] transition hover:opacity-90"
              style={{ background: AMBER, color: "#1a1207" }}
            >
              RESUME SERVICE
            </button>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-md border bg-transparent px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.2em] transition hover:bg-[color:#ee5a52]/10"
              style={{ borderColor: `${CORAL}88`, color: CORAL }}
            >
              PAUSE DRONE DELIVERY
            </button>
          )}
          <button
            onClick={() => setWeatherHold(!paused)}
            className="rounded-md border border-signal/50 bg-transparent px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-signal transition hover:bg-signal/10"
          >
            {paused ? "PREVIEW OPERATIONAL STATE" : "PREVIEW WEATHER HOLD STATE"}
          </button>
        </div>
      </div>

      {/* Scheduled pauses */}
      <div className="mt-6">
        <div className="mb-2 font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
          SCHEDULED PAUSES
        </div>
        <div className="overflow-hidden rounded-md border border-border">
          <div className="grid grid-cols-[1fr_1fr_1fr_140px] items-center gap-2 px-4 py-3">
            <div>
              <div className="text-sm">July 4, 2026</div>
              <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                INDEPENDENCE DAY
              </div>
            </div>
            <div className="text-sm text-muted-foreground">All day</div>
            <div className="text-sm text-muted-foreground">Holiday</div>
            <div className="flex gap-2">
              <button className="font-mono text-[10px] tracking-widest text-muted-foreground transition hover:text-signal">
                EDIT
              </button>
              <button
                className="font-mono text-[10px] tracking-widest transition hover:opacity-80"
                style={{ color: CORAL }}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && <PauseModal onClose={() => setModalOpen(false)} />}
    </SectionCard>
  );
}

function PauseModal({ onClose }: { onClose: () => void }) {
  const [reason, setReason] = useState<"Closing early" | "Weather" | "Staffing" | "Holiday" | "Other">("Weather");
  const [resumeAt, setResumeAt] = useState("3:30 PM");

  const confirm = () => {
    if (reason === "Weather") setWeatherHold(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-lg border border-border bg-panel p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[11px] tracking-[0.22em] text-signal">PAUSE DRONE DELIVERY</div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <div className="font-mono text-[9px] tracking-widest text-muted-foreground">REASON</div>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as typeof reason)}
              className="mt-1 w-full rounded-md border border-border bg-background/40 px-3 py-2 font-mono text-sm outline-none focus:border-signal"
            >
              <option>Closing early</option>
              <option>Weather</option>
              <option>Staffing</option>
              <option>Holiday</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <div className="font-mono text-[9px] tracking-widest text-muted-foreground">
              RESUME TIME · CT (OPTIONAL)
            </div>
            <input
              value={resumeAt}
              onChange={(e) => setResumeAt(e.target.value)}
              placeholder="e.g. 3:30 PM"
              className="mt-1 w-full rounded-md border border-border bg-background/40 px-3 py-2 font-mono text-sm outline-none focus:border-signal"
            />
          </div>

          <div
            className="rounded-md border p-3"
            style={{ borderColor: `${AMBER}55`, background: `${AMBER}0d` }}
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" style={{ color: AMBER }} />
              <div className="text-[11px] leading-relaxed text-muted-foreground">
                <span className="text-foreground">02 in-flight</span> will complete ·{" "}
                <span className="text-foreground">03 queued</span> will be held · Customers notified automatically
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-md border border-border bg-panel px-3 py-2 font-mono text-[11px] tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
          >
            CANCEL
          </button>
          <button
            onClick={confirm}
            className="flex-1 rounded-md px-3 py-2 font-mono text-[11px] font-semibold tracking-[0.2em] transition hover:opacity-90"
            style={{ background: CORAL, color: "#1a0808" }}
          >
            CONFIRM PAUSE
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Section: Notifications ----------

function Notifications() {
  const items = [
    { label: "New order received", desc: "SMS + push to fulfillment team", on: true },
    { label: "Delivery in flight", desc: "Push to merchant · customer SMS on drop", on: true },
    { label: "Delivery failure", desc: "Immediate push + email to manager", on: true },
    { label: "Weather advisory", desc: "NWS alerts within corridor", on: true },
    { label: "Bay capacity warning", desc: "Trigger at 4/5 capsules queued", on: false },
    { label: "Weekly performance digest", desc: "Sundays 8:00 PM CT · to Priya S.", on: true },
  ];
  const [state, setState] = useState(items);
  return (
    <SectionCard title="NOTIFICATIONS" subtitle="Alerts route to M. Reyes and store owners">
      <div className="overflow-hidden rounded-md border border-border">
        {state.map((n, i) => (
          <div
            key={n.label}
            className={`flex items-center justify-between gap-3 px-4 py-3 ${
              i < state.length - 1 ? "border-b border-border/60" : ""
            }`}
          >
            <div>
              <div className="text-sm">{n.label}</div>
              <div className="text-[11px] text-muted-foreground">{n.desc}</div>
            </div>
            <Toggle
              on={n.on}
              onChange={(v) => setState((prev) => prev.map((x, j) => (j === i ? { ...x, on: v } : x)))}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ---------- Section: Integrations ----------

function Integrations() {
  const items = [
    {
      name: "SQUARE POS",
      status: "connected" as const,
      desc: "Last sync 2s ago · Order sync active",
    },
    {
      name: "SHOPIFY",
      status: "disconnected" as const,
      desc: "Sync online orders and inventory",
    },
    {
      name: "DOORDASH DRIVE",
      status: "connected" as const,
      desc: "Road fallback enabled for out-of-corridor orders",
    },
  ];

  return (
    <SectionCard title="INTEGRATIONS" subtitle="Order sources and fallback couriers">
      <div className="space-y-2">
        {items.map((it) => (
          <div
            key={it.name}
            className="flex items-center justify-between gap-3 rounded-md border border-border bg-background/30 p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="font-mono text-[11px] tracking-[0.2em]">{it.name}</div>
                {it.status === "connected" ? (
                  <span className="flex items-center gap-1 font-mono text-[9px] tracking-widest text-[color:var(--color-success)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" />
                    CONNECTED
                  </span>
                ) : (
                  <span className="font-mono text-[9px] tracking-widest text-muted-foreground">
                    NOT CONNECTED
                  </span>
                )}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">{it.desc}</div>
            </div>
            {it.status === "connected" ? (
              <button className="rounded-md border border-border bg-panel px-3 py-1.5 font-mono text-[10px] tracking-widest text-muted-foreground transition hover:text-foreground">
                MANAGE
              </button>
            ) : (
              <button className="rounded-md border border-signal/60 bg-transparent px-3 py-1.5 font-mono text-[10px] tracking-widest text-signal transition hover:bg-signal/10">
                CONNECT
              </button>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ---------- Section: Team & Roles ----------

function Team() {
  const rows = [
    { name: "Dana R.", role: "Fulfillment", access: "Pack & Scan only", status: "Active" },
    { name: "Marcus Reyes", role: "Manager", access: "Full ops", status: "Active" },
    { name: "Priya S.", role: "Admin", access: "Full + billing", status: "Active" },
  ];
  return (
    <SectionCard title="TEAM & ROLES" subtitle="Who can do what on this deck">
      <div className="overflow-hidden rounded-md border border-border">
        <div className="grid grid-cols-[1.4fr_1fr_1.4fr_80px] bg-background/40 px-4 py-2 font-mono text-[9px] tracking-widest text-muted-foreground">
          <div>NAME</div>
          <div>ROLE</div>
          <div>ACCESS</div>
          <div>STATUS</div>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.name}
            className={`grid grid-cols-[1.4fr_1fr_1.4fr_80px] items-center px-4 py-3 text-sm ${
              i < rows.length - 1 ? "border-b border-border/60" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-signal/15 font-mono text-[10px] text-signal">
                {r.name
                  .split(" ")
                  .map((s) => s[0])
                  .join("")}
              </span>
              {r.name}
            </div>
            <div className="text-muted-foreground">{r.role}</div>
            <div className="text-muted-foreground">{r.access}</div>
            <div>
              <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[color:var(--color-success)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" />
                {r.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="rounded-md border border-signal/60 bg-transparent px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-signal transition hover:bg-signal/10">
          + INVITE TEAM MEMBER
        </button>
      </div>
    </SectionCard>
  );
}

// ---------- Section: Appearance ----------

function Appearance() {
  const { theme, setTheme } = useTheme();
  return (
    <SectionCard title="APPEARANCE" subtitle="Command deck palette · applies instantly">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {THEMES.map((t) => (
          <ThemeCard
            key={t.id}
            id={t.id}
            name={t.name}
            tagline={t.tagline}
            swatches={t.swatches}
            accent={t.accent}
            active={theme === t.id}
            onSelect={() => setTheme(t.id)}
          />
        ))}
      </div>
    </SectionCard>
  );
}

// ---------- Shared bits ----------

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-panel/70 p-5">
      <div className="mb-4 border-b border-border/60 pb-3">
        <div className="font-mono text-[10px] tracking-[0.22em] text-signal">{title}</div>
        {subtitle && <div className="mt-0.5 text-xs text-muted-foreground">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <div className="font-mono text-[9px] tracking-widest text-muted-foreground">{label.toUpperCase()}</div>
      <div className="mt-1 rounded-md border border-border bg-background/40 px-3 py-2 font-mono text-sm">
        {value}
      </div>
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-5 w-9 rounded-full border transition ${
        on ? "border-signal/70 bg-signal/30" : "border-border bg-muted/40"
      }`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
          on ? "left-4 bg-signal shadow-[0_0_10px_var(--color-signal)]" : "left-0.5 bg-muted-foreground/70"
        }`}
      />
    </button>
  );
}

function ThemeCard({
  id,
  name,
  tagline,
  swatches,
  accent,
  active,
  onSelect,
}: {
  id: ThemeId;
  name: string;
  tagline: string;
  swatches: string[];
  accent: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-lg border p-3 text-left transition ${
        active ? "border-signal/70 bg-panel-elevated" : "border-border bg-panel hover:border-muted-foreground/40"
      }`}
    >
      <div
        className="relative h-24 w-full overflow-hidden rounded-md border border-border"
        style={{ background: swatches[0] }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse 60% 60% at 15% 0%, ${accent}22, transparent 70%)`,
          }}
        />
        <div className="absolute inset-x-3 bottom-3 flex items-end gap-2">
          <div className="h-8 flex-1 rounded" style={{ background: swatches[1] }} />
          <div className="h-10 w-14 rounded" style={{ background: swatches[2] }} />
          <div
            className="h-6 w-16 rounded px-2 font-mono text-[9px] flex items-center justify-center tracking-wider"
            style={{ background: accent, color: swatches[0] }}
          >
            DISPATCH
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">{tagline}</div>
          <div className="mt-1 font-mono text-[9px] tracking-widest text-muted-foreground">{id.toUpperCase()}</div>
        </div>
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
            active ? "border-signal bg-signal text-signal-foreground" : "border-border"
          }`}
        >
          {active ? <Check className="h-3.5 w-3.5" /> : null}
        </div>
      </div>
    </button>
  );
}

// ---------- Section: Billing ----------

type BillingRow = {
  date: string;
  order: string;
  zip: string;
  distance: string;
  fee: string;
  status: "Delivered" | "In progress" | "Failed";
};

const BILLING_ROWS: BillingRow[] = [
  { date: "Jun 12", order: "WL-92847", zip: "75034", distance: "1.8 mi", fee: "$5.49", status: "Delivered" },
  { date: "Jun 12", order: "WL-92846", zip: "75034", distance: "2.1 mi", fee: "$5.49", status: "In progress" },
  { date: "Jun 12", order: "WL-92851", zip: "75034", distance: "2.4 mi", fee: "$5.85", status: "Delivered" },
  { date: "Jun 11", order: "WL-92845", zip: "75034", distance: "1.9 mi", fee: "$5.49", status: "Delivered" },
  { date: "Jun 11", order: "WL-92838", zip: "75034", distance: "1.7 mi", fee: "$5.49", status: "Delivered" },
  { date: "Jun 10", order: "WL-92812", zip: "75034", distance: "2.4 mi", fee: "$5.85", status: "Failed" },
  { date: "Jun 9",  order: "WL-92810", zip: "75024", distance: "3.2 mi", fee: "$6.99", status: "Delivered" },
  { date: "Jun 8",  order: "WL-92801", zip: "75034", distance: "1.6 mi", fee: "$5.49", status: "Delivered" },
];

const INVOICES = [
  { period: "MAY 2026", total: "$1,842.10", deliveries: "298 deliveries", paid: "Paid Jun 1" },
  { period: "APRIL 2026", total: "$1,654.20", deliveries: "267 deliveries", paid: "Paid May 1" },
  { period: "MARCH 2026", total: "$1,421.00", deliveries: "231 deliveries", paid: "Paid Apr 1" },
];

function Billing() {
  return (
    <div className="flex flex-col gap-5">
      {/* Title strip */}
      <div>
        <div className="font-mono text-[10px] tracking-[0.22em] text-signal">BILLING</div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          Westlake Pharmacy · Frisco · June 2026
        </div>
      </div>

      {/* Current period summary */}
      <div
        className="relative overflow-hidden rounded-lg border border-border bg-panel/70"
        style={{ boxShadow: `inset 0 3px 0 0 ${AMBER}` }}
      >
        <div className="border-b border-border/60 px-5 py-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                BILLING PERIOD
              </div>
              <div className="mt-0.5 font-mono text-sm">June 1 – 30, 2026 CT</div>
            </div>
            <span
              className="rounded border px-2 py-0.5 font-mono text-[10px] tracking-[0.18em]"
              style={{ color: AMBER, borderColor: `${AMBER}66`, background: `${AMBER}12` }}
            >
              OPEN — CLOSES JULY 1
            </span>
          </div>
        </div>

        <div className="px-5 py-4">
          <ul className="divide-y divide-border/50 font-mono text-[13px]">
            <BillingLine label="Platform subscription (Frisco)" value="$149.00" />
            <BillingLine label="Deliveries — 312 × $5.49 avg" value="$1,712.88" />
            <BillingLine label="Capsule replenishment (25-pack)" value="$89.00" />
          </ul>
          <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
            <div>
              <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                TOTAL DUE
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                Payment method: Visa •••• 4242 · Next charge: July 1, 2026
              </div>
            </div>
            <div className="font-mono text-3xl font-semibold" style={{ color: AMBER }}>
              $1,950.88
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="rounded-md border px-4 py-2 font-mono text-[11px] tracking-[0.2em] transition hover:opacity-90"
              style={{ borderColor: `${AMBER}66`, color: AMBER, background: "transparent" }}
            >
              UPDATE PAYMENT
            </button>
          </div>
        </div>
      </div>

      {/* Line items table */}
      <SectionCard title="DELIVERY LINE ITEMS" subtitle="This billing period">
        <div className="overflow-hidden rounded-md border border-border">
          <div className="grid grid-cols-[80px_minmax(120px,1fr)_80px_100px_90px_1fr] items-center gap-3 border-b border-border bg-background/40 px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
            <span>DATE CT</span>
            <span>ORDER #</span>
            <span>ZIP</span>
            <span>DISTANCE</span>
            <span>FEE</span>
            <span>STATUS</span>
          </div>
          {BILLING_ROWS.map((r, i) => {
            const failed = r.status === "Failed";
            return (
              <div
                key={r.order}
                className={`grid grid-cols-[80px_minmax(120px,1fr)_80px_100px_90px_1fr] items-center gap-3 px-4 py-2.5 text-sm ${
                  i < BILLING_ROWS.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <span className="font-mono text-xs text-muted-foreground">{r.date}</span>
                <button className="justify-self-start font-mono text-[13px] text-foreground transition hover:text-signal">
                  #{r.order}
                </button>
                <span className="font-mono text-xs text-muted-foreground">{r.zip}</span>
                <span className="font-mono text-xs text-muted-foreground">{r.distance}</span>
                <span
                  className={`font-mono text-xs ${failed ? "text-muted-foreground line-through" : "text-foreground"}`}
                >
                  {r.fee}
                </span>
                <span className="flex items-center gap-2 text-xs">
                  {r.status === "Delivered" && (
                    <span className="font-mono text-[10px] tracking-[0.18em]" style={{ color: "var(--color-success)" }}>
                      DELIVERED
                    </span>
                  )}
                  {r.status === "In progress" && (
                    <span className="font-mono text-[10px] tracking-[0.18em] text-signal">
                      IN PROGRESS
                    </span>
                  )}
                  {failed && (
                    <>
                      <span className="font-mono text-[10px] tracking-[0.18em] text-[color:var(--color-alert)]">
                        FAILED
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground">
                        NOT CHARGED
                      </span>
                    </>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Invoice history */}
      <SectionCard title="INVOICE HISTORY" subtitle="Downloadable statements">
        <div className="flex flex-col gap-2">
          {INVOICES.map((inv) => (
            <div
              key={inv.period}
              className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-background/40 px-4 py-3"
            >
              <div className="min-w-[110px] font-mono text-xs tracking-[0.18em] text-foreground">
                {inv.period}
              </div>
              <div className="min-w-[110px] font-mono text-sm font-semibold" style={{ color: AMBER }}>
                {inv.total}
              </div>
              <div className="text-xs text-muted-foreground">{inv.deliveries}</div>
              <div className="text-xs text-muted-foreground">·</div>
              <div className="text-xs text-muted-foreground">{inv.paid}</div>
              <button
                className="ml-auto inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] transition hover:opacity-90"
                style={{ borderColor: `${AMBER}66`, color: AMBER }}
              >
                <Download className="h-3 w-3" />
                DOWNLOAD PDF
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Multi-location note */}
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-dashed border-border/60 bg-background/30 px-4 py-3 text-xs text-muted-foreground">
        <span>
          Plano location (8200 Preston Rd) billed separately — $149.00/mo + deliveries
        </span>
        <button className="ml-auto font-mono text-[10px] tracking-[0.18em] text-signal transition hover:opacity-80">
          VIEW PLANO BILLING →
        </button>
      </div>
    </div>
  );
}

function BillingLine({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </li>
  );
}
