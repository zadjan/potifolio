import type { Metadata } from 'next'
import { Space_Grotesk, Fira_Code } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { Navbar } from '@/components/layout/Navbar'
import { ParticleBackground } from '@/components/sections/ParticleBackground'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portfolio — Frontend Developer',
  description: 'Personal portfolio of a frontend developer. Cyberpunk dark theme.',
  keywords: ['frontend', 'developer', 'portfolio', 'react', 'nextjs'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${firaCode.variable}`}>
      <body className="min-h-screen bg-[#050508] text-[#e0e0e0] grid-bg">
        <ParticleBackground />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
