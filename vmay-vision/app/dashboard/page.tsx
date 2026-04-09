'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { PATIENTS, type Patient, type RiskLevel } from '@/lib/patients'
import { AlertTriangle, Brain, Activity, User, Thermometer, FlaskConical } from 'lucide-react'

const RISK_CONFIG: Record<RiskLevel, { label: string; badge: string; border: string; glow: string; icon: string }> = {
  HIGH:   { label: 'HIGH RISK',   badge: 'bg-red-500/15 text-red-400 border border-red-500/30',    border: 'border-red-500/20',  glow: 'shadow-red-500/5',   icon: '🔴' },
  MEDIUM: { label: 'MEDIUM RISK', badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/30', border: 'border-amber-500/20', glow: 'shadow-amber-500/5', icon: '🟡' },
  LOW:    { label: 'MONITORING',  badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/5', icon: '🟢' },
}

function RiskBar({ score, level }: { score: number; level: RiskLevel }) {
  const color = level === 'HIGH' ? 'bg-red-500' : level === 'MEDIUM' ? 'bg-amber-400' : 'bg-emerald-400'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-slate-400 tabular-nums w-8 text-right">{score}%</span>
    </div>
  )
}

function PatientCard({ patient }: { patient: Patient }) {
  const risk = RISK_CONFIG[patient.riskLevel]
  return (
    <div className={`bg-[#111827] rounded-2xl border ${risk.border} shadow-lg ${risk.glow} flex flex-col overflow-hidden`}>
      {/* Header */}
      <div className="flex items-start justify-between p-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
            <User size={18} className="text-slate-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{patient.name}</h3>
            <p className="text-slate-400 text-xs">{patient.age} y/o · {patient.gender} · <span className="text-slate-500">{patient.category}</span></p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${risk.badge}`}>
          {risk.icon} {risk.label}
        </span>
      </div>

      {/* AI Risk Score */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <Brain size={11} className="text-blue-400" /> AI Risk Score
          </span>
        </div>
        <RiskBar score={patient.riskScore} level={patient.riskLevel} />
      </div>

      {/* Vitals */}
      <div className="px-5 pb-4">
        <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mb-2">
          <Activity size={11} /> Key Indicators
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {patient.vitals.map(v => (
            <div key={v.label} className={`rounded-lg px-2.5 py-1.5 ${v.flagged ? 'bg-red-500/10 border border-red-500/20' : 'bg-slate-800/60'}`}>
              <p className="text-xs text-slate-500">{v.label}</p>
              <p className={`text-xs font-semibold mt-0.5 ${v.flagged ? 'text-red-400' : 'text-slate-300'}`}>{v.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* VMay Alert */}
      <div className="mx-4 mb-4 rounded-xl bg-blue-950/60 border border-blue-500/20 p-3.5">
        <div className="flex items-center gap-1.5 mb-2">
          <Brain size={13} className="text-blue-400 shrink-0" />
          <span className="text-blue-400 text-xs font-semibold tracking-wide uppercase">VMay Pattern Alert</span>
        </div>
        <p className="text-slate-300 text-xs leading-relaxed mb-2.5">{patient.vmayAlert}</p>
        <div className="flex items-start gap-1.5 pt-2.5 border-t border-blue-500/10">
          <FlaskConical size={11} className="text-blue-400 mt-0.5 shrink-0" />
          <p className="text-blue-300/80 text-xs leading-relaxed">{patient.recommendation}</p>
        </div>
      </div>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

type Filter = 'ALL' | 'HIGH' | 'MONITORING'

export default function DashboardPage() {
  const { user } = useAuth()
  const [filter, setFilter] = useState<Filter>('ALL')
  const firstName = user?.name.split(' ')[0] ?? 'there'
  const high = PATIENTS.filter(p => p.riskLevel === 'HIGH').length

  const filtered = PATIENTS.filter(p => {
    if (filter === 'HIGH') return p.riskLevel === 'HIGH'
    if (filter === 'MONITORING') return p.riskLevel !== 'HIGH'
    return true
  })

  function toggleFilter(f: Filter) {
    setFilter(prev => prev === f ? 'ALL' : f)
  }

  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Good {getGreeting()}, {firstName}</h2>
          <p className="text-slate-500 text-sm mt-0.5">Here is your AI-powered patient overview</p>
        </div>
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full">
          <AlertTriangle size={13} />
          {high} Critical Alert{high !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Stats row — clickable filters */}
      <div className="px-6 mb-6 grid grid-cols-3 gap-3">
        <button
          onClick={() => setFilter('ALL')}
          className={`rounded-xl border px-4 py-3 text-left transition-all ${filter === 'ALL' ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-200 hover:border-slate-300'}`}
        >
          <p className={`text-xs ${filter === 'ALL' ? 'text-slate-400' : 'text-slate-500'}`}>Total Patients</p>
          <p className={`text-2xl font-bold mt-0.5 ${filter === 'ALL' ? 'text-white' : 'text-slate-800'}`}>{PATIENTS.length}</p>
        </button>
        <button
          onClick={() => toggleFilter('HIGH')}
          className={`rounded-xl border px-4 py-3 text-left transition-all ${filter === 'HIGH' ? 'bg-red-600 border-red-500' : 'bg-white border-red-200 hover:border-red-300'}`}
        >
          <p className={`text-xs ${filter === 'HIGH' ? 'text-red-200' : 'text-red-500'}`}>High Risk</p>
          <p className={`text-2xl font-bold mt-0.5 ${filter === 'HIGH' ? 'text-white' : 'text-red-600'}`}>{PATIENTS.filter(p => p.riskLevel === 'HIGH').length}</p>
        </button>
        <button
          onClick={() => toggleFilter('MONITORING')}
          className={`rounded-xl border px-4 py-3 text-left transition-all ${filter === 'MONITORING' ? 'bg-amber-500 border-amber-400' : 'bg-white border-amber-200 hover:border-amber-300'}`}
        >
          <p className={`text-xs ${filter === 'MONITORING' ? 'text-amber-100' : 'text-amber-600'}`}>Monitoring</p>
          <p className={`text-2xl font-bold mt-0.5 ${filter === 'MONITORING' ? 'text-white' : 'text-amber-600'}`}>{PATIENTS.filter(p => p.riskLevel !== 'HIGH').length}</p>
        </button>
      </div>

      {/* Patient cards */}
      <div className="px-6 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(p => <PatientCard key={p.id} patient={p} />)}
      </div>
    </div>
  )
}
