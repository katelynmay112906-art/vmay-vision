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
