'use client'

import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Project } from '@/lib/types'

function toProject(doc: { id: string; data: () => Record<string, unknown> }): Project {
  const d = doc.data()
  return {
    id: doc.id,
    ...d,
    createdAt: (d.createdAt as { toDate?: () => Date } | null)?.toDate?.() ?? new Date(),
    updatedAt: (d.updatedAt as { toDate?: () => Date } | null)?.toDate?.() ?? new Date(),
  } as Project
}

export function useProjects(category?: string) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'projects'),
      snap => {
        let list = snap.docs.map(toProject)

        // Filter and sort client-side — no composite index needed
        list = list.filter(p => p.published)
        if (category && category !== 'all') {
          list = list.filter(p => p.category === category)
        }
        list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

        setProjects(list)
        setLoading(false)
      },
      err => {
        setError(err.message)
        setLoading(false)
      }
    )
    return unsub
  }, [category])

  return { projects, loading, error }
}

export function useFeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'projects'),
      snap => {
        const list = snap.docs
          .map(toProject)
          .filter(p => p.published && p.featured)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

        setProjects(list)
        setLoading(false)
      }
    )
    return unsub
  }, [])

  return { projects, loading }
}
