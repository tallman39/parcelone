import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calendar, ChevronRight, MapPin, Package, Search, X } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { ProofOfDeliveryPanel } from "@/components/ProofOfDeliveryPanel";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
  head: () => ({
    meta: [
      { title: "Orders · ParcelOne Merchant Command" },
      { name: "description", content: "Order queue for Westlake Pharmacy drone dispatch." },
    ],
  }),
});

// ---------- Data ----------

type OrderStatus =
  | "in-flight"
  | "eligible"
  | "hub"
  | "loading"
  | "delivered"
  | "failed"
  | "road-only";

type OrderType = "DRONE" | "ROAD";

type Order = {
  id: string;
  customer: string;
  customerFull: string;
  address: string;
  zip: string;
  type: OrderType;
  status: OrderStatus;
  capsule: string | "—";
  distance: string;
  time: string;
  drone?: string;
  capsuleId?: string;
  weight?: string;
  items?: string[];
  timeline?: { label: string; time: string; done: boolean }[];
  failureReason?: string;
};

const ORDERS: Order[] = [
  {
    id: "WL-92847",
    customer: "Sarah M.",
    customerFull: "Sarah M.",
    address: "8621 Newman Village Dr, Frisco 75034",
    zip: "75034",
    type: "DRONE",
    status: "in-flight",
    capsule: "M",
    distance: "1.8 mi",
    time: "12 min ago",
    drone: "DRN-01",
    capsuleId: "TX-4471",
    weight: "1.2 kg",
    items: ["Amoxicillin 500mg", "Hydrocortisone cream 1%"],
    timeline: [
      { label: "Order received", time: "12:02 PM CT", done: true },
      { label: "Packed & scanned", time: "12:04 PM CT", done: true },
      { label: "Drone pickup", time: "12:08 PM CT", done: true },
      { label: "In flight — ETA 4 min", time: "12:16 PM CT", done: false },
    ],
  },
  {
    id: "WL-92846",
    customer: "James T.",
    customerFull: "James T.",
    address: "9412 Phillips Creek Ranch Blvd, Frisco 75034",
    zip: "75034",
    type: "DRONE",
    status: "eligible",
    capsule: "S",
    distance: "2.1 mi",
    time: "3 min ago",
    weight: "0.8 kg",
    items: ["Metformin 500mg", "Vitamin D3 2000 IU"],
  },
  {
    id: "WL-92851",
    customer: "Kevin P.",
    customerFull: "Kevin P.",
    address: "10203 Coyote Ridge Dr, Frisco 75034",
    zip: "75034",
    type: "DRONE",
    status: "in-flight",
    capsule: "S",
    distance: "2.4 mi",
    time: "18 min ago",
    drone: "DRN-04",
    capsuleId: "TX-4482",
    weight: "0.6 kg",
    items: ["Lisinopril 10mg"],
    timeline: [
      { label: "Order received", time: "11:48 AM CT", done: true },
      { label: "Packed & scanned", time: "11:52 AM CT", done: true },
      { label: "Drone pickup", time: "11:58 AM CT", done: true },
      { label: "In flight — ETA 2 min", time: "12:14 PM CT", done: false },
    ],
  },
  {
    id: "WL-92849",
    customer: "Maria L.",
    customerFull: "Maria L.",
    address: "Frisco Square Hub, Frisco 75034",
    zip: "75034",
    type: "DRONE",
    status: "hub",
    capsule: "M",
    distance: "1.5 mi",
    time: "Frisco Square",
    drone: "DRN-02",
    capsuleId: "TX-4468",
    items: ["Albuterol inhaler", "Prednisone 20mg"],
    timeline: [
      { label: "Order received", time: "11:30 AM CT", done: true },
      { label: "Packed & scanned", time: "11:34 AM CT", done: true },
      { label: "Handoff at Frisco Square hub", time: "11:52 AM CT", done: true },
      { label: "Awaiting last-mile", time: "—", done: false },
    ],
  },
  {
    id: "WL-92848",
    customer: "David R.",
    customerFull: "David R.",
    address: "7815 Legacy Dr, Frisco 75034",
    zip: "75034",
    type: "DRONE",
    status: "loading",
    capsule: "M",
    distance: "1.9 mi",
    time: "8 min ago",
    drone: "BAY-01",
    capsuleId: "TX-4489",
    weight: "1.1 kg",
    items: ["Cephalexin 500mg", "Ibuprofen 200mg"],
  },
  {
    id: "WL-92845",
    customer: "Lisa K.",
    customerFull: "Lisa K.",
    address: "6540 Stonebrook Pkwy, Frisco 75034",
    zip: "75034",
    type: "DRONE",
    status: "delivered",
    capsule: "S",
    distance: "2.0 mi",
    time: "11:47 AM",
    drone: "DRN-03",
    capsuleId: "TX-4455",
    items: ["Atorvastatin 20mg"],
  },
  {
    id: "WL-92840",
    customer: "Tom H.",
    customerFull: "Tom H.",
    address: "Outside geofence · 75025",
    zip: "75025",
    type: "ROAD",
    status: "road-only",
    capsule: "—",
    distance: "—",
    time: "Outside geofence",
  },
  {
    id: "WL-92838",
    customer: "Amy S.",
    customerFull: "Amy S.",
    address: "4820 Wade Blvd, Frisco 75034",
    zip: "75034",
    type: "DRONE",
    status: "delivered",
    capsule: "M",
    distance: "1.7 mi",
    time: "10:22 AM",
    drone: "DRN-01",
    capsuleId: "TX-4441",
    items: ["Amoxicillin 500mg", "Loratadine 10mg"],
  },
  {
    id: "WL-92812",
    customer: "James T.",
    customerFull: "James T.",
    address: "9412 Phillips Creek Ranch Blvd, Frisco 75034",
    zip: "75034",
    type: "DRONE",
    status: "failed",
    capsule: "M",
    distance: "2.4 mi",
    time: "Yesterday",
    drone: "DRN-06",
    capsuleId: "TX-4402",
    items: ["Insulin glargine 100 U/mL"],
    failureReason:
      "Drop-off aborted — recipient not present at LZ, backup rooftop pad unreachable. Capsule returned to bay.",
  },
  {
    id: "WL-92810",
    customer: "Priya N.",
    customerFull: "Priya N.",
    address: "2140 Preston Rd, Plano 75024",
    zip: "75024",
    type: "DRONE",
    status: "delivered",
    capsule: "S",
    distance: "3.2 mi",
    time: "Plano",
    drone: "DRN-02",
    capsuleId: "TX-4398",
    items: ["Sertraline 50mg"],
  },
  {
    id: "WL-92805",
    customer: "Mark W.",
    customerFull: "Mark W.",
    address: "3305 Main St, Frisco 75034",
    zip: "75034",
    type: "DRONE",
    status: "eligible",
    capsule: "M",
    distance: "1.6 mi",
    time: "6 min ago",
    weight: "1.0 kg",
    items: ["Ciprofloxacin 500mg"],
  },
  {
    id: "WL-92801",
    customer: "Susan L.",
    customerFull: "Susan L.",
    address: "Over 8 lb payload · 75070",
    zip: "75070",
    type: "ROAD",
    status: "road-only",
    capsule: "—",
    distance: "—",
    time: "Over 8 lb",
  },
];

const FILTERS = [
  { id: "all", label: "ALL" },
  { id: "drone", label: "DRONE ELIGIBLE" },
  { id: "in-progress", label: "IN PROGRESS" },
  { id: "completed", label: "COMPLETED" },
  { id: "failed", label: "FAILED" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

// ---------- Page ----------

function OrdersPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [proofId, setProofId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ORDERS.filter((o) => {
      if (q) {
        const hay = `${o.id} ${o.customer} ${o.zip}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filter === "all") return true;
      if (filter === "drone") return o.status === "eligible";
      if (filter === "in-progress")
        return ["in-flight", "loading", "hub"].includes(o.status);
      if (filter === "completed") return o.status === "delivered";
      if (filter === "failed") return o.status === "failed";
      return true;
    });
  }, [query, filter]);

  const selected = ORDERS.find((o) => o.id === selectedId) ?? null;

  return (
    <div className="flex h-screen min-h-screen flex-col overflow-hidden bg-background pl-16 text-foreground">
      <TopBar activeTab="orders" />

      <main className="relative flex-1 overflow-auto px-10 py-10">
        {/* Title */}
        <div className="mb-10">
          <div className="eyebrow-mono">Orders / Today</div>
          <h1 className="mt-3 text-4xl font-medium tracking-tight">Dispatch overview</h1>
          <div className="mt-2 text-sm text-muted-foreground">
            Westlake Pharmacy · Frisco · June 12, 2026 CT
          </div>
        </div>

        {/* Summary strip — clickable filters, editorial big-number cards */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <MetricCard
            label="COMPLETED"
            value={22}
            total={33}
            tone="success"
            active={filter === "completed"}
            onClick={() => setFilter(filter === "completed" ? "all" : "completed")}
          />
          <MetricCard
            label="IN FLIGHT"
            value={4}
            total={33}
            tone="signal"
            active={filter === "in-progress"}
            onClick={() => setFilter(filter === "in-progress" ? "all" : "in-progress")}
          />
          <MetricCard
            label="IN QUEUE"
            value={6}
            total={33}
            tone="muted"
            active={filter === "drone"}
            onClick={() => setFilter(filter === "drone" ? "all" : "drone")}
          />
          <MetricCard
            label="FAILED"
            value={1}
            total={33}
            tone="alert"
            active={filter === "failed"}
            onClick={() => setFilter(filter === "failed" ? "all" : "failed")}
          />
        </div>

        {/* Controls row */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-md border border-border bg-panel px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span className="font-mono tracking-widest">TODAY</span>
            <ChevronRight className="h-3 w-3 rotate-90" />
          </button>

          <div className="relative ml-auto w-full max-w-sm min-w-[240px]">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search order #, customer, ZIP..."
              className="h-9 w-full rounded-md border border-border bg-panel pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:border-signal/60 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-border bg-panel/60">
          <div className="grid grid-cols-[minmax(120px,1.1fr)_minmax(120px,1fr)_80px_80px_minmax(140px,1.2fr)_80px_90px_minmax(120px,1fr)_100px] items-center gap-3 border-b border-border bg-panel px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
            <span>ORDER #</span>
            <span>CUSTOMER</span>
            <span>ZIP</span>
            <span>TYPE</span>
            <span>STATUS</span>
            <span>CAPSULE</span>
            <span>DISTANCE</span>
            <span>TIME</span>
            <span className="text-right">ACTION</span>
          </div>
          {filtered.map((o) => (
            <OrderRow
              key={o.id}
              order={o}
              selected={o.id === selectedId}
              onClick={() => setSelectedId(o.id)}
              onProof={
                o.status === "delivered" ? () => setProofId(o.id) : undefined
              }
            />
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">No orders match your filters.</div>
          )}
        </div>
      </main>

      {selected && (
        <OrderDetailPanel
          order={selected}
          onClose={() => setSelectedId(null)}
          onViewProof={() => setProofId(selected.id)}
        />
      )}
      {proofId && <ProofOfDeliveryPanel orderId={proofId} onClose={() => setProofId(null)} />}
    </div>
  );
}

// ---------- Metric card ----------

function MetricCard({
  label,
  value,
  total,
  tone,
  active,
  onClick,
}: {
  label: string;
  value: number;
  total?: number;
  tone: "signal" | "success" | "alert" | "muted";
  active?: boolean;
  onClick?: () => void;
}) {
  const barColor = {
    signal: "var(--color-signal)",
    success: "var(--color-success)",
    alert: "var(--color-alert)",
    muted: "var(--color-muted-foreground)",
  }[tone];
  const pct = total ? Math.max(2, Math.min(100, (value / total) * 100)) : 0;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative text-left rounded-lg border px-6 py-6 transition ${
        active
          ? "border-foreground/40 bg-panel"
          : "border-border bg-panel/60 hover:bg-panel"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="eyebrow-mono">{label}</div>
        {total ? (
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground/70">
            /{String(total).padStart(2, "0")}
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="display-number">{value}</span>
      </div>
      {total ? (
        <div className="mt-5 h-1.5 w-full dashed-track rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, backgroundColor: barColor }}
          />
        </div>
      ) : null}
    </button>
  );
}

// ---------- Status chip ----------

function StatusChip({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, { label: string; color: string; bg: string; border: string; dot: string }> = {
    "in-flight": {
      label: "IN FLIGHT",
      color: "text-signal",
      bg: "bg-signal/10",
      border: "border-signal/50",
      dot: "bg-signal",
    },
    eligible: {
      label: "ELIGIBLE",
      color: "text-[color:var(--color-accent-violet,#a78bfa)]",
      bg: "bg-[color:var(--color-accent-violet,#a78bfa)]/10",
      border: "border-[color:var(--color-accent-violet,#a78bfa)]/50",
      dot: "bg-[color:var(--color-accent-violet,#a78bfa)]",
    },
    hub: {
      label: "HUB",
      color: "text-[color:var(--color-accent-cyan,#22d3ee)]",
      bg: "bg-[color:var(--color-accent-cyan,#22d3ee)]/10",
      border: "border-[color:var(--color-accent-cyan,#22d3ee)]/50",
      dot: "bg-[color:var(--color-accent-cyan,#22d3ee)]",
    },
    loading: {
      label: "LOADING",
      color: "text-[color:var(--color-accent-amber,#f59e0b)]",
      bg: "bg-[color:var(--color-accent-amber,#f59e0b)]/10",
      border: "border-[color:var(--color-accent-amber,#f59e0b)]/50",
      dot: "bg-[color:var(--color-accent-amber,#f59e0b)]",
    },
    delivered: {
      label: "DELIVERED",
      color: "text-[color:var(--color-success)]",
      bg: "bg-[color:var(--color-success)]/10",
      border: "border-[color:var(--color-success)]/50",
      dot: "bg-[color:var(--color-success)]",
    },
    failed: {
      label: "FAILED",
      color: "text-[color:var(--color-alert)]",
      bg: "bg-[color:var(--color-alert)]/10",
      border: "border-[color:var(--color-alert)]/50",
      dot: "bg-[color:var(--color-alert)]",
    },
    "road-only": {
      label: "ROAD ONLY",
      color: "text-muted-foreground",
      bg: "bg-muted/15",
      border: "border-border",
      dot: "bg-muted-foreground",
    },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] ${s.color} ${s.bg} ${s.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ---------- Row ----------

function OrderRow({
  order,
  selected,
  onClick,
  onProof,
}: {
  order: Order;
  selected: boolean;
  onClick: () => void;
  onProof?: () => void;
}) {
  const actionLabel =
    order.status === "delivered"
      ? "Proof"
      : order.status === "eligible"
      ? "Pack"
      : order.status === "failed"
      ? "Resolve"
      : order.status === "road-only"
      ? "—"
      : "View";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative grid w-full cursor-pointer grid-cols-[minmax(120px,1.1fr)_minmax(120px,1fr)_80px_80px_minmax(140px,1.2fr)_80px_90px_minmax(120px,1fr)_100px] items-center gap-3 border-b border-border/60 px-4 py-5 text-left text-sm transition hover:bg-panel ${
        selected ? "bg-panel" : ""
      }`}
    >
      <span
        className={`absolute inset-y-0 left-0 w-[3px] bg-signal transition-opacity ${
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
      <span className="font-mono text-[13px] text-foreground">#{order.id}</span>
      <span className="truncate text-foreground">{order.customer}</span>
      <span className="font-mono text-xs text-muted-foreground">{order.zip}</span>
      <span
        className={`font-mono text-[10px] tracking-[0.15em] ${
          order.type === "DRONE" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {order.type}
      </span>
      <span>
        <StatusChip status={order.status} />
      </span>
      <span className="font-mono text-xs text-foreground">{order.capsule}</span>
      <span className="font-mono text-xs text-muted-foreground">{order.distance}</span>
      <span className="truncate text-xs text-muted-foreground">{order.time}</span>
      {onProof ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onProof();
          }}
          className="justify-self-end rounded border border-signal/40 px-2 py-1 font-mono text-[10px] tracking-[0.18em] text-signal transition hover:bg-signal/10"
        >
          PROOF
        </button>
      ) : (
        <span
          className={`justify-self-end font-mono text-[11px] tracking-[0.15em] ${
            actionLabel === "Pack" || actionLabel === "Resolve"
              ? "text-signal"
              : actionLabel === "—"
              ? "text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {actionLabel}
        </span>
      )}
    </div>
  );
}

// ---------- Detail slide-over ----------

function OrderDetailPanel({ order, onClose, onViewProof }: { order: Order; onClose: () => void; onViewProof?: () => void }) {
  const navigate = useNavigate();

  const goToMap = () => {
    if (order.drone) {
      navigate({ to: "/", search: { select: order.drone } });
    } else {
      navigate({ to: "/" });
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <aside className="fixed inset-y-0 right-0 z-50 flex w-[420px] flex-col overflow-hidden border-l border-border bg-panel shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
              #{order.id}
            </div>
            <div className="mt-1">
              <StatusChip status={order.status} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-border bg-background p-1.5 text-muted-foreground transition hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-auto px-5 py-4 text-sm">
          {/* Customer */}
          <section className="mb-5">
            <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">CUSTOMER</div>
            <div className="mt-1 font-medium">{order.customerFull}</div>
            <div className="mt-1 flex items-start gap-1.5 text-xs text-muted-foreground">
              <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0" />
              <span>{order.address}</span>
            </div>
          </section>

          {/* Items */}
          {order.items && (
            <section className="mb-5">
              <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">ITEMS</div>
              <ul className="mt-1.5 space-y-1">
                {order.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-xs">
                    <Package className="h-3 w-3 text-muted-foreground" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Assignment */}
          {(order.drone || order.capsuleId) && (
            <section className="mb-5 rounded-md border border-border bg-background/50 px-3 py-2.5">
              <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">ASSIGNED</div>
              <div className="mt-1 font-mono text-xs">
                {order.drone && <span className="text-foreground">{order.drone}</span>}
                {order.capsuleId && (
                  <>
                    <span className="mx-1.5 text-muted-foreground">·</span>
                    <span className="text-muted-foreground">Capsule #{order.capsuleId}</span>
                  </>
                )}
                {order.capsule !== "—" && (
                  <>
                    <span className="mx-1.5 text-muted-foreground">·</span>
                    <span className="text-muted-foreground">Size {order.capsule}</span>
                  </>
                )}
                {order.weight && (
                  <>
                    <span className="mx-1.5 text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{order.weight}</span>
                  </>
                )}
              </div>
            </section>
          )}

          {/* Timeline */}
          {order.timeline && (
            <section className="mb-5">
              <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">TIMELINE</div>
              <ol className="mt-2 space-y-2.5">
                {order.timeline.map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-1 flex h-3 w-3 flex-shrink-0 items-center justify-center rounded-full ${
                        t.done
                          ? "bg-[color:var(--color-success)]"
                          : "bg-signal ring-2 ring-signal/30"
                      }`}
                    >
                      {t.done ? (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" />
                        </svg>
                      ) : null}
                    </span>
                    <div>
                      <div className={`text-xs ${t.done ? "text-foreground" : "text-signal"}`}>
                        {t.done ? "✓ " : "→ "}
                        {t.label}
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground">{t.time}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Failure */}
          {order.status === "failed" && order.failureReason && (
            <section className="mb-5 rounded-md border border-[color:var(--color-alert)]/40 bg-[color:var(--color-alert)]/5 px-3 py-2.5">
              <div className="font-mono text-[10px] tracking-[0.22em] text-[color:var(--color-alert)]">
                FAILURE SUMMARY
              </div>
              <div className="mt-1 text-xs text-foreground">{order.failureReason}</div>
            </section>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 border-t border-border bg-panel/80 px-5 py-3">
          {order.status === "eligible" ? (
            <button
              onClick={() => navigate({ to: "/", search: { select: "BAY-01" } })}
              className="flex-1 btn-primary btn-primary-glow bg-signal px-3 py-2 text-center font-mono text-[11px] font-semibold tracking-[0.18em] text-signal-foreground transition hover:opacity-90"
            >
              PACK &amp; SCAN
            </button>
          ) : order.status === "failed" ? (
            <button
              onClick={goToMap}
              className="flex-1 btn-primary btn-primary-glow bg-signal px-3 py-2 text-center font-mono text-[11px] font-semibold tracking-[0.18em] text-signal-foreground transition hover:opacity-90"
            >
              RESOLVE
            </button>
          ) : order.status === "delivered" ? (
            <button
              onClick={onViewProof}
              className="flex-1 btn-primary btn-primary-glow bg-signal px-3 py-2 text-center font-mono text-[11px] font-semibold tracking-[0.18em] text-signal-foreground transition hover:opacity-90"
            >
              VIEW PROOF
            </button>
          ) : null}
          {order.drone && (
            <button
              onClick={goToMap}
              className="flex-1 rounded-md border border-signal/60 bg-transparent px-3 py-2 text-center font-mono text-[11px] tracking-[0.18em] text-signal transition hover:bg-signal/10"
            >
              VIEW ON MAP
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
