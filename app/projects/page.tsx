import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects — Portfolio',
  description: 'My frontend and fullstack projects.',
}

export default function ProjectsPage() {
  return <ProjectsGrid />
}
