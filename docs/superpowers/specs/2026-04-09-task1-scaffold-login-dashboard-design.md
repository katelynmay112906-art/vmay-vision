# VMay Vision — Task 1: Scaffold, Login Screen & Dashboard Placeholder

**Date:** 2026-04-09
**Scope:** Next.js project scaffolding, auth context, login screen, and dashboard placeholder shell.

---

## 1. Project Scaffold

**Framework:** Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI, Lucide Icons.

**Setup commands:**
```bash
npx create-next-app@latest vmay-vision --typescript --tailwind --eslint --app --src-dir no --import-alias "@/*"
cd vmay-vision
npx shadcn@latest init
# Shadcn init settings: style=default, base color=slate, CSS variables=yes
```

```
vmay-vision/
├── app/
│   ├── layout.tsx            ← Root layout; wraps AuthProvider
│   ├── page.tsx              ← Root redirect → /login or /dashboard
│   ├── login/
│   │   └── page.tsx          ← Login screen
│   └── dashboard/
│       ├── layout.tsx        ← Protected layout (sidebar + topbar)
│       └── page.tsx          ← Dashboard placeholder
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx     ← Login form UI + validation logic
│   └── layout/
│       ├── Sidebar.tsx       ← Dark icon sidebar
│       └── TopBar.tsx        ← White header bar
├── context/
│   └── AuthContext.tsx       ← Auth state, login(), logout()
├── lib/
│   └── auth.ts               ← Hardcoded credentials (PoC placeholder)
└── middleware.ts              ← Route protection via cookie check
```

---

## 2. Authentication

**Approach:** Simple Context + localStorage (PoC placeholder — not production-ready).

- `lib/auth.ts` exports a `CREDENTIALS` map:
  ```ts
  // NOTE: Placeholder auth. Replace with real backend + hashing before production.
  export const CREDENTIALS = {
    nurse:  { password: 'nurse2026',  role: 'Nurse',     name: 'Kim Torres, RN' },
    doctor: { password: 'doctor2026', role: 'Physician', name: 'Dr. Aisha Patel' },
    admin:  { password: 'vmay2026',   role: 'Admin',     name: 'Admin User' },
  }
  ```
- `AuthContext` stores `{ username: string, role: string, name: string } | null` in React state and syncs to `localStorage` key `vmay-session` (JSON-serialized).
- Exposes `login(username, password): boolean` and `logout()`.
- **Login flow:**
  1. `LoginForm` calls `context.login(username, password)`
  2. `login()` validates against `CREDENTIALS`; returns `false` on failure
  3. On success: write `{ username, role, name }` to `localStorage` key `vmay-session`
  4. Set `document.cookie = 'vmay-session=1; path=/'` (presence-only flag for middleware)
  5. Return `true` → `LoginForm` calls `router.push('/dashboard')`
- `logout()` clears both `localStorage` and the cookie.
- `middleware.ts` checks for **presence** of the `vmay-session` cookie only (no value parsing). Redirects `/dashboard/*` → `/login` if absent; redirects `/login` → `/dashboard` if present.
- **Note on security:** Plaintext credentials are a PoC-only placeholder. The CLAUDE.md "HIPAA posture" is aspirational for this prototype — no `bcrypt` or hashing is used in Task 1. Replace entirely when a real backend is added.

---

## 3. Login Screen

**Layout:** Glassmorphism — full-bleed dark gradient with frosted glass card.

- **Background:** Full-viewport `div` with CSS gradient `#0f172a → #1e3a8a → #0284c7` (applied to a wrapper `div`, not `body`, so `backdrop-filter` composites correctly)
- **Card:** `backdrop-blur-md`, `bg-white/10`, `border border-white/20`, rounded-2xl, centered on screen
- **Card contents (top to bottom):**
  1. Logo mark (blue rounded square) + "VMay Vision" wordmark
  2. Tagline: *"Clinical intelligence for every shift"*
  3. Shadcn `Input` — Username
  4. Shadcn `Input` (type="password") — Password
  5. Shadcn `Button` — "Sign In", full width, solid blue
  6. Inline error message (red) shown on failed login attempt
- **Loading state:** Button shows spinner + "Signing in…" during the auth check (brief, but present for UX polish)
- **On success:** `router.push('/dashboard')`

---

## 4. Dashboard Placeholder

**Route protection:** `middleware.ts` redirects unauthenticated requests to `/login`.

**Important:** `app/dashboard/layout.tsx` must be a Client Component (`'use client'`) to read `AuthContext`. `app/page.tsx` must also be a Client Component — use `useRouter` + `useAuth` to redirect on mount.

### Layout (`app/dashboard/layout.tsx`)

**Sidebar** (`components/layout/Sidebar.tsx`):
- Width: 64px, background `#0f172a`
- Top: VMay logo mark
- Nav icons (Lucide): `LayoutDashboard`, `Users`, `Bell`, `Settings` — icon-only, tooltips on hover
- Active state: blue icon + blue left-border indicator
- Bottom: user avatar initials circle + logout icon button

**TopBar** (`components/layout/TopBar.tsx`):
- White background, bottom border
- Left: current page title ("Dashboard")
- Right: user display name + role pill (e.g. "Dr. Aisha Patel · Physician")

### Page (`app/dashboard/page.tsx`)

- Welcome heading: "Good [morning/afternoon/evening], [name]"
- 4 stat skeleton cards in a grid (no real data):
  - Total Patients (`Users` icon)
  - Active Alerts (`Bell` icon)
  - Critical (`AlertTriangle` icon)
  - Pending Review (`ClipboardList` icon)
- Each card: white, rounded, shadow, icon + label + "—" placeholder value

---

## 5. Out of Scope for Task 1

- Real patient data or database
- Functional navigation between dashboard sections
- The Pattern Recognition / Risk Engine
- Any backend API routes
