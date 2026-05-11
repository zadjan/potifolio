'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Project } from '@/lib/types'

export function useProjects(category?: string) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const constraints = [
      where('published', '==', true),
      orderBy('order', 'asc'),
    ]
    if (category && category !== 'all') {
      constraints.unshift(where('category', '==', category))
    }

    const q = query(collection(db, 'projects'), ...constraints)
    const unsub = onSnapshot(
      q,
      snap => {
        setProjects(
          snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() ?? new Date(),
            updatedAt: doc.data().updatedAt?.toDate?.() ?? new Date(),
          })) as Project[]
        )
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
    const q = query(
      collection(db, 'projects'),
      where('published', '==', true),
      where('featured', '==', true),
      orderBy('order', 'asc')
    )
    const unsub = onSnapshot(q, snap => {
      setProjects(
        snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() ?? new Date(),
          updatedAt: doc.data().updatedAt?.toDate?.() ?? new Date(),
        })) as Project[]
      )
      setLoading(false)
    })
    return unsub
  }, [])

  return { projects, loading }
}
