'use client'

import { CalendarDays } from 'lucide-react'

const APPOINTMENTS = [
  { time: '08:30 AM', patient: 'John Doe',       type: 'Follow-up',          provider: 'Dr. Aisha Patel',  status: 'Confirmed' },
  { time: '09:15 AM', patient: 'Sarah Smith',     type: 'Neurology Consult',  provider: 'Dr. Marcus Webb',  status: 'Confirmed' },
  { time: '10:00 AM', patient: 'Robert Johnson',  type: 'Oncology Referral',  provider: 'Dr. Linda Chow',   status: 'Urgent' },
  { time: '11:30 AM', patient: 'Emily Davis',     type: 'Neuro Baseline',     provider: 'Dr. Aisha Patel',  status: 'Confirmed' },
  { time: '02:00 PM', patient: 'John Doe',        type: 'Lab Review',         provider: 'Dr. Aisha Patel',  status: 'Pending' },
]

const STATUS_STYLES: Record<string, string> = {
  Confirmed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  Urgent:    'bg-red-500/10 text-red-400 border border-red-500/20',
  Pending:   'bg-amber-500/10 text-amber-400 border border-amber-500/20',
}

export default function AppointmentsPage() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Appointments</h2>
          <p className="text-slate-500 text-sm mt-0.5">{today}</p>
        </div>
        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 border border-blue-200 text-xs font-semibold px-3 py-1.5 rounded-full">
          <CalendarDays size={13} />
          {APPOINTMENTS.length} Scheduled Today
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-5 text-xs font-semibold text-slate-400 uppercase tracking-wide px-5 py-3 border-b border-slate-100 bg-slate-50">
          <span>Time</span>
          <span>Patient</span>
          <span>Type</span>
          <span>Provider</span>
          <span>Status</span>
        </div>
        {APPOINTMENTS.map((appt, i) => (
          <div key={i} className="grid grid-cols-5 items-center px-5 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
            <span className="text-sm font-medium text-slate-700">{appt.time}</span>
            <span className="text-sm text-slate-800 font-semibold">{appt.patient}</span>
            <span className="text-sm text-slate-500">{appt.type}</span>
            <span className="text-sm text-slate-500">{appt.provider}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${STATUS_STYLES[appt.status]}`}>{appt.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
