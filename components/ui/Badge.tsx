interface BadgeProps {
  label: string
  color?: 'green' | 'pink' | 'purple' | 'blue' | 'default'
}

const colorMap = {
  green:   'bg-[#00FF941a] text-[#00FF94] border-[#00FF9440]',
  pink:    'bg-[#FF2D781a] text-[#FF2D78] border-[#FF2D7840]',
  purple:  'bg-[#7B61FF1a] text-[#7B61FF] border-[#7B61FF40]',
  blue:    'bg-[#00D4FF1a] text-[#00D4FF] border-[#00D4FF40]',
  default: 'bg-[#ffffff0a] text-[#888] border-[#ffffff15]',
}

const langColorMap: Record<string, BadgeProps['color']> = {
  TypeScript: 'blue',
  JavaScript: 'green',
  Python: 'purple',
  Rust: 'pink',
  Go: 'blue',
}

export function Badge({ label, color }: BadgeProps) {
  const c = color ?? langColorMap[label] ?? 'default'
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-mono border rounded-sm ${colorMap[c]}`}
    >
      {label}
    </span>
  )
}
