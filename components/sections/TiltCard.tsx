'use client'

import { useRef, type ReactNode } from 'react'

export function TiltCard({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.02)`
  }

  const onMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="transition-transform duration-200 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}
