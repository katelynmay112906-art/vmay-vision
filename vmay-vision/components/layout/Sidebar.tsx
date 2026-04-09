'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { LayoutDashboard, CalendarDays, ScrollText, LogOut } from 'lucide-react'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard',      href: '/dashboard' },
  { icon: CalendarDays,    label: 'Appointments',   href: '/dashboard/appointments' },
  { icon: ScrollText,      label: 'Health History', href: '/dashboard/history' },
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
    <aside className="w-56 bg-[#0b1629] flex flex-col py-5 shrink-0 border-r border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 mb-8">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">V</span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">VMay Vision</p>
          <p className="text-white/40 text-xs">Clinical AI</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 flex-1 px-3">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-left
                ${active
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent'
                }`}
            >
              <Icon size={17} className="shrink-0" />
              {label}
            </button>
          )
        })}
      </nav>

      {/* User + logout */}
      <div className="px-3 pt-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/80 text-xs font-medium truncate">{user?.name ?? 'Clinician'}</p>
            <p className="text-white/40 text-xs truncate">{user?.role ?? ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-all w-full border border-transparent"
        >
          <LogOut size={15} className="shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
