import { X, MapPin, Check, Download, Link2 } from "lucide-react";
import proofImg from "@/assets/proof-delivery-92845.jpg";

const AMBER = "#f0a04b";

export type ProofRecord = {
  order: string;
  customer: string;
  neighborhood: string;
  items: string[];
  capsuleId: string;
  drone: string;
  mission: string;
  seal: string;
  drop: string;
  deliveredAt: string;
  confirmedAt: string;
  confirmedDelta: string;
  distance: string;
  fee: string;
  gps: string;
  timeline: { label: string; time: string }[];
};

const PROOFS: Record<string, ProofRecord> = {
  "WL-92845": {
    order: "WL-92845",
    customer: "Lisa K.",
    neighborhood: "Newman Village, Frisco 75034",
    items: ["Loratadine 10mg", "Vitamin D3 5000 IU"],
    capsuleId: "TX-4398",
    drone: "DRN-03",
    mission: "M-TX-4419",
    seal: "INTACT",
    drop: "RESIDENTIAL — BACKYARD TETHER",
    deliveredAt: "Today, 11:47 AM CT",
    confirmedAt: "11:52 AM CT",
    confirmedDelta: "5 min after drop",
    distance: "1.9 mi",
    fee: "$5.49",
    gps: "33.1291° N, 96.8388° W",
    timeline: [
      { label: "Packed", time: "11:32" },
      { label: "Pickup", time: "11:36" },
      { label: "In flight", time: "11:37" },
      { label: "Delivered", time: "11:47" },
      { label: "Confirmed", time: "11:52" },
    ],
  },
  "WL-92838": {
    order: "WL-92838",
    customer: "Amy S.",
    neighborhood: "Wade Blvd, Frisco 75034",
    items: ["Amoxicillin 500mg", "Loratadine 10mg"],
    capsuleId: "TX-4441",
    drone: "DRN-01",
    mission: "M-TX-4402",
    seal: "INTACT",
    drop: "RESIDENTIAL — FRONT PORCH",
    deliveredAt: "Today, 10:22 AM CT",
    confirmedAt: "10:26 AM CT",
    confirmedDelta: "4 min after drop",
    distance: "1.7 mi",
    fee: "$5.49",
    gps: "33.1512° N, 96.8241° W",
    timeline: [
      { label: "Packed", time: "10:04" },
      { label: "Pickup", time: "10:09" },
      { label: "In flight", time: "10:10" },
      { label: "Delivered", time: "10:22" },
      { label: "Confirmed", time: "10:26" },
    ],
  },
};

export function getProof(orderId: string): ProofRecord | null {
  return PROOFS[orderId] ?? null;
}

export function ProofOfDeliveryPanel({
  orderId,
  onClose,
}: {
  orderId: string;
  onClose: () => void;
}) {
  const proof = getProof(orderId) ?? PROOFS["WL-92845"];

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/60" onClick={onClose} />
      <aside className="fixed inset-y-0 right-0 z-[70] flex w-[720px] max-w-[95vw] flex-col overflow-hidden border-l border-border bg-panel shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-border px-6 py-4">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
              PROOF OF DELIVERY
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <h2 className="font-mono text-lg font-semibold tracking-wider">
                #{proof.order}
              </h2>
              <span
                className="flex items-center gap-1 font-mono text-[10px] tracking-[0.2em]"
                style={{ color: "var(--color-success)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-success)" }} />
                DELIVERED
              </span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {proof.customer} · {proof.neighborhood}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-border bg-background p-1.5 text-muted-foreground transition hover:text-foreground"
            aria-label="Close proof of delivery"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Two-column body */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 gap-5 p-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            {/* LEFT — Photo + map */}
            <div className="flex flex-col gap-4">
              <div
                className="overflow-hidden rounded-lg border"
                style={{ borderColor: `${AMBER}55`, boxShadow: `0 0 24px ${AMBER}18` }}
              >
                <img
                  src={proofImg}
                  alt={`Capsule ${proof.capsuleId} delivered at ${proof.neighborhood}`}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </div>
              <div className="font-mono text-[9px] tracking-[0.22em] text-muted-foreground">
                CAPTURED AUTOMATICALLY AT DELIVERY · 11:47 AM CT
              </div>

              <MapInset gps={proof.gps} />
            </div>

            {/* RIGHT — Delivery record */}
            <div className="flex flex-col gap-4">
              <div className="rounded-lg border border-border bg-background/60 p-4">
                <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                  DELIVERY RECORD
                </div>
                <ul className="mt-3 divide-y divide-border/60 font-mono text-[12px]">
                  <RecordRow label="Capsule seal" value={proof.seal} />
                  <RecordRow label="Capsule ID" value={`#${proof.capsuleId}`} />
                  <RecordRow label="Drop type" value={proof.drop} />
                  <RecordRow
                    label="Drone mission"
                    value={`${proof.mission} · ${proof.drone} · No interventions`}
                  />
                  <RecordRow label="Delivered" value={proof.deliveredAt} />
                  <RecordRow
                    label="Customer confirmed"
                    value={`"RECEIVED" tap at ${proof.confirmedAt}`}
                    hint={`(${proof.confirmedDelta})`}
                  />
                  <RecordRow
                    label="Distance / Fee"
                    value={`${proof.distance} · Fee charged: ${proof.fee}`}
                  />
                </ul>
              </div>

              {/* Items */}
              <div className="rounded-lg border border-border bg-background/40 p-4">
                <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                  MANIFEST
                </div>
                <ul className="mt-2 space-y-1 text-xs">
                  {proof.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <Check className="h-3 w-3" style={{ color: "var(--color-success)" }} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline */}
              <div className="rounded-lg border border-border bg-background/40 p-4">
                <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                  TIMELINE
                </div>
                <div className="mt-3 flex items-center gap-1 overflow-x-auto">
                  {proof.timeline.map((t, i) => (
                    <div key={t.label} className="flex items-center gap-1">
                      <div className="flex flex-col items-center">
                        <span
                          className="grid h-4 w-4 place-items-center rounded-full"
                          style={{ background: "var(--color-success)" }}
                        >
                          <Check className="h-2.5 w-2.5 text-background" strokeWidth={3} />
                        </span>
                        <span className="mt-1 font-mono text-[9px] tracking-widest text-muted-foreground">
                          {t.label.toUpperCase()}
                        </span>
                        <span className="font-mono text-[10px] text-foreground">{t.time}</span>
                      </div>
                      {i < proof.timeline.length - 1 && (
                        <span
                          className="mx-1 h-px w-6 self-start mt-2"
                          style={{ background: "var(--color-success)" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-3 border-t border-border bg-panel/80 px-6 py-4">
          <button className="text-[11px] font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
            Report issue
          </button>
          <div className="ml-auto flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-signal/50 bg-transparent px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.18em] text-signal transition hover:bg-signal/10">
              <Link2 className="h-3.5 w-3.5" />
              COPY PROOF LINK
            </button>
            <button className="inline-flex items-center gap-1.5 btn-primary btn-primary-glow bg-signal px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.18em] text-signal-foreground transition hover:opacity-90">
              <Download className="h-3.5 w-3.5" />
              DOWNLOAD PDF
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function RecordRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <li className="grid grid-cols-[16px_minmax(110px,auto)_1fr] items-start gap-2 py-2">
      <Check
        className="mt-0.5 h-3.5 w-3.5"
        style={{ color: "var(--color-success)" }}
      />
      <span className="text-[10px] tracking-[0.18em] text-muted-foreground">
        {label.toUpperCase()}
      </span>
      <span className="text-foreground">
        {value}
        {hint && <span className="ml-1 text-muted-foreground">{hint}</span>}
      </span>
    </li>
  );
}

function MapInset({ gps }: { gps: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background/70">
      <div className="relative h-[130px] w-full overflow-hidden">
        {/* stylized dark map with grid */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 60% 55%, rgba(45,180,120,0.14), transparent 55%), #0d0d0d",
          }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 130">
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 50}
              x2={i * 50}
              y1={0}
              y2={130}
              stroke="#333"
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              x2={400}
              y1={i * 40}
              y2={i * 40}
              stroke="#333"
              strokeWidth={0.5}
            />
          ))}
          {/* meandering roads */}
          <path
            d="M0,90 Q90,60 200,80 T400,50"
            stroke="#4a4a4a"
            strokeWidth={2}
            fill="none"
          />
          <path
            d="M60,0 Q80,60 130,80 T200,130"
            stroke="#3a3a3a"
            strokeWidth={1.5}
            fill="none"
          />
        </svg>
        {/* mint pin */}
        <div
          className="absolute"
          style={{ left: "58%", top: "48%", transform: "translate(-50%, -100%)" }}
        >
          <div
            className="relative flex flex-col items-center"
            style={{ color: "var(--color-success)" }}
          >
            <MapPin className="h-6 w-6 drop-shadow-[0_0_6px_currentColor]" fill="currentColor" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-border/60 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
        <span>GPS</span>
        <span>{gps}</span>
      </div>
    </div>
  );
}
