'use client'

import { motion } from 'framer-motion'
import { ContactForm } from '@/components/sections/ContactForm'

const SOCIALS = [
  { label: 'GitHub', url: 'https://github.com/zadjan', icon: '⌥' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ozodbek-ikromov-88350140a/', icon: '◈' },
  { label: 'Telegram', url: 'https://t.me/ikromov_fn', icon: '✈' },
]

export function ContactContent() {
  return (
    <section className="relative pt-32 pb-20 px-6 max-w-5xl mx-auto">
      {/* Subtle radial glow — matches Hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,255,148,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mb-12"
      >
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[#00FF94] text-sm mb-2"
        >
          // contact
        </motion.p>
        <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
          Get In Touch
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-[#555] font-mono text-sm max-w-lg"
        >
          Have a project in mind? I&apos;d love to hear about it.
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Form — slides in from left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
        >
          <ContactForm />
        </motion.div>

        {/* Info — slides in from right */}
        <div className="space-y-10">
          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: 'easeOut' }}
            whileHover={{ borderColor: 'rgba(0,255,148,0.25)' }}
            className="border border-[#1e1e2e] bg-[#0d0d14] p-6 transition-colors duration-300"
          >
            <p className="font-mono text-[10px] text-[#555] tracking-widest mb-3">STATUS</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse-dot" />
              <span className="font-mono text-[#00FF94] text-sm">Available for work</span>
            </div>
            <p className="text-[#555] text-xs font-mono mt-2">
              Open to freelance projects and full-time roles.
            </p>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: 'easeOut' }}
          >
            <p className="font-mono text-[10px] text-[#555] tracking-widest mb-4">FIND ME ON</p>
            <div className="space-y-2">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.52 + i * 0.1, duration: 0.4 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className="flex items-center gap-3 p-3 border border-[#1e1e2e] hover:border-[#00FF9440] hover:text-[#00FF94] transition-colors duration-200 group"
                >
                  <span className="font-mono text-[#333] group-hover:text-[#00FF94] text-lg w-5 text-center transition-colors duration-200">
                    {s.icon}
                  </span>
                  <span className="font-mono text-sm text-[#888] group-hover:text-[#00FF94] transition-colors duration-200">
                    {s.label}
                  </span>
                  <span className="font-mono text-xs text-[#333] ml-auto group-hover:text-[#00FF94] transition-colors duration-200">
                    ↗
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.85, ease: 'easeOut' }}
            whileHover={{ borderColor: 'rgba(0,255,148,0.25)' }}
            className="border border-[#1e1e2e] bg-[#0d0d14] p-6 transition-colors duration-300"
          >
            <p className="font-mono text-[10px] text-[#555] tracking-widest mb-2">EMAIL</p>
            <a
              href="mailto:ikromovozod206@gmail.com"
              className="font-mono text-sm text-[#888] hover:text-[#00FF94] transition-colors duration-200"
            >
              ikromovozod206@gmail.com
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
