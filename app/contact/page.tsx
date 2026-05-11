import type { Metadata } from 'next'
import { ContactContent } from '@/components/sections/ContactContent'

export const metadata: Metadata = {
  title: 'Contact — Portfolio',
  description: "Let's work together.",
}

export default function ContactPage() {
  return <ContactContent />
}
