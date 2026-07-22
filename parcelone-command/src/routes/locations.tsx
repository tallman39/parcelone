import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logoAsset from "@/assets/parcelone-logo.png.asset.json";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Select location — ParcelOne Merchant Command" },
      { name: "description", content: "Choose a store to open Merchant Command." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LocationsPage,
});

type Loc = {
  id: string;
  city: string;
  address: string;
  status: "operational" | "onboarding";
  inFlight?: number;
  faults?: number;
  deliveries?: number;
  failRate?: string;
  avg?: string;
  progress?: number;
  href?: string;
};

const LOCATIONS: Loc[] = [
  {
    id: "frisco",
    city: "FRISCO",
    address: "12200 Preston Rd, Frisco TX 75033",
    status: "operational",
    inFlight: 2,
    faults: 1,
    deliveries: 22,
    failRate: "2.8%",
    avg: "17.2 min",
    href: "/",
  },
  {
    id: "plano",
    city: "PLANO",
    address: "8200 Preston Rd, Plano TX 75024",
    status: "operational",
    inFlight: 2,
    faults: 0,
    deliveries: 11,
    failRate: "6.2%",
    avg: "18.4 min",
    href: "/",
  },
  {
    id: "mckinney",
    city: "MCKINNEY",
    address: "Coming Q4 2026",
    status: "onboarding",
    progress: 60,
  },
];

function LocationsPage() {
  const navigate = useNavigate();

  function signOut() {
    try {
      localStorage.removeItem("parcelone-session");
    } catch {}
    navigate({ to: "/login" });
  }

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-background px-4 py-14"
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 50% 0%, color-mix(in oklab, var(--signal) 7%, transparent) 0%, transparent 60%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative flex w-full max-w-[480px] flex-col items-center">
        <div className="flex items-center gap-3">
          <img src={logoAsset.url} alt="" className="h-6 w-6 object-contain" />
          <div className="font-mono text-sm font-semibold tracking-[0.14em]">PARCELONE</div>
        </div>

        <h1 className="mt-8 font-mono text-xl font-semibold tracking-[0.24em]">
          SELECT LOCATION
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a store to open Merchant Command
        </p>

        <div className="mt-8 flex w-full flex-col gap-3">
          {LOCATIONS.map((l) => (
            <LocationCard key={l.id} loc={l} />
          ))}
        </div>

        <div className="mt-10 flex items-center gap-2 font-mono text-[11px] tracking-wider text-muted-foreground">
          <span>Logged in as</span>
          <span className="text-foreground">M. Reyes</span>
          <span>·</span>
          <span>Manager</span>
          <span>·</span>
          <button
            onClick={signOut}
            className="text-signal transition hover:opacity-80"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

function LocationCard({ loc }: { loc: Loc }) {
  const disabled = loc.status === "onboarding";

  const body = (
    <div
      className={`group relative flex flex-col gap-3 overflow-hidden rounded-lg border bg-panel/70 p-5 transition-all duration-200 ease-out ${
        disabled
          ? "cursor-not-allowed border-border/60 opacity-60"
          : "border-border hover:border-signal/30 hover:bg-panel/90 hover:shadow-[0_0_20px_-14px_color-mix(in_oklab,var(--signal)_22%,transparent)]"
      }`}
    >
      {!disabled && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-0.5 bg-signal/50 transition-all duration-200 group-hover:w-1 group-hover:bg-signal"
        />
      )}

      <div className="flex items-start justify-between gap-4 pl-2">
        <div>
          <div className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
            WESTLAKE PHARMACY
          </div>
          <div className="mt-0.5 font-mono text-base font-semibold tracking-[0.14em] text-foreground">
            {loc.city}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{loc.address}</div>
        </div>
        {disabled ? (
          <span
            className="rounded border px-2 py-0.5 font-mono text-[10px] tracking-[0.18em]"
            style={{
              color: "#f0a04b",
              borderColor: "#f0a04b66",
              background: "#f0a04b12",
            }}
          >
            ONBOARDING
          </span>
        ) : (
          <ArrowRight className="h-4 w-4 text-signal/60 transition-all duration-200 group-hover:text-signal group-hover:translate-x-0.5" />
        )}
      </div>

      {!disabled && (
        <>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-2 font-mono text-[11px] tracking-wider text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-success, #4ade80)" }}
              />
              <span className="text-foreground">OPERATIONAL</span>
            </span>
            <span>·</span>
            <span>
              IN FLIGHT <span className="text-foreground">0{loc.inFlight}</span>
            </span>
            {loc.faults ? (
              <>
                <span>·</span>
                <span>
                  FAULTS{" "}
                  <span style={{ color: "var(--color-alert, #ef4444)" }}>
                    0{loc.faults}
                  </span>
                </span>
              </>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/50 pl-2 pt-3 font-mono text-[11px] tracking-wider text-muted-foreground">
            <span>
              <span className="text-foreground">{loc.deliveries}</span> deliveries today
            </span>
            <span>·</span>
            <span>
              <span className="text-foreground">{loc.failRate}</span> fail rate
            </span>
            <span>·</span>
            <span>
              <span className="text-foreground">{loc.avg}</span> avg
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between pl-2">
            <span className="font-mono text-[11px] tracking-[0.22em] text-signal">
              OPEN COMMAND
            </span>
            <ArrowRight className="h-4 w-4 text-signal transition group-hover:translate-x-0.5" />
          </div>
        </>
      )}

      {disabled && loc.progress != null && (
        <div className="pl-2">
          <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
            <span>ONBOARDING PROGRESS</span>
            <span className="text-foreground">{loc.progress}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-background">
            <div
              className="h-full"
              style={{
                width: `${loc.progress}%`,
                background: "#f0a04b",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );

  if (disabled) return body;
  return (
    <Link to={loc.href!} className="block">
      {body}
    </Link>
  );
}
