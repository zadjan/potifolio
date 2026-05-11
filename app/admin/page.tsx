'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { useAuth } from '@/lib/hooks/useAuth'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { ProjectTable } from '@/components/admin/ProjectTable'
import type { Project } from '@/lib/types'

export default function AdminDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/admin/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
    const unsub = onSnapshot(q, snap => {
      setProjects(
        snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() ?? new Date(),
          updatedAt: doc.data().updatedAt?.toDate?.() ?? new Date(),
        })) as Project[]
      )
    })
    return unsub
  }, [user])

  if (loading || !user) return null

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-mono text-[#00FF94] text-xs mb-1">// admin_dashboard</p>
          <h1 className="font-display font-black text-white text-2xl">Dashboard</h1>
          <p className="font-mono text-[#555] text-xs mt-1">{user.email}</p>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="font-mono text-xs text-[#555] hover:text-[#FF2D78] border border-[#1e1e2e] px-4 py-2 hover:border-[#FF2D7840] transition-all"
        >
          [ Logout ]
        </button>
      </div>

      {/* Add button */}
      <button
        onClick={() => setShowForm(true)}
        className="neon-btn w-full py-4 text-sm font-mono tracking-widest mb-8"
      >
        + Add New Project
      </button>

      {/* Add form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#0d0d14] border border-[#1e1e2e] p-6 rounded-sm">
            <h2 className="font-mono text-[#00FF94] text-sm mb-4">// add_project</h2>
            <ProjectForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total', value: projects.length },
          { label: 'Published', value: projects.filter(p => p.published).length },
          { label: 'Featured', value: projects.filter(p => p.featured).length },
        ].map(stat => (
          <div key={stat.label} className="border border-[#1e1e2e] bg-[#0d0d14] p-4 text-center">
            <div className="font-mono text-2xl font-bold text-[#00FF94]">{stat.value}</div>
            <div className="font-mono text-[10px] text-[#555] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Projects table */}
      <div>
        <p className="font-mono text-[10px] text-[#555] tracking-widest mb-4">PROJECTS</p>
        <ProjectTable projects={projects} />
      </div>
    </div>
  )
}
