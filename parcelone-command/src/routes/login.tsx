import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logoAsset from "@/assets/parcelone-logo.png.asset.json";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — ParcelOne Merchant Command" },
      { name: "description", content: "Sign in to ParcelOne Merchant Command." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("m.reyes@westlakepharmacy.com");
  const [password, setPassword] = useState("••••••••");
  const [show, setShow] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      localStorage.setItem(
        "parcelone-session",
        JSON.stringify({ name: "M. Reyes", role: "Manager", multi: true }),
      );
    } catch {}
    navigate({ to: "/locations" });
  }

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-12"
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 50% 10%, color-mix(in oklab, var(--signal) 8%, transparent) 0%, transparent 60%)",
      }}
    >
      {/* Faint hex grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Corner brackets */}
      <div className="pointer-events-none absolute inset-6 border border-border/30" />

      <div className="relative w-full max-w-[420px] rounded-xl border border-border bg-panel/80 p-8 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-3">
          <img src={logoAsset.url} alt="" className="h-7 w-7 object-contain" />
          <div>
            <div className="font-mono text-lg font-semibold tracking-[0.14em] text-foreground">
              PARCELONE
            </div>
            <div className="font-mono text-[10px] tracking-[0.32em] text-muted-foreground">
              MERCHANT COMMAND
            </div>
          </div>
        </div>
        <div className="mt-4 h-px w-16 bg-signal" />

        <form onSubmit={submit} className="mt-7 flex flex-col gap-5">
          <Field label="EMAIL">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-md border border-border bg-[#1a1a1a] px-3 py-2.5 font-mono text-sm text-foreground outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/30"
            />
          </Field>

          <Field label="PASSWORD">
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-md border border-border bg-[#1a1a1a] px-3 py-2.5 pr-10 font-mono text-sm text-foreground outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/30"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition hover:text-foreground"
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </Field>

          <button
            type="submit"
            className="mt-1 w-full btn-primary btn-primary-glow bg-signal px-4 py-3 font-mono text-[12px] font-semibold tracking-[0.22em] text-signal-foreground transition hover:opacity-90"
          >
            SIGN IN
          </button>

          <button
            type="button"
            className="text-center font-mono text-[11px] tracking-wider text-muted-foreground transition hover:text-foreground"
          >
            Forgot password?
          </button>
        </form>

        <div className="mt-7 border-t border-border/60 pt-4 text-center font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
          WESTLAKE PHARMACY · FRISCO TX
          <br />
          AUTHORIZED PERSONNEL ONLY
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
