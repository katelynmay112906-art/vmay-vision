export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW'

export type Patient = {
  id: string
  name: string
  age: number
  gender: string
  vitals: { label: string; value: string; flagged?: boolean }[]
  symptoms: string[]
  riskLevel: RiskLevel
  riskScore: number
  vmayAlert: string
  recommendation: string
  category: string
}

export const PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    age: 58,
    gender: 'Male',
    vitals: [
      { label: 'Temp', value: '103.2°F', flagged: true },
      { label: 'Blood Pressure', value: '88/54 mmHg', flagged: true },
      { label: 'Heart Rate', value: '112 bpm', flagged: true },
      { label: 'O₂ Sat', value: '94%' },
    ],
    symptoms: ['Fever', 'Hypotension', 'Tachycardia', 'Chills'],
    riskLevel: 'HIGH',
    riskScore: 85,
    vmayAlert: '85% risk of early-stage Sepsis detected. Rapid deterioration pattern identified across vitals.',
    recommendation: 'Recommend immediate blood cultures, IV antibiotics, and ICU escalation protocol.',
    category: 'Acute Risk',
  },
  {
    id: 'p2',
    name: 'Sarah Smith',
    age: 64,
    gender: 'Female',
    vitals: [
      { label: 'Temp', value: '98.6°F' },
      { label: 'Blood Pressure', value: '124/78 mmHg' },
      { label: 'Heart Rate', value: '72 bpm' },
      { label: 'Motor Score', value: '3/5', flagged: true },
    ],
    symptoms: ['REM sleep behavior disorder', 'Mild resting tremor', 'Reduced arm swing'],
    riskLevel: 'MEDIUM',
    riskScore: 62,
    vmayAlert: 'Emerging pattern correlates with early-stage Parkinson\'s Disease. REM sleep disorder + motor symptoms are a known precursor constellation.',
    recommendation: 'Recommend neurology consult and dopamine transporter imaging (DaTscan).',
    category: 'Long-Term Risk',
  },
  {
    id: 'p3',
    name: 'Robert Johnson',
    age: 71,
    gender: 'Male',
    vitals: [
      { label: 'Weight Δ', value: '−15 lbs / 3mo', flagged: true },
      { label: 'Hemoglobin', value: '9.2 g/dL', flagged: true },
      { label: 'WBC', value: '14.8 K/µL', flagged: true },
      { label: 'Fatigue Score', value: '8/10', flagged: true },
    ],
    symptoms: ['Unexplained weight loss', 'Chronic fatigue', 'Abnormal CBC', 'Night sweats'],
    riskLevel: 'HIGH',
    riskScore: 91,
    vmayAlert: 'High suspicion for malignancy. Triad of weight loss, fatigue, and CBC abnormalities represents a high-specificity cancer risk pattern.',
    recommendation: 'Recommend immediate oncology referral, CT chest/abdomen/pelvis, and bone marrow biopsy consideration.',
    category: 'Long-Term Risk',
  },
  {
    id: 'p4',
    name: 'Emily Davis',
    age: 34,
    gender: 'Female',
    vitals: [
      { label: 'Temp', value: '98.4°F' },
      { label: 'Blood Pressure', value: '118/74 mmHg' },
      { label: 'Neuro Exam', value: 'Mild deficit', flagged: true },
      { label: 'Vision', value: 'Stable' },
    ],
    symptoms: ['Prior optic neuritis (2yr ago)', 'Tingling in extremities', 'Fatigue episodes'],
    riskLevel: 'LOW',
    riskScore: 38,
    vmayAlert: 'Symptom clustering indicates potential future risk for Multiple Sclerosis. Optic neuritis + sensory symptoms match clinically isolated syndrome profile.',
    recommendation: 'Continue monitoring neurological baseline. MRI brain/spine at 6-month interval. No acute intervention required.',
    category: 'Monitoring',
  },
]
