import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { TopBar } from "@/components/TopBar";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
  head: () => ({
    meta: [
      { title: "Analytics · ParcelOne Merchant Command" },
      { name: "description", content: "Delivery performance analytics for Westlake Pharmacy." },
    ],
  }),
});

// ---------- Data ----------

// 30 days of daily delivery volume (May 13 → Jun 12)
const VOLUME: { day: string; date: string; count: number }[] = [
  { day: "May 13", date: "05-13", count: 6 },
  { day: "May 14", date: "05-14", count: 8 },
  { day: "May 15", date: "05-15", count: 9 },
  { day: "May 16", date: "05-16", count: 11 },
  { day: "May 17", date: "05-17", count: 7 },
  { day: "May 18", date: "05-18", count: 5 },
  { day: "May 19", date: "05-19", count: 9 },
  { day: "May 20", date: "05-20", count: 12 },
  { day: "May 21", date: "05-21", count: 10 },
  { day: "May 22", date: "05-22", count: 13 },
  { day: "May 23", date: "05-23", count: 11 },
  { day: "May 24", date: "05-24", count: 8 },
  { day: "May 25", date: "05-25", count: 7 },
  { day: "May 26", date: "05-26", count: 10 },
  { day: "May 27", date: "05-27", count: 12 },
  { day: "May 28", date: "05-28", count: 14 },
  { day: "May 29", date: "05-29", count: 13 },
  { day: "May 30", date: "05-30", count: 15 },
  { day: "May 31", date: "05-31", count: 9 },
  { day: "Jun 01", date: "06-01", count: 10 },
  { day: "Jun 02", date: "06-02", count: 12 },
  { day: "Jun 03", date: "06-03", count: 13 },
  { day: "Jun 04", date: "06-04", count: 14 },
  { day: "Jun 05", date: "06-05", count: 11 },
  { day: "Jun 06", date: "06-06", count: 9 },
  { day: "Jun 07", date: "06-07", count: 13 },
  { day: "Jun 08", date: "06-08", count: 18 }, // peak
  { day: "Jun 09", date: "06-09", count: 15 },
  { day: "Jun 10", date: "06-10", count: 14 },
  { day: "Jun 11", date: "06-11", count: 16 },
  { day: "Jun 12", date: "06-12", count: 12 },
];

// 30-day avg delivery time trend (minutes)
const TIMES = [
  20.2, 19.8, 19.5, 19.9, 20.1, 20.4, 19.7, 19.2, 18.9, 19.3, 18.7, 18.5, 19.0,
  18.4, 18.2, 17.9, 18.1, 18.3, 17.7, 17.9, 17.5, 17.6, 17.3, 17.4, 17.6, 17.8,
  16.9, 17.1, 17.0, 17.2, 17.2,
];

// Colors pulled from the dispatch overview palette:
//   flight (amber) · alert (red) · chart-5 (violet) · idle (grey)
const FAILURES = [
  { label: "Weather", pct: 48, color: "var(--color-flight)" },
  { label: "Drop zone", pct: 31, color: "var(--color-alert)" },
  { label: "Technical", pct: 12, color: "var(--chart-5)" },
  { label: "Other", pct: 9, color: "var(--color-idle)" },
];

const PEAK = Array.from({ length: 14 }, (_, i) => {
  // 8 AM (i=0) → 9 PM (i=13)
  const hour = 8 + i;
  // Lunch rush: 11–13, dinner: 17–19
  let intensity = 0.15;
  if (hour === 11) intensity = 0.55;
  if (hour === 12) intensity = 0.9;
  if (hour === 13) intensity = 0.85;
  if (hour === 14) intensity = 0.4;
  if (hour === 15) intensity = 0.25;
  if (hour === 16) intensity = 0.35;
  if (hour === 17) intensity = 0.7;
  if (hour === 18) intensity = 0.85;
  if (hour === 19) intensity = 0.55;
  if (hour === 20) intensity = 0.25;
  if (hour === 21) intensity = 0.15;
  if (hour === 9) intensity = 0.2;
  if (hour === 10) intensity = 0.35;
  return { hour, intensity };
});

// ---------- Page ----------

function AnalyticsPage() {
  const [range, setRange] = useState<"7" | "30" | "90">("30");

  return (
    <div className="flex h-screen min-h-screen flex-col overflow-hidden bg-background pl-16 text-foreground">
      <TopBar activeTab="analytics" />

      <main className="flex-1 overflow-auto px-10 py-10">
        {/* Title */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow-mono text-muted-foreground">ANALYTICS</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Performance</h1>
            <div className="mt-2 text-xs text-muted-foreground">
              Westlake Pharmacy · Frisco · May 13 – June 12, 2026 CT
            </div>
          </div>
          <div className="flex items-center gap-2">
            <RangeSelector value={range} onChange={setRange} />
            <button className="flex items-center gap-2 rounded-md border border-signal/60 bg-transparent px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-signal transition hover:bg-signal/10">
              <Download className="h-3.5 w-3.5" />
              EXPORT REPORT
            </button>
          </div>
        </div>

        {/* KPI row */}
        <div className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
          <KpiCard label="DELIVERIES" value="312" sub="of 350 target" pct={89} tone="signal" />
          <KpiCard label="ON-TIME" value="94.1" unit="%" sub="+2.3 vs prior" pct={94} tone="success" />
          <KpiCard label="AVG TIME" value="17.2" unit="MIN" sub="−1.1 vs prior" pct={86} tone="flight" />
          <KpiCard label="FAILURE" value="2.9" unit="%" sub="−0.6 vs prior" pct={29} tone="alert" invert />
        </div>

        {/* Charts row */}
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartPanel
            title="DELIVERY VOLUME"
            subtitle="Daily · last 30 days"
          >
            <VolumeChart />
          </ChartPanel>
          <ChartPanel
            title="AVG DELIVERY TIME"
            subtitle="30-day trend · target 20 min"
          >
            <TimeChart />
          </ChartPanel>
        </div>

        {/* Bottom row */}
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FailurePanel />
          <CostPanel />
        </div>


        {/* Location comparison */}
        <section className="mb-5">
          <div className="mb-2 font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
            LOCATION COMPARISON
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <LocationCard
              name="FRISCO"
              address="12200 Preston Rd"
              deliveries="312"
              onTime="94.1%"
              avg="17.2 min"
              fail="2.9%"
              primary
            />
            <LocationCard
              name="PLANO"
              address="8200 Preston Rd"
              deliveries="98"
              onTime="91.2%"
              avg="19.1 min"
              fail="6.2%"
            />
          </div>
        </section>

        {/* Peak hours */}
        <PeakPanel />
      </main>
    </div>
  );
}

// ---------- Range selector ----------

function RangeSelector({
  value,
  onChange,
}: {
  value: "7" | "30" | "90";
  onChange: (v: "7" | "30" | "90") => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-panel p-1">
      {(["7", "30", "90"] as const).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`rounded px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] transition ${
            value === v
              ? "bg-signal/15 text-signal"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {v} DAYS
        </button>
      ))}
      <ChevronDown className="mx-1 h-3 w-3 text-muted-foreground" />
    </div>
  );
}

// ---------- KPI card ----------

const TONE_VAR: Record<string, string> = {
  signal: "var(--color-signal)",
  success: "var(--color-success)",
  flight: "var(--color-flight)",
  alert: "var(--color-alert)",
};

function KpiCard({
  label,
  value,
  unit,
  sub,
  pct,
  tone = "signal",
  invert,
}: {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  pct?: number;
  tone?: "signal" | "success" | "flight" | "alert";
  invert?: boolean;
}) {
  const shown = Math.max(0, Math.min(100, pct ?? 0));
  const color = TONE_VAR[tone];
  return (
    <div className="bg-panel/70 px-7 py-8">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
        <div className="eyebrow-mono text-muted-foreground">{label}</div>
      </div>
      <div className="mt-6 flex items-baseline gap-2">
        <div className="display-number leading-none" style={{ color }}>
          {value}
        </div>
        {unit && (
          <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">{unit}</div>
        )}
      </div>
      {typeof pct === "number" && (
        <div className="dashed-track mt-6 h-[3px] w-full overflow-hidden">
          <div
            className="h-full"
            style={{
              width: `${invert ? 100 - shown : shown}%`,
              background: color,
            }}
          />
        </div>
      )}
      {sub && (
        <div className="mt-3 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
          {sub}
        </div>
      )}
    </div>
  );
}


// ---------- Chart panel wrapper ----------

function ChartPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-panel/70 p-7">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <div className="eyebrow-mono text-muted-foreground">{title}</div>
          {subtitle && <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}


// ---------- Volume bar chart ----------

function VolumeChart() {
  const max = Math.max(...VOLUME.map((v) => v.count));
  const W = 640;
  const H = 200;
  const padL = 28;
  const padR = 8;
  const padT = 16;
  const padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const step = innerW / VOLUME.length;
  const barW = step * 0.6;

  const peakIdx = VOLUME.findIndex((v) => v.day === "Jun 08");

  const gridSteps = [0, 5, 10, 15, 20];

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="barGradPeak" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridSteps.map((g) => {
          const y = padT + innerH - (g / 20) * innerH;
          return (
            <g key={g}>
              <line
                x1={padL}
                x2={W - padR}
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
              <text
                x={padL - 6}
                y={y + 3}
                fontSize="9"
                fontFamily="var(--font-mono, monospace)"
                fill="currentColor"
                fillOpacity="0.4"
                textAnchor="end"
              >
                {g}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {VOLUME.map((v, i) => {
          const h = (v.count / 20) * innerH;
          const x = padL + i * step + (step - barW) / 2;
          const y = padT + innerH - h;
          const isPeak = i === peakIdx;
          return (
            <rect
              key={v.date}
              x={x}
              y={y}
              width={barW}
              height={h}
              rx="1.5"
              fill={`url(#${isPeak ? "barGradPeak" : "barGrad"})`}
              opacity={isPeak ? 1 : 0.9}
            />
          );
        })}

        {/* Peak label */}
        {peakIdx >= 0 && (() => {
          const v = VOLUME[peakIdx];
          const x = padL + peakIdx * step + step / 2;
          const y = padT + innerH - (v.count / 20) * innerH - 4;
          return (
            <g>
              <line
                x1={x}
                x2={x}
                y1={y}
                y2={y - 14}
                stroke="var(--color-signal)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <rect
                x={x - 62}
                y={y - 28}
                width={124}
                height={16}
                rx="3"
                fill="var(--color-signal)"
                fillOpacity="0.15"
                stroke="var(--color-signal)"
                strokeOpacity="0.5"
              />
              <text
                x={x}
                y={y - 17}
                fontSize="9"
                fontFamily="var(--font-mono, monospace)"
                fill="var(--color-signal)"
                textAnchor="middle"
              >
                JUN 8 · 18 (LUNCH RUSH)
              </text>
            </g>
          );
        })()}

        {/* X labels — first 12 days of June */}
        {VOLUME.map((v, i) => {
          if (!v.day.startsWith("Jun")) return null;
          const x = padL + i * step + step / 2;
          return (
            <text
              key={v.date}
              x={x}
              y={H - 8}
              fontSize="9"
              fontFamily="var(--font-mono, monospace)"
              fill="currentColor"
              fillOpacity="0.5"
              textAnchor="middle"
            >
              {v.day.split(" ")[1]}
            </text>
          );
        })}
        <text
          x={padL + 4 * step}
          y={H - 8}
          fontSize="9"
          fontFamily="var(--font-mono, monospace)"
          fill="currentColor"
          fillOpacity="0.35"
          textAnchor="middle"
        >
          MAY 13–31
        </text>
      </svg>
    </div>
  );
}

// ---------- Time line chart ----------

function TimeChart() {
  const W = 640;
  const H = 200;
  const padL = 32;
  const padR = 8;
  const padT = 16;
  const padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const minY = 15;
  const maxY = 22;
  const step = innerW / (TIMES.length - 1);

  const y = (v: number) => padT + innerH - ((v - minY) / (maxY - minY)) * innerH;
  const x = (i: number) => padL + i * step;

  const pathD = TIMES.map((t, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(t)}`).join(" ");
  const areaD = `${pathD} L ${x(TIMES.length - 1)} ${padT + innerH} L ${x(0)} ${padT + innerH} Z`;

  const targetY = y(20);
  const currentY = y(17.2);

  const gridSteps = [15, 17, 19, 21];

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineFillAmber" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-flight)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-flight)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridSteps.map((g) => (
          <g key={g}>
            <line
              x1={padL}
              x2={W - padR}
              y1={y(g)}
              y2={y(g)}
              stroke="currentColor"
              strokeOpacity="0.08"
            />
            <text
              x={padL - 6}
              y={y(g) + 3}
              fontSize="9"
              fontFamily="var(--font-mono, monospace)"
              fill="currentColor"
              fillOpacity="0.4"
              textAnchor="end"
            >
              {g}m
            </text>
          </g>
        ))}

        {/* Target dashed line */}
        <line
          x1={padL}
          x2={W - padR}
          y1={targetY}
          y2={targetY}
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <text
          x={W - padR - 4}
          y={targetY - 4}
          fontSize="9"
          fontFamily="var(--font-mono, monospace)"
          fill="currentColor"
          fillOpacity="0.6"
          textAnchor="end"
        >
          TARGET 20m
        </text>

        {/* Area + line */}
        <path d={areaD} fill="url(#lineFillAmber)" />
        <path d={pathD} fill="none" stroke="var(--color-flight)" strokeWidth="2" />

        {/* Current avg highlight */}
        <line
          x1={x(TIMES.length - 1)}
          x2={x(TIMES.length - 1)}
          y1={currentY}
          y2={padT + innerH}
          stroke="var(--color-flight)"
          strokeOpacity="0.35"
          strokeDasharray="2 2"
        />
        <circle cx={x(TIMES.length - 1)} cy={currentY} r="4" fill="var(--color-flight)" />
        <circle
          cx={x(TIMES.length - 1)}
          cy={currentY}
          r="8"
          fill="var(--color-flight)"
          fillOpacity="0.2"
        />
        <rect
          x={x(TIMES.length - 1) - 70}
          y={currentY - 26}
          width={64}
          height={18}
          rx="3"
          fill="var(--color-flight)"
          fillOpacity="0.15"
          stroke="var(--color-flight)"
          strokeOpacity="0.5"
        />
        <text
          x={x(TIMES.length - 1) - 38}
          y={currentY - 13}
          fontSize="10"
          fontFamily="var(--font-mono, monospace)"
          fill="var(--color-flight)"
          textAnchor="middle"
        >
          17.2 MIN
        </text>

        {/* X labels sparse */}
        {[0, 10, 20, 30].map((i) => (
          <text
            key={i}
            x={x(Math.min(i, TIMES.length - 1))}
            y={H - 8}
            fontSize="9"
            fontFamily="var(--font-mono, monospace)"
            fill="currentColor"
            fillOpacity="0.4"
            textAnchor="middle"
          >
            {i === 0 ? "MAY 13" : i === 10 ? "MAY 23" : i === 20 ? "JUN 2" : "JUN 12"}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ---------- Failure breakdown ----------

function FailurePanel() {
  const total = FAILURES.reduce((s, f) => s + f.pct, 0);
  return (
    <div className="rounded-lg border border-border bg-panel/70 p-4">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
            FAILURE BREAKDOWN
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">9 failures in last 30 days</div>
        </div>
      </div>

      {/* Segmented bar */}
      <div className="flex h-6 w-full overflow-hidden rounded border border-border">
        {FAILURES.map((f) => (
          <div
            key={f.label}
            className="group relative h-full transition-all hover:brightness-125"
            style={{ width: `${(f.pct / total) * 100}%`, background: f.color }}
            title={`${f.label} · ${f.pct}%`}
          />
        ))}
      </div>

      {/* Legend rows */}
      <div className="mt-3 space-y-2">
        {FAILURES.map((f) => (
          <div key={f.label} className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: f.color }} />
            <span className="flex-1 text-sm">{f.label}</span>
            <span className="font-mono text-xs text-muted-foreground">{f.pct}%</span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted/30">
              <div
                className="h-full rounded-full"
                style={{ width: `${f.pct}%`, background: f.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-signal/40 bg-signal/5 px-3 py-2">
        <div className="font-mono text-[9px] tracking-[0.22em] text-signal">TOP CAUSE</div>
        <div className="mt-0.5 text-xs">
          Spring gust fronts — Mar 15 hold impacted{" "}
          <span className="text-signal">4.2%</span> of deliveries
        </div>
      </div>
    </div>
  );
}

// ---------- Cost summary ----------

function CostPanel() {
  const rows = [
    { label: "Delivery fees", detail: "312 × $5.49 avg", value: "$1,712.88" },
    { label: "Platform subscription", detail: "Monthly", value: "$149.00" },
    { label: "Capsule replenishment", detail: "25-pack", value: "$89.00" },
  ];
  return (
    <div className="flex flex-col rounded-lg border border-border bg-panel/70 p-7">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <div className="eyebrow-mono text-muted-foreground">COST SUMMARY</div>
          <div className="mt-1 text-xs text-muted-foreground">May 13 – Jun 12 · USD</div>
        </div>
        <button className="font-mono text-[11px] tracking-[0.18em] text-signal transition hover:text-foreground">
          VIEW BILLING →
        </button>
      </div>

      {/* Hero total */}
      <div className="border-b border-border pb-6">
        <div className="eyebrow-mono text-muted-foreground">TOTAL SPEND</div>
        <div className="mt-2 flex items-baseline gap-3">
          <div className="display-number leading-none text-foreground">$1,950.88</div>
          <div className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
            USD · 30 DAYS
          </div>
        </div>
      </div>

      {/* Line items */}
      <div className="flex-1 divide-y divide-border/40 pt-2">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between py-3">
            <div>
              <div className="text-sm text-foreground">{r.label}</div>
              <div className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
                {r.detail}
              </div>
            </div>
            <div className="font-mono text-sm tabular-nums text-foreground">{r.value}</div>
          </div>
        ))}
      </div>

      {/* Comparison strip */}
      <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-5">
        <div>
          <div className="eyebrow-mono text-muted-foreground">PER DELIVERY</div>
          <div className="mt-1.5 font-mono text-lg tabular-nums text-foreground">$5.62</div>
        </div>
        <div>
          <div className="eyebrow-mono text-muted-foreground">ROAD EQUIV.</div>
          <div className="mt-1.5 font-mono text-lg tabular-nums text-muted-foreground line-through">
            $9.40
          </div>
        </div>
        <div>
          <div className="eyebrow-mono text-[color:var(--color-success)]">SAVINGS</div>
          <div className="mt-1.5 font-mono text-lg font-semibold tabular-nums text-[color:var(--color-success)]">
            +$1,178
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Location card ----------

function LocationCard({
  name,
  address,
  deliveries,
  onTime,
  avg,
  fail,
  primary,
}: {
  name: string;
  address: string;
  deliveries: string;
  onTime: string;
  avg: string;
  fail: string;
  primary?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-6 ${
        primary ? "border-signal/50 bg-panel" : "border-border bg-panel/60"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">{name}</h3>
            {primary && (
              <span className="rounded-sm border border-signal/50 bg-signal/10 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.18em] text-signal">
                PRIMARY
              </span>
            )}
          </div>
          <div className="mt-1 font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
            {address}
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-4 border-t border-border/60 pt-5">
        <LocStat label="DELIVERIES" value={deliveries} tone="signal" />
        <LocStat label="ON-TIME" value={onTime} tone="success" />
        <LocStat label="AVG" value={avg} tone="flight" />
        <LocStat label="FAIL" value={fail} tone="alert" />
      </div>
    </div>
  );
}

function LocStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "signal" | "success" | "flight" | "alert";
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <span
          className="h-1 w-1 rounded-full"
          style={{ background: TONE_VAR[tone] }}
        />
        <div className="eyebrow-mono text-muted-foreground">{label}</div>
      </div>
      <div className="mt-2 font-sans text-lg font-medium tabular-nums leading-none text-foreground">
        {value}
      </div>
    </div>
  );
}

// ---------- Peak hours ----------

function PeakPanel() {
  const hours = useMemo(() => PEAK, []);
  const peakHour = hours.reduce((a, b) => (b.intensity > a.intensity ? b : a));
  const peakLabel =
    peakHour.hour <= 12
      ? `${peakHour.hour === 0 ? 12 : peakHour.hour} ${peakHour.hour < 12 ? "AM" : "PM"}`
      : `${peakHour.hour - 12} PM`;

  return (
    <section className="mb-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="eyebrow-mono text-muted-foreground">PEAK ANALYSIS</div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="font-sans text-2xl font-medium tabular-nums leading-none text-foreground">
              {peakLabel}
            </div>
            <div className="text-xs text-muted-foreground">Busiest hour · CT</div>
          </div>
        </div>
        <div className="text-right text-[11px] leading-relaxed text-muted-foreground">
          <span className="font-mono tracking-[0.18em] text-[color:var(--color-flight)]">
            RECOMMEND
          </span>{" "}
          Staff 2 associates 11 AM – 2 PM
        </div>
      </div>

      {/* Sleek sparkline row — bars sit on a hairline baseline */}
      <div className="border-t border-border/60 pt-4">
        <div className="flex h-12 items-end justify-between">
          {hours.map((h) => {
            const isPeak = h.hour === peakHour.hour;
            return (
              <div
                key={h.hour}
                className="rounded-full transition-all"
                style={{
                  width: "2px",
                  height: `${12 + h.intensity * 88}%`,
                  background: isPeak
                    ? "var(--color-flight)"
                    : `color-mix(in oklab, var(--color-foreground) ${Math.round(
                        20 + h.intensity * 45
                      )}%, transparent)`,
                }}
                title={`${h.hour}:00 · ${Math.round(h.intensity * 100)}%`}
              />
            );
          })}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9px] tracking-[0.16em] text-muted-foreground">
          <span>8 AM</span>
          <span>12 PM</span>
          <span>4 PM</span>
          <span>9 PM</span>
        </div>
      </div>
    </section>
  );
}
