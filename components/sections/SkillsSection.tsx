'use client'

import { motion } from 'framer-motion'

const SKILLS = [
  { name: 'React / Next.js', level: 95, color: '#00FF94' },
  { name: 'TypeScript', level: 88, color: '#00D4FF' },
  { name: 'Tailwind CSS', level: 92, color: '#7B61FF' },
  { name: 'Node.js', level: 75, color: '#00FF94' },
  { name: 'Firebase / Supabase', level: 80, color: '#FF2D78' },
  { name: 'Framer Motion / GSAP', level: 70, color: '#7B61FF' },
  { name: 'Git / GitHub', level: 90, color: '#00D4FF' },
  { name: 'UI/UX Design', level: 72, color: '#FF2D78' },
]

const TECH_STACK = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Figma', icon: '🖼️' },
  { name: 'Git', icon: '🐙' },
  { name: 'Vercel', icon: '🚀' },
]

export function SkillsSection() {
  return (
    <div className="space-y-16">
      {/* Skills bars */}
      <div>
        <p className="font-mono text-[#00FF94] text-sm mb-6">// skills</p>
        <div className="space-y-4">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <div className="flex justify-between mb-1">
                <span className="font-mono text-xs text-[#888]">{skill.name}</span>
                <span className="font-mono text-xs" style={{ color: skill.color }}>{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-[#1e1e2e] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.2, duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-sm"
                  style={{ background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech stack grid */}
      <div>
        <p className="font-mono text-[#00FF94] text-sm mb-6">// tech_stack</p>
        <div className="grid grid-cols-4 gap-3">
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-[#1e1e2e] bg-[#0d0d14] p-3 text-center hover:border-[#00FF9440] hover:bg-[#00FF9408] transition-all duration-300 group"
            >
              <div className="text-2xl mb-1">{tech.icon}</div>
              <div className="font-mono text-[9px] text-[#555] group-hover:text-[#888]">{tech.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
