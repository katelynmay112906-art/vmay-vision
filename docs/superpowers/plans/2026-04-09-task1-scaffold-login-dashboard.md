# Task 1: Scaffold, Login Screen & Dashboard Placeholder — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Next.js App Router project with Tailwind + Shadcn, implement a glassmorphism login screen with hardcoded auth, and a dark-sidebar dashboard placeholder.

**Architecture:** Client-side auth via React Context + localStorage; a presence-only cookie (`vmay-session=1`) enables Next.js middleware to protect `/dashboard/*` server-side. The dashboard shell (sidebar + topbar) is a Client Component layout wrapping a placeholder page with 4 empty stat cards.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Shadcn UI (slate theme), Lucide React

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `vmay-vision/` | Create | Project root (via `create-next-app`) |
| `lib/auth.ts` | Create | Hardcoded credentials map |
| `context/AuthContext.tsx` | Create | Auth state, login(), logout(), localStorage + cookie sync |
| `middleware.ts` | Create | Cookie-based route protection |
| `app/layout.tsx` | Modify | Wrap with `AuthProvider` |
| `app/page.tsx` | Modify | Client component root redirect |
| `components/auth/LoginForm.tsx` | Create | Login form UI + submit logic |
| `app/login/page.tsx` | Create | Glassmorphism login screen wrapper |
| `components/layout/Sidebar.tsx` | Create | Dark 64px icon sidebar |
| `components/layout/TopBar.tsx` | Create | White header bar |
| `app/dashboard/layout.tsx` | Create | Client component layout (sidebar + topbar) |
| `app/dashboard/page.tsx` | Create | Welcome heading + 4 stat skeleton cards |

---

## Task 1: Scaffold the Project

**Files:**
- Create: `vmay-vision/` (via CLI)

- [ ] **Step 1: Run create-next-app**

```bash
cd "/Users/katelynmay/Desktop/Hackathon/Prep 3"
npx create-next-app@latest vmay-vision --typescript --tailwind --eslint --app --src-dir no --import-alias "@/*"
```

Accept all defaults when prompted.

- [ ] **Step 2: Initialize Shadcn**

```bash
cd vmay-vision
npx shadcn@latest init
```

When prompted: style=`default`, base color=`slate`, CSS variables=`yes`.

- [ ] **Step 3: Add required Shadcn components**

```bash
npx shadcn@latest add button input
```

- [ ] **Step 4: Install Lucide React**

```bash
npm install lucide-react
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts at `http://localhost:3000` with default Next.js page. Stop the server (`Ctrl+C`).

- [ ] **Step 6: Commit**

```bash
cd "/Users/katelynmay/Desktop/Hackathon/Prep 3"
git add vmay-vision/
git commit -m "feat: scaffold Next.js project with Tailwind, Shadcn, Lucide"
```

---

## Task 2: Credentials Config + Auth Context

**Files:**
- Create: `vmay-vision/lib/auth.ts`
- Create: `vmay-vision/context/AuthContext.tsx`

- [ ] **Step 1: Create `lib/auth.ts`**

```ts
// NOTE: Placeholder auth — PoC only. Replace with real backend before production.
export type UserCredential = {
  password: string
  role: string
  name: string
}

export const CREDENTIALS: Record<string, UserCredential> = {
  nurse:  { password: 'nurse2026',  role: 'Nurse',     name: 'Kim Torres, RN' },
  doctor: { password: 'doctor2026', role: 'Physician', name: 'Dr. Aisha Patel' },
  admin:  { password: 'vmay2026',   role: 'Admin',     name: 'Admin User' },
}
```

- [ ] **Step 2: Create `context/AuthContext.tsx`**

```tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CREDENTIALS } from '@/lib/auth'

type AuthUser = { username: string; role: string; name: string }
type AuthContextType = {
  user: AuthUser | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('vmay-session')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  function login(username: string, password: string): boolean {
    const cred = CREDENTIALS[username.toLowerCase()]
    if (!cred || cred.password !== password) return false
    const authUser = { username, role: cred.role, name: cred.name }
    setUser(authUser)
    localStorage.setItem('vmay-session', JSON.stringify(authUser))
    document.cookie = 'vmay-session=1; path=/'
    return true
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('vmay-session')
    document.cookie = 'vmay-session=; path=/; max-age=0'
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
```

- [ ] **Step 3: Wrap root layout with `AuthProvider`**

In `app/layout.tsx`, import `AuthProvider` and wrap `{children}`:

```tsx
// ... existing imports ...
import { AuthProvider } from '@/context/AuthContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add vmay-vision/lib/auth.ts vmay-vision/context/AuthContext.tsx vmay-vision/app/layout.tsx
git commit -m "feat: add auth credentials config and AuthContext"
```

---

## Task 3: Middleware Route Protection

**Files:**
- Create: `vmay-vision/middleware.ts`

- [ ] **Step 1: Create `middleware.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('vmay-session')
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
```

- [ ] **Step 2: Update root `app/page.tsx` to redirect**

Replace default page content with a client-side redirect:

```tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function RootPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    router.replace(user ? '/dashboard' : '/login')
  }, [user, router])

  return null
}
```

- [ ] **Step 3: Commit**

```bash
git add vmay-vision/middleware.ts vmay-vision/app/page.tsx
git commit -m "feat: add middleware route protection and root redirect"
```

---

## Task 4: Login Screen

**Files:**
- Create: `vmay-vision/components/auth/LoginForm.tsx`
- Create: `vmay-vision/app/login/page.tsx`

- [ ] **Step 1: Create `components/auth/LoginForm.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    // Brief artificial delay for UX polish
    await new Promise(r => setTimeout(r, 500))
    const success = login(username, password)
    if (success) {
      router.push('/dashboard')
    } else {
      setError('Invalid username or password.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        autoComplete="username"
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-blue-400"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-blue-400"
      />
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white"
      >
        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…</> : 'Sign In'}
      </Button>
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
    </form>
  )
}
```

- [ ] **Step 2: Create `app/login/page.tsx`**

```tsx
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0284c7]">
      <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-8 shadow-2xl">
        {/* Logo + wordmark */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="text-white text-2xl font-semibold tracking-tight">VMay Vision</span>
        </div>
        <p className="text-white/60 text-sm mb-8">Clinical intelligence for every shift</p>
        <LoginForm />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify login screen visually**

```bash
npm run dev
```

Open `http://localhost:3000/login`. Confirm:
- Dark gradient background renders
- Frosted glass card is visible
- Form inputs and button render
- Bad credentials show error message
- Good credentials (`doctor` / `doctor2026`) redirect to `/dashboard` (currently 404 — that's fine)

Stop server.

- [ ] **Step 4: Commit**

```bash
git add vmay-vision/components/auth/LoginForm.tsx vmay-vision/app/login/page.tsx
git commit -m "feat: add glassmorphism login screen"
```

---

## Task 5: Dashboard Shell (Sidebar + TopBar)

**Files:**
- Create: `vmay-vision/components/layout/Sidebar.tsx`
- Create: `vmay-vision/components/layout/TopBar.tsx`
- Create: `vmay-vision/app/dashboard/layout.tsx`

- [ ] **Step 1: Create `components/layout/Sidebar.tsx`**

```tsx
'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Bell, Settings, LogOut } from 'lucide-react'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users,           label: 'Patients',  href: '/dashboard/patients' },
  { icon: Bell,            label: 'Alerts',    href: '/dashboard/alerts' },
  { icon: Settings,        label: 'Settings',  href: '/dashboard/settings' },
]

export function Sidebar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  function handleLogout() {
    logout()
    router.push('/login')
  }

  const initials = user?.name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('') ?? '?'

  return (
    <aside className="w-16 bg-[#0f172a] flex flex-col items-center py-4 gap-2 shrink-0">
      {/* Logo mark */}
      <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center mb-4">
        <span className="text-white font-bold text-base">V</span>
      </div>

      {/* Nav icons */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const active = pathname === href
          return (
            <button
              key={href}
              title={label}
              onClick={() => router.push(href)}
              className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                ${active ? 'text-blue-400' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}
            >
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-blue-400 rounded-r" />
              )}
              <Icon size={20} />
            </button>
          )
        })}
      </nav>

      {/* Avatar + logout */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-semibold">
          {initials}
        </div>
        <button
          title="Logout"
          onClick={handleLogout}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Create `components/layout/TopBar.tsx`**

```tsx
'use client'

import { useAuth } from '@/context/AuthContext'

interface TopBarProps {
  title: string
}

export function TopBar({ title }: TopBarProps) {
  const { user } = useAuth()

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
      <h1 className="text-slate-800 font-semibold text-base">{title}</h1>
      {user && (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>{user.name}</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
            {user.role}
          </span>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Create `app/dashboard/layout.tsx`**

```tsx
'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar title="Dashboard" />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add vmay-vision/components/layout/Sidebar.tsx vmay-vision/components/layout/TopBar.tsx vmay-vision/app/dashboard/layout.tsx
git commit -m "feat: add dashboard shell with sidebar and topbar"
```

---

## Task 6: Dashboard Placeholder Page

**Files:**
- Create: `vmay-vision/app/dashboard/page.tsx`

- [ ] **Step 1: Create `app/dashboard/page.tsx`**

```tsx
'use client'

import { useAuth } from '@/context/AuthContext'
import { Users, Bell, AlertTriangle, ClipboardList } from 'lucide-react'

const STAT_CARDS = [
  { label: 'Total Patients',  icon: Users,          color: 'text-blue-600',   bg: 'bg-blue-50' },
  { label: 'Active Alerts',   icon: Bell,           color: 'text-amber-600',  bg: 'bg-amber-50' },
  { label: 'Critical',        icon: AlertTriangle,  color: 'text-red-600',    bg: 'bg-red-50' },
  { label: 'Pending Review',  icon: ClipboardList,  color: 'text-slate-600',  bg: 'bg-slate-100' },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

export default function DashboardPage() {
  const { user } = useAuth()
  const firstName = user?.name.split(' ')[0] ?? 'there'

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">
        Good {getGreeting()}, {firstName}
      </h2>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ label, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
            <div className={`${bg} ${color} p-3 rounded-lg`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">{label}</p>
              <p className="text-2xl font-bold text-slate-800 mt-0.5">—</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Full end-to-end verify**

```bash
npm run dev
```

Verify:
1. `http://localhost:3000` → redirects to `/login`
2. Login with `doctor` / `doctor2026` → lands on `/dashboard`
3. Dashboard shows greeting, sidebar icons, topbar with name + role pill
4. Refreshing `/dashboard` stays authenticated (cookie + localStorage persist)
5. Clicking logout icon → redirects to `/login`
6. Visiting `http://localhost:3000/dashboard` while logged out → redirects to `/login`

Stop server.

- [ ] **Step 3: Commit**

```bash
git add vmay-vision/app/dashboard/page.tsx
git commit -m "feat: add dashboard placeholder with stat skeleton cards"
```

---

## Task 7: Lint + Final Cleanup

- [ ] **Step 1: Run linter**

```bash
npm run lint
```

Fix any errors reported. Warnings are acceptable for now.

- [ ] **Step 2: Final commit (if any lint fixes)**

```bash
git add -A
git commit -m "chore: fix lint errors"
```
