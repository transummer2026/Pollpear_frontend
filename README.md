# Pollpear_frontend

The React single-page application: rooms, live polls, chat, the personalized feed and
the account surface. Everything that changes — votes, messages, presence, notifications —
arrives over a WebSocket and updates in place, with no page reload.

Part of **[Pollpear](https://github.com/transummer2026/Pollpear)**, a real-time collaborative polling platform.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · [shadcn/ui](https://ui.shadcn.com) on
Radix UI and Base UI primitives · React Router · React Hook Form + Zod for validated
forms · SWR for data fetching and caching · Socket.IO client · next-themes for
light/dark · sonner for toasts · Recharts for result charts.

## Layout

| Path | Role |
| :--- | :--- |
| `src/pages/` | One component per route |
| `src/routes/` | Route definitions and guards |
| `src/layout/`, `src/components/` | Shell and the component library |
| `src/hooks/` | Data access — one hook per resource, SWR underneath |
| `src/lib/` | Fetch client, error types, helpers |

Types and validation schemas are not declared here: they come from
[`Pollpear_shared`](https://github.com/transummer2026/Pollpear_shared), a nested
submodule generated from the Prisma schema, so the form that validates an input and the
backend that accepts it agree by construction.

## Running it

Against the full stack:

```sh
git clone --recursive https://github.com/transummer2026/Pollpear.git
cd Pollpear && make up_prod
```

Standalone dev server: `npm install` then `npm run dev` — it expects the gateway to be
reachable. `npm run build` produces the static bundle nginx serves; `npm test` runs
Vitest, `npm run lint` ESLint.

Full setup instructions live in the [superproject README](https://github.com/transummer2026/Pollpear#readme).
