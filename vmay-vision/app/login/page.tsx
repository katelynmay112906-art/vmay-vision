import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0284c7]">
      <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="text-white text-2xl font-semibold tracking-tight">VMay Vision</span>
        </div>
        <p className="text-white/60 text-sm mb-8">Clinical intelligence for every shift</p>
        <LoginForm />
      </div>
    </div>
  )
}
