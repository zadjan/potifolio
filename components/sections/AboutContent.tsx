'use client'

import { motion } from 'framer-motion'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { TimelineSection } from '@/components/sections/TimelineSection'

const terminalLines: { label: string; value: string; highlight?: boolean }[] = [
  { label: 'name',     value: 'Ozodbek' },
  { label: 'role',     value: 'Frontend Developer' },
  { label: 'location', value: 'Tashkent, Uzbekistan' },
  { label: 'focus',    value: 'React, Next.js, TypeScript, UI/UX' },
  { label: 'status',   value: '● Available for work', highlight: true },
]

export function AboutContent() {
  return (
    <section className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto">
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
          // about
        </motion.p>
        <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
          About Me
        </h1>
      </motion.div>

      {/* Terminal whoami block */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
        className="border border-[#1e1e2e] bg-[#0d0d14] p-6 mb-16 font-mono text-sm
                   hover:border-[#00FF9430] transition-colors duration-500"
      >
        <div className="text-[#555] mb-1">$ whoami</div>
        <div className="text-[#00FF94] mb-4">ozodbek@portfolio:~$</div>

        <div className="space-y-1">
          {terminalLines.map((line, i) => (
            <motion.div
              key={line.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.08, duration: 0.35 }}
              className="flex gap-2"
            >
              <span className="text-[#7B61FF] w-20 shrink-0">{line.label}:</span>
              <span className={line.highlight ? 'text-[#00FF94]' : 'text-[#888]'}>
                {line.value}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="mt-4 text-[#666] leading-relaxed max-w-2xl"
        >
          I build fast, accessible, and beautiful web interfaces. Passionate about
          developer experience, design systems, and making the web feel alive through
          motion and interaction.
        </motion.div>
      </motion.div>

      {/* Two-column layout — SkillsSection + TimelineSection have their own whileInView */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-16"
      >
        <SkillsSection />
        <TimelineSection />
      </motion.div>
    </section>
  )
}
