'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { GlowCard } from '@/components/ui/GlowCard'
import { Badge } from '@/components/ui/Badge'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <GlowCard className="group overflow-hidden h-full flex flex-col transition-all duration-300">
        {/* Preview image */}
        <div className="relative h-44 bg-[#13131e] overflow-hidden">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="font-mono text-[#333] text-xs">{`< no preview />`}</span>
            </div>
          )}
          {project.featured && (
            <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 bg-[#00FF941a] text-[#00FF94] border border-[#00FF9440]">
              FEATURED
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-semibold text-white text-sm leading-tight group-hover:text-[#00FF94] transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-3 text-[#555] text-xs font-mono shrink-0">
              <span>⭐ {project.stars}</span>
              <span>🍴 {project.forks}</span>
            </div>
          </div>

          <p className="text-[#666] text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
            {project.description || 'No description provided.'}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.language && <Badge label={project.language} />}
            {project.topics.slice(0, 4).map(t => (
              <Badge key={t} label={t} />
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 text-[10px] font-mono border border-[#1e1e2e] text-[#666] hover:border-[#00FF94] hover:text-[#00FF94] transition-all duration-200"
              >
                [ GitHub ]
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 text-[10px] font-mono border border-[#1e1e2e] text-[#666] hover:border-[#FF2D78] hover:text-[#FF2D78] transition-all duration-200"
              >
                [ Live Demo ]
              </a>
            )}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}
