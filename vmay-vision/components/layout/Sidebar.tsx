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
      <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center mb-4">
        <span className="text-white font-bold text-base">V</span>
      </div>
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
