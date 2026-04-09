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
