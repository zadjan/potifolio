export interface GitHubRepoData {
  title: string
  description: string
  stars: number
  forks: number
  language: string
  topics: string[]
  homepage: string
  htmlUrl: string
}

export async function fetchRepoData(repoUrl: string): Promise<GitHubRepoData> {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (!match) throw new Error('Invalid GitHub URL')

  const [, owner, repo] = match
  const headers: HeadersInit = {}
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo.replace(/\.git$/, '')}`, {
    headers,
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    const msg = await res.text()
    throw new Error(`GitHub API error: ${res.status} — ${msg}`)
  }

  const data = await res.json()
  return {
    title: data.name,
    description: data.description ?? '',
    stars: data.stargazers_count,
    forks: data.forks_count,
    language: data.language ?? '',
    topics: data.topics ?? [],
    homepage: data.homepage ?? '',
    htmlUrl: data.html_url,
  }
}
