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
