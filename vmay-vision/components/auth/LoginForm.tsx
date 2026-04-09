'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !password) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    login(username, password)
    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        autoComplete="username"
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-blue-400"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-blue-400"
      />
      <Button
        type="submit"
        disabled={loading || !username || !password}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium"
      >
        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in…</> : 'Sign In'}
      </Button>
    </form>
  )
}
