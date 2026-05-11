export interface Project {
  id: string
  title: string
  description: string
  githubUrl: string
  demoUrl: string
  stars: number
  forks: number
  language: string
  topics: string[]
  thumbnail: string
  featured: boolean
  category: 'frontend' | 'fullstack' | 'mobile' | 'other'
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProfileSettings {
  name: string
  title: string
  bio: string
  avatar: string
  available: boolean
  socialLinks: {
    github: string
    linkedin: string
    telegram: string
  }
}
