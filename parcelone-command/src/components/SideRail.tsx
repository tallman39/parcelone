import { Link } from "@tanstack/react-router";
import { LayoutGrid, Package, BarChart3, Settings as SettingsIcon, LogOut } from "lucide-react";
import logoAsset from "@/assets/parcelone-logo.png.asset.json";

export type TabId = "command" | "orders" | "analytics" | "settings";

const ITEMS: { id: TabId; label: string; to: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "command", label: "Command", to: "/", Icon: LayoutGrid },
  { id: "orders", label: "Orders", to: "/orders", Icon: Package },
  { id: "analytics", label: "Analytics", to: "/analytics", Icon: BarChart3 },
  { id: "settings", label: "Settings", to: "/settings", Icon: SettingsIcon },
];

export function SideRail({ activeTab }: { activeTab: TabId }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-16 flex-col items-center border-r border-border bg-panel/70 backdrop-blur">
      <Link to="/locations" className="mt-3 flex h-10 w-10 items-center justify-center" title="Switch location">
        <img src={logoAsset.url} alt="ParcelOne" className="h-6 w-6 object-contain" />
      </Link>

      <div className="mt-4 h-px w-8 bg-border/60" />

      <nav className="mt-3 flex w-full flex-1 flex-col items-stretch gap-1 px-2">
        {ITEMS.map(({ id, label, to, Icon }) => {
          const active = id === activeTab;
          return (
            <Link
              key={id}
              to={to}
              className={`group relative flex w-full items-center justify-center rounded-md py-3 transition ${
                active
                  ? "bg-signal/10 text-signal"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
              title={label}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-r bg-signal" />
              )}
              <Icon className="h-[22px] w-[22px]" />

            </Link>
          );
        })}
      </nav>

      <Link
        to="/login"
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted/40 hover:text-foreground"
        title="Sign out"
      >
        <LogOut className="h-[18px] w-[18px]" />
      </Link>
    </aside>
  );
}
