'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

interface FormState {
  name: string
  email: string
  message: string
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_URL
    if (!endpoint) {
      console.error('[ContactForm] NEXT_PUBLIC_FORMSPREE_URL is not set')
      setStatus('error')
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _replyto: form.email,
        }),
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        const data = await res.json().catch(() => ({}))
        console.error('[ContactForm] Formspree error:', data)
        setStatus('error')
      }
    } catch (err) {
      console.error('[ContactForm] Network error:', err)
      setStatus('error')
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-5"
    >
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">NAME</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="your name"
          className="neon-input w-full px-4 py-3 text-sm"
        />
      </div>

      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">EMAIL</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="your@email.com"
          className="neon-input w-full px-4 py-3 text-sm"
        />
      </div>

      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">MESSAGE</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Tell me about your project..."
          className="neon-input w-full px-4 py-3 text-sm resize-none"
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="neon-btn w-full py-4 text-sm font-mono tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? '[ Sending... ]' : '[ Send Message ]'}
      </motion.button>

      {status === 'sent' && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-[#00FF94] text-xs text-center"
        >
          ✓ Message sent! I&apos;ll get back to you soon.
        </motion.p>
      )}
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-[#FF2D78] text-xs text-center"
        >
          ✗ Failed to send. Please try again or email directly.
        </motion.p>
      )}
    </motion.form>
  )
}
