'use client'

import { useEffect, useState } from 'react'

const LINES = [
  '> Initializing...',
  '> Loading modules...',
  "> Hi, I'm Ozodbek_",
]

export function TerminalText() {
  const [displayed, setDisplayed] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    const current = LINES[lineIdx]
    if (charIdx < current.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => prev + current[charIdx])
        setCharIdx(c => c + 1)
      }, 45)
      return () => clearTimeout(t)
    } else if (lineIdx < LINES.length - 1) {
      const t = setTimeout(() => {
        setDisplayed(prev => prev + '\n')
        setLineIdx(l => l + 1)
        setCharIdx(0)
      }, 400)
      return () => clearTimeout(t)
    } else {
      setDone(true)
    }
  }, [charIdx, lineIdx, done])

  return (
    <div className="font-mono text-sm md:text-base text-[#00FF94] mb-6 min-h-[72px]">
      <pre className="whitespace-pre-wrap">
        {displayed}
        {!done && <span className="animate-blink">█</span>}
        {done && <span className="animate-blink">_</span>}
      </pre>
    </div>
  )
}
