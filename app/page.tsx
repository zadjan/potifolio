import { HeroSection } from '@/components/sections/HeroSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ozodbek — Frontend Developer',
  description: 'Personal portfolio. Building interfaces that feel alive.',
}

export default function HomePage() {
  return <HeroSection />
}
