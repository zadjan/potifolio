'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Touch device — no cursor needed
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (dot) dot.style.opacity = '0'
    if (ring) ring.style.opacity = '0'

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      // Show on first real mouse movement
      if (dot) dot.style.opacity = '1'
      if (ring) ring.style.opacity = '1'
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      if (dot) {
        dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`
      }
      if (ring) {
        ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12
        ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12
        ring.style.transform = `translate(${ringPosRef.current.x - 16}px, ${ringPosRef.current.y - 16}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor w-2 h-2 rounded-full bg-[#00FF94]"
        style={{ top: 0, left: 0 }}
      />
      <div
        ref={ringRef}
        className="custom-cursor w-8 h-8 rounded-full border border-[#00FF94] opacity-60"
        style={{ top: 0, left: 0 }}
      />
    </>
  )
}
