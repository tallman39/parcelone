import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";

import { SideRail, type TabId } from "@/components/SideRail";

export type { TabId };

export type Counts = { inFlight: number; loading: number; fault: number };

export function TopBar({
  activeTab,
}: {
  activeTab: TabId;
  counts?: Counts;
  weatherHold?: boolean;
  heldCount?: number;
}) {
  return (
    <>
      <SideRail activeTab={activeTab} />
      <div className="border-b border-border bg-panel/60 backdrop-blur">
        <header className="flex items-center gap-4 px-4 py-4">
          <div className="flex flex-col gap-0.5 font-mono tracking-[0.16em]">
            <span className="text-sm font-semibold text-foreground">Westlake Pharmacy</span>
            <span className="text-[11px] text-muted-foreground">12200 PRESTON RD, FRISCO TX</span>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <button className="rounded-md border border-border bg-panel p-2 text-muted-foreground transition hover:text-foreground">
              <Bell className="h-4 w-4" />
            </button>
            <Link
              to="/locations"
              className="ml-1 flex items-center gap-2 rounded-md border border-border bg-panel px-2 py-1 transition hover:border-signal/60"
              title="Switch location · Sign out"
            >
              <div className="grid h-6 w-6 place-items-center rounded-full bg-signal/20 font-mono text-[10px] text-signal">
                MR
              </div>
              <span className="text-xs text-muted-foreground">M. Reyes</span>
            </Link>
          </div>
        </header>
      </div>
    </>
  );
}

export function StatChip({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "signal" | "flight" | "alert" | "idle" | "amber";
}) {
  const toneStyle: Record<string, string> = {
    signal: "bg-signal",
    flight: "bg-[color:var(--color-flight)]",
    alert: "bg-[color:var(--color-alert)]",
    idle: "bg-muted-foreground/40",
    amber: "bg-[#f0a04b]",
  };
  const textCls: Record<string, string> = {
    signal: "text-signal",
    flight: "text-[color:var(--color-flight)]",
    alert: "text-[color:var(--color-alert)]",
    idle: "text-muted-foreground",
    amber: "text-[#f0a04b]",
  };
  return (
    <div className="flex items-center gap-2 px-3.5 first:pl-0 last:pr-4">
      <span className={`h-1.5 w-1.5 rounded-full ${toneStyle[tone]}`} />
      <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">{label}</span>
      <span className={`font-mono text-xs font-semibold ${textCls[tone]}`}>{String(value).padStart(2, "0")}</span>
    </div>
  );
}
