'use client'

import { ScrollText } from 'lucide-react'

const HISTORY = [
  {
    patient: 'John Doe',
    date: 'Apr 7, 2026',
    event: 'Emergency Admission',
    notes: 'Presented with fever 103.2°F, hypotension, tachycardia. Sepsis protocol initiated. Blood cultures ordered.',
    provider: 'Dr. Aisha Patel',
    tag: 'Emergency',
  },
  {
    patient: 'Robert Johnson',
    date: 'Apr 5, 2026',
    event: 'CBC Lab Results',
    notes: 'Hemoglobin 9.2 g/dL, WBC 14.8 K/µL. Abnormal values flagged. Oncology referral placed.',
    provider: 'Dr. Linda Chow',
    tag: 'Lab',
  },
  {
    patient: 'Sarah Smith',
    date: 'Apr 3, 2026',
    event: 'Neurology Consult',
    notes: 'Mild resting tremor noted. REM sleep behavior disorder history reviewed. DaTscan recommended.',
    provider: 'Dr. Marcus Webb',
    tag: 'Consult',
  },
  {
    patient: 'Emily Davis',
    date: 'Mar 28, 2026',
    event: 'Neuro Baseline Check',
    notes: 'Tingling in extremities reported. Prior optic neuritis documented. MRI scheduled in 6 months.',
    provider: 'Dr. Aisha Patel',
    tag: 'Monitoring',
  },
  {
    patient: 'John Doe',
    date: 'Mar 15, 2026',
    event: 'Routine Vitals',
    notes: 'BP trending low over 3 visits. Patient advised on hydration and follow-up.',
    provider: 'Dr. Aisha Patel',
    tag: 'Routine',
  },
]

const TAG_STYLES: Record<string, string> = {
  Emergency: 'bg-red-500/10 text-red-400 border border-red-500/20',
  Lab:       'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  Consult:   'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  Monitoring:'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  Routine:   'bg-slate-500/10 text-slate-400 border border-slate-300/20',
}

export default function HealthHistoryPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Health History</h2>
          <p className="text-slate-500 text-sm mt-0.5">Recent clinical events across all patients</p>
        </div>
        <div className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
          <ScrollText size={13} />
          {HISTORY.length} Records
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {HISTORY.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 px-5 py-4 shadow-sm flex gap-4 hover:border-slate-300 transition-colors">
            <div className="w-1 rounded-full shrink-0 self-stretch" style={{ background: item.tag === 'Emergency' ? '#ef4444' : item.tag === 'Lab' ? '#a855f7' : item.tag === 'Consult' ? '#3b82f6' : item.tag === 'Monitoring' ? '#10b981' : '#94a3b8' }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800">{item.patient}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TAG_STYLES[item.tag]}`}>{item.tag}</span>
                </div>
                <span className="text-xs text-slate-400 shrink-0">{item.date}</span>
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">{item.event}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{item.notes}</p>
              <p className="text-xs text-slate-400 mt-2">Provider: <span className="text-slate-500">{item.provider}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
