import type { Metadata } from 'next'
import { AboutContent } from '@/components/sections/AboutContent'

export const metadata: Metadata = {
  title: 'About — Portfolio',
  description: 'About me, my skills, and experience.',
}

export default function AboutPage() {
  return <AboutContent />
}
