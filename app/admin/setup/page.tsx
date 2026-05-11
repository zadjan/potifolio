'use client'

import { useState, type FormEvent } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { useEffect } from 'react'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? ''

export default function AdminSetupPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'exists' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      router.replace('/admin')
    }
  }, [user, loading, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setErrMsg('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setErrMsg('Password must be at least 8 characters.')
      return
    }
    setErrMsg('')
    setStatus('loading')
    try {
      await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, password)
      setStatus('done')
      setTimeout(() => router.replace('/admin/login'), 1500)
    } catch (err: unknown) {
      const code = (err as { code?: string }).code
      if (code === 'auth/email-already-in-use') {
        setStatus('exists')
      } else {
        setErrMsg(`Error: ${code ?? String(err)}`)
        setStatus('error')
      }
    }
  }

  if (loading) return null

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-mono text-[#00FF94] text-xs mb-2">// admin_setup</p>
        <div className="border border-[#1e1e2e] bg-[#0d0d14] p-8">
          <h1 className="font-display font-black text-white text-2xl mb-2">First-time Setup</h1>
          <p className="font-mono text-[#555] text-xs mb-8">
            Creates the admin Firebase account. Run once only.
          </p>

          {status === 'done' && (
            <div className="text-center">
              <p className="font-mono text-[#00FF94] text-sm mb-2">✓ Account created!</p>
              <p className="font-mono text-[#555] text-xs">Redirecting to login...</p>
            </div>
          )}

          {status === 'exists' && (
            <div className="space-y-4">
              <p className="font-mono text-[#7B61FF] text-xs">
                ◈ Admin account already exists. Use the login page.
              </p>
              <button
                onClick={() => router.push('/admin/login')}
                className="neon-btn w-full py-3 text-sm font-mono tracking-widest"
              >
                [ Go to Login ]
              </button>
            </div>
          )}

          {status !== 'done' && status !== 'exists' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email — read-only, from env */}
              <div>
                <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">
                  ADMIN EMAIL
                </label>
                <input
                  type="email"
                  value={ADMIN_EMAIL}
                  readOnly
                  className="neon-input w-full px-4 py-3 text-sm opacity-60 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">
                  SET PASSWORD
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="min 8 characters"
                  className="neon-input w-full px-4 py-3 text-sm"
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="repeat password"
                  className="neon-input w-full px-4 py-3 text-sm"
                  autoComplete="new-password"
                />
              </div>

              {errMsg && (
                <p className="font-mono text-[#FF2D78] text-xs">{errMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="neon-btn w-full py-4 text-sm font-mono tracking-widest disabled:opacity-50"
              >
                {status === 'loading' ? '[ Creating... ]' : '[ Create Admin Account ]'}
              </button>

              <p className="font-mono text-[#333] text-[10px] text-center">
                Already created?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/admin/login')}
                  className="text-[#555] hover:text-[#888] underline"
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
