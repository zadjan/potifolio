'use client'

import { useState } from 'react'
import { deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Project } from '@/lib/types'
import { ProjectForm } from './ProjectForm'

interface ProjectTableProps {
  projects: Project[]
}

export function ProjectTable({ projects }: ProjectTableProps) {
  const [editing, setEditing] = useState<Project | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await deleteDoc(doc(db, 'projects', id))
  }

  const handleToggle = async (project: Project) => {
    await updateDoc(doc(db, 'projects', project.id), {
      published: !project.published,
      updatedAt: serverTimestamp(),
    })
  }

  return (
    <>
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#0d0d14] border border-[#1e1e2e] p-6 rounded-sm">
            <h2 className="font-mono text-[#00FF94] text-sm mb-4">// edit_project</h2>
            <ProjectForm initial={editing} onClose={() => setEditing(null)} />
          </div>
        </div>
      )}

      {projects.length === 0 && (
        <p className="font-mono text-[#555] text-sm text-center py-10">{`> No projects yet.`}</p>
      )}

      <div className="space-y-2">
        {projects.map(project => (
          <div
            key={project.id}
            className={`flex items-center gap-4 p-4 border transition-colors ${
              project.published ? 'border-[#1e1e2e] bg-[#0d0d14]' : 'border-[#1a1a1a] bg-[#0a0a0f] opacity-60'
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="font-mono text-sm text-white truncate">{project.title}</div>
              <div className="font-mono text-[10px] text-[#555] mt-0.5">
                {project.category} · {project.stars}⭐ · order: {project.order}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggle(project)}
                className={`font-mono text-[10px] px-3 py-1.5 border transition-all ${
                  project.published
                    ? 'border-[#00FF9440] text-[#00FF94] hover:bg-[#00FF9415]'
                    : 'border-[#333] text-[#555] hover:border-[#555]'
                }`}
              >
                {project.published ? 'live' : 'draft'}
              </button>

              <button
                onClick={() => setEditing(project)}
                className="font-mono text-[10px] px-3 py-1.5 border border-[#7B61FF40] text-[#7B61FF] hover:bg-[#7B61FF15] transition-all"
              >
                edit
              </button>

              <button
                onClick={() => handleDelete(project.id)}
                className="font-mono text-[10px] px-3 py-1.5 border border-[#FF2D7840] text-[#FF2D78] hover:bg-[#FF2D7815] transition-all"
              >
                del
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
