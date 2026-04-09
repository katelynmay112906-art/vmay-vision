'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { CREDENTIALS } from '@/lib/auth'

type AuthUser = { username: string; role: string; name: string }
type AuthContextType = {
  user: AuthUser | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem('vmay-session')
    return stored ? (JSON.parse(stored) as AuthUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser)

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
