'use client'

import { useState, type FormEvent, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import Link from 'next/link'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? ''

const AUTH_ERRORS: Record<string, string> = {
  'auth/invalid-credential':      'Email yoki parol noto\'g\'ri.',
  'auth/wrong-password':          'Parol noto\'g\'ri.',
  'auth/user-not-found':          'Bu email bilan account topilmadi. Avval /admin/setup dan yarating.',
  'auth/too-many-requests':       'Ko\'p urinishlar. Biroz kuting.',
  'auth/network-request-failed':  'Tarmoq xatosi. Internetni tekshiring.',
  'auth/invalid-email':           'Email formati noto\'g\'ri.',
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/admin')
    }
  }, [user, authLoading, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // Faqat admin email ruxsat beriladi
    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      setError('Bu email admin emas.')
      return
    }

    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
      router.replace('/admin')
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      setError(AUTH_ERRORS[code] ?? `Xato: ${code}`)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="font-mono text-[#00FF94] text-xs animate-blink">loading...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-mono text-[#00FF94] text-xs mb-2">// admin_login</p>

        <div className="border border-[#1e1e2e] bg-[#0d0d14] p-8">
          <h1 className="font-display font-black text-white text-2xl mb-1">Admin Panel</h1>
          <p className="font-mono text-[#333] text-[10px] mb-8">Portfolio management system</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">
                EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="neon-input w-full px-4 py-3 text-sm"
                autoComplete="email"
                spellCheck={false}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="neon-input w-full px-4 py-3 pr-12 text-sm"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#444] hover:text-[#888] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? 'hide' : 'show'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="border border-[#FF2D7840] bg-[#FF2D7808] px-3 py-2">
                <p className="font-mono text-[#FF2D78] text-xs">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="neon-btn w-full py-4 text-sm font-mono tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '[ Authenticating... ]' : '[ Login ]'}
            </button>
          </form>

          {/* Setup link */}
          <p className="font-mono text-[10px] text-[#333] text-center mt-6">
            First time?{' '}
            <Link
              href="/admin/setup"
              className="text-[#555] hover:text-[#7B61FF] transition-colors"
            >
              Create admin account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
