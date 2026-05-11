'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useProjects } from '@/lib/hooks/useProjects'
import { ProjectCard } from './ProjectCard'

const FILTERS = ['all', 'frontend', 'fullstack', 'mobile', 'other'] as const

const filterContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } },
}

const filterItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const { projects, loading, error } = useProjects(activeFilter === 'all' ? undefined : activeFilter)

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
          // projects
        </motion.p>
        <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
          My Work
        </h1>
        <p className="text-[#555] font-mono text-sm max-w-lg">
          A collection of projects pulled live from GitHub.
        </p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        variants={filterContainer}
        initial="hidden"
        animate="show"
        className="flex flex-wrap gap-2 mb-10"
      >
        {FILTERS.map(f => (
          <motion.button
            key={f}
            variants={filterItem}
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setActiveFilter(f)}
            className={`font-mono text-xs px-4 py-2 border transition-all duration-200 ${
              activeFilter === f
                ? 'border-[#00FF94] text-[#00FF94] bg-[#00FF941a]'
                : 'border-[#1e1e2e] text-[#555] hover:border-[#333] hover:text-[#888]'
            }`}
          >
            {f}
          </motion.button>
        ))}
      </motion.div>

      {/* Grid */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="h-72 bg-[#0d0d14] border border-[#1e1e2e] animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-[#FF2D78] text-sm"
        >
          Error: {error}
        </motion.p>
      )}

      {!loading && !error && projects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-[#555] text-sm text-center py-20"
        >
          {`> No projects found.`}
        </motion.p>
      )}

      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
