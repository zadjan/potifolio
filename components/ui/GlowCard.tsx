import { type ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glow?: 'green' | 'pink' | 'purple'
}

export function GlowCard({ children, className = '', glow = 'green' }: GlowCardProps) {
  const glowMap = {
    green:  'hover:shadow-[0_0_30px_rgba(0,255,148,0.15)] hover:border-[#00FF9440]',
    pink:   'hover:shadow-[0_0_30px_rgba(255,45,120,0.15)] hover:border-[#FF2D7840]',
    purple: 'hover:shadow-[0_0_30px_rgba(123,97,255,0.15)] hover:border-[#7B61FF40]',
  }
  return (
    <div
      className={`border border-[#1e1e2e] bg-[#0d0d14] transition-all duration-300 ${glowMap[glow]} ${className}`}
    >
      {children}
    </div>
  )
}
