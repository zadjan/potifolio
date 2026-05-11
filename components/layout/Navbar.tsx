'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { href: '/', label: '~/' },
  { href: '/projects', label: 'projects' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#050508]/90 backdrop-blur-md border-b border-[#1e1e2e]' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-[#00FF94] text-sm font-bold tracking-widest hover:glow-green transition-all"
        >
          &lt;OZ /&gt;
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-mono text-sm transition-all duration-200 hover:text-[#00FF94] ${
                  pathname === href
                    ? 'text-[#00FF94] glow-green'
                    : 'text-[#666]'
                }`}
              >
                {pathname === href ? `> ${label}` : label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden font-mono text-[#00FF94] text-xs"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '[ close ]' : '[ menu ]'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d14] border-b border-[#1e1e2e] px-6 py-4">
          <ul className="flex flex-col gap-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-mono text-sm block transition-colors hover:text-[#00FF94] ${
                    pathname === href ? 'text-[#00FF94]' : 'text-[#666]'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
