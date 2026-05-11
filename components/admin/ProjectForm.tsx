'use client'

import { useState, type FormEvent } from 'react'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { fetchRepoData } from '@/lib/github'
import type { Project } from '@/lib/types'

type ProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>

const DEFAULT: ProjectInput = {
  title: '',
  description: '',
  githubUrl: '',
  demoUrl: '',
  stars: 0,
  forks: 0,
  language: '',
  topics: [],
  thumbnail: '',
  featured: false,
  category: 'frontend',
  order: 0,
  published: true,
}

interface ProjectFormProps {
  initial?: Project
  onClose: () => void
}

export function ProjectForm({ initial, onClose }: ProjectFormProps) {
  const [data, setData] = useState<ProjectInput>(initial ? { ...initial } : DEFAULT)
  const [githubUrl, setGithubUrl] = useState(initial?.githubUrl ?? '')
  const [fetching, setFetching] = useState(false)
  const [saving, setSaving] = useState(false)
  const [topicsInput, setTopicsInput] = useState(initial?.topics.join(', ') ?? '')

  const fetchFromGitHub = async () => {
    if (!githubUrl) return
    setFetching(true)
    try {
      const repo = await fetchRepoData(githubUrl)
      setData(d => ({
        ...d,
        title: repo.title,
        description: repo.description,
        stars: repo.stars,
        forks: repo.forks,
        language: repo.language,
        topics: repo.topics,
        demoUrl: d.demoUrl || repo.homepage,
        githubUrl,
      }))
      setTopicsInput(repo.topics.join(', '))
    } catch (err) {
      alert(`GitHub fetch error: ${err}`)
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...data,
        githubUrl,
        topics: topicsInput.split(',').map(t => t.trim()).filter(Boolean),
        updatedAt: serverTimestamp(),
      }
      if (initial) {
        await updateDoc(doc(db, 'projects', initial.id), payload)
      } else {
        await addDoc(collection(db, 'projects'), {
          ...payload,
          createdAt: serverTimestamp(),
        })
      }
      onClose()
    } catch (err) {
      alert(`Save error: ${err}`)
    } finally {
      setSaving(false)
    }
  }

  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setData(d => ({ ...d, [key]: value }))

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-h-[80vh] overflow-y-auto pr-1">
      {/* GitHub URL + fetch */}
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">GITHUB REPO URL</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={githubUrl}
            onChange={e => setGithubUrl(e.target.value)}
            placeholder="https://github.com/owner/repo"
            className="neon-input flex-1 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={fetchFromGitHub}
            disabled={fetching}
            className="neon-btn px-4 py-2 text-xs font-mono whitespace-nowrap"
          >
            {fetching ? 'Fetching...' : 'Fetch →'}
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">TITLE</label>
        <input
          required
          type="text"
          value={data.title}
          onChange={e => set('title', e.target.value)}
          className="neon-input w-full px-3 py-2 text-sm"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">DESCRIPTION</label>
        <textarea
          rows={3}
          value={data.description}
          onChange={e => set('description', e.target.value)}
          className="neon-input w-full px-3 py-2 text-sm resize-none"
        />
      </div>

      {/* Demo URL */}
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">DEMO URL</label>
        <input
          type="url"
          value={data.demoUrl}
          onChange={e => set('demoUrl', e.target.value)}
          placeholder="https://your-demo.com"
          className="neon-input w-full px-3 py-2 text-sm"
        />
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">THUMBNAIL URL</label>
        <input
          type="url"
          value={data.thumbnail}
          onChange={e => set('thumbnail', e.target.value)}
          placeholder="https://i.imgur.com/..."
          className="neon-input w-full px-3 py-2 text-sm"
        />
      </div>

      {/* Topics */}
      <div>
        <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">TOPICS (comma separated)</label>
        <input
          type="text"
          value={topicsInput}
          onChange={e => setTopicsInput(e.target.value)}
          placeholder="react, typescript, firebase"
          className="neon-input w-full px-3 py-2 text-sm"
        />
      </div>

      {/* Category + Order */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">CATEGORY</label>
          <select
            value={data.category}
            onChange={e => set('category', e.target.value as Project['category'])}
            className="neon-input w-full px-3 py-2 text-sm bg-[#050508]"
          >
            <option value="frontend">frontend</option>
            <option value="fullstack">fullstack</option>
            <option value="mobile">mobile</option>
            <option value="other">other</option>
          </select>
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#555] mb-2 tracking-widest">ORDER</label>
          <input
            type="number"
            value={data.order}
            onChange={e => set('order', Number(e.target.value))}
            className="neon-input w-full px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-[#888]">
          <input
            type="checkbox"
            checked={data.featured}
            onChange={e => set('featured', e.target.checked)}
            className="accent-[#00FF94]"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-[#888]">
          <input
            type="checkbox"
            checked={data.published}
            onChange={e => set('published', e.target.checked)}
            className="accent-[#00FF94]"
          />
          Published
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="neon-btn flex-1 py-3 text-sm font-mono tracking-widest disabled:opacity-50"
        >
          {saving ? '[ Saving... ]' : `[ ${initial ? 'Update' : 'Publish'} ]`}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 text-sm font-mono border border-[#1e1e2e] text-[#555] hover:border-[#333] hover:text-[#888] transition-colors"
        >
          [ Cancel ]
        </button>
      </div>
    </form>
  )
}
