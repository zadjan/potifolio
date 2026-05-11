'use client'

import { motion } from 'framer-motion'

const TIMELINE = [
  {
    year: '2024 — Now',
    role: 'Frontend Developer',
    company: 'Freelance',
    desc: 'Building modern web apps for clients globally. React, Next.js, TypeScript.',
    color: '#00FF94',
  },
  {
    year: '2023',
    role: 'Junior Frontend Dev',
    company: 'Local Agency',
    desc: 'Built responsive UIs, integrated REST APIs, collaborated with design teams.',
    color: '#7B61FF',
  },
  {
    year: '2022',
    role: 'Self-taught Developer',
    company: 'Open Source',
    desc: 'Started contributing to open source. Built portfolio projects and experiments.',
    color: '#FF2D78',
  },
]

export function TimelineSection() {
  return (
    <div>
      <p className="font-mono text-[#00FF94] text-sm mb-6">// experience</p>
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#00FF94] via-[#7B61FF] to-[#FF2D78]" />

        <div className="space-y-10">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative"
            >
              {/* Dot */}
              <div
                className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full border-2"
                style={{ borderColor: item.color, backgroundColor: '#050508' }}
              />
              <div className="font-mono text-[10px] mb-1" style={{ color: item.color }}>
                {item.year}
              </div>
              <h3 className="font-display font-bold text-white text-sm mb-0.5">{item.role}</h3>
              <div className="font-mono text-[#555] text-xs mb-2">@ {item.company}</div>
              <p className="text-[#666] text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
