# ParcelOne Command — Merchant Portal

Exact Lovable export. **No code changes** — this is the original codebase from Lovable.

## Stack

- React 19 + TypeScript
- Vite 8 + TanStack Start / Router
- Tailwind CSS 4 + shadcn/ui
- Leaflet (map), Recharts (analytics)

## Run locally

```bash
cd parcelone-command
npm install
npm run dev
```

Open the URL shown in terminal (usually `http://127.0.0.1:5173` or `5174`).

## Build for production

```bash
npm run build
npm run preview
```

## Routes / Screens

| Path | Screen |
|------|--------|
| `/login` | Login |
| `/locations` | Location switcher |
| `/` | Command Center (Fleet · Map · Mission Detail) |
| `/orders` | Dispatch overview |
| `/analytics` | Performance analytics |
| `/settings` | Settings (store profile, billing, etc.) |

## Notes

- Uses mock/static data — no backend required
- If `npm install` fails with 401, ensure `.npmrc` points to `https://registry.npmjs.org/`
