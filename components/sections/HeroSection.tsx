'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TerminalText } from './TerminalText'
import { TiltCard } from './TiltCard'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,148,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <TiltCard>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="border border-[#1e1e2e] bg-[#050508]/80 backdrop-blur-sm p-10 md:p-16 rounded-sm glow-box-green"
          >
            <TerminalText />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.7 }}
              className="text-5xl md:text-7xl font-display font-black tracking-tight mb-4"
            >
              <span className="text-white">FRONTEND</span>
              <br />
              <span
                className="text-[#00FF94] animate-flicker glow-green"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                DEVELOPER
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="font-mono text-sm text-[#666] mb-10 max-w-md mx-auto"
            >
              Building interfaces that feel alive.
              <br />
              React · Next.js · TypeScript · UI/UX
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/projects"
                className="neon-btn px-8 py-4 text-sm font-mono tracking-widest border border-[#00FF94] text-[#00FF94] inline-block hover:text-[#050508] hover:shadow-[0_0_20px_rgba(0,255,148,0.5)] transition-all duration-300"
              >
                [ View My Work ]
              </Link>
              <Link
                href="/contact"
                className="neon-btn px-8 py-4 text-sm font-mono tracking-widest border border-[#7B61FF] text-[#7B61FF] inline-block hover:text-[#050508] before:bg-[#7B61FF] hover:shadow-[0_0_20px_rgba(123,97,255,0.5)] transition-all duration-300"
              >
                [ Hire Me ]
              </Link>
            </motion.div>
          </motion.div>
        </TiltCard>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-[#333] tracking-widest">SCROLL</span>
          <div className="flex flex-col items-center gap-1 animate-bounce-down">
            <div className="w-px h-6 bg-gradient-to-b from-[#00FF94] to-transparent" />
            <div className="w-1.5 h-1.5 border border-[#00FF94] rotate-45" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
