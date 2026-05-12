'use client'

import React, { useState, useRef } from 'react'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { fetchRepoData } from '@/lib/github'
import type { Project } from '@/lib/types'

/* ── Canvas compress → Base64 ──────────────────────────────────────────────
   Max 800px, JPEG 0.78 quality.
   Natija odatda 60–200 KB — Firestore 1MB limitiga bemalol sig'adi.
   ─────────────────────────────────────────────────────────────────────── */
function compressToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Faylni o\'qib bo\'lmadi.'))
    reader.onload = ev => {
      const img = new window.Image()
      img.onerror = () => reject(new Error('Rasm yuklanmadi.'))
      img.onload = () => {
        const MAX = 800
        let { width, height } = img
        if (width > MAX || height > MAX) {
          if (width >= height) { height = Math.round(height * MAX / width);  width = MAX }
          else                  { width  = Math.round(width  * MAX / height); height = MAX }
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.78))
      }
      img.src = ev.target!.result as string
    }
    reader.readAsDataURL(file)
  })
}

function base64KiB(b64: string) {
  return Math.round(b64.length * 0.75 / 1024)
}

// ─────────────────────────────────────────────────────────────────────────────

type ProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>

const DEFAULT: ProjectInput = {
  title: '', description: '', githubUrl: '', demoUrl: '',
  stars: 0, forks: 0, language: '', topics: [], thumbnail: '',
  featured: false, category: 'frontend', order: 0, published: true,
}

interface ProjectFormProps {
  initial?: Project
  onClose: () => void
}

export function ProjectForm({ initial, onClose }: ProjectFormProps) {
  const [data, setData]               = useState<ProjectInput>(initial ? { ...initial } : DEFAULT)
  const [githubUrl, setGithubUrl]     = useState(initial?.githubUrl ?? '')
  const [fetching, setFetching]       = useState(false)
  const [saving, setSaving]           = useState(false)
  const [converting, setConverting]   = useState(false)
  const [imgErr, setImgErr]           = useState('')
  const [topicsInput, setTopicsInput] = useState(initial?.topics.join(', ') ?? '')
  const fileRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setData(d => ({ ...d, [key]: value }))

  /* ── Base64 convert ── */
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setImgErr('Faqat rasm fayl yuklash mumkin.')
      return
    }

    setImgErr('')
    setConverting(true)

    try {
      const b64 = await compressToBase64(file)
      const kib  = base64KiB(b64)

      if (kib > 700) {
        setImgErr(`Rasm hali ham katta (${kib} KB). Kichikroq rasm tanlang.`)
        return
      }

      set('thumbnail', b64)
    } catch (err) {
      setImgErr(err instanceof Error ? err.message : 'Xato yuz berdi.')
    } finally {
      setConverting(false)
    }
  }

  /* ── GitHub fetch ── */
  const fetchFromGitHub = async () => {
    if (!githubUrl) return
    setFetching(true)
    try {
      const repo = await fetchRepoData(githubUrl)
      setData(d => ({
        ...d,
        title: repo.title, description: repo.description,
        stars: repo.stars, forks: repo.forks,
        language: repo.language, topics: repo.topics,
        demoUrl: d.demoUrl || repo.homepage, githubUrl,
      }))
      setTopicsInput(repo.topics.join(', '))
    } catch (err) {
      alert(`GitHub fetch error: ${err}`)
    } finally {
      setFetching(false)
    }
  }

  /* ── Saqlash ── */
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...data, githubUrl,
        topics: topicsInput.split(',').map(t => t.trim()).filter(Boolean),
        updatedAt: serverTimestamp(),
      }
      if (initial) {
        await updateDoc(doc(db, 'projects', initial.id), payload)
      } else {
        await addDoc(collection(db, 'projects'), { ...payload, createdAt: serverTimestamp() })
      }
      onClose()
    } catch (err) {
      alert(`Save error: ${err}`)
    } finally {
      setSaving(false)
    }
  }

  const isBase64 = data.thumbnail.startsWith('data:')
  const thumbKiB = data.thumbnail ? base64KiB(data.thumbnail) : 0

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-h-[80vh] overflow-y-auto pr-1">

      {/* GitHub URL */}
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">GITHUB REPO URL</label>
        <div className="flex gap-2">
          <input type="url" value={githubUrl} onChange={e => setGithubUrl(e.target.value)}
            placeholder="https://github.com/owner/repo" className="neon-input flex-1 px-3 py-2 text-sm" />
          <button type="button" onClick={fetchFromGitHub} disabled={fetching}
            className="neon-btn px-4 py-2 text-xs font-mono whitespace-nowrap">
            {fetching ? 'Fetching...' : 'Fetch →'}
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">TITLE</label>
        <input required type="text" value={data.title} onChange={e => set('title', e.target.value)}
          className="neon-input w-full px-3 py-2 text-sm" />
      </div>

      {/* Description */}
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">DESCRIPTION</label>
        <textarea rows={3} value={data.description} onChange={e => set('description', e.target.value)}
          className="neon-input w-full px-3 py-2 text-sm resize-none" />
      </div>

      {/* Demo URL */}
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">DEMO URL</label>
        <input type="url" value={data.demoUrl} onChange={e => set('demoUrl', e.target.value)}
          placeholder="https://your-demo.com" className="neon-input w-full px-3 py-2 text-sm" />
      </div>

      {/* Thumbnail — Base64 */}
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">
          THUMBNAIL
        </label>

        {/* Hidden file input */}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

        {data.thumbnail ? (
          /* ── Preview ── */
          <div className="border border-[#1e1e2e] overflow-hidden">
            <div className="relative h-40 bg-[#0d0d14]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.thumbnail} alt="thumbnail"
                className="w-full h-full object-cover" />

              {converting && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="font-mono text-[#00FF94] text-xs animate-pulse">
                    Tayyorlanmoqda...
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-3 py-2 bg-[#0d0d14] border-t border-[#1e1e2e]">
              <span className="font-mono text-[#555] text-[10px]">
                {isBase64 ? `Base64 · ${thumbKiB} KB` : data.thumbnail.slice(0, 50) + '…'}
              </span>
              <div className="flex gap-3 shrink-0">
                <button type="button" disabled={converting}
                  onClick={() => fileRef.current?.click()}
                  className="font-mono text-[#00FF94] text-[10px] hover:opacity-70 disabled:opacity-30 transition-opacity">
                  [ almashtir ]
                </button>
                <button type="button" disabled={converting}
                  onClick={() => set('thumbnail', '')}
                  className="font-mono text-[#FF2D78] text-[10px] hover:opacity-70 disabled:opacity-30 transition-opacity">
                  [ o'chir ]
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ── Upload zone ── */
          <button type="button" disabled={converting}
            onClick={() => fileRef.current?.click()}
            className="w-full border border-dashed border-[#1e1e2e] py-8 flex flex-col items-center
                       gap-2 group hover:border-[#00FF9460] hover:bg-[#00FF9406]
                       transition-all duration-200 disabled:cursor-wait">
            {converting ? (
              <>
                <span className="text-xl text-[#00FF94] animate-spin">◌</span>
                <span className="font-mono text-[#00FF94] text-xs">Tayyorlanmoqda...</span>
              </>
            ) : (
              <>
                <span className="text-2xl text-[#333] group-hover:text-[#00FF94] transition-colors">⬆</span>
                <span className="font-mono text-xs text-[#555] group-hover:text-[#888] transition-colors">
                  [ Rasm tanlang ]
                </span>
                <span className="font-mono text-[10px] text-[#333]">PNG · JPG · WEBP · Compress qilinadi</span>
              </>
            )}
          </button>
        )}

        {imgErr && (
          <p className="font-mono text-[#FF2D78] text-[10px] mt-1.5">{imgErr}</p>
        )}
      </div>

      {/* Topics */}
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">TOPICS (comma separated)</label>
        <input type="text" value={topicsInput} onChange={e => setTopicsInput(e.target.value)}
          placeholder="react, typescript, firebase" className="neon-input w-full px-3 py-2 text-sm" />
      </div>

      {/* Category + Order */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">CATEGORY</label>
          <select value={data.category} onChange={e => set('category', e.target.value as Project['category'])}
            className="neon-input w-full px-3 py-2 text-sm bg-[#050508]">
            <option value="frontend">frontend</option>
            <option value="fullstack">fullstack</option>
            <option value="mobile">mobile</option>
            <option value="other">other</option>
          </select>
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">ORDER</label>
          <input type="number" value={data.order} onChange={e => set('order', Number(e.target.value))}
            className="neon-input w-full px-3 py-2 text-sm" />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        {([['featured', 'Featured'], ['published', 'Published']] as const).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer font-mono text-xs text-[#888]">
            <input type="checkbox" checked={data[key] as boolean}
              onChange={e => set(key, e.target.checked)} className="accent-[#00FF94]" />
            {label}
          </label>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving || converting}
          className="neon-btn flex-1 py-3 text-sm font-mono tracking-widest disabled:opacity-50">
          {saving ? '[ Saving... ]' : `[ ${initial ? 'Update' : 'Publish'} ]`}
        </button>
        <button type="button" onClick={onClose}
          className="flex-1 py-3 text-sm font-mono border border-[#1e1e2e] text-[#555] hover:border-[#333] hover:text-[#888] transition-colors">
          [ Cancel ]
        </button>
      </div>
    </form>
  )
}
