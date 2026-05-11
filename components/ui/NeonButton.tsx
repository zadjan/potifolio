import { type ButtonHTMLAttributes } from 'react'

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'pink' | 'purple'
  as?: 'button' | 'a'
  href?: string
}

export function NeonButton({ children, variant = 'green', className = '', ...props }: NeonButtonProps) {
  const colorMap = {
    green: 'border-[#00FF94] text-[#00FF94] hover:shadow-[0_0_20px_rgba(0,255,148,0.5)] before:bg-[#00FF94]',
    pink:  'border-[#FF2D78] text-[#FF2D78] hover:shadow-[0_0_20px_rgba(255,45,120,0.5)] before:bg-[#FF2D78]',
    purple:'border-[#7B61FF] text-[#7B61FF] hover:shadow-[0_0_20px_rgba(123,97,255,0.5)] before:bg-[#7B61FF]',
  }

  return (
    <button
      {...props}
      className={`neon-btn px-6 py-3 text-sm font-mono tracking-widest transition-all duration-300 ${colorMap[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
